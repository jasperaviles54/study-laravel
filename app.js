// Laravel Study Lab — application logic.

const STORAGE_KEY = 'laravel-study-lab:progress';
const SCORE_KEY = 'laravel-study-lab:scores';
const QUIZ_PER_TOPIC = 5; // questions shown per topic, drawn at random from its larger bank

const state = {
  currentLessonId: null,
  mode: 'lessons', // 'lessons' | 'quizzes'
  completed: new Set(loadProgress()),
};

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.completed]));
}

function loadScores() {
  try {
    const raw = localStorage.getItem(SCORE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveScores(scores) {
  localStorage.setItem(SCORE_KEY, JSON.stringify(scores));
}

// Fisher-Yates shuffle — returns a new array, leaves the input untouched.
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Tiny PHP-ish syntax highlighter.
// Highlights inside <pre><code class="lang-php">...</code></pre> blocks.
function highlightCode(rawCode) {
  // 1) Escape HTML first.
  let code = rawCode
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 2) Comments — match // to end of line, and /* */ blocks, and # to end of line.
  code = code.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)/g, '<span class="com">$1</span>');

  // 3) Strings — double-quoted and single-quoted. Keep simple, avoid eating across newlines.
  code = code.replace(/("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')/g, '<span class="str">$1</span>');

  // 4) Keywords.
  const keywords = [
    'abstract','as','break','case','catch','class','const','continue','default','do',
    'echo','else','elseif','endforeach','endif','endwhile','extends','final','finally',
    'fn','for','foreach','function','if','implements','include','instanceof','interface',
    'namespace','new','null','private','protected','public','require','return','static',
    'switch','this','throw','trait','true','false','try','use','var','void','while','yield'
  ];
  // The negative lookahead `(?!=)` prevents matching the keyword `class` inside
  // the `class="..."` attributes of spans inserted by the comment/string steps
  // above — without it, those attributes get double-wrapped into broken HTML.
  const kwRe = new RegExp('\\b(' + keywords.join('|') + ')\\b(?!=)', 'g');
  code = code.replace(kwRe, '<span class="kw">$1</span>');

  // 5) Variables: $word
  code = code.replace(/(\$[a-zA-Z_][a-zA-Z0-9_]*)/g, '<span class="var">$1</span>');

  // 6) Numbers.
  code = code.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="num">$1</span>');

  // 7) Function calls — word followed by (
  code = code.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()/g, function (match, name) {
    if (name.startsWith('span') || name === 'class' || name === 'com') return match;
    return '<span class="fn">' + name + '</span>';
  });

  return code;
}

function codeBlock(rawCode) {
  return '<pre><code>' + highlightCode(rawCode) + '</code></pre>';
}

// Show exactly one of the top-level views.
function showView(id) {
  ['welcome', 'lessonView', 'quizView'].forEach(v => {
    document.getElementById(v).classList.toggle('hidden', v !== id);
  });
}

// Build the sidebar navigation.
function renderSidebar() {
  const nav = document.getElementById('lessonNav');
  nav.innerHTML = '';

  MODULES.forEach(module => {
    const title = document.createElement('div');
    title.className = 'module-title';
    title.textContent = module.title;
    nav.appendChild(title);

    module.lessons.forEach(lesson => {
      const a = document.createElement('div');
      a.className = 'lesson-link';
      if (state.completed.has(lesson.id)) a.classList.add('done');
      if (state.mode === 'lessons' && state.currentLessonId === lesson.id) a.classList.add('active');
      a.dataset.lessonId = lesson.id;
      a.innerHTML = `<span class="check"></span><span>${lesson.id} — ${lesson.title}</span>`;
      a.addEventListener('click', () => openLesson(lesson.id));
      nav.appendChild(a);
    });
  });

  // Progress summary
  const total = ALL_LESSONS.length;
  const done = state.completed.size;
  const pct = total === 0 ? 0 : Math.round(100 * done / total);
  document.getElementById('progressSummary').textContent = `${done}/${total} lessons (${pct}%)`;

  // Main nav (Lessons / Quizzes) active state
  document.querySelectorAll('.main-nav .nav-item').forEach(it => {
    it.classList.toggle('active', it.dataset.nav === state.mode);
  });
}

function findLesson(id) {
  return ALL_LESSONS.find(l => l.id === id);
}

function lessonIndex(id) {
  return ALL_LESSONS.findIndex(l => l.id === id);
}

function openLesson(id) {
  const lesson = findLesson(id);
  if (!lesson) return;

  state.mode = 'lessons';
  state.currentLessonId = id;
  showView('lessonView');

  document.getElementById('breadcrumb').textContent = lesson.moduleTitle;
  document.getElementById('lessonTitle').textContent = `${lesson.id} — ${lesson.title}`;

  document.getElementById('lessonConcept').innerHTML = lesson.concept;
  document.getElementById('lessonExample').innerHTML = codeBlock(lesson.example);
  document.getElementById('lessonExercise').innerHTML = lesson.exercise;
  document.getElementById('lessonSolution').innerHTML = codeBlock(lesson.solution);

  // Reset the exercise area for each new lesson: clear input, hide feedback + solution.
  const feedback = document.getElementById('exerciseFeedback');
  feedback.className = 'hidden';
  feedback.innerHTML = '';
  document.getElementById('solutionBox').classList.add('hidden');
  document.getElementById('exerciseInput').value = '';

  renderMarkCompleteButton(lesson);
  renderNavButtons(lesson);
  renderSidebar();

  document.getElementById('content').scrollTop = 0;
}

// Analyze the learner's exercise answer against the lesson's checkers, then
// reveal the reference solution. Correct = every requirement matched.
function checkAnswer() {
  const lesson = findLesson(state.currentLessonId);
  if (!lesson) return;

  const input = document.getElementById('exerciseInput').value.trim();
  const feedback = document.getElementById('exerciseFeedback');
  feedback.className = ''; // visible, neutral

  if (!input) {
    feedback.classList.add('feedback', 'bad');
    feedback.innerHTML = '<p>Type your answer in the box above, then check.</p>';
    return;
  }

  const checks = EXERCISE_CHECKS[lesson.id] || [];
  const misses = checks.filter(c => !c.re.test(input)).map(c => c.hint);

  if (checks.length === 0) {
    feedback.classList.add('feedback', 'neutral');
    feedback.innerHTML = '<p>This is an open-ended exercise — compare your answer with the reference solution below.</p>';
  } else if (misses.length === 0) {
    feedback.classList.add('feedback', 'ok');
    feedback.innerHTML = '<p><strong>✓ Looks correct.</strong> Your answer covers the key parts of this problem. Compare it with the reference below to polish your style.</p>';
  } else {
    feedback.classList.add('feedback', 'bad');
    feedback.innerHTML =
      '<p><strong>Not quite yet — here\'s what to address:</strong></p><ul>' +
      misses.map(m => `<li>${m}</li>`).join('') +
      '</ul><p>Fix those, then compare with the reference solution below.</p>';
  }

  document.getElementById('solutionBox').classList.remove('hidden');
}

function renderMarkCompleteButton(lesson) {
  const btn = document.getElementById('markCompleteBtn');
  if (state.completed.has(lesson.id)) {
    btn.textContent = '✓ Completed — click to undo';
    btn.classList.add('done');
  } else {
    btn.textContent = 'Mark lesson complete';
    btn.classList.remove('done');
  }
}

function renderNavButtons(lesson) {
  const idx = lessonIndex(lesson.id);
  document.getElementById('prevBtn').disabled = idx <= 0;
  document.getElementById('nextBtn').disabled = idx >= ALL_LESSONS.length - 1;
}

/* ---------- Quizzes ---------- */

function openQuizzes() {
  state.mode = 'quizzes';
  showView('quizView');
  renderQuizHome();
  renderSidebar();
  document.getElementById('content').scrollTop = 0;
}

function renderQuizHome() {
  const body = document.getElementById('quizBody');
  const scores = loadScores();

  let html = '<h2>Quizzes</h2>' +
    '<p>Pick a module to take its exam. All of that module\'s questions appear on one paper — answer them, then press <strong>Submit</strong> to see your score, the correct answers, and explanations. Answer order is shuffled each attempt.</p>' +
    '<div class="quiz-modules">';

  MODULES.forEach(m => {
    const total = m.lessons.reduce((n, l) => n + (l.quiz || []).length, 0);
    const best = scores[m.id];
    const bestStr = best != null ? ` · best ${best}/${total}` : '';
    html += `<div class="quiz-module-card" data-module="${m.id}" role="button" tabindex="0">` +
      `<div><h3>${m.title}</h3><p class="muted">${total} questions${bestStr}</p></div>` +
      '<span class="card-cta">Take exam →</span>' +
      '</div>';
  });

  html += '</div>';
  body.innerHTML = html;

  body.querySelectorAll('.quiz-module-card').forEach(card => {
    const go = () => startExam(card.dataset.module);
    card.addEventListener('click', go);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
  });
}

// Build a module exam: questions grouped by topic (lesson). Within each topic the
// questions are shuffled, and each question's answer options are shuffled too.
function buildExam(module) {
  return module.lessons
    .map(l => ({
      topic: `${l.id} — ${l.title}`,
      // Draw QUIZ_PER_TOPIC at random from the topic's bank, so the extra
      // (hidden) questions surface across shuffled attempts.
      questions: shuffle(l.quiz || []).slice(0, QUIZ_PER_TOPIC).map(q => ({
        q: q.q,
        explain: q.explain,
        options: shuffle(q.options.map((text, i) => ({ text, correct: i === q.correct }))),
      })),
    }))
    .filter(t => t.questions.length);
}

function startExam(moduleId) {
  const module = MODULES.find(m => m.id === moduleId);
  if (!module) return;
  renderExam(module, buildExam(module));
  document.getElementById('content').scrollTop = 0;
}

function renderExam(module, groups) {
  const body = document.getElementById('quizBody');
  body.innerHTML = '';

  const back = document.createElement('button');
  back.className = 'secondary quiz-back';
  back.textContent = '← All modules';
  back.addEventListener('click', renderQuizHome);
  body.appendChild(back);

  const heading = document.createElement('h2');
  heading.textContent = module.title;
  body.appendChild(heading);

  const total = groups.reduce((n, g) => n + g.questions.length, 0);
  const intro = document.createElement('p');
  intro.className = 'muted';
  intro.textContent = `${total} questions, drawn at random from a larger bank (retake for a different set). Answer what you can, then Submit — only the questions you answered are revealed.`;
  body.appendChild(intro);

  // Track each question's DOM + chosen option so we can grade on submit.
  const items = [];
  let graded = false;
  let n = 0;

  groups.forEach(group => {
    const topicHeading = document.createElement('h3');
    topicHeading.className = 'quiz-module-heading';
    topicHeading.textContent = group.topic;
    body.appendChild(topicHeading);

    group.questions.forEach(q => {
      n++;
      const qDiv = document.createElement('div');
      qDiv.className = 'quiz-question';

      const qText = document.createElement('p');
      qText.className = 'q-text';
      qText.textContent = `${n}. ${q.q}`;
      qDiv.appendChild(qText);

      const item = { qDiv, explain: q.explain, optionEls: [], selectedEl: null };

      q.options.forEach(opt => {
        const el = document.createElement('div');
        el.className = 'quiz-option';
        el.textContent = opt.text;
        item.optionEls.push({ el, correct: opt.correct });

        el.addEventListener('click', () => {
          if (graded) return;
          item.optionEls.forEach(o => o.el.classList.remove('selected'));
          el.classList.add('selected');
          item.selectedEl = el;
        });

        qDiv.appendChild(el);
      });

      items.push(item);
      body.appendChild(qDiv);
    });
  });

  const actions = document.createElement('div');
  actions.className = 'quiz-actions';
  const submit = document.createElement('button');
  submit.className = 'exam-submit';
  submit.textContent = 'Submit exam';
  actions.appendChild(submit);
  body.appendChild(actions);

  submit.addEventListener('click', () => {
    if (graded) return;
    graded = true;
    let score = 0;
    let skipped = 0;

    items.forEach(item => {
      item.qDiv.dataset.answered = '1';

      // Only reveal feedback for questions the learner actually answered.
      if (!item.selectedEl) {
        skipped++;
        item.qDiv.classList.add('skipped');
        const note = document.createElement('div');
        note.className = 'quiz-skip-note';
        note.textContent = 'Skipped — answer hidden.';
        item.qDiv.appendChild(note);
        return;
      }

      const correctEl = item.optionEls.find(o => o.correct).el;
      if (item.selectedEl === correctEl) {
        correctEl.classList.add('correct');
        score++;
      } else {
        item.selectedEl.classList.add('wrong');
        correctEl.classList.add('correct');
      }
      item.optionEls.forEach(o => o.el.classList.remove('selected'));

      const ex = document.createElement('div');
      ex.className = 'quiz-explanation';
      ex.textContent = item.explain;
      item.qDiv.appendChild(ex);
    });

    const scores = loadScores();
    if (scores[module.id] == null || score > scores[module.id]) {
      scores[module.id] = score;
      saveScores(scores);
    }

    submit.remove();
    const summary = document.createElement('div');
    summary.className = 'quiz-summary';
    const pct = Math.round((100 * score) / total);
    const skipNote = skipped ? ` ${skipped} left blank — their answers stay hidden.` : '';
    summary.innerHTML = `<p><strong>You scored ${score}/${total} (${pct}%).</strong>${skipNote}</p>`;
    const retake = document.createElement('button');
    retake.textContent = 'Retake (new shuffle)';
    retake.addEventListener('click', () => startExam(module.id));
    const home = document.createElement('button');
    home.className = 'secondary';
    home.textContent = '← All modules';
    home.addEventListener('click', renderQuizHome);
    summary.appendChild(retake);
    summary.appendChild(home);
    actions.appendChild(summary);
    summary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

/* ---------- Event handlers ---------- */

document.getElementById('checkAnswerBtn').addEventListener('click', checkAnswer);

document.getElementById('markCompleteBtn').addEventListener('click', () => {
  const id = state.currentLessonId;
  if (!id) return;
  if (state.completed.has(id)) {
    state.completed.delete(id);
  } else {
    state.completed.add(id);
  }
  saveProgress();
  renderMarkCompleteButton(findLesson(id));
  renderSidebar();
});

document.getElementById('prevBtn').addEventListener('click', () => {
  const idx = lessonIndex(state.currentLessonId);
  if (idx > 0) openLesson(ALL_LESSONS[idx - 1].id);
});

document.getElementById('nextBtn').addEventListener('click', () => {
  const idx = lessonIndex(state.currentLessonId);
  if (idx < ALL_LESSONS.length - 1) openLesson(ALL_LESSONS[idx + 1].id);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Wipe all lesson progress and quiz scores?')) return;
  state.completed = new Set();
  saveProgress();
  saveScores({});
  renderSidebar();
  if (state.mode === 'quizzes') renderQuizHome();
  else if (state.currentLessonId) renderMarkCompleteButton(findLesson(state.currentLessonId));
});

document.querySelector('.main-nav [data-nav="lessons"]').addEventListener('click', () => {
  state.mode = 'lessons';
  showView(state.currentLessonId ? 'lessonView' : 'welcome');
  renderSidebar();
});

document.querySelector('.main-nav [data-nav="quizzes"]').addEventListener('click', openQuizzes);

// Initial render
renderSidebar();

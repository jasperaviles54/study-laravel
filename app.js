// Laravel Study Lab — application logic.

const STORAGE_KEY = 'laravel-study-lab:progress';

const state = {
  currentLessonId: null,
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
  const kwRe = new RegExp('\\b(' + keywords.join('|') + ')\\b', 'g');
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
      if (state.currentLessonId === lesson.id) a.classList.add('active');
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

  state.currentLessonId = id;
  document.getElementById('welcome').classList.add('hidden');
  document.getElementById('lessonView').classList.remove('hidden');

  document.getElementById('breadcrumb').textContent = lesson.moduleTitle;
  document.getElementById('lessonTitle').textContent = `${lesson.id} — ${lesson.title}`;

  document.getElementById('lessonConcept').innerHTML = lesson.concept;
  document.getElementById('lessonExample').innerHTML = codeBlock(lesson.example);
  document.getElementById('lessonExercise').innerHTML = lesson.exercise;
  document.getElementById('lessonSolution').innerHTML = codeBlock(lesson.solution);

  // Reset solution visibility for each new lesson.
  document.getElementById('solutionBox').classList.add('hidden');
  document.getElementById('showSolutionBtn').classList.remove('hidden');
  document.getElementById('hideSolutionBtn').classList.add('hidden');
  document.getElementById('exerciseInput').value = '';

  renderQuiz(lesson);
  renderMarkCompleteButton(lesson);
  renderNavButtons(lesson);
  renderSidebar();

  document.getElementById('content').scrollTop = 0;
}

function renderQuiz(lesson) {
  const wrap = document.getElementById('lessonQuiz');
  wrap.innerHTML = '';

  lesson.quiz.forEach((q, qi) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'quiz-question';

    const qText = document.createElement('p');
    qText.className = 'q-text';
    qText.textContent = `${qi + 1}. ${q.q}`;
    qDiv.appendChild(qText);

    q.options.forEach((opt, oi) => {
      const btn = document.createElement('div');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        // Disable further clicks on this question
        if (qDiv.dataset.answered) return;
        qDiv.dataset.answered = '1';

        if (oi === q.correct) {
          btn.classList.add('correct');
        } else {
          btn.classList.add('wrong');
          // Reveal the right one
          [...qDiv.querySelectorAll('.quiz-option')][q.correct].classList.add('correct');
        }
        const ex = document.createElement('div');
        ex.className = 'quiz-explanation';
        ex.textContent = q.explain;
        qDiv.appendChild(ex);
      });
      qDiv.appendChild(btn);
    });

    wrap.appendChild(qDiv);
  });
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
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  prevBtn.disabled = idx <= 0;
  nextBtn.disabled = idx >= ALL_LESSONS.length - 1;
}

// Event handlers
document.getElementById('showSolutionBtn').addEventListener('click', () => {
  document.getElementById('solutionBox').classList.remove('hidden');
  document.getElementById('showSolutionBtn').classList.add('hidden');
  document.getElementById('hideSolutionBtn').classList.remove('hidden');
});

document.getElementById('hideSolutionBtn').addEventListener('click', () => {
  document.getElementById('solutionBox').classList.add('hidden');
  document.getElementById('showSolutionBtn').classList.remove('hidden');
  document.getElementById('hideSolutionBtn').classList.add('hidden');
});

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
  if (!confirm('Wipe all lesson progress?')) return;
  state.completed = new Set();
  saveProgress();
  renderSidebar();
  if (state.currentLessonId) renderMarkCompleteButton(findLesson(state.currentLessonId));
});

// Initial render
renderSidebar();

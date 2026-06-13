// Lesson data for Laravel Study Lab.
// Each lesson has: id, title, concept (HTML), example (code), exercise, solution (code), quiz.

const MODULES = [
  {
    id: 'm1',
    title: 'Module 1 — PHP Foundations',
    lessons: [
      {
        id: '1.1',
        title: 'What is PHP and how it runs',
        concept: `
          <p><strong>PHP</strong> is a server-side scripting language. "Server-side" means the code runs on the web server, not in the user's browser. The browser only ever sees the HTML the server produces.</p>
          <p>When you visit <code>example.com/about</code>, here's what happens with PHP:</p>
          <ol>
            <li>Your browser sends a request to the server.</li>
            <li>The server runs a PHP file. The PHP code does stuff (looks up data, decides what to show).</li>
            <li>The PHP file outputs <strong>HTML</strong>.</li>
            <li>The server sends that HTML back. Your browser renders it.</li>
          </ol>
          <p>PHP files end in <code>.php</code>. They can contain HTML directly, with PHP code embedded between <code>&lt;?php</code> and <code>?&gt;</code> tags. Modern PHP files (especially in Laravel) usually contain only PHP code — no HTML — and start with just <code>&lt;?php</code> at the top.</p>
          <div class="callout tip"><strong>Why PHP for Laravel?</strong> Laravel is written in PHP. To use Laravel you must write PHP. There's no shortcut around the language itself.</div>
        `,
        example: `<?php
// This is a comment. PHP ignores it.

echo "Hello, world!";  // 'echo' prints text to the output.

// You can also embed PHP inside HTML:
?>
<h1>My Page</h1>
<p>The time is <?php echo date('H:i'); ?></p>`,
        exercise: `<p>Write a PHP file that outputs the text: <code>I am learning Laravel.</code></p>`,
        solution: `<?php
echo "I am learning Laravel.";`,
        quiz: [
          {
            q: 'Where does PHP code run?',
            options: ['In the browser', 'On the server', 'In the database', 'On the user\'s phone'],
            correct: 1,
            explain: 'PHP runs server-side. The browser only sees the HTML output.'
          },
          {
            q: 'Which tag opens a block of PHP code?',
            options: ['<php>', '<?php', '<%php', '<script php>'],
            correct: 1,
            explain: 'PHP code starts with <?php and (optionally) ends with ?>.'
          }
        ]
      },
      {
        id: '1.2',
        title: 'Variables and types',
        concept: `
          <p>A <strong>variable</strong> is a named container for a value. In PHP, variables always start with a <code>$</code>.</p>
          <p>You don't have to declare a type — PHP figures it out from the value you assign. The main types are:</p>
          <ul>
            <li><code>string</code> — text: <code>"hello"</code></li>
            <li><code>int</code> — whole numbers: <code>42</code></li>
            <li><code>float</code> — decimals: <code>3.14</code></li>
            <li><code>bool</code> — <code>true</code> or <code>false</code></li>
            <li><code>array</code> — a list or map (next lesson)</li>
            <li><code>null</code> — "no value"</li>
          </ul>
          <p>Strings can be in single or double quotes. <strong>Double quotes</strong> let you embed variables directly: <code>"Hello $name"</code>. Single quotes treat the text literally — no variable replacement.</p>
        `,
        example: `<?php
$name = "Alex";
$age = 25;
$height = 1.78;
$isStudent = true;

echo "Hello, $name. You are $age years old.";
// Output: Hello, Alex. You are 25 years old.

// Single quotes do NOT replace variables:
echo 'Hello, $name';  // Literally prints: Hello, $name

// Concatenation with the . operator:
echo "Hello, " . $name . ".";`,
        exercise: `<p>Create variables for a book's <code>$title</code>, <code>$author</code>, and <code>$year</code>. Then echo a sentence like: <em>"1984" by George Orwell was published in 1949.</em></p>`,
        solution: `<?php
$title = "1984";
$author = "George Orwell";
$year = 1949;

echo "\\"$title\\" by $author was published in $year.";`,
        quiz: [
          {
            q: 'Which is the correct way to declare a variable in PHP?',
            options: ['var name = "Alex";', 'let $name = "Alex";', '$name = "Alex";', 'name := "Alex";'],
            correct: 2,
            explain: 'PHP variables start with $ and use a simple = assignment. No "var"/"let".'
          },
          {
            q: 'What will echo \'Hello $name\' print, given $name = "Alex"?',
            options: ['Hello Alex', 'Hello $name', 'Error', 'Nothing'],
            correct: 1,
            explain: 'Single quotes do not interpolate variables. The text is printed literally.'
          }
        ]
      },
      {
        id: '1.3',
        title: 'Arrays',
        concept: `
          <p>An <strong>array</strong> holds multiple values in a single variable. PHP has two flavors that look the same but behave differently:</p>
          <ul>
            <li><strong>Indexed</strong>: values stored with numeric keys (0, 1, 2…). Like a list.</li>
            <li><strong>Associative</strong>: values stored under named keys. Like a dictionary or map.</li>
          </ul>
          <p>Modern PHP uses square brackets <code>[ ]</code> to create arrays. You'll see <code>array(...)</code> in old tutorials — it's the same thing, older syntax.</p>
          <p>You access values with <code>$arr[key]</code>. For associative arrays, the key is the string you set; for indexed ones, it's a number.</p>
          <div class="callout">Associative arrays are everywhere in Laravel — request data, config files, validation rules, all use them.</div>
        `,
        example: `<?php
// Indexed array
$fruits = ["apple", "banana", "cherry"];
echo $fruits[0];   // apple
echo $fruits[2];   // cherry

// Add to the end:
$fruits[] = "date";

// Associative array
$user = [
    "name" => "Alex",
    "email" => "alex@example.com",
    "age" => 25,
];
echo $user["name"];   // Alex
echo $user["email"];  // alex@example.com

// Looping over an associative array:
foreach ($user as $key => $value) {
    echo "$key: $value\\n";
}`,
        exercise: `<p>Create an associative array <code>$car</code> with keys <code>make</code>, <code>model</code>, and <code>year</code>. Then echo: <em>"Toyota Corolla (2022)"</em>.</p>`,
        solution: `<?php
$car = [
    "make"  => "Toyota",
    "model" => "Corolla",
    "year"  => 2022,
];

echo $car["make"] . " " . $car["model"] . " (" . $car["year"] . ")";`,
        quiz: [
          {
            q: 'How do you access the value with key "email" in an associative array $user?',
            options: ['$user.email', '$user->email', '$user["email"]', '$user[email]'],
            correct: 2,
            explain: '$user["email"] — keys go in square brackets, strings in quotes. $user->email is object syntax, covered later.'
          },
          {
            q: 'What does $fruits[] = "date" do?',
            options: ['Replaces the array with "date"', 'Appends "date" to the end', 'Throws an error', 'Removes "date"'],
            correct: 1,
            explain: '[] with no key appends a new element to the end of an indexed array.'
          }
        ]
      },
      {
        id: '1.4',
        title: 'Control flow: if, switch, loops',
        concept: `
          <p>Control flow lets your code make decisions and repeat work.</p>
          <p><strong>if / elseif / else</strong> runs different code based on conditions:</p>
          <pre><code>if ($age >= 18) { ... } elseif ($age >= 13) { ... } else { ... }</code></pre>
          <p><strong>Comparison operators</strong>: <code>==</code> equal, <code>===</code> equal AND same type, <code>!=</code> not equal, <code>!==</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.</p>
          <p><strong>Loops</strong> repeat code. The two you'll use most:</p>
          <ul>
            <li><code>for</code> — when you know how many times to loop.</li>
            <li><code>foreach</code> — when looping over an array (this is what you'll use 95% of the time in Laravel).</li>
          </ul>
          <div class="callout warn"><strong>Always prefer === over ==.</strong> <code>"0" == 0</code> is true (because of type juggling). <code>"0" === 0</code> is false (different types). The strict version avoids confusing bugs.</div>
        `,
        example: `<?php
$age = 20;

if ($age >= 18) {
    echo "Adult";
} elseif ($age >= 13) {
    echo "Teen";
} else {
    echo "Child";
}

// for loop
for ($i = 1; $i <= 3; $i++) {
    echo "Round $i\\n";
}

// foreach over an indexed array
$colors = ["red", "green", "blue"];
foreach ($colors as $color) {
    echo $color . "\\n";
}

// foreach with key => value
$prices = ["apple" => 1.00, "banana" => 0.50];
foreach ($prices as $item => $price) {
    echo "$item costs \\$$price\\n";
}`,
        exercise: `<p>Given <code>$scores = [85, 42, 70, 95, 60];</code>, loop through and echo "PASS" or "FAIL" for each (pass is 60 or above).</p>`,
        solution: `<?php
$scores = [85, 42, 70, 95, 60];

foreach ($scores as $score) {
    if ($score >= 60) {
        echo "$score: PASS\\n";
    } else {
        echo "$score: FAIL\\n";
    }
}`,
        quiz: [
          {
            q: 'What is the difference between == and === ?',
            options: [
              'No difference',
              '== compares values, === compares values AND types',
              '=== is for arrays only',
              '== is assignment, === is comparison'
            ],
            correct: 1,
            explain: '== will type-juggle ("0" == 0 is true). === requires same type AND value. Use === to avoid surprises.'
          },
          {
            q: 'Which loop is best for iterating over an array?',
            options: ['for', 'while', 'foreach', 'do-while'],
            correct: 2,
            explain: 'foreach is designed for arrays. It handles indexed AND associative arrays cleanly.'
          }
        ]
      },
      {
        id: '1.5',
        title: 'Functions',
        concept: `
          <p>A <strong>function</strong> is a named, reusable chunk of code. You define it once and call it many times.</p>
          <p>Modern PHP supports <strong>type hints</strong> on parameters and return values. They aren't required but they help catch bugs early. Laravel uses them everywhere.</p>
          <ul>
            <li><code>function greet(string $name): string { ... }</code> — takes a string, returns a string.</li>
            <li><code>?string</code> means "string or null".</li>
            <li>Default values: <code>function greet(string $name = "friend") { ... }</code></li>
          </ul>
        `,
        example: `<?php
// No type hints
function add($a, $b) {
    return $a + $b;
}

// With type hints — preferred in modern PHP / Laravel
function multiply(int $a, int $b): int {
    return $a * $b;
}

// Default values
function greet(string $name = "friend"): string {
    return "Hello, $name!";
}

echo add(2, 3);            // 5
echo multiply(4, 5);       // 20
echo greet();              // Hello, friend!
echo greet("Alex");        // Hello, Alex!`,
        exercise: `<p>Write a function <code>isEven(int $n): bool</code> that returns true if a number is even, false otherwise. Then call it with 4 and 7 and echo each result.</p>`,
        solution: `<?php
function isEven(int $n): bool {
    return $n % 2 === 0;
}

var_dump(isEven(4));  // bool(true)
var_dump(isEven(7));  // bool(false)`,
        quiz: [
          {
            q: 'What does the colon and type after the parentheses indicate? function foo(): string',
            options: ['Parameter type', 'Return type', 'Variable name', 'Default value'],
            correct: 1,
            explain: 'The colon after the parentheses declares the return type of the function.'
          },
          {
            q: 'Given function greet(string $name = "guest"), what does greet() return?',
            options: ['null', 'an error', '"Hello, guest!"', 'empty string'],
            correct: 2,
            explain: 'When you omit an argument with a default value, PHP uses the default.'
          }
        ]
      },
      {
        id: '1.6',
        title: 'OOP: Classes and objects',
        concept: `
          <p><strong>Object-Oriented Programming (OOP)</strong> is about bundling related data and behavior together. Laravel is heavily OOP — almost everything is a class.</p>
          <p>A <strong>class</strong> is a blueprint. An <strong>object</strong> is an instance of that class.</p>
          <ul>
            <li><strong>Properties</strong> — variables that belong to the class.</li>
            <li><strong>Methods</strong> — functions that belong to the class.</li>
            <li><strong><code>$this</code></strong> — special variable referring to the current object.</li>
            <li><strong><code>__construct()</code></strong> — runs when you create the object.</li>
          </ul>
          <p><strong>Visibility:</strong></p>
          <ul>
            <li><code>public</code> — accessible from anywhere.</li>
            <li><code>private</code> — only accessible inside the class itself.</li>
            <li><code>protected</code> — accessible inside the class and its subclasses.</li>
          </ul>
        `,
        example: `<?php
class User {
    public string $name;
    public string $email;
    private int $age;

    public function __construct(string $name, string $email, int $age) {
        $this->name = $name;
        $this->email = $email;
        $this->age = $age;
    }

    public function greet(): string {
        return "Hi, I'm {$this->name}.";
    }

    public function isAdult(): bool {
        return $this->age >= 18;
    }
}

$alex = new User("Alex", "alex@example.com", 25);

echo $alex->name;          // Alex
echo $alex->greet();       // Hi, I'm Alex.
var_dump($alex->isAdult()); // bool(true)

// $alex->age would throw an error — it's private.`,
        exercise: `<p>Write a <code>Book</code> class with properties <code>$title</code> and <code>$author</code>, a constructor that sets them, and a method <code>describe()</code> that returns "TITLE by AUTHOR". Create an instance and echo describe().</p>`,
        solution: `<?php
class Book {
    public string $title;
    public string $author;

    public function __construct(string $title, string $author) {
        $this->title = $title;
        $this->author = $author;
    }

    public function describe(): string {
        return "{$this->title} by {$this->author}";
    }
}

$b = new Book("1984", "George Orwell");
echo $b->describe();  // 1984 by George Orwell`,
        quiz: [
          {
            q: 'What does $this refer to inside a class method?',
            options: ['The class itself', 'The current object (instance)', 'The parent class', 'A random variable'],
            correct: 1,
            explain: '$this refers to the specific object the method was called on.'
          },
          {
            q: 'A property marked private can be accessed where?',
            options: ['Anywhere', 'Only inside the class that defines it', 'Inside the class and its subclasses', 'Only via getters'],
            correct: 1,
            explain: 'private = same class only. protected = same class + subclasses. public = anywhere.'
          }
        ]
      },
      {
        id: '1.7',
        title: 'OOP: Inheritance, interfaces, traits',
        concept: `
          <p>OOP lets classes <strong>extend</strong> other classes and <strong>implement</strong> contracts. Laravel uses all of these heavily.</p>
          <p><strong>Inheritance</strong> (<code>extends</code>) — a class inherits properties and methods from another. A subclass can override or add to them.</p>
          <p><strong>Interfaces</strong> (<code>implements</code>) — a contract listing methods a class must define. No code in interfaces, just signatures. A class can implement many interfaces.</p>
          <p><strong>Traits</strong> — chunks of reusable methods you can "mix in" to a class. Solves the no-multiple-inheritance problem. Laravel models use traits constantly (e.g., <code>HasFactory</code>, <code>SoftDeletes</code>).</p>
          <p><strong><code>parent::</code></strong> — calls a method on the parent class.</p>
        `,
        example: `<?php
class Animal {
    public function __construct(public string $name) {}

    public function describe(): string {
        return "I am {$this->name}.";
    }
}

class Dog extends Animal {
    public function describe(): string {
        return parent::describe() . " Woof!";
    }
}

$d = new Dog("Rex");
echo $d->describe();  // I am Rex. Woof!

// Interface
interface CanFly {
    public function fly(): string;
}

class Bird extends Animal implements CanFly {
    public function fly(): string {
        return "{$this->name} is flying.";
    }
}

// Trait
trait Loggable {
    public function log(string $msg): void {
        echo "[LOG] $msg\\n";
    }
}

class Service {
    use Loggable;
}

(new Service)->log("started");  // [LOG] started`,
        exercise: `<p>Create a class <code>Vehicle</code> with a method <code>move()</code> that returns "moving". Create a subclass <code>Car extends Vehicle</code> that overrides <code>move()</code> to return "driving on the road". Create a Car and call move().</p>`,
        solution: `<?php
class Vehicle {
    public function move(): string {
        return "moving";
    }
}

class Car extends Vehicle {
    public function move(): string {
        return "driving on the road";
    }
}

$c = new Car();
echo $c->move();  // driving on the road`,
        quiz: [
          {
            q: 'Which keyword makes one class inherit from another?',
            options: ['implements', 'extends', 'uses', 'inherits'],
            correct: 1,
            explain: 'extends. "implements" is for interfaces, "use" is for traits.'
          },
          {
            q: 'How many interfaces can a class implement?',
            options: ['One', 'Two', 'Unlimited', 'Zero'],
            correct: 2,
            explain: 'A class can implement as many interfaces as you want, separated by commas. But it can only extend one parent class.'
          }
        ]
      },
      {
        id: '1.8',
        title: 'Namespaces, autoloading, Composer',
        concept: `
          <p>Real PHP projects have hundreds of classes. Without organization, names would collide. <strong>Namespaces</strong> solve this — they're like folders for class names.</p>
          <p>A class declared <code>namespace App\\Models;</code> and named <code>User</code> has the fully-qualified name <code>App\\Models\\User</code>. Two classes can share the short name "User" if they live in different namespaces.</p>
          <p>To <em>use</em> a namespaced class, you import it with <code>use</code> at the top of the file:</p>
          <pre><code>use App\\Models\\User;</code></pre>
          <p>Then you can refer to it as just <code>User</code> in the rest of the file.</p>
          <p><strong>Composer</strong> is PHP's package manager (like npm for Node). It does two jobs:</p>
          <ol>
            <li>Installs third-party packages (<code>composer require vendor/package</code>).</li>
            <li>Provides <strong>autoloading</strong> — automatically finds and loads class files when you reference them. No more manual <code>require</code> calls.</li>
          </ol>
          <p>You'll run <code>composer install</code> after cloning a Laravel project to install dependencies, and you'll see <code>vendor/</code> (installed packages) and <code>composer.json</code> (the dependency list).</p>
        `,
        example: `<?php
// File: app/Models/User.php
namespace App\\Models;

class User {
    public function __construct(public string $name) {}
}

// File: app/Http/Controllers/UserController.php
namespace App\\Http\\Controllers;

use App\\Models\\User;  // import

class UserController {
    public function show(): User {
        return new User("Alex");
    }
}`,
        exercise: `<p>Imagine you have a class at <code>app/Services/PaymentService.php</code> declared in namespace <code>App\\Services</code>. Write the <code>use</code> statement that imports it.</p>`,
        solution: `<?php
use App\\Services\\PaymentService;`,
        quiz: [
          {
            q: 'What does Composer do?',
            options: [
              'Compiles PHP into binary',
              'Manages packages and autoloads classes',
              'Runs database migrations',
              'Renders HTML templates'
            ],
            correct: 1,
            explain: 'Composer is PHP\'s package manager AND provides autoloading. Both jobs are critical to modern PHP.'
          },
          {
            q: 'What separator does PHP use in namespaces?',
            options: ['/ (forward slash)', '. (dot)', '\\ (backslash)', ':: (double colon)'],
            correct: 2,
            explain: 'PHP namespaces use backslash. App\\Models\\User. (Confusingly, in file paths you use forward slash, but in class names it\'s backslash.)'
          }
        ]
      }
    ]
  },
  {
    id: 'm2',
    title: 'Module 2 — Web & Database Basics',
    lessons: [
      {
        id: '2.1',
        title: 'HTTP: requests and responses',
        concept: `
          <p>The web works on <strong>HTTP</strong>. Every page view or API call is a <em>request</em> from the browser and a <em>response</em> from the server.</p>
          <p>A request has:</p>
          <ul>
            <li>A <strong>method</strong>: <code>GET</code> (fetch), <code>POST</code> (create/submit), <code>PUT</code>/<code>PATCH</code> (update), <code>DELETE</code> (delete).</li>
            <li>A <strong>URL</strong>: <code>/users/42</code></li>
            <li><strong>Headers</strong>: metadata (cookies, content-type, auth tokens).</li>
            <li>Optional <strong>body</strong>: data sent with POST/PUT (form fields, JSON).</li>
          </ul>
          <p>A response has:</p>
          <ul>
            <li>A <strong>status code</strong>: 200 OK, 201 Created, 302 Redirect, 404 Not Found, 422 Validation Error, 500 Server Error.</li>
            <li>Headers and body (usually HTML or JSON).</li>
          </ul>
          <p>Laravel <strong>routes</strong> map a (method + URL) pair to code that produces a response. That's the whole framework's job, boiled down.</p>
        `,
        example: `# A typical web flow:

GET /products            → list page (HTML)
GET /products/42         → detail page for product 42
GET /products/create     → form to create a new product
POST /products           → submit the form, create a product
GET /products/42/edit    → form to edit product 42
PUT /products/42         → submit the edit
DELETE /products/42      → delete product 42

# Status codes you'll see:
200 OK              — success
201 Created         — resource created
302 Found           — redirect
401 Unauthorized    — not logged in
403 Forbidden       — logged in but not allowed
404 Not Found
422 Unprocessable   — validation failed
500 Server Error    — something broke`,
        exercise: `<p>For a "comments on a blog post" feature, write the HTTP method + URL you'd use to:</p>
          <ol>
            <li>View all comments on post 5</li>
            <li>Create a new comment on post 5</li>
            <li>Delete comment 17</li>
          </ol>`,
        solution: `1. GET /posts/5/comments
2. POST /posts/5/comments
3. DELETE /comments/17`,
        quiz: [
          {
            q: 'Which HTTP method is used to fetch/read data without changing anything?',
            options: ['POST', 'GET', 'PUT', 'DELETE'],
            correct: 1,
            explain: 'GET is for reading. It should be idempotent (safe to repeat) and never modify state.'
          },
          {
            q: 'What does HTTP status 404 mean?',
            options: ['Success', 'Validation failed', 'Not Found', 'Server error'],
            correct: 2,
            explain: '404 = the requested resource doesn\'t exist.'
          }
        ]
      },
      {
        id: '2.2',
        title: 'MVC architecture',
        concept: `
          <p>Laravel follows <strong>MVC</strong> — Model, View, Controller. It's a way of splitting an app into three roles:</p>
          <ul>
            <li><strong>Model</strong> — represents data and database tables. "User", "Post", "Order". Holds business logic.</li>
            <li><strong>View</strong> — the HTML the user sees. In Laravel these are <code>.blade.php</code> files.</li>
            <li><strong>Controller</strong> — the traffic cop. Receives the request, asks models for data, picks a view, returns the response.</li>
          </ul>
          <p>Typical request flow in Laravel:</p>
          <ol>
            <li>Browser → request hits a <strong>route</strong>.</li>
            <li>Route → calls a <strong>controller</strong> method.</li>
            <li>Controller → queries a <strong>model</strong>.</li>
            <li>Controller → passes data to a <strong>view</strong>.</li>
            <li>View → produces HTML → sent back to the browser.</li>
          </ol>
          <div class="callout tip">If you remember nothing else: <strong>routes call controllers, controllers use models, controllers return views.</strong> That sentence is most of Laravel.</div>
        `,
        example: `// Pseudo-code of the MVC flow:

// 1. Route — routes/web.php
Route::get('/posts/{id}', [PostController::class, 'show']);

// 2. Controller — app/Http/Controllers/PostController.php
class PostController {
    public function show(int $id) {
        $post = Post::find($id);             // 3. Model lookup
        return view('posts.show', ['post' => $post]);  // 4. View rendering
    }
}

// 5. View — resources/views/posts/show.blade.php
<h1>{{ $post->title }}</h1>
<p>{{ $post->body }}</p>`,
        exercise: `<p>For each item, say whether it belongs in a Model, a View, or a Controller:</p>
          <ol>
            <li>HTML for a user profile page</li>
            <li>The method that fetches a user by ID and passes them to a page</li>
            <li>A method <code>fullName()</code> that combines firstName and lastName</li>
          </ol>`,
        solution: `1. View
2. Controller
3. Model (data + behavior on data lives on the model)`,
        quiz: [
          {
            q: 'In MVC, where does HTML live?',
            options: ['Model', 'View', 'Controller', 'Route'],
            correct: 1,
            explain: 'Views are the HTML/presentation layer. In Laravel they\'re .blade.php files.'
          },
          {
            q: 'A controller\'s primary job is to:',
            options: [
              'Define the database structure',
              'Render HTML directly',
              'Coordinate: take a request, get data, return a response',
              'Style the page'
            ],
            correct: 2,
            explain: 'Controllers orchestrate. They don\'t hold business logic (that goes on models) or HTML (that goes in views).'
          }
        ]
      },
      {
        id: '2.3',
        title: 'SQL essentials',
        concept: `
          <p>Laravel apps usually store data in a SQL database (MySQL, PostgreSQL, or SQLite). You'll mostly use Eloquent — Laravel's ORM — to query, but understanding SQL underneath is critical.</p>
          <p>Tables have <strong>columns</strong> (fields) and <strong>rows</strong> (records). Each row has an <code>id</code> primary key. Tables relate to each other via <strong>foreign keys</strong> (e.g., a <code>posts.user_id</code> column referencing <code>users.id</code>).</p>
          <p>Core SQL operations:</p>
          <ul>
            <li><code>SELECT</code> — read rows</li>
            <li><code>INSERT</code> — add a row</li>
            <li><code>UPDATE</code> — modify rows</li>
            <li><code>DELETE</code> — remove rows</li>
            <li><code>JOIN</code> — combine rows from two tables on a related column</li>
          </ul>
        `,
        example: `-- Create a row
INSERT INTO users (name, email) VALUES ('Alex', 'alex@example.com');

-- Read all rows
SELECT * FROM users;

-- Read with a condition
SELECT id, name FROM users WHERE email = 'alex@example.com';

-- Update
UPDATE users SET name = 'Alexander' WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 1;

-- Join: get every post with its author's name
SELECT posts.title, users.name AS author
FROM posts
JOIN users ON posts.user_id = users.id;`,
        exercise: `<p>Write the SQL to: (1) insert a post with <code>title</code> "Hello" and <code>user_id</code> 3; (2) select all posts where <code>user_id</code> is 3.</p>`,
        solution: `INSERT INTO posts (title, user_id) VALUES ('Hello', 3);

SELECT * FROM posts WHERE user_id = 3;`,
        quiz: [
          {
            q: 'What does a foreign key do?',
            options: [
              'Encrypts a column',
              'Links a row in one table to a row in another',
              'Marks a column as required',
              'Adds an index'
            ],
            correct: 1,
            explain: 'A foreign key column references the primary key of another table, creating a relationship between rows.'
          },
          {
            q: 'Which SQL command modifies existing rows?',
            options: ['INSERT', 'SELECT', 'UPDATE', 'ALTER'],
            correct: 2,
            explain: 'UPDATE table SET col=val WHERE ... modifies existing rows. ALTER changes the schema, not the data.'
          }
        ]
      }
    ]
  },
  {
    id: 'm3',
    title: 'Module 3 — Laravel Core',
    lessons: [
      {
        id: '3.1',
        title: 'Installing Laravel and project structure',
        concept: `
          <p>The current release is <strong>Laravel 13</strong> (March 2026). It needs <strong>PHP 8.3+</strong> and Composer. On Windows the easiest path is:</p>
          <ol>
            <li>Install <a href="https://www.php.net/downloads.php" target="_blank">PHP 8.3+</a> (or use <a href="https://laragon.org" target="_blank">Laragon</a>, which bundles everything).</li>
            <li>Install <a href="https://getcomposer.org" target="_blank">Composer</a>.</li>
            <li>Install the official installer once: <code>composer global require laravel/installer</code>, then create apps with <code>laravel new my-app</code>. (The older <code>composer create-project laravel/laravel my-app</code> still works.)</li>
            <li>Inside the project: <code>php artisan serve</code> — starts a dev server at <code>http://127.0.0.1:8000</code>.</li>
          </ol>
          <div class="callout tip"><strong>New in Laravel 13:</strong> routes under <code>api/*</code> now return JSON error responses by default (no <code>Accept: application/json</code> header needed), and the first-party <strong>Laravel AI SDK</strong> is stable. The streamlined <code>bootstrap/app.php</code> config introduced in Laravel 11 is still the standard.</div>
          <p>Key folders in a Laravel project:</p>
          <ul>
            <li><code>app/</code> — your app's PHP code (Models, Controllers, etc.)</li>
            <li><code>routes/</code> — route definitions (<code>web.php</code>, <code>api.php</code>)</li>
            <li><code>resources/views/</code> — Blade templates</li>
            <li><code>database/migrations/</code> — schema files</li>
            <li><code>config/</code> — configuration files</li>
            <li><code>public/</code> — web root (only <code>index.php</code> and assets are exposed)</li>
            <li><code>.env</code> — environment-specific settings (DB credentials, app key)</li>
            <li><code>artisan</code> — the CLI tool. Run things with <code>php artisan ...</code></li>
          </ul>
        `,
        example: `# Create a new Laravel 13 app (official installer)
laravel new my-app
# ...or with Composer directly:
# composer create-project laravel/laravel my-app
cd my-app

# Start the dev server
php artisan serve
# Visit http://127.0.0.1:8000

# Common artisan commands you'll use constantly:
php artisan make:controller PostController
php artisan make:model Post -m         # -m also makes a migration
php artisan migrate                    # run pending migrations
php artisan route:list                 # show every route
php artisan tinker                     # interactive REPL`,
        exercise: `<p>Which artisan command would you run to: (a) create a controller called <code>OrderController</code>, (b) create a model <code>Order</code> with its migration in one go, (c) run migrations?</p>`,
        solution: `a. php artisan make:controller OrderController
b. php artisan make:model Order -m
c. php artisan migrate`,
        quiz: [
          {
            q: 'What is artisan?',
            options: ['A web server', 'Laravel\'s command-line tool', 'The router', 'A package manager'],
            correct: 1,
            explain: 'Artisan is Laravel\'s CLI. You\'ll use it dozens of times a day.'
          },
          {
            q: 'Where do you define routes?',
            options: ['config/routes.php', 'app/routes/', 'routes/web.php', 'public/index.php'],
            correct: 2,
            explain: 'routes/web.php for browser routes, routes/api.php for API routes.'
          }
        ]
      },
      {
        id: '3.2',
        title: 'Routing basics',
        concept: `
          <p>A <strong>route</strong> maps a URL + method to code. The simplest form returns text or a view directly:</p>
          <p>Routes live in <code>routes/web.php</code>. The <code>Route</code> facade has methods matching HTTP verbs: <code>Route::get()</code>, <code>Route::post()</code>, <code>Route::put()</code>, <code>Route::delete()</code>.</p>
          <p><strong>Route parameters</strong> — capture parts of the URL with <code>{name}</code>:</p>
          <pre><code>Route::get('/users/{id}', function ($id) {
    return "User ID is $id";
});</code></pre>
          <p><strong>Named routes</strong> — give a route a name so you can refer to it in code without hard-coding URLs:</p>
          <pre><code>Route::get('/dashboard', ...)->name('dashboard');
// elsewhere: route('dashboard')</code></pre>
        `,
        example: `<?php
// routes/web.php
use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return 'Welcome!';
});

Route::get('/hello/{name}', function ($name) {
    return "Hello, $name!";
});

// Returning a view:
Route::get('/about', function () {
    return view('about');  // resources/views/about.blade.php
});

// Pointing a route at a controller method:
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');`,
        exercise: `<p>Write a route at <code>/greet/{name}</code> that returns <code>"Hi, [name]"</code> (so visiting <code>/greet/Alex</code> returns "Hi, Alex").</p>`,
        solution: `Route::get('/greet/{name}', function ($name) {
    return "Hi, $name";
});`,
        quiz: [
          {
            q: 'How do you capture a URL parameter in a Laravel route?',
            options: ['/:name', '/{name}', '/[name]', '/<name>'],
            correct: 1,
            explain: 'Curly braces: /users/{id}. Then the controller/closure receives $id as a parameter.'
          },
          {
            q: 'Where do you typically register web routes?',
            options: ['config/web.php', 'routes/web.php', 'app/Http/routes.php', 'public/routes.php'],
            correct: 1,
            explain: 'routes/web.php is the default home for browser-facing routes. routes/api.php for API routes.'
          }
        ]
      },
      {
        id: '3.3',
        title: 'Controllers',
        concept: `
          <p>Putting all your logic in route closures gets ugly fast. <strong>Controllers</strong> are classes that group related route handlers.</p>
          <p>Create one with <code>php artisan make:controller PostController</code>. By convention, each method handles one route.</p>
          <p>Laravel has a <strong>resource controller</strong> convention with 7 standard methods. <code>php artisan make:controller PostController --resource</code> generates them all:</p>
          <ul>
            <li><code>index()</code> — list all</li>
            <li><code>create()</code> — show "new" form</li>
            <li><code>store()</code> — handle form submit (create)</li>
            <li><code>show($id)</code> — show one</li>
            <li><code>edit($id)</code> — show edit form</li>
            <li><code>update($id)</code> — handle update form</li>
            <li><code>destroy($id)</code> — delete</li>
          </ul>
          <p>And <code>Route::resource('posts', PostController::class);</code> wires all 7 routes at once.</p>
        `,
        example: `<?php
// app/Http/Controllers/PostController.php
namespace App\\Http\\Controllers;

use App\\Models\\Post;
use Illuminate\\Http\\Request;

class PostController extends Controller
{
    public function index() {
        $posts = Post::all();
        return view('posts.index', ['posts' => $posts]);
    }

    public function show($id) {
        $post = Post::findOrFail($id);
        return view('posts.show', ['post' => $post]);
    }

    public function store(Request $request) {
        $post = Post::create($request->validate([
            'title' => 'required|max:255',
            'body'  => 'required',
        ]));
        return redirect()->route('posts.show', $post);
    }
}

// routes/web.php
Route::resource('posts', PostController::class);`,
        exercise: `<p>Sketch the body of a <code>show($id)</code> method on a <code>UserController</code> that finds a user (use <code>User::findOrFail</code>) and returns a view <code>users.show</code> passing the user as <code>'user'</code>.</p>`,
        solution: `public function show($id) {
    $user = User::findOrFail($id);
    return view('users.show', ['user' => $user]);
}`,
        quiz: [
          {
            q: 'Which artisan command creates a resource controller with all 7 methods?',
            options: [
              'php artisan make:resource PostController',
              'php artisan make:controller PostController --resource',
              'php artisan controller:make PostController --all',
              'php artisan resource PostController'
            ],
            correct: 1,
            explain: '--resource flag scaffolds index/create/store/show/edit/update/destroy.'
          },
          {
            q: 'In a resource controller, which method handles the form submission to create a new record?',
            options: ['create()', 'store()', 'new()', 'index()'],
            correct: 1,
            explain: 'create() shows the form; store() handles the POST that actually creates the record.'
          }
        ]
      },
      {
        id: '3.4',
        title: 'Blade templating',
        concept: `
          <p><strong>Blade</strong> is Laravel's templating engine. Views live in <code>resources/views/</code> and end in <code>.blade.php</code>.</p>
          <p>Core Blade syntax:</p>
          <ul>
            <li><code>{{ $var }}</code> — print a value (auto-escaped against XSS).</li>
            <li><code>{!! $var !!}</code> — print raw HTML (only for trusted content).</li>
            <li><code>@if / @elseif / @else / @endif</code> — conditionals.</li>
            <li><code>@foreach / @endforeach</code> — loops.</li>
            <li><code>@include('partial')</code> — include another view.</li>
          </ul>
          <p><strong>Layouts</strong> — define a parent template with <code>@yield('content')</code>, and child views <code>@extends('layouts.app')</code> + <code>@section('content') ... @endsection</code>.</p>
        `,
        example: `{{-- resources/views/posts/index.blade.php --}}
@extends('layouts.app')

@section('title', 'All Posts')

@section('content')
    <h1>Posts</h1>

    @if (count($posts) === 0)
        <p>No posts yet.</p>
    @else
        <ul>
            @foreach ($posts as $post)
                <li>
                    <a href="{{ route('posts.show', $post) }}">
                        {{ $post->title }}
                    </a>
                    — by {{ $post->author_name }}
                </li>
            @endforeach
        </ul>
    @endif
@endsection

{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html>
<head>
    <title>@yield('title') | My App</title>
</head>
<body>
    <main>@yield('content')</main>
</body>
</html>`,
        exercise: `<p>Write a Blade snippet that prints "Welcome, NAME!" if <code>$user</code> is set, otherwise prints "Welcome, guest!"</p>`,
        solution: `@if ($user)
    Welcome, {{ $user->name }}!
@else
    Welcome, guest!
@endif`,
        quiz: [
          {
            q: 'What is the difference between {{ $value }} and {!! $value !!}?',
            options: [
              'No difference',
              '{{ }} escapes HTML, {!! !!} prints raw',
              '{{ }} is faster',
              '{!! !!} is for variables, {{ }} for strings'
            ],
            correct: 1,
            explain: '{{ }} escapes HTML to prevent XSS. {!! !!} prints unescaped — use it only when you trust the content.'
          },
          {
            q: 'Which directive starts a loop over a collection?',
            options: ['@for', '@loop', '@foreach', '@each'],
            correct: 2,
            explain: '@foreach ($items as $item) ... @endforeach — same as PHP\'s foreach.'
          }
        ]
      },
      {
        id: '3.5',
        title: 'Migrations and schema',
        concept: `
          <p><strong>Migrations</strong> are PHP files that describe database schema changes. They let you version your schema like code, and apply or roll back changes with one command.</p>
          <p>Create one with: <code>php artisan make:migration create_posts_table</code></p>
          <p>Each migration has <code>up()</code> (apply the change) and <code>down()</code> (undo it).</p>
          <p>Common column types:</p>
          <ul>
            <li><code>$table->id()</code> — auto-incrementing primary key</li>
            <li><code>$table->string('title')</code> — VARCHAR(255)</li>
            <li><code>$table->text('body')</code> — long text</li>
            <li><code>$table->integer('count')</code></li>
            <li><code>$table->boolean('is_published')</code></li>
            <li><code>$table->foreignId('user_id')->constrained()</code> — foreign key to users.id</li>
            <li><code>$table->timestamps()</code> — created_at + updated_at</li>
          </ul>
          <p>Run: <code>php artisan migrate</code> (apply) or <code>php artisan migrate:rollback</code> (undo last batch).</p>
        `,
        example: `<?php
// database/migrations/2024_01_01_000001_create_posts_table.php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('body');
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('posts');
    }
};`,
        exercise: `<p>Write the <code>up()</code> body for a migration that creates a <code>comments</code> table with: an id, a foreign key <code>post_id</code> linked to posts, a <code>body</code> text column, and timestamps.</p>`,
        solution: `public function up(): void {
    Schema::create('comments', function (Blueprint $table) {
        $table->id();
        $table->foreignId('post_id')->constrained()->onDelete('cascade');
        $table->text('body');
        $table->timestamps();
    });
}`,
        quiz: [
          {
            q: 'Which command applies all pending migrations?',
            options: [
              'php artisan migrate',
              'php artisan migrate:run',
              'php artisan db:migrate',
              'php artisan schema:apply'
            ],
            correct: 0,
            explain: 'php artisan migrate. To undo, use migrate:rollback. To wipe + reapply, migrate:fresh.'
          },
          {
            q: 'What does $table->timestamps() do?',
            options: [
              'Adds a created_at column only',
              'Adds created_at AND updated_at columns',
              'Adds a deleted_at column',
              'Adds a timezone column'
            ],
            correct: 1,
            explain: 'It adds the standard pair Laravel models expect. Eloquent maintains them automatically.'
          }
        ]
      },
      {
        id: '3.6',
        title: 'Eloquent models — basics',
        concept: `
          <p><strong>Eloquent</strong> is Laravel's ORM (Object-Relational Mapper). Each table maps to a model class, and each row maps to an object of that class.</p>
          <p>By convention: a <code>Post</code> model maps to a <code>posts</code> table (plural, snake_case). Create with: <code>php artisan make:model Post</code>.</p>
          <p>Models extend <code>Model</code> and need almost no boilerplate. Eloquent handles read/write for you.</p>
          <p><strong>Common queries:</strong></p>
          <ul>
            <li><code>Post::all()</code> — every row</li>
            <li><code>Post::find($id)</code> — by primary key (returns null if missing)</li>
            <li><code>Post::findOrFail($id)</code> — by primary key (throws 404 if missing)</li>
            <li><code>Post::where('user_id', 5)->get()</code> — filtered</li>
            <li><code>Post::where(...)->first()</code> — just one row</li>
            <li><code>Post::create(['title' =&gt; 'X', 'body' =&gt; 'Y'])</code> — insert</li>
          </ul>
          <p><strong>Mass assignment protection:</strong> to use <code>Post::create([...])</code> you must list which fields are fillable on the model: <code>protected $fillable = ['title', 'body'];</code></p>
        `,
        example: `<?php
// app/Models/Post.php
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Post extends Model
{
    protected $fillable = ['title', 'body', 'user_id'];
}

// Using it:
$posts = Post::all();                       // SELECT * FROM posts
$post  = Post::find(1);                     // SELECT * WHERE id=1
$post  = Post::findOrFail(1);               // same, throws 404 if missing
$mine  = Post::where('user_id', 5)->get();  // WHERE user_id=5

$new = Post::create([
    'title'   => 'Hello',
    'body'    => 'World',
    'user_id' => 1,
]);

// Update:
$post->title = 'New title';
$post->save();

// Or:
$post->update(['title' => 'New title']);

// Delete:
$post->delete();`,
        exercise: `<p>Write the Eloquent query to fetch every Post where <code>is_published</code> is true, ordered by <code>created_at</code> descending.</p>`,
        solution: `$posts = Post::where('is_published', true)
    ->orderBy('created_at', 'desc')
    ->get();`,
        quiz: [
          {
            q: 'What table does a model called Order map to by default?',
            options: ['Order', 'order', 'orders', 'Orders'],
            correct: 2,
            explain: 'Eloquent assumes plural snake_case: Order → orders. OrderItem → order_items.'
          },
          {
            q: 'What\'s the difference between find() and findOrFail()?',
            options: [
              'No difference',
              'find returns null if missing; findOrFail throws a 404',
              'findOrFail is faster',
              'find returns all rows'
            ],
            correct: 1,
            explain: 'findOrFail is great in controllers — it auto-converts to a 404 response. find returns null, which you\'d have to check yourself.'
          }
        ]
      },
      {
        id: '3.7',
        title: 'Eloquent relationships',
        concept: `
          <p>Real apps have related data. Eloquent makes joins feel like properties.</p>
          <p><strong>One-to-many</strong> — a User has many Posts; a Post belongs to one User.</p>
          <p><strong>Many-to-many</strong> — a Post has many Tags; a Tag has many Posts (via a pivot table).</p>
          <p>You declare relationships as <em>methods</em> on the model. You access them as <em>properties</em>.</p>
          <ul>
            <li><code>$user-&gt;posts</code> — fetches all posts for this user (queries the DB).</li>
            <li><code>$user-&gt;posts()</code> — gives you a query builder you can chain on.</li>
          </ul>
          <p><strong>N+1 problem:</strong> looping over users and accessing <code>$user-&gt;posts</code> inside the loop runs one extra query per user. Use <strong>eager loading</strong>: <code>User::with('posts')-&gt;get()</code> — one query for users, one for all posts.</p>
        `,
        example: `<?php
// app/Models/User.php
class User extends Model {
    public function posts() {
        return $this->hasMany(Post::class);
    }
}

// app/Models/Post.php
class Post extends Model {
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }
}

// Using:
$user = User::find(1);
foreach ($user->posts as $post) {       // hasMany — collection
    echo $post->title;
    echo $post->user->name;             // belongsTo — single object
    foreach ($post->tags as $tag) {     // many-to-many
        echo $tag->name;
    }
}

// Eager loading to avoid N+1:
$users = User::with('posts')->get();`,
        exercise: `<p>You have a <code>Comment</code> that belongs to a <code>Post</code>, and a <code>Post</code> that has many <code>Comment</code>s. Write the two relationship methods.</p>`,
        solution: `// app/Models/Comment.php
public function post() {
    return $this->belongsTo(Post::class);
}

// app/Models/Post.php
public function comments() {
    return $this->hasMany(Comment::class);
}`,
        quiz: [
          {
            q: 'Which relationship method is used on the "many" side of a one-to-many?',
            options: ['hasMany', 'hasOne', 'belongsTo', 'manyToOne'],
            correct: 2,
            explain: 'belongsTo on the child (the "many" side). hasMany on the parent (the "one" side).'
          },
          {
            q: 'Which line eager-loads related data to avoid the N+1 problem?',
            options: [
              'User::all()',
              'User::with(\'posts\')->get()',
              'User::find(1)->posts',
              'User::eager()->all()'
            ],
            correct: 1,
            explain: 'with() tells Eloquent to fetch the relationship in a separate single query, instead of one query per parent.'
          }
        ]
      },
      {
        id: '3.8',
        title: 'Forms and validation',
        concept: `
          <p>Web apps live and die by forms. Laravel makes validation cleaner than almost any framework.</p>
          <p><strong>CSRF protection</strong> — every non-GET form needs a <code>@csrf</code> directive inside it. Otherwise Laravel rejects the request (security feature).</p>
          <p>Validate in the controller with <code>$request-&gt;validate([...])</code>. If validation fails, Laravel redirects back automatically with errors in the session and old input pre-filled.</p>
          <p>In the Blade form: <code>{{ old('field') }}</code> repopulates the user's prior input, and <code>@error('field') ... @enderror</code> displays the message for that field.</p>
        `,
        example: `<?php
// Controller — app/Http/Controllers/PostController.php
public function store(Request $request) {
    $validated = $request->validate([
        'title' => 'required|min:3|max:255',
        'body'  => 'required',
        'user_id' => 'required|exists:users,id',
    ]);

    $post = Post::create($validated);
    return redirect()->route('posts.show', $post);
}

{{-- View — resources/views/posts/create.blade.php --}}
<form method="POST" action="{{ route('posts.store') }}">
    @csrf

    <label>Title</label>
    <input name="title" value="{{ old('title') }}">
    @error('title')
        <p class="error">{{ $message }}</p>
    @enderror

    <label>Body</label>
    <textarea name="body">{{ old('body') }}</textarea>
    @error('body')
        <p class="error">{{ $message }}</p>
    @enderror

    <button type="submit">Save</button>
</form>`,
        exercise: `<p>Write a <code>validate()</code> call ensuring <code>email</code> is required and a valid email, <code>password</code> is required and at least 8 characters, and <code>age</code> (optional) is an integer between 13 and 120.</p>`,
        solution: `$request->validate([
    'email'    => 'required|email',
    'password' => 'required|min:8',
    'age'      => 'nullable|integer|min:13|max:120',
]);`,
        quiz: [
          {
            q: 'What does the @csrf directive do?',
            options: [
              'Validates form fields',
              'Adds a hidden token to prevent cross-site request forgery',
              'Encrypts the form',
              'Adds rate limiting'
            ],
            correct: 1,
            explain: 'CSRF = Cross-Site Request Forgery. The hidden token proves the request came from your site. Required on all non-GET forms.'
          },
          {
            q: 'What does old(\'title\') do?',
            options: [
              'Loads the old version of the post',
              'Fills in the field with the user\'s previous input after validation failure',
              'Marks the field as deprecated',
              'Nothing'
            ],
            correct: 1,
            explain: 'After validation fails and Laravel redirects back, old(\'field\') retrieves what the user typed so they don\'t have to re-fill.'
          }
        ]
      },
      {
        id: '3.9',
        title: 'Authentication with Breeze',
        concept: `
          <p>Laravel can scaffold authentication for you. <strong>Laravel Breeze</strong> is the minimal starter — login, register, password reset, email verification.</p>
          <p>Install:</p>
          <ol>
            <li><code>composer require laravel/breeze --dev</code></li>
            <li><code>php artisan breeze:install</code></li>
            <li><code>php artisan migrate</code></li>
          </ol>
          <p>After install you have routes for <code>/login</code>, <code>/register</code>, <code>/logout</code>, <code>/dashboard</code>, and the views to match.</p>
          <p><strong>Protecting routes:</strong> apply the <code>auth</code> middleware to require login:</p>
          <pre><code>Route::get('/dashboard', ...)->middleware('auth');

// Or a group:
Route::middleware('auth')->group(function () {
    Route::get('/profile', ...);
    Route::get('/settings', ...);
});</code></pre>
          <p><strong>Getting the current user:</strong></p>
          <pre><code>auth()->user();   // anywhere
$request->user(); // in controllers
@auth ... @endauth   // in Blade</code></pre>
        `,
        example: `<?php
// routes/web.php
use App\\Http\\Controllers\\PostController;

Route::middleware('auth')->group(function () {
    Route::resource('posts', PostController::class);
    Route::get('/dashboard', fn () => view('dashboard'))->name('dashboard');
});

// Controller using the authed user
class PostController extends Controller {
    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'body'  => 'required',
        ]);
        $validated['user_id'] = $request->user()->id;
        Post::create($validated);
        return redirect()->route('posts.index');
    }
}

{{-- In a Blade view --}}
@auth
    <p>Hi, {{ auth()->user()->name }}!</p>
@else
    <a href="{{ route('login') }}">Sign in</a>
@endauth`,
        exercise: `<p>Write a route group that applies the <code>auth</code> middleware to routes <code>/account</code> and <code>/account/edit</code>.</p>`,
        solution: `Route::middleware('auth')->group(function () {
    Route::get('/account', [AccountController::class, 'show']);
    Route::get('/account/edit', [AccountController::class, 'edit']);
});`,
        quiz: [
          {
            q: 'Which middleware do you apply to require a logged-in user?',
            options: ['login', 'auth', 'guest', 'protected'],
            correct: 1,
            explain: 'The auth middleware. There\'s also guest (the opposite — only-if-not-logged-in, used on /login itself).'
          },
          {
            q: 'How do you get the current logged-in user from a controller?',
            options: [
              '$user = User::current();',
              '$user = $request->user(); or auth()->user();',
              '$user = session(\'user\');',
              '$user = $this->user;'
            ],
            correct: 1,
            explain: 'Both forms work and are common. auth()->user() works anywhere; $request->user() is preferred when you already have the request.'
          }
        ]
      },
      {
        id: '3.10',
        title: 'Middleware, sessions, and flash messages',
        concept: `
          <p><strong>Middleware</strong> is code that runs before (or after) a request hits a controller. Auth, throttling, logging — all middleware.</p>
          <p>Create one: <code>php artisan make:middleware EnsureUserIsAdmin</code>. The handle() method either returns <code>$next($request)</code> (continue) or returns its own response (redirect, abort, etc).</p>
          <p>Register it in <code>bootstrap/app.php</code> (Laravel 11 through 13) or <code>app/Http/Kernel.php</code> (Laravel 10 and older). Then apply via <code>-&gt;middleware('admin')</code> on routes.</p>
          <p><strong>Sessions</strong> persist data across requests for one user:</p>
          <pre><code>session()-&gt;put('cart_count', 3);
$count = session('cart_count');
session()-&gt;forget('cart_count');</code></pre>
          <p><strong>Flash messages</strong> = session data that lives for exactly one request. Perfect for "Saved!" notifications after a redirect:</p>
          <pre><code>return redirect()-&gt;route('posts.index')-&gt;with('status', 'Post created!');

{{-- In the next view: --}}
@if (session('status'))
    &lt;div class="alert"&gt;{{ session('status') }}&lt;/div&gt;
@endif</code></pre>
        `,
        example: `<?php
// app/Http/Middleware/EnsureUserIsAdmin.php
namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;

class EnsureUserIsAdmin {
    public function handle(Request $request, Closure $next) {
        if (!$request->user() || !$request->user()->is_admin) {
            abort(403, 'Admins only');
        }
        return $next($request);
    }
}

// bootstrap/app.php (Laravel 11 through 13)
->withMiddleware(function (Middleware $middleware) {
    $middleware->alias([
        'admin' => \\App\\Http\\Middleware\\EnsureUserIsAdmin::class,
    ]);
})

// routes/web.php
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', fn () => view('admin.dashboard'));
});

// Flash after action
public function store(Request $request) {
    Post::create($request->validate([...]));
    return redirect()
        ->route('posts.index')
        ->with('status', 'Post created!');
}`,
        exercise: `<p>Write a middleware <code>EnsureSubscribed</code> that aborts with 403 if <code>$request-&gt;user()-&gt;is_subscribed</code> is false. Just the class body.</p>`,
        solution: `class EnsureSubscribed {
    public function handle(Request $request, Closure $next) {
        if (!$request->user() || !$request->user()->is_subscribed) {
            abort(403, 'Subscription required');
        }
        return $next($request);
    }
}`,
        quiz: [
          {
            q: 'What\'s special about flash session data?',
            options: [
              'It\'s encrypted',
              'It only exists for the very next request, then disappears',
              'It survives logout',
              'It\'s stored in cookies'
            ],
            correct: 1,
            explain: 'Flash data is "available next request only" — ideal for status/error messages after a redirect.'
          },
          {
            q: 'A middleware\'s handle() method must do what to allow the request to continue?',
            options: [
              'Return true',
              'Return $next($request)',
              'Call $request->continue()',
              'Return null'
            ],
            correct: 1,
            explain: '$next($request) hands the request to the next middleware (and eventually the controller). Returning anything else short-circuits the pipeline.'
          }
        ]
      }
    ]
  },
  {
    id: 'm4',
    title: 'Module 4 — Debug Challenges',
    lessons: [
      {
        id: '4.1',
        title: 'Debug: broken route',
        concept: `
          <p>You're given the broken code below. Visiting <code>/hello/Alex</code> should print "Hello, Alex" but currently throws an error. Find <strong>all</strong> issues.</p>
          <p>Read the code carefully. The mistakes are subtle but common.</p>
        `,
        example: `<?php
// routes/web.php

Route::get('/hello/{name}', function () {
    return "Hello, " . $name;
});`,
        exercise: `<p>Identify the bug(s) and write the corrected route.</p>`,
        solution: `<?php
// The closure must accept the {name} parameter.
// The route pattern declares {name}, but the closure had no $name parameter,
// so $name is undefined inside the function.

Route::get('/hello/{name}', function ($name) {
    return "Hello, " . $name;
});`,
        quiz: [
          {
            q: 'When a route has a {param} placeholder, what must the handler do?',
            options: [
              'Nothing — Laravel populates a global',
              'Accept a matching parameter',
              'Call request()->route(\'param\')',
              'Use session()->get(\'param\')'
            ],
            correct: 1,
            explain: 'The closure or controller method must declare a parameter to receive it. Laravel matches by position/name.'
          }
        ]
      },
      {
        id: '4.2',
        title: 'Debug: broken Eloquent query',
        concept: `
          <p>A user reports the "my posts" page is showing every post in the system, not just theirs. Here's the controller. Find the bug(s) and fix.</p>
        `,
        example: `<?php
class PostController extends Controller {
    public function mine(Request $request) {
        $posts = Post::where('user_id', $request->user()->id);
        return view('posts.mine', ['posts' => $posts]);
    }
}`,
        exercise: `<p>What's wrong, and what's the fix?</p>`,
        solution: `<?php
// Bug: where() returns a query builder, not the results.
// Without ->get() (or ->paginate(), ->first()...), nothing was actually fetched.
// In the Blade view it would either error or behave unexpectedly.

public function mine(Request $request) {
    $posts = Post::where('user_id', $request->user()->id)->get();
    return view('posts.mine', ['posts' => $posts]);
}`,
        quiz: [
          {
            q: 'Post::where(\'user_id\', 5) returns:',
            options: [
              'A collection of matching posts',
              'A single post',
              'A query builder — you still need to call ->get() (or similar)',
              'A boolean'
            ],
            correct: 2,
            explain: 'where() builds the query. You execute it with ->get(), ->first(), ->paginate(), ->count(), etc.'
          }
        ]
      },
      {
        id: '4.3',
        title: 'Debug: broken validation',
        concept: `
          <p>This controller validates and creates a post. Submitting the form throws "MassAssignmentException". Find the cause.</p>
        `,
        example: `<?php
// Controller
public function store(Request $request) {
    $validated = $request->validate([
        'title' => 'required|max:255',
        'body'  => 'required',
    ]);
    $validated['user_id'] = $request->user()->id;
    Post::create($validated);
    return redirect()->route('posts.index');
}

// Model
class Post extends Model {
    // ...
}`,
        exercise: `<p>What's missing and how do you fix it?</p>`,
        solution: `<?php
// The Post model doesn't declare $fillable, so Eloquent refuses
// mass-assignment via Post::create([...]) for security.

class Post extends Model {
    protected $fillable = ['title', 'body', 'user_id'];
}

// (Alternative: use ->forceCreate or use $post->title = ...; $post->save();
//  but $fillable is the right answer.)`,
        quiz: [
          {
            q: 'Why does Laravel require $fillable (or $guarded)?',
            options: [
              'Speed',
              'To prevent a request from setting columns it shouldn\'t — like is_admin',
              'To make queries shorter',
              'Required for migrations to run'
            ],
            correct: 1,
            explain: 'It protects against mass-assignment attacks: if you blindly create from $request->all(), a user could submit is_admin=1.'
          }
        ]
      },
      {
        id: '4.4',
        title: 'Debug: broken Blade',
        concept: `
          <p>This Blade view should show a list of post titles. The page renders blank and the log shows "Trying to access array offset on value of type null". Find the bug.</p>
        `,
        example: `{{-- resources/views/posts/index.blade.php --}}
@extends('layouts.app')

@section('content')
    <h1>Posts</h1>
    <ul>
        @foreach ($post as $posts)
            <li>{{ $posts->title }}</li>
        @endforeach
    </ul>
@endsection`,
        exercise: `<p>What's wrong and how do you fix it?</p>`,
        solution: `<?php
// The variable passed in from the controller is $posts (plural — the collection),
// but the @foreach treats $post (singular) as the collection and $posts as each item.
// That's backwards.

// Fix:
@foreach ($posts as $post)
    <li>{{ $post->title }}</li>
@endforeach

// Read @foreach as: "for each item IN the collection AS a single thing".
// Collection on the left, loop variable on the right.`,
        quiz: [
          {
            q: 'In @foreach ($items as $item), which is the collection and which is each element?',
            options: [
              '$items is each element, $item is the collection',
              '$items is the collection, $item is each element',
              'Both refer to the same thing',
              'Depends on the data type'
            ],
            correct: 1,
            explain: 'Always: collection AS loop_variable. The thing being iterated is on the left.'
          }
        ]
      }
    ]
  }
];

// Flatten lessons in order so we can navigate prev/next easily.
const ALL_LESSONS = MODULES.flatMap(m => m.lessons.map(l => ({ ...l, moduleTitle: m.title })));

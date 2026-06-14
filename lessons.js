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
      }
    ]
  },
  {
    id: 'm5',
    title: 'Module 5 — Build It',
    lessons: [
      {
        id: '5.1',
        title: 'Set up the project and database',
        concept: `
          <p>Time to build something real. Over this module you'll create a working blog: logged-in users write posts, anyone can read them, and posts have comments. <strong>Open a terminal and build alongside each lesson</strong> — reading isn't enough here.</p>
          <div class="callout warn"><strong>Prerequisites.</strong> You need <code>PHP 8.3+</code>, <a href="https://getcomposer.org" target="_blank">Composer</a>, and <a href="https://nodejs.org" target="_blank">Node.js</a> (used to compile front-end assets in the next lesson). On Windows, <a href="https://laragon.org" target="_blank">Laragon</a> bundles PHP + Composer for you.</div>
          <p>Create the app and start it:</p>
          <ol>
            <li><code>laravel new blog</code> (or <code>composer create-project laravel/laravel blog</code>)</li>
            <li><code>cd blog</code></li>
            <li><code>php artisan serve</code> — visit <code>http://127.0.0.1:8000</code></li>
          </ol>
          <p>New Laravel apps use <strong>SQLite</strong> by default — a single file at <code>database/database.sqlite</code>, zero setup. Confirm your <code>.env</code> has <code>DB_CONNECTION=sqlite</code>, then run the starter migrations to create the tables (including <code>users</code>).</p>
        `,
        example: `# Create and run the app
laravel new blog
cd blog

# .env (SQLite is the default in Laravel 11+)
DB_CONNECTION=sqlite

# Create the database file + run the built-in migrations
php artisan migrate

# Start the dev server
php artisan serve
# Visit http://127.0.0.1:8000`,
        exercise: `<p>Write the commands to (a) create a new Laravel app called <code>blog</code>, (b) move into it, and (c) run the initial migrations.</p>`,
        solution: `laravel new blog
cd blog
php artisan migrate`,
      },
      {
        id: '5.2',
        title: 'Add authentication (Breeze)',
        concept: `
          <p>Rather than hand-rolling login, scaffold it with <strong>Laravel Breeze</strong> (you met it in 3.9). It generates register/login/logout/password-reset routes, controllers, and Blade views.</p>
          <ol>
            <li><code>composer require laravel/breeze --dev</code> — add Breeze as a dev dependency.</li>
            <li><code>php artisan breeze:install blade</code> — publish the Blade auth stack.</li>
            <li><code>npm install &amp;&amp; npm run build</code> — compile the Tailwind/Vite assets Breeze ships.</li>
            <li><code>php artisan migrate</code> — apply any new migrations.</li>
          </ol>
          <p>Now <code>/register</code> and <code>/login</code> work, and you have a <code>/dashboard</code> behind the <code>auth</code> middleware. Register yourself an account — you'll author posts as that user next.</p>
          <div class="callout tip">Breeze is front-end assets + Blade. That's why Node is required: <code>npm run build</code> compiles the CSS/JS into <code>public/build</code>.</div>
        `,
        example: `# 1. Require Breeze (dev only)
composer require laravel/breeze --dev

# 2. Scaffold the Blade auth stack
php artisan breeze:install blade

# 3. Compile the published front-end assets
npm install
npm run build

# 4. Run migrations
php artisan migrate

# Now register at http://127.0.0.1:8000/register`,
        exercise: `<p>Write the four commands to add Breeze auth: require the package (dev), install the Blade stack, build the front-end assets, and run migrations.</p>`,
        solution: `composer require laravel/breeze --dev
php artisan breeze:install blade
npm install && npm run build
php artisan migrate`,
      },
      {
        id: '5.3',
        title: 'Posts: migration, model and relationships',
        concept: `
          <p>A post belongs to the user who wrote it. Generate the model and its migration together with <code>-m</code>, define the schema, then wire the relationships.</p>
          <ul>
            <li><code>php artisan make:model Post -m</code></li>
            <li>In the migration's <code>up()</code>, add a <code>user_id</code> foreign key, a <code>title</code>, a <code>body</code>, and timestamps.</li>
            <li>On <code>Post</code>, set <code>$fillable</code> (so <code>Post::create([...])</code> works) and a <code>user()</code> <code>belongsTo</code> relationship.</li>
            <li>On <code>User</code>, add a <code>posts()</code> <code>hasMany</code> relationship.</li>
          </ul>
          <p>Then <code>php artisan migrate</code> to create the <code>posts</code> table.</p>
        `,
        example: `php artisan make:model Post -m

// database/migrations/...create_posts_table.php — up()
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('title');
    $table->text('body');
    $table->timestamps();
});

// app/Models/Post.php
class Post extends Model {
    protected $fillable = ['title', 'body', 'user_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }
}

// app/Models/User.php — add this method
public function posts() {
    return $this->hasMany(Post::class);
}`,
        exercise: `<p>Write the posts migration <code>up()</code> body: an id, a <code>user_id</code> foreign key to users (cascade on delete), a <code>title</code> string, a <code>body</code> text column, and timestamps. Then add <code>$fillable</code> to the Post model.</p>`,
        solution: `Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('title');
    $table->text('body');
    $table->timestamps();
});

// app/Models/Post.php
protected $fillable = ['title', 'body', 'user_id'];`,
      },
      {
        id: '5.4',
        title: 'PostController and routes',
        concept: `
          <p>Generate a resource controller and wire the routes. Reading is public; creating requires login.</p>
          <ul>
            <li><code>php artisan make:controller PostController --resource</code></li>
            <li>Public: <code>index</code> (list) and <code>show</code> (one post).</li>
            <li>Behind <code>auth</code> middleware: <code>create</code> (form) and <code>store</code> (save).</li>
          </ul>
          <div class="callout warn"><strong>Route order matters.</strong> Define <code>/posts/create</code> <em>before</em> <code>/posts/{post}</code> — otherwise <code>{post}</code> captures the literal word "create" as an id. Routes match top to bottom.</div>
          <p><code>show(Post $post)</code> uses <strong>route-model binding</strong>: type-hint the model and Laravel fetches it from the <code>{post}</code> id automatically (404 if missing).</p>
        `,
        example: `php artisan make:controller PostController --resource

// routes/web.php
use App\\Http\\Controllers\\PostController;

Route::get('/posts', [PostController::class, 'index'])->name('posts.index');

Route::middleware('auth')->group(function () {
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
});

Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');

// app/Http/Controllers/PostController.php
public function index() {
    $posts = Post::latest()->get();
    return view('posts.index', ['posts' => $posts]);
}

public function show(Post $post) {
    return view('posts.show', ['post' => $post]);
}`,
        exercise: `<p>Write the <code>index()</code> method: fetch all posts newest-first and pass them to a <code>posts.index</code> view as <code>'posts'</code>.</p>`,
        solution: `public function index() {
    $posts = Post::latest()->get();
    return view('posts.index', ['posts' => $posts]);
}`,
      },
      {
        id: '5.5',
        title: 'Blade views and layout',
        concept: `
          <p>Build the views. A shared <strong>layout</strong> holds the page shell; each page <code>@extends</code> it and fills a <code>@section</code>.</p>
          <ul>
            <li><code>layouts/app.blade.php</code> — the shell with <code>@yield('content')</code>.</li>
            <li><code>posts/index.blade.php</code> — loop <code>$posts</code>, link each to its show page.</li>
            <li><code>posts/show.blade.php</code> — print one post.</li>
          </ul>
          <p>Use <code>{{ }}</code> (auto-escaped) for output and the <code>route()</code> helper for links so URLs aren't hard-coded.</p>
        `,
        example: `{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html>
<head><title>@yield('title', 'My Blog')</title></head>
<body>
    <main>@yield('content')</main>
</body>
</html>

{{-- resources/views/posts/index.blade.php --}}
@extends('layouts.app')
@section('content')
    <h1>Posts</h1>
    @foreach ($posts as $post)
        <article>
            <h2><a href="{{ route('posts.show', $post) }}">{{ $post->title }}</a></h2>
            <p>by {{ $post->user->name }}</p>
        </article>
    @endforeach
@endsection

{{-- resources/views/posts/show.blade.php --}}
@extends('layouts.app')
@section('content')
    <h1>{{ $post->title }}</h1>
    <p>{{ $post->body }}</p>
@endsection`,
        exercise: `<p>Write a Blade snippet for <code>posts/index</code> that loops over <code>$posts</code> and, for each, links to its show page with the <code>route()</code> helper and prints the title.</p>`,
        solution: `@foreach ($posts as $post)
    <a href="{{ route('posts.show', $post) }}">{{ $post->title }}</a>
@endforeach`,
      },
      {
        id: '5.6',
        title: 'Create posts with validation',
        concept: `
          <p>Wire the create form and the <code>store</code> handler. Validate input, attach the logged-in user, save, then redirect.</p>
          <ul>
            <li>Every non-GET form needs <code>@csrf</code>.</li>
            <li><code>$request-&gt;validate([...])</code> redirects back with errors if it fails.</li>
            <li><code>{{ old('field') }}</code> refills input; <code>@error('field')</code> shows the message.</li>
            <li>Set <code>user_id</code> from <code>$request-&gt;user()-&gt;id</code> — never trust the client for the author.</li>
          </ul>
        `,
        example: `// PostController
public function create() {
    return view('posts.create');
}

public function store(Request $request) {
    $validated = $request->validate([
        'title' => 'required|max:255',
        'body'  => 'required',
    ]);
    $validated['user_id'] = $request->user()->id;
    Post::create($validated);
    return redirect()->route('posts.index')->with('status', 'Post created!');
}

{{-- resources/views/posts/create.blade.php --}}
<form method="POST" action="{{ route('posts.store') }}">
    @csrf
    <input name="title" value="{{ old('title') }}">
    @error('title') <p>{{ $message }}</p> @enderror
    <textarea name="body">{{ old('body') }}</textarea>
    @error('body') <p>{{ $message }}</p> @enderror
    <button>Save</button>
</form>`,
        exercise: `<p>Write the <code>store()</code> method: validate <code>title</code> (required, max 255) and <code>body</code> (required), attach the logged-in user's id, create the post, and redirect to <code>posts.index</code>.</p>`,
        solution: `public function store(Request $request) {
    $validated = $request->validate([
        'title' => 'required|max:255',
        'body'  => 'required',
    ]);
    $validated['user_id'] = $request->user()->id;
    Post::create($validated);
    return redirect()->route('posts.index');
}`,
      },
      {
        id: '5.7',
        title: 'Comments',
        concept: `
          <p>Add comments: a comment belongs to a post; a post has many comments. Same pattern as posts/users.</p>
          <ul>
            <li><code>php artisan make:model Comment -m</code>, with a <code>post_id</code> foreign key and a <code>body</code>.</li>
            <li><code>Comment</code> → <code>belongsTo(Post::class)</code>; <code>Post</code> → <code>hasMany(Comment::class)</code>.</li>
            <li>Nest the route under its post: <code>POST /posts/{post}/comments</code>.</li>
          </ul>
          <p>In the post's show view you can then loop <code>$post-&gt;comments</code> and render a small comment form.</p>
        `,
        example: `php artisan make:model Comment -m

// comments migration — up()
Schema::create('comments', function (Blueprint $table) {
    $table->id();
    $table->foreignId('post_id')->constrained()->onDelete('cascade');
    $table->text('body');
    $table->timestamps();
});

// app/Models/Comment.php
protected $fillable = ['body', 'post_id'];
public function post() {
    return $this->belongsTo(Post::class);
}

// app/Models/Post.php — add this method
public function comments() {
    return $this->hasMany(Comment::class);
}

// routes/web.php
Route::post('/posts/{post}/comments', [CommentController::class, 'store'])
    ->name('comments.store');`,
        exercise: `<p>Write the two relationship methods that connect comments and posts: a comment belongs to a post, and a post has many comments.</p>`,
        solution: `// app/Models/Comment.php
public function post() {
    return $this->belongsTo(Post::class);
}

// app/Models/Post.php
public function comments() {
    return $this->hasMany(Comment::class);
}`,
      },
      {
        id: '5.8',
        title: 'Test it',
        concept: `
          <p>Don't just click around — prove it works with an automated <strong>feature test</strong>. Laravel ships with PHPUnit/Pest and helpers for HTTP and the database.</p>
          <ul>
            <li><code>php artisan make:test PostTest</code> creates a test in <code>tests/Feature</code>.</li>
            <li>The <code>RefreshDatabase</code> trait gives each test a clean database.</li>
            <li><code>$this-&gt;actingAs($user)</code> logs in for the request.</li>
            <li><code>assertDatabaseHas('posts', [...])</code> checks the row was written.</li>
          </ul>
          <p>Run the whole suite with <code>php artisan test</code>.</p>
        `,
        example: `php artisan make:test PostTest

// tests/Feature/PostTest.php
use App\\Models\\User;
use Illuminate\\Foundation\\Testing\\RefreshDatabase;

class PostTest extends TestCase {
    use RefreshDatabase;

    public function test_a_user_can_create_a_post(): void {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/posts', [
            'title' => 'Hello',
            'body'  => 'World',
        ]);

        $response->assertRedirect('/posts');
        $this->assertDatabaseHas('posts', ['title' => 'Hello']);
    }
}

// Run it:
php artisan test`,
        exercise: `<p>Write a feature test body that, as a logged-in user, POSTs a new post to <code>/posts</code> and asserts the database has a <code>posts</code> row with title <code>'Hello'</code>.</p>`,
        solution: `$user = User::factory()->create();

$this->actingAs($user)->post('/posts', [
    'title' => 'Hello',
    'body'  => 'World',
]);

$this->assertDatabaseHas('posts', ['title' => 'Hello']);`,
      },
      {
        id: '5.9',
        title: 'Deploy',
        concept: `
          <p>Last step: ship it. Production differs from local in a few important ways.</p>
          <ul>
            <li><code>APP_ENV=production</code> and <code>APP_DEBUG=false</code> — never expose stack traces to users.</li>
            <li><code>php artisan key:generate</code> — set <code>APP_KEY</code> (used to encrypt sessions/cookies).</li>
            <li><code>npm run build</code> — compile optimized, versioned front-end assets.</li>
            <li><code>php artisan config:cache</code> + <code>route:cache</code> — faster boot (re-run after changes).</li>
            <li><code>php artisan migrate --force</code> — run migrations non-interactively.</li>
          </ul>
          <p>Hosting options: managed platforms like <strong>Laravel Forge</strong>/Cloud, a VPS, or any host with PHP 8.3+ and Composer. Point the web root at <code>public/</code>.</p>
          <div class="callout tip">SQLite is fine for small sites, but most production apps switch <code>DB_CONNECTION</code> to MySQL or PostgreSQL.</div>
        `,
        example: `# Production .env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourblog.com

# One-time: generate the app encryption key
php artisan key:generate

# Build front-end assets for production
npm run build

# Cache config + routes, then migrate non-interactively
php artisan config:cache
php artisan route:cache
php artisan migrate --force`,
        exercise: `<p>Write the production commands to (a) generate the app key, (b) build the front-end assets, and (c) run migrations non-interactively.</p>`,
        solution: `php artisan key:generate
npm run build
php artisan migrate --force`,
      }
    ]
  }
];

// All quiz questions, keyed by lesson id — the single source of truth. The loop
// below attaches each set to its lesson as `lesson.quiz`; quizzes draw and
// shuffle from here. Each question: { q, options, correct, explain }.
const QUIZZES = {
  '1.1': [
    { q: "Where does PHP code run?", options: ["In the browser", "On the server", "In the database", "On the user's phone"], correct: 1, explain: "PHP runs server-side. The browser only sees the HTML output." },
    { q: "Which tag opens a block of PHP code?", options: ["<php>", "<?php", "<%php", "<script php>"], correct: 1, explain: "PHP code starts with <?php and (optionally) ends with ?>." },
    { q: "What does the PHP echo statement do?", options: ["Reads user input", "Outputs text to the response", "Defines a variable", "Connects to a database"], correct: 1, explain: "echo writes text to the output that becomes the HTML the browser receives." },
    { q: "What file extension do PHP files use?", options: [".html", ".js", ".php", ".phtml"], correct: 2, explain: "PHP files end in .php. The server runs them and sends back the output." },
    { q: "In modern Laravel code, a PHP file usually...", options: ["Mixes HTML and PHP heavily", "Contains only PHP and starts with <?php", "Always ends with ?>", "Has no opening tag"], correct: 1, explain: "Modern PHP/Laravel files are pure PHP, opening with <?php and omitting the closing ?>." },
    { q: "What produces the HTML that the browser receives?", options: ["The browser compiles PHP", "The PHP code running on the server", "The database", "The CSS file"], correct: 1, explain: "PHP runs on the server and outputs HTML, which is sent to the browser." },
    { q: "Which is a valid single-line PHP comment?", options: ["-- a comment", "// a comment", "<!-- a comment -->", "** a comment"], correct: 1, explain: "PHP uses // (and #) for single-line comments and /* */ for blocks." },
    { q: "How do you end a PHP statement?", options: ["With a newline", "With a semicolon ;", "With a period .", "With a colon :"], correct: 1, explain: "Each PHP statement ends with a semicolon." },
    { q: "What does date('H:i') return?", options: ["The current date only", "The current time as hours:minutes", "A timestamp number", "Nothing"], correct: 1, explain: "date() formats the current date/time; H:i gives hours:minutes." },
    { q: "Why must you learn PHP to use Laravel?", options: ["Laravel replaces PHP", "Laravel is written in PHP, so you write PHP", "Laravel uses JavaScript only", "You don't need PHP"], correct: 1, explain: "Laravel is a PHP framework — there is no shortcut around the language." },
  ],
  '1.2': [
    { q: "Which is the correct way to declare a variable in PHP?", options: ["var name = \"Alex\";", "let $name = \"Alex\";", "$name = \"Alex\";", "name := \"Alex\";"], correct: 2, explain: "PHP variables start with $ and use a simple = assignment. No \"var\"/\"let\"." },
    { q: "What will echo 'Hello $name' print, given $name = \"Alex\"?", options: ["Hello Alex", "Hello $name", "Error", "Nothing"], correct: 1, explain: "Single quotes do not interpolate variables. The text is printed literally." },
    { q: "Which type would 3.14 be in PHP?", options: ["int", "float", "string", "bool"], correct: 1, explain: "Numbers with a decimal point are floats. Whole numbers are ints." },
    { q: "What does the . operator do in PHP?", options: ["Accesses object properties", "Concatenates strings", "Divides numbers", "Ends a statement"], correct: 1, explain: "The dot (.) joins strings: \"Hello, \" . $name." },
    { q: "Given $name = \"Alex\", what does \"Hi $name\" produce?", options: ["Hi $name", "Hi Alex", "An error", "Hi"], correct: 1, explain: "Double quotes interpolate variables, so $name is replaced with its value." },
    { q: "Which character must every PHP variable start with?", options: ["@", "#", "$", "&"], correct: 2, explain: "PHP variables always begin with a dollar sign, e.g. $name." },
    { q: "What type is the value true?", options: ["string", "int", "bool", "float"], correct: 2, explain: "true and false are booleans (bool)." },
    { q: "Do you declare a variable's type before assigning in PHP?", options: ["Yes, always", "No — PHP infers it from the value", "Only for integers", "Only inside functions"], correct: 1, explain: "PHP is dynamically typed; the type comes from the assigned value." },
    { q: "What does null represent?", options: ["Zero", "An empty string", "\"no value\"", "false"], correct: 2, explain: "null represents the absence of a value." },
    { q: "Which correctly concatenates $a and $b?", options: ["$a + $b", "$a . $b", "$a & $b", "$a, $b"], correct: 1, explain: "The dot operator concatenates strings; + is numeric addition." },
  ],
  '1.3': [
    { q: "How do you access the value with key \"email\" in an associative array $user?", options: ["$user.email", "$user->email", "$user[\"email\"]", "$user[email]"], correct: 2, explain: "$user[\"email\"] — keys go in square brackets, strings in quotes. $user->email is object syntax, covered later." },
    { q: "What does $fruits[] = \"date\" do?", options: ["Replaces the array with \"date\"", "Appends \"date\" to the end", "Throws an error", "Removes \"date\""], correct: 1, explain: "[] with no key appends a new element to the end of an indexed array." },
    { q: "Which creates an associative array?", options: ["[\"a\", \"b\", \"c\"]", "[\"name\" => \"Alex\"]", "array(1, 2, 3)", "[1, 2, 3]"], correct: 1, explain: "Associative arrays use key => value pairs. The others are indexed lists." },
    { q: "How do you read the first element of an indexed array $fruits?", options: ["$fruits[1]", "$fruits[0]", "$fruits.first", "$fruits{0}"], correct: 1, explain: "Indexed arrays start at 0, so the first element is $fruits[0]." },
    { q: "What is the modern syntax to create an array?", options: ["array()", "{ }", "[ ]", "new Array()"], correct: 2, explain: "Square brackets [ ] are the modern syntax. array(...) is the older equivalent." },
    { q: "In an indexed array, what is the key of the first element?", options: ["1", "0", "-1", "first"], correct: 1, explain: "Indexed arrays are zero-based." },
    { q: "How do you loop an associative array with keys and values?", options: ["for ($i...)", "foreach ($arr as $key => $value)", "while ($arr)", "map($arr)"], correct: 1, explain: "foreach ($arr as $key => $value) exposes both key and value." },
    { q: "What does count($arr) return?", options: ["The first element", "The number of elements", "The keys", "true"], correct: 1, explain: "count() returns how many elements an array has." },
    { q: "Which sets the key 'name' to 'x'?", options: ["$a[] = 'x'", "$a['name'] = 'x'", "$a->name = 'x'", "$a.name = 'x'"], correct: 1, explain: "Use $a['name'] = 'x' to set an associative key." },
    { q: "Why are associative arrays important in Laravel?", options: ["They are faster", "Request data, config, and validation rules all use them", "They replace objects", "They are required for loops"], correct: 1, explain: "Laravel uses associative arrays everywhere — input, config, rules." },
  ],
  '1.4': [
    { q: "What is the difference between == and === ?", options: ["No difference", "== compares values, === compares values AND types", "=== is for arrays only", "== is assignment, === is comparison"], correct: 1, explain: "== will type-juggle (\"0\" == 0 is true). === requires same type AND value. Use === to avoid surprises." },
    { q: "Which loop is best for iterating over an array?", options: ["for", "while", "foreach", "do-while"], correct: 2, explain: "foreach is designed for arrays. It handles indexed AND associative arrays cleanly." },
    { q: "What does \"0\" == 0 evaluate to in PHP?", options: ["true", "false", "an error", "null"], correct: 0, explain: "== type-juggles, so \"0\" == 0 is true. Use === to require the same type." },
    { q: "Which keyword runs a block only if the previous if/elseif were false?", options: ["elif", "else", "otherwise", "default"], correct: 1, explain: "else runs when no preceding if/elseif condition matched." },
    { q: "A for loop is best when you...", options: ["Loop over an associative array", "Know how many times to repeat", "Never want to stop", "Only have one item"], correct: 1, explain: "for suits a known number of iterations; foreach is better for arrays." },
    { q: "Which operator means \"not equal\"?", options: ["!=", "=!", "><", "~="], correct: 0, explain: "!= (and !== for strict) means not equal." },
    { q: "What does === check that == does not?", options: ["Nothing", "That the types match too", "Array length", "Variable names"], correct: 1, explain: "=== requires both value AND type to match." },
    { q: "Which loop always runs at least once?", options: ["for", "while", "do-while", "foreach"], correct: 2, explain: "do-while checks its condition after the body." },
    { q: "How do you start a conditional in PHP?", options: ["if (condition) { }", "if condition then", "when (condition)", "check (condition)"], correct: 0, explain: "if (condition) { ... } with optional elseif/else." },
    { q: "Which equality operator avoids type-juggling bugs?", options: ["==", "===", "=", "<="], correct: 1, explain: "Prefer === so PHP does not coerce types unexpectedly." },
  ],
  '1.5': [
    { q: "What does the colon and type after the parentheses indicate? function foo(): string", options: ["Parameter type", "Return type", "Variable name", "Default value"], correct: 1, explain: "The colon after the parentheses declares the return type of the function." },
    { q: "Given function greet(string $name = \"guest\"), what does greet() return?", options: ["null", "an error", "\"Hello, guest!\"", "empty string"], correct: 2, explain: "When you omit an argument with a default value, PHP uses the default." },
    { q: "In function multiply(int $a, int $b): int, what is the int before $a?", options: ["The return type", "A parameter type hint", "A variable", "A default value"], correct: 1, explain: "Type hints before a parameter constrain what can be passed in." },
    { q: "What does ?string mean as a type?", options: ["Any type", "A string or null", "An optional array", "A secret string"], correct: 1, explain: "The leading ? makes the type nullable — string or null." },
    { q: "How do you return a value from a function?", options: ["echo it", "Use the return keyword", "Assign it to $result", "Functions cannot return values"], correct: 1, explain: "return sends a value back to the caller and ends the function." },
    { q: "How do you give a parameter a default value?", options: ["function f($x default 1)", "function f($x = 1)", "function f($x: 1)", "function f(default $x)"], correct: 1, explain: "function f($x = 1) sets a default used when the arg is omitted." },
    { q: "What does the return keyword do?", options: ["Prints a value", "Sends a value back to the caller", "Defines a parameter", "Loops"], correct: 1, explain: "return passes a value back and ends the function." },
    { q: "Why use type hints in modern PHP/Laravel?", options: ["They are required", "They catch type bugs early and document intent", "They speed up loops", "They replace comments"], correct: 1, explain: "Type hints surface mistakes early and document signatures." },
    { q: "What does function add($a, $b) { return $a + $b; } give for add(2, 3)?", options: ["23", "5", "'23'", "null"], correct: 1, explain: "It returns the numeric sum, 5." },
    { q: "A function with return type : void...", options: ["returns an integer", "returns nothing", "returns null only if empty", "must echo"], correct: 1, explain: ": void means the function returns no value." },
  ],
  '1.6': [
    { q: "What does $this refer to inside a class method?", options: ["The class itself", "The current object (instance)", "The parent class", "A random variable"], correct: 1, explain: "$this refers to the specific object the method was called on." },
    { q: "A property marked private can be accessed where?", options: ["Anywhere", "Only inside the class that defines it", "Inside the class and its subclasses", "Only via getters"], correct: 1, explain: "private = same class only. protected = same class + subclasses. public = anywhere." },
    { q: "Which method runs automatically when you create an object with new?", options: ["__init()", "__construct()", "start()", "create()"], correct: 1, explain: "__construct() is the constructor; it runs on instantiation." },
    { q: "How do you create an instance of a class User?", options: ["User.new()", "new User()", "create User", "User()"], correct: 1, explain: "Use the new keyword: $u = new User(...)." },
    { q: "What does public visibility mean?", options: ["Only the class can use it", "Accessible from anywhere", "Read-only", "Accessible to subclasses only"], correct: 1, explain: "public members are accessible anywhere. private = same class, protected = class + subclasses." },
    { q: "What is a class?", options: ["An instance", "A blueprint for objects", "A function", "A variable"], correct: 1, explain: "A class is a blueprint; an object is an instance of it." },
    { q: "How do you call a method on an object $u?", options: ["$u::method()", "$u->method()", "$u.method()", "method($u)"], correct: 1, explain: "Use the -> operator: $u->method()." },
    { q: "Which visibility allows access only within the same class?", options: ["public", "protected", "private", "global"], correct: 2, explain: "private restricts access to the defining class." },
    { q: "What are properties?", options: ["Functions in a class", "Variables that belong to a class", "Return values", "Loops"], correct: 1, explain: "Properties are a class's variables; methods are its functions." },
    { q: "Inside a method, how do you read the object's own $name property?", options: ["$name", "self.name", "$this->name", "this->name"], correct: 2, explain: "$this->name accesses the current object's property." },
  ],
  '1.7': [
    { q: "Which keyword makes one class inherit from another?", options: ["implements", "extends", "uses", "inherits"], correct: 1, explain: "extends. \"implements\" is for interfaces, \"use\" is for traits." },
    { q: "How many interfaces can a class implement?", options: ["One", "Two", "Unlimited", "Zero"], correct: 2, explain: "A class can implement as many interfaces as you want, separated by commas. But it can only extend one parent class." },
    { q: "Which keyword applies a trait inside a class?", options: ["extends", "implements", "use", "include"], correct: 2, explain: "use MyTrait; mixes a trait into a class. extends is for parents, implements for interfaces." },
    { q: "What does parent:: do?", options: ["Creates a new parent", "Calls a method on the parent class", "Deletes the parent", "Defines an interface"], correct: 1, explain: "parent:: calls the overridden method from the parent class." },
    { q: "An interface contains...", options: ["Full method implementations", "Only method signatures (no bodies)", "Properties with values", "Private methods"], correct: 1, explain: "Interfaces declare method signatures a class must implement; they hold no code." },
    { q: "How many parent classes can a PHP class extend?", options: ["Unlimited", "Exactly one", "Two", "Zero"], correct: 1, explain: "PHP supports single inheritance — one parent class." },
    { q: "Which keyword declares a class fulfils an interface?", options: ["extends", "implements", "uses", "has"], correct: 1, explain: "implements is for interfaces; extends for a parent class." },
    { q: "What problem do traits solve?", options: ["Single inheritance limits code reuse", "Slow loops", "Missing types", "Database access"], correct: 0, explain: "Traits mix reusable methods into classes despite single inheritance." },
    { q: "Which is commonly added to Laravel models via a trait?", options: ["HasFactory", "Route", "Blade", "Migration"], correct: 0, explain: "Models use traits like HasFactory and SoftDeletes." },
    { q: "A subclass can call the parent's overridden method with...", options: ["this::", "parent::", "super.", "base->"], correct: 1, explain: "parent::method() calls the parent's version." },
  ],
  '1.8': [
    { q: "What does Composer do?", options: ["Compiles PHP into binary", "Manages packages and autoloads classes", "Runs database migrations", "Renders HTML templates"], correct: 1, explain: "Composer is PHP's package manager AND provides autoloading. Both jobs are critical to modern PHP." },
    { q: "What separator does PHP use in namespaces?", options: ["/ (forward slash)", ". (dot)", "\\ (backslash)", ":: (double colon)"], correct: 2, explain: "PHP namespaces use backslash. App\\Models\\User. (Confusingly, in file paths you use forward slash, but in class names it's backslash.)" },
    { q: "What is the fully-qualified name of class User in namespace App\\Models?", options: ["App/Models/User", "App\\Models\\User", "Models::User", "User@App"], correct: 1, explain: "Namespaces use backslashes: App\\Models\\User." },
    { q: "What does a use statement do at the top of a file?", options: ["Runs a function", "Imports a class so you can use its short name", "Installs a package", "Declares a variable"], correct: 1, explain: "use App\\Models\\User; lets you write User instead of the full path." },
    { q: "After cloning a Laravel project, which command installs its dependencies?", options: ["composer install", "npm start", "php artisan serve", "composer update --all"], correct: 0, explain: "composer install reads composer.json/lock and installs packages into vendor/." },
    { q: "What problem do namespaces solve?", options: ["Slow code", "Name collisions between classes", "Missing types", "Database joins"], correct: 1, explain: "Namespaces prevent class-name clashes, like folders for class names." },
    { q: "After composer require, where are packages installed?", options: ["app/", "vendor/", "public/", "config/"], correct: 1, explain: "Third-party packages live in vendor/." },
    { q: "Composer is analogous to which Node tool?", options: ["webpack", "npm", "eslint", "vite"], correct: 1, explain: "Composer is PHP's package manager, like npm for Node." },
    { q: "Autoloading removes the need for...", options: ["Manual require/include of class files", "Routes", "Migrations", "Views"], correct: 0, explain: "Autoloading loads classes automatically — no manual require." },
    { q: "Which file lists a project's PHP dependencies?", options: ["package.json", "composer.json", "vendor.json", "deps.php"], correct: 1, explain: "composer.json declares dependencies; composer.lock pins versions." },
  ],
  '2.1': [
    { q: "Which HTTP method is used to fetch/read data without changing anything?", options: ["POST", "GET", "PUT", "DELETE"], correct: 1, explain: "GET is for reading. It should be idempotent (safe to repeat) and never modify state." },
    { q: "What does HTTP status 404 mean?", options: ["Success", "Validation failed", "Not Found", "Server error"], correct: 2, explain: "404 = the requested resource doesn't exist." },
    { q: "Which method is typically used to submit a form that creates a record?", options: ["GET", "POST", "HEAD", "OPTIONS"], correct: 1, explain: "POST sends a body to create/submit data. GET is for reading." },
    { q: "What does status code 201 mean?", options: ["Not Found", "Created", "Redirect", "Unauthorized"], correct: 1, explain: "201 Created signals a resource was successfully created." },
    { q: "What does 422 typically indicate in Laravel?", options: ["Server crashed", "Validation failed", "Page moved", "Success"], correct: 1, explain: "422 Unprocessable Entity is returned when validation fails." },
    { q: "Which method updates an existing resource?", options: ["GET", "PUT or PATCH", "POST", "HEAD"], correct: 1, explain: "PUT/PATCH update; POST typically creates." },
    { q: "What does status 500 indicate?", options: ["Success", "Not found", "Server error", "Redirect"], correct: 2, explain: "500 = an unhandled error on the server." },
    { q: "Where is form data sent in a POST request?", options: ["In the URL path", "In the request body", "In the status code", "In the method"], correct: 1, explain: "POST/PUT carry data in the request body." },
    { q: "What does status 302 mean?", options: ["Created", "Redirect", "Forbidden", "OK"], correct: 1, explain: "302 (Found) is a redirect." },
    { q: "A Laravel route maps which pair to code?", options: ["CSS + HTML", "HTTP method + URL", "Model + View", "User + password"], correct: 1, explain: "A route maps method+URL to a handler that returns a response." },
  ],
  '2.2': [
    { q: "In MVC, where does HTML live?", options: ["Model", "View", "Controller", "Route"], correct: 1, explain: "Views are the HTML/presentation layer. In Laravel they're .blade.php files." },
    { q: "A controller's primary job is to:", options: ["Define the database structure", "Render HTML directly", "Coordinate: take a request, get data, return a response", "Style the page"], correct: 2, explain: "Controllers orchestrate. They don't hold business logic (that goes on models) or HTML (that goes in views)." },
    { q: "What does the M in MVC stand for?", options: ["Middleware", "Model", "Migration", "Module"], correct: 1, explain: "Model — represents data and business logic, usually mapped to a table." },
    { q: "In Laravel, what file type are Views?", options: [".view.php", ".blade.php", ".html", ".tpl"], correct: 1, explain: "Laravel views are Blade templates ending in .blade.php." },
    { q: "Business logic that operates on data belongs in the...", options: ["View", "Route", "Model", "CSS"], correct: 2, explain: "Models hold data and the behavior/logic that acts on it." },
    { q: "In Laravel's flow, what does a route call?", options: ["A view directly", "A controller method", "A migration", "The database"], correct: 1, explain: "Routes call controller methods (or closures)." },
    { q: "What does the V in MVC stand for?", options: ["Validation", "View", "Vendor", "Version"], correct: 1, explain: "View — the presentation layer (Blade templates)." },
    { q: "Which layer talks to the database?", options: ["View", "Controller via Model", "CSS", "Route"], correct: 1, explain: "Controllers ask Models (Eloquent) for data; Models map to tables." },
    { q: "A good one-line summary of Laravel MVC is:", options: ["Views call models", "Routes call controllers, controllers use models, controllers return views", "Models render HTML", "Controllers style pages"], correct: 1, explain: "That sentence captures the core request flow." },
    { q: "Why separate concerns into M, V, and C?", options: ["To write more files", "To keep data, presentation, and coordination independent", "It is required by PHP", "To avoid a database"], correct: 1, explain: "Separation keeps each part focused and maintainable." },
  ],
  '2.3': [
    { q: "What does a foreign key do?", options: ["Encrypts a column", "Links a row in one table to a row in another", "Marks a column as required", "Adds an index"], correct: 1, explain: "A foreign key column references the primary key of another table, creating a relationship between rows." },
    { q: "Which SQL command modifies existing rows?", options: ["INSERT", "SELECT", "UPDATE", "ALTER"], correct: 2, explain: "UPDATE table SET col=val WHERE ... modifies existing rows. ALTER changes the schema, not the data." },
    { q: "Which SQL statement reads rows?", options: ["SELECT", "GET", "READ", "FETCH"], correct: 0, explain: "SELECT reads/queries rows from a table." },
    { q: "What does a JOIN do?", options: ["Deletes rows", "Combines rows from two tables on a related column", "Sorts results", "Adds a column"], correct: 1, explain: "JOIN merges rows across tables using a matching key, e.g. posts.user_id = users.id." },
    { q: "Which clause filters which rows a query affects?", options: ["ORDER BY", "WHERE", "GROUP BY", "LIMIT"], correct: 1, explain: "WHERE restricts the rows selected, updated, or deleted." },
    { q: "Which statement adds a new row?", options: ["ADD", "INSERT", "CREATE", "PUT"], correct: 1, explain: "INSERT INTO ... VALUES ... adds rows. CREATE makes tables." },
    { q: "Which statement removes rows?", options: ["DROP", "DELETE", "REMOVE", "CLEAR"], correct: 1, explain: "DELETE removes rows; DROP removes the whole table." },
    { q: "What uniquely identifies a row in a table?", options: ["A foreign key", "The primary key", "An index", "The first column"], correct: 1, explain: "The primary key (usually id) uniquely identifies each row." },
    { q: "A posts.user_id column referencing users.id is a...", options: ["primary key", "foreign key", "unique index", "view"], correct: 1, explain: "It is a foreign key linking posts to users." },
    { q: "What does ORDER BY do?", options: ["Filters rows", "Sorts the result rows", "Joins tables", "Counts rows"], correct: 1, explain: "ORDER BY sorts results by a column (ASC/DESC)." },
  ],
  '3.1': [
    { q: "What is artisan?", options: ["A web server", "Laravel's command-line tool", "The router", "A package manager"], correct: 1, explain: "Artisan is Laravel's CLI. You'll use it dozens of times a day." },
    { q: "Where do you define routes?", options: ["config/routes.php", "app/routes/", "routes/web.php", "public/index.php"], correct: 2, explain: "routes/web.php for browser routes, routes/api.php for API routes." },
    { q: "What is the minimum PHP version for Laravel 13?", options: ["7.4", "8.0", "8.3", "8.1"], correct: 2, explain: "Laravel 13 requires PHP 8.3 or newer." },
    { q: "Which folder holds Blade templates?", options: ["app/views", "resources/views", "public/views", "templates/"], correct: 1, explain: "Views live in resources/views as .blade.php files." },
    { q: "What does php artisan serve do?", options: ["Deploys to production", "Starts a local development server", "Runs migrations", "Installs packages"], correct: 1, explain: "It launches a dev server, by default at http://127.0.0.1:8000." },
    { q: "Which creates a new Laravel project (official installer)?", options: ["laravel new blog", "composer make blog", "php artisan new blog", "npm create laravel"], correct: 0, explain: "laravel new blog (or composer create-project laravel/laravel)." },
    { q: "What does the .env file hold?", options: ["Routes", "Environment settings like DB credentials and app key", "Blade views", "Composer packages"], correct: 1, explain: ".env holds environment-specific configuration." },
    { q: "Which folder is the public web root?", options: ["app/", "public/", "routes/", "storage/"], correct: 1, explain: "public/ is the web root; only it is exposed to the web." },
    { q: "Where do Eloquent models live by default?", options: ["app/Models", "database/", "resources/", "config/"], correct: 0, explain: "Models live in app/Models." },
    { q: "What does php artisan route:list show?", options: ["Installed packages", "Every registered route", "Database tables", "Blade files"], correct: 1, explain: "route:list prints all registered routes." },
  ],
  '3.2': [
    { q: "How do you capture a URL parameter in a Laravel route?", options: ["/:name", "/{name}", "/[name]", "/<name>"], correct: 1, explain: "Curly braces: /users/{id}. Then the controller/closure receives $id as a parameter." },
    { q: "Where do you typically register web routes?", options: ["config/web.php", "routes/web.php", "app/Http/routes.php", "public/routes.php"], correct: 1, explain: "routes/web.php is the default home for browser-facing routes. routes/api.php for API routes." },
    { q: "Which method registers a route that handles form submissions creating data?", options: ["Route::get", "Route::post", "Route::view", "Route::fetch"], correct: 1, explain: "Route::post() handles POST requests; Route::get() handles reads." },
    { q: "What does ->name('dashboard') add to a route?", options: ["A middleware", "A named reference usable via route('dashboard')", "A URL prefix", "A controller"], correct: 1, explain: "Named routes let you generate URLs with route('dashboard') instead of hard-coding paths." },
    { q: "How do you point a route at a controller method?", options: ["[PostController::class, 'index']", "PostController->index", "use PostController", "controller('index')"], correct: 0, explain: "Pass [Controller::class, 'method'] as the route action." },
    { q: "Which file holds browser (web) routes?", options: ["routes/api.php", "routes/web.php", "app/routes.php", "config/web.php"], correct: 1, explain: "routes/web.php for web; routes/api.php for APIs." },
    { q: "How do you read a route parameter in a closure?", options: ["As $_GET", "As a function argument: function ($id)", "From session()", "From config()"], correct: 1, explain: "Laravel injects route params as handler arguments." },
    { q: "Which generates a URL for the named route 'posts.show'?", options: ["url(posts.show)", "route('posts.show', $post)", "link('posts.show')", "named('posts.show')"], correct: 1, explain: "route('posts.show', $post) builds the URL." },
    { q: "Which facade registers routes?", options: ["Router", "Route", "Web", "Url"], correct: 1, explain: "The Route facade: Route::get(), Route::post(), etc." },
    { q: "What does Route::get('/', fn() => view('home')) return?", options: ["JSON", "The rendered home view", "A redirect", "Nothing"], correct: 1, explain: "It returns the home Blade view as the response." },
  ],
  '3.3': [
    { q: "Which artisan command creates a resource controller with all 7 methods?", options: ["php artisan make:resource PostController", "php artisan make:controller PostController --resource", "php artisan controller:make PostController --all", "php artisan resource PostController"], correct: 1, explain: "--resource flag scaffolds index/create/store/show/edit/update/destroy." },
    { q: "In a resource controller, which method handles the form submission to create a new record?", options: ["create()", "store()", "new()", "index()"], correct: 1, explain: "create() shows the form; store() handles the POST that actually creates the record." },
    { q: "What problem do controllers solve?", options: ["Styling pages", "Grouping related request-handling logic out of route closures", "Running migrations", "Defining the schema"], correct: 1, explain: "Controllers organize handlers into classes instead of bloating routes/web.php." },
    { q: "In a resource controller, which method shows a single record?", options: ["index()", "show($id)", "store()", "create()"], correct: 1, explain: "show($id) displays one record; index() lists all." },
    { q: "Route::resource('posts', PostController::class) creates how many routes?", options: ["1", "3", "7", "10"], correct: 2, explain: "It wires the 7 standard resource routes (index, create, store, show, edit, update, destroy)." },
    { q: "How do you create a controller via artisan?", options: ["php artisan new:controller X", "php artisan make:controller X", "php artisan controller X", "composer make:controller X"], correct: 1, explain: "php artisan make:controller PostController." },
    { q: "In a resource controller, which method shows the create form?", options: ["store()", "create()", "index()", "edit()"], correct: 1, explain: "create() shows the form; store() saves the submission." },
    { q: "Which method handles deleting a record?", options: ["remove()", "destroy()", "delete()", "drop()"], correct: 1, explain: "destroy($id) deletes in a resource controller." },
    { q: "Route::resource('posts', PostController::class) wires which methods?", options: ["Only index", "index, create, store, show, edit, update, destroy", "show and store", "None"], correct: 1, explain: "It registers all 7 RESTful actions." },
    { q: "Why use controllers instead of route closures?", options: ["They are faster", "They organize related handlers into a class", "They are required", "They render CSS"], correct: 1, explain: "Controllers group related logic and keep routes lean." },
  ],
  '3.4': [
    { q: "What is the difference between {{ $value }} and {!! $value !!}?", options: ["No difference", "{{ }} escapes HTML, {!! !!} prints raw", "{{ }} is faster", "{!! !!} is for variables, {{ }} for strings"], correct: 1, explain: "{{ }} escapes HTML to prevent XSS. {!! !!} prints unescaped — use it only when you trust the content." },
    { q: "Which directive starts a loop over a collection?", options: ["@for", "@loop", "@foreach", "@each"], correct: 2, explain: "@foreach ($items as $item) ... @endforeach — same as PHP's foreach." },
    { q: "Which Blade echo auto-escapes HTML to prevent XSS?", options: ["{!! $x !!}", "{{ $x }}", "<?= $x ?>", "@{{ $x }}"], correct: 1, explain: "{{ $x }} escapes output. {!! !!} prints raw HTML — use only on trusted content." },
    { q: "Which directive includes another view?", options: ["@import", "@include", "@require", "@view"], correct: 1, explain: "@include('partial') renders another Blade view inline." },
    { q: "In a layout, what marks where child content is injected?", options: ["@section", "@yield", "@extends", "@slot"], correct: 1, explain: "@yield('content') in the layout is filled by the child's @section('content')." },
    { q: "Which directive ends an @if?", options: ["@end", "@endif", "@fi", "@stop"], correct: 1, explain: "@if ... @endif." },
    { q: "How do you extend a layout from a child view?", options: ["@layout", "@extends('layouts.app')", "@use", "@parent"], correct: 1, explain: "@extends('layouts.app') plus @section/@endsection." },
    { q: "What does {{ $post->title }} do to special HTML characters?", options: ["Leaves them raw", "Escapes them (XSS-safe)", "Deletes them", "Encrypts them"], correct: 1, explain: "{{ }} escapes output to prevent XSS." },
    { q: "When should you use {!! $value !!}?", options: ["Always", "Only for content you trust (raw HTML)", "For numbers", "Never"], correct: 1, explain: "{!! !!} prints unescaped HTML — only for trusted content." },
    { q: "What file extension do Blade views use?", options: [".blade", ".php", ".blade.php", ".tpl"], correct: 2, explain: "Blade views end in .blade.php." },
  ],
  '3.5': [
    { q: "Which command applies all pending migrations?", options: ["php artisan migrate", "php artisan migrate:run", "php artisan db:migrate", "php artisan schema:apply"], correct: 0, explain: "php artisan migrate. To undo, use migrate:rollback. To wipe + reapply, migrate:fresh." },
    { q: "What does $table->timestamps() do?", options: ["Adds a created_at column only", "Adds created_at AND updated_at columns", "Adds a deleted_at column", "Adds a timezone column"], correct: 1, explain: "It adds the standard pair Laravel models expect. Eloquent maintains them automatically." },
    { q: "Which method adds an auto-incrementing primary key?", options: ["$table->key()", "$table->id()", "$table->primary()", "$table->auto()"], correct: 1, explain: "$table->id() creates the bigint auto-increment primary key." },
    { q: "What does the down() method in a migration do?", options: ["Applies the change", "Reverses the change", "Seeds data", "Runs tests"], correct: 1, explain: "down() undoes what up() did, enabling rollbacks." },
    { q: "Which adds a foreign key referencing users.id?", options: ["$table->foreignId('user_id')->constrained()", "$table->integer('user_id')", "$table->foreign('user_id')", "$table->reference('users')"], correct: 0, explain: "foreignId('user_id')->constrained() infers the users table and adds the constraint." },
    { q: "What are migrations?", options: ["CSS files", "Version-controlled schema changes in PHP", "Seed data", "Blade views"], correct: 1, explain: "Migrations describe schema changes you can apply/roll back." },
    { q: "Which command creates a migration?", options: ["php artisan make:migration create_posts_table", "php artisan migrate:new", "php artisan schema:make", "composer migrate"], correct: 0, explain: "make:migration scaffolds a migration file." },
    { q: "Which adds created_at and updated_at columns?", options: ["$table->dates()", "$table->timestamps()", "$table->times()", "$table->audit()"], correct: 1, explain: "$table->timestamps() adds both columns." },
    { q: "How do you undo the last batch of migrations?", options: ["php artisan migrate:rollback", "php artisan migrate:undo", "php artisan migrate:back", "php artisan down"], correct: 0, explain: "migrate:rollback reverts the last batch; migrate:fresh drops + reruns all." },
    { q: "Which column type suits a long article body?", options: ["string", "text", "integer", "boolean"], correct: 1, explain: "$table->text('body') holds long text; string is VARCHAR(255)." },
  ],
  '3.6': [
    { q: "What table does a model called Order map to by default?", options: ["Order", "order", "orders", "Orders"], correct: 2, explain: "Eloquent assumes plural snake_case: Order → orders. OrderItem → order_items." },
    { q: "What's the difference between find() and findOrFail()?", options: ["No difference", "find returns null if missing; findOrFail throws a 404", "findOrFail is faster", "find returns all rows"], correct: 1, explain: "findOrFail is great in controllers — it auto-converts to a 404 response. find returns null, which you'd have to check yourself." },
    { q: "What does Post::all() return?", options: ["One post", "A collection of all posts", "A query builder", "A boolean"], correct: 1, explain: "all() executes immediately and returns a collection of every row." },
    { q: "Why is $fillable needed for Post::create([...])?", options: ["Speed", "To whitelist mass-assignable columns", "For migrations", "To define relationships"], correct: 1, explain: "Mass-assignment protection: only $fillable fields can be set via create()/update() arrays." },
    { q: "Which executes a where() query and returns the matching rows?", options: ["->run()", "->get()", "->all()", "->fetch()"], correct: 1, explain: "->get() runs the built query and returns a collection. ->first() returns one." },
    { q: "Which command creates a model?", options: ["php artisan make:model Post", "php artisan new:model Post", "php artisan model Post", "composer make:model Post"], correct: 0, explain: "make:model Post (add -m to also create a migration)." },
    { q: "What does Post::find(1) return if no row matches?", options: ["An empty array", "null", "An error", "A new Post"], correct: 1, explain: "find() returns null when missing; findOrFail() throws a 404." },
    { q: "How do you update a model instance $post?", options: ["Set fields then $post->save(), or $post->update([...])", "Post::edit()", "$post->commit()", "update(Post)"], correct: 0, explain: "Set properties + ->save(), or ->update([...])." },
    { q: "What table does the model BlogPost map to by default?", options: ["BlogPost", "blogposts", "blog_posts", "blogPost"], correct: 2, explain: "Eloquent uses plural snake_case: BlogPost → blog_posts." },
    { q: "How do you delete a model instance $post?", options: ["$post->remove()", "$post->delete()", "Post::drop($post)", "$post->erase()"], correct: 1, explain: "$post->delete() removes the row." },
  ],
  '3.7': [
    { q: "Which relationship method is used on the \"many\" side of a one-to-many?", options: ["hasMany", "hasOne", "belongsTo", "manyToOne"], correct: 2, explain: "belongsTo on the child (the \"many\" side). hasMany on the parent (the \"one\" side)." },
    { q: "Which line eager-loads related data to avoid the N+1 problem?", options: ["User::all()", "User::with('posts')->get()", "User::find(1)->posts", "User::eager()->all()"], correct: 1, explain: "with() tells Eloquent to fetch the relationship in a separate single query, instead of one query per parent." },
    { q: "Which relationship is declared on the \"one\" side of one-to-many?", options: ["belongsTo", "hasMany", "belongsToMany", "hasManyThrough"], correct: 1, explain: "The parent uses hasMany(); the child uses belongsTo()." },
    { q: "What is the N+1 query problem?", options: ["Too many tables", "One extra query per parent when accessing a relation in a loop", "A migration error", "A syntax error"], correct: 1, explain: "Lazily loading a relation in a loop fires a query per parent. Eager loading with with() fixes it." },
    { q: "Which method sets up a many-to-many relationship?", options: ["hasMany", "belongsToMany", "hasOne", "morphMany"], correct: 1, explain: "belongsToMany() models many-to-many via a pivot table." },
    { q: "A User has many Posts. Which method goes on User?", options: ["belongsTo(Post::class)", "hasMany(Post::class)", "hasOne(Post::class)", "belongsToMany(Post::class)"], correct: 1, explain: "The parent (User) declares hasMany(Post::class)." },
    { q: "How do you access a relationship as data?", options: ["$user->posts()", "$user->posts", "$user::posts", "$user->getPosts"], correct: 1, explain: "$user->posts returns the collection; posts() returns the query builder." },
    { q: "Which avoids the N+1 problem when listing users with posts?", options: ["User::all()", "User::with('posts')->get()", "User::find(1)", "User::posts()"], correct: 1, explain: "Eager load with with('posts')." },
    { q: "A Post belongs to a User. Which method goes on Post?", options: ["hasMany(User::class)", "belongsTo(User::class)", "hasOne(User::class)", "owns(User::class)"], correct: 1, explain: "The child (Post) uses belongsTo(User::class)." },
    { q: "Many-to-many relationships are stored using a...", options: ["JSON column", "pivot table", "foreign key on each row", "view"], correct: 1, explain: "A pivot table links the two sides in many-to-many." },
  ],
  '3.8': [
    { q: "What does the @csrf directive do?", options: ["Validates form fields", "Adds a hidden token to prevent cross-site request forgery", "Encrypts the form", "Adds rate limiting"], correct: 1, explain: "CSRF = Cross-Site Request Forgery. The hidden token proves the request came from your site. Required on all non-GET forms." },
    { q: "What does old('title') do?", options: ["Loads the old version of the post", "Fills in the field with the user's previous input after validation failure", "Marks the field as deprecated", "Nothing"], correct: 1, explain: "After validation fails and Laravel redirects back, old('field') retrieves what the user typed so they don't have to re-fill." },
    { q: "Where do you usually run $request->validate([...])?", options: ["In the view", "In the controller", "In the migration", "In routes/web.php"], correct: 1, explain: "Validation runs in the controller (or a Form Request) before using the data." },
    { q: "What happens when validation fails?", options: ["The app crashes", "Laravel redirects back with errors and old input", "Data is saved anyway", "The user is logged out"], correct: 1, explain: "On failure Laravel redirects back, flashing errors and old() input automatically." },
    { q: "Which directive displays the error message for a field?", options: ["@error('title')", "@invalid('title')", "@fails('title')", "@message('title')"], correct: 0, explain: "@error('title') ... @enderror shows the validation message for that field." },
    { q: "What does @csrf add to a form?", options: ["A submit button", "A hidden anti-CSRF token", "Validation rules", "A CSS class"], correct: 1, explain: "@csrf inserts the hidden token required on non-GET forms." },
    { q: "Which rule requires a field and a valid email?", options: ["'email'", "'required|email'", "'must|email'", "'email|true'"], correct: 1, explain: "'required|email' combines both rules with a pipe." },
    { q: "What does old('title') do after a failed submit?", options: ["Deletes the post", "Re-fills the field with the user's prior input", "Loads an old post", "Nothing"], correct: 1, explain: "old() repopulates fields so the user need not retype." },
    { q: "Which rule makes a field optional?", options: ["optional", "nullable", "maybe", "skip"], correct: 1, explain: "nullable allows the field to be absent/null." },
    { q: "After $validated = $request->validate([...]), what is $validated?", options: ["All request input", "Only the validated fields", "A boolean", "The errors"], correct: 1, explain: "validate() returns only the fields that passed the rules." },
  ],
  '3.9': [
    { q: "Which middleware do you apply to require a logged-in user?", options: ["login", "auth", "guest", "protected"], correct: 1, explain: "The auth middleware. There's also guest (the opposite — only-if-not-logged-in, used on /login itself)." },
    { q: "How do you get the current logged-in user from a controller?", options: ["$user = User::current();", "$user = $request->user(); or auth()->user();", "$user = session('user');", "$user = $this->user;"], correct: 1, explain: "Both forms work and are common. auth()->user() works anywhere; $request->user() is preferred when you already have the request." },
    { q: "Which middleware requires a user to be logged in?", options: ["guest", "auth", "verified", "signed"], correct: 1, explain: "The auth middleware blocks guests. guest is the opposite (only when logged out)." },
    { q: "What is Laravel Breeze?", options: ["A database", "A minimal authentication starter kit", "A templating engine", "A queue driver"], correct: 1, explain: "Breeze scaffolds login, registration, password reset, and email verification." },
    { q: "Which Blade directive shows content only to logged-in users?", options: ["@guest", "@auth", "@can", "@if(user)"], correct: 1, explain: "@auth ... @endauth renders only when a user is authenticated." },
    { q: "How do you get the logged-in user anywhere?", options: ["user()", "auth()->user()", "Auth::current()", "$user"], correct: 1, explain: "auth()->user() (or $request->user() in controllers)." },
    { q: "Which command installs Breeze's scaffolding after requiring it?", options: ["php artisan breeze:install", "php artisan make:auth", "php artisan auth:install", "composer breeze"], correct: 0, explain: "php artisan breeze:install scaffolds auth views/routes." },
    { q: "How do you restrict a route group to logged-in users?", options: ["->middleware('guest')", "->middleware('auth')", "->auth()", "->protect()"], correct: 1, explain: "Apply the auth middleware." },
    { q: "Breeze is installed as which kind of dependency?", options: ["Production (laravel/breeze)", "Dev (laravel/breeze --dev)", "Global npm", "Built-in"], correct: 1, explain: "It is a dev dependency: --dev." },
    { q: "Which directive shows content only to guests?", options: ["@auth", "@guest", "@user", "@nologin"], correct: 1, explain: "@guest ... @endguest renders for logged-out visitors." },
  ],
  '3.10': [
    { q: "What's special about flash session data?", options: ["It's encrypted", "It only exists for the very next request, then disappears", "It survives logout", "It's stored in cookies"], correct: 1, explain: "Flash data is \"available next request only\" — ideal for status/error messages after a redirect." },
    { q: "A middleware's handle() method must do what to allow the request to continue?", options: ["Return true", "Return $next($request)", "Call $request->continue()", "Return null"], correct: 1, explain: "$next($request) hands the request to the next middleware (and eventually the controller). Returning anything else short-circuits the pipeline." },
    { q: "Where are custom middleware aliases registered in Laravel 11–13?", options: ["app/Http/Kernel.php", "bootstrap/app.php", "config/middleware.php", "routes/web.php"], correct: 1, explain: "Since Laravel 11, middleware aliases are configured in bootstrap/app.php via withMiddleware()." },
    { q: "What does session()->forget('cart_count') do?", options: ["Reads the value", "Removes the value from the session", "Flashes it", "Encrypts it"], correct: 1, explain: "forget() deletes a key from the session." },
    { q: "How do you flash a one-request status message after a redirect?", options: ["redirect()->with('status', '...')", "session()->keep()", "return view('status')", "echo 'status'"], correct: 0, explain: "redirect()->with('status', '...') flashes data available on the very next request only." },
    { q: "What is middleware?", options: ["A database layer", "Code that runs before/after a request reaches a controller", "A Blade directive", "A migration"], correct: 1, explain: "Middleware wraps requests — auth, throttling, logging, etc." },
    { q: "Which command creates a middleware?", options: ["php artisan make:middleware EnsureAdmin", "php artisan new:middleware EnsureAdmin", "php artisan middleware EnsureAdmin", "composer make:middleware EnsureAdmin"], correct: 0, explain: "make:middleware scaffolds the class." },
    { q: "A middleware's handle() must call what to pass the request on?", options: ["return true", "return $next($request)", "continue()", "return $request"], correct: 1, explain: "$next($request) forwards to the next middleware/controller." },
    { q: "How long does flashed session data live?", options: ["Forever", "Only the next request", "One hour", "Until logout"], correct: 1, explain: "Flash data exists for exactly the next request." },
    { q: "How do you store a value in the session?", options: ["session()->put('key', $val)", "session('key') = $val", "Session::add()", "store('key')"], correct: 0, explain: "session()->put('key', $value) stores it; session('key') reads it." },
  ],
  '4.1': [
    { q: "When a route has a {param} placeholder, what must the handler do?", options: ["Nothing — Laravel populates a global", "Accept a matching parameter", "Call request()->route('param')", "Use session()->get('param')"], correct: 1, explain: "The closure or controller method must declare a parameter to receive it. Laravel matches by position/name." },
    { q: "How does Laravel decide which value to pass into function ($name)?", options: ["Alphabetically", "By matching the {name} segment in the route URI", "From the query string only", "It always passes the full Request"], correct: 1, explain: "Route parameters are injected by name/position from the URI pattern — {name} fills the $name argument." },
    { q: "A route /hello/{name} with closure function () { return $name; } fails because...", options: ["The route is misspelled", "$name is undefined — the closure didn't declare it", "You need a controller", "GET is not allowed"], correct: 1, explain: "The closure must declare the parameter: function ($name)." },
    { q: "What does the {name} part of a route URI represent?", options: ["A query string key", "A route parameter captured from the URL", "A view name", "A middleware"], correct: 1, explain: "{name} is a route parameter; its value comes from that URL segment." },
    { q: "How do you make a route parameter optional?", options: ["{name?}", "{name|null}", "{?name}", "{name=}"], correct: 0, explain: "A trailing ? makes it optional: /hello/{name?} — give the argument a default too." },
    { q: "After the fix, what should the closure signature be?", options: ["function ()", "function ($name)", "function ($request)", "function (name)"], correct: 1, explain: "function ($name) so the route param is injected." },
    { q: "Two route params {a}/{b} reach the handler in what order?", options: ["Reverse", "The order they appear in the URI", "Alphabetical", "Random"], correct: 1, explain: "By position/order in the URI." },
    { q: "Which HTTP verb does Route::get respond to?", options: ["POST", "GET", "PUT", "DELETE"], correct: 1, explain: "Route::get handles GET requests." },
    { q: "On /hello/{name}, visiting /hello with no name does what?", options: ["Works with null", "No route matches (404) unless the param is optional", "Crashes PHP", "Redirects"], correct: 1, explain: "A required parameter must be present, else the route does not match." },
    { q: "Where would you fix this bug?", options: ["In the view", "In routes/web.php (the closure)", "In the migration", "In .env"], correct: 1, explain: "The route closure in routes/web.php needs the parameter." },
  ],
  '4.2': [
    { q: "Post::where('user_id', 5) returns:", options: ["A collection of matching posts", "A single post", "A query builder — you still need to call ->get() (or similar)", "A boolean"], correct: 2, explain: "where() builds the query. You execute it with ->get(), ->first(), ->paginate(), ->count(), etc." },
    { q: "Which of these does NOT execute the query (it only builds it)?", options: ["->get()", "->first()", "->orderBy()", "->paginate()"], correct: 2, explain: "->orderBy() (like ->where(), ->select()) only adds to the query. ->get()/->first()/->paginate() run it." },
    { q: "Calling Post::where('user_id', 5) without ->get() returns...", options: ["A collection", "A query builder", "An array", "null"], correct: 1, explain: "where() returns a builder; you must execute it with ->get(), ->first(), etc." },
    { q: "After fixing the bug, which line correctly runs the filter?", options: ["Post::where('user_id', $id)", "Post::where('user_id', $id)->get()", "Post::find()->where()", "Post::all('user_id')"], correct: 1, explain: "Append ->get() (or ->first()/->paginate()) to execute the where() filter." },
    { q: "To paginate results instead of fetching all rows, use...", options: ["->page()", "->paginate(15)", "->limit()", "->chunk()"], correct: 1, explain: "->paginate(15) executes the query and returns a paginator of 15 per page." },
    { q: "What symptom does the missing ->get() cause in the view?", options: ["A correct list", "Errors/odd behavior because $posts is a builder, not results", "A faster page", "Nothing"], correct: 1, explain: "Passing a builder instead of results breaks the view loop." },
    { q: "Which executes the query AND returns only the first match?", options: ["->get()", "->first()", "->all()", "->count()"], correct: 1, explain: "->first() returns a single model or null." },
    { q: "Which returns the number of matching rows?", options: ["->size()", "->count()", "->length()", "->total()"], correct: 1, explain: "->count() runs the query and returns an integer." },
    { q: "A query builder becomes results only after a...", options: ["where()", "terminal method like get()/first()/paginate()", "select()", "orderBy()"], correct: 1, explain: "Terminal methods execute the built query." },
    { q: "The best fix for the broken 'my posts' page is to append...", options: ["->save()", "->get()", "->fresh()", "->toSql()"], correct: 1, explain: "Append ->get() (or ->paginate())." },
  ],
  '4.3': [
    { q: "Why does Laravel require $fillable (or $guarded)?", options: ["Speed", "To prevent a request from setting columns it shouldn't — like is_admin", "To make queries shorter", "Required for migrations to run"], correct: 1, explain: "It protects against mass-assignment attacks: if you blindly create from $request->all(), a user could submit is_admin=1." },
    { q: "Which property is the inverse of $fillable (lists what may NOT be mass-assigned)?", options: ["$hidden", "$guarded", "$casts", "$visible"], correct: 1, explain: "$guarded blacklists attributes; $fillable whitelists them. Use one or the other, not both." },
    { q: "A MassAssignmentException means...", options: ["Too many columns", "You tried to mass-assign a field not in $fillable", "The table is missing", "A syntax error"], correct: 1, explain: "Eloquent blocks create()/update() of attributes not whitelisted in $fillable." },
    { q: "Which is the safest fix for the broken store() method?", options: ["Use $request->all() directly", "Add protected $fillable on the model", "Disable CSRF", "Delete the validation"], correct: 1, explain: "Declaring $fillable lets the validated fields be mass-assigned safely." },
    { q: "What attack does mass-assignment protection prevent?", options: ["SQL injection", "A user setting columns like is_admin via extra form fields", "XSS", "Clickjacking"], correct: 1, explain: "Without it, a crafted request could set sensitive columns such as is_admin." },
    { q: "Which model property whitelists mass-assignable columns?", options: ["$visible", "$fillable", "$casts", "$appends"], correct: 1, explain: "$fillable lists columns allowed via create()/update() arrays." },
    { q: "To allow all attributes except a few, set...", options: ["$fillable = []", "$guarded = ['id']", "$open = true", "$all = true"], correct: 1, explain: "$guarded is the blacklist (inverse of $fillable)." },
    { q: "Which call triggers mass assignment?", options: ["$post->title = 'x'; $post->save()", "Post::create($request->validated())", "Post::find(1)", "Post::all()"], correct: 1, explain: "create()/update() with an array is mass assignment." },
    { q: "Where do you add $fillable?", options: ["The migration", "The Post model", "The controller", "routes/web.php"], correct: 1, explain: "On the Eloquent model (app/Models/Post.php)." },
    { q: "Why is Post::create($request->all()) risky?", options: ["It is slow", "A user could submit unexpected fields like is_admin", "It needs CSRF", "It breaks routing"], correct: 1, explain: "Unfiltered input could set columns the user shouldn't control." },
  ],
  '4.4': [
    { q: "In @foreach ($items as $item), which is the collection and which is each element?", options: ["$items is each element, $item is the collection", "$items is the collection, $item is each element", "Both refer to the same thing", "Depends on the data type"], correct: 1, explain: "Always: collection AS loop_variable. The thing being iterated is on the left." },
    { q: "Which directive correctly closes an @foreach loop in Blade?", options: ["@end", "@endfor", "@endforeach", "@stop"], correct: 2, explain: "@foreach is paired with @endforeach. @endfor closes @for; @stop closes @section." },
    { q: "The error \"array offset on value of type null\" in @foreach ($post as $posts) means...", options: ["The DB is down", "The collection and item variables are swapped", "Blade is disabled", "The view is missing"], correct: 1, explain: "The controller passes $posts (the collection); the loop wrongly iterates $post." },
    { q: "What is the correct foreach syntax in Blade?", options: ["@foreach ($post as $posts)", "@foreach ($posts as $post)", "@for ($posts as $post)", "@each ($posts, $post)"], correct: 1, explain: "Collection on the left, single item on the right: @foreach ($posts as $post)." },
    { q: "Inside the loop, how do you print each post's title?", options: ["{{ $posts->title }}", "{{ $post->title }}", "{{ post.title }}", "{{ $post[title] }}"], correct: 1, explain: "Use the singular loop variable: {{ $post->title }}." },
    { q: "In @foreach, which side is the collection being iterated?", options: ["The right", "The left (before 'as')", "Both", "Neither"], correct: 1, explain: "Collection on the left, loop variable on the right." },
    { q: "The controller passes $posts. The loop should be...", options: ["@foreach ($post as $posts)", "@foreach ($posts as $post)", "@for ($posts)", "@each ($post)"], correct: 1, explain: "Iterate the collection $posts as each $post." },
    { q: "Why did the page render blank?", options: ["CSS missing", "The loop iterated the wrong (undefined) variable", "No database", "Wrong route"], correct: 1, explain: "Iterating $post (undefined) produced nothing / errors." },
    { q: "Which directive closes @foreach?", options: ["@endfor", "@endforeach", "@end", "@loopend"], correct: 1, explain: "@endforeach closes @foreach." },
    { q: "To show a fallback when the collection is empty, use...", options: ["@forelse ... @empty ... @endforelse", "@ifempty", "@none", "@blank"], correct: 0, explain: "@forelse handles the empty case with @empty." },
  ],
  '5.1': [
    { q: "Which command creates a brand-new Laravel application called blog?", options: ["php artisan new blog", "laravel new blog", "composer blog", "npm create laravel blog"], correct: 1, explain: "laravel new blog (or composer create-project laravel/laravel blog) scaffolds a new app." },
    { q: "What database does a fresh Laravel 11+ app use by default?", options: ["MySQL", "PostgreSQL", "SQLite", "MongoDB"], correct: 2, explain: "New apps default to SQLite — a single file at database/database.sqlite, no setup." },
    { q: "What does php artisan serve do?", options: ["Deploys the app", "Starts a local development server", "Builds front-end assets", "Creates a controller"], correct: 1, explain: "It serves the app locally, by default at http://127.0.0.1:8000." },
    { q: "Which command applies the database migrations?", options: ["php artisan migrate", "php artisan db", "php artisan serve", "composer migrate"], correct: 0, explain: "php artisan migrate runs pending migrations and creates the tables." },
    { q: "Which .env key selects the database driver?", options: ["DB_DRIVER", "DB_CONNECTION", "DATABASE", "DB_TYPE"], correct: 1, explain: "DB_CONNECTION (e.g. sqlite, mysql) chooses the driver." },
    { q: "Which tool manages Laravel's PHP dependencies?", options: ["npm", "Composer", "Docker", "Git"], correct: 1, explain: "Composer installs PHP packages; Laravel requires it." },
    { q: "What is the minimum PHP version for Laravel 13?", options: ["8.0", "8.1", "8.3", "7.4"], correct: 2, explain: "Laravel 13 requires PHP 8.3+." },
    { q: "By default, php artisan serve runs the app at...", options: ["http://localhost:3000", "http://127.0.0.1:8000", "https://laravel.test", "port 80"], correct: 1, explain: "The dev server defaults to http://127.0.0.1:8000." },
    { q: "Which file stores local DB and app settings?", options: ["config/app.php", ".env", "composer.json", "routes/web.php"], correct: 1, explain: ".env holds environment settings like DB and APP_KEY." },
    { q: "For SQLite, what must exist for migrations to run?", options: ["A MySQL server", "The database file (e.g. database/database.sqlite)", "A Redis server", "An API key"], correct: 1, explain: "SQLite needs its database file present." },
  ],
  '5.2': [
    { q: "What does Laravel Breeze provide?", options: ["A database GUI", "Authentication scaffolding (login, register, etc.)", "A deployment tool", "A testing framework"], correct: 1, explain: "Breeze scaffolds login, registration, password reset, and email verification." },
    { q: "How is Breeze installed?", options: ["npm install breeze", "composer require laravel/breeze --dev", "php artisan breeze", "apt install breeze"], correct: 1, explain: "Add it as a dev dependency, then run php artisan breeze:install." },
    { q: "After requiring Breeze, which command scaffolds the Blade auth views?", options: ["php artisan breeze:install blade", "php artisan make:auth", "php artisan vendor:publish", "npm run breeze"], correct: 0, explain: "php artisan breeze:install blade publishes routes, controllers, and Blade views." },
    { q: "Why run npm install && npm run build after installing Breeze?", options: ["To install PHP", "To compile the CSS/JS assets Breeze published", "To run migrations", "To start the server"], correct: 1, explain: "Breeze ships Tailwind/Vite assets that must be compiled with Node." },
    { q: "Which middleware protects routes that require login?", options: ["guest", "auth", "verified", "web"], correct: 1, explain: "The auth middleware restricts routes to authenticated users." },
    { q: "Breeze is added as which dependency type?", options: ["Production", "Dev (--dev)", "Global", "Built-in"], correct: 1, explain: "composer require laravel/breeze --dev." },
    { q: "After breeze:install and migrate, which routes exist?", options: ["Only /", "/login, /register, /dashboard, etc.", "/admin only", "None"], correct: 1, explain: "Breeze scaffolds login, register, dashboard, password reset." },
    { q: "Which stack keeps Breeze server-rendered with Blade?", options: ["react", "vue", "blade", "api"], correct: 2, explain: "The Blade stack uses server-rendered Blade views." },
    { q: "What compiles Breeze's CSS/JS assets?", options: ["composer", "Vite (npm run build/dev)", "artisan", "webpack only"], correct: 1, explain: "Breeze uses Vite; run npm install then npm run build." },
    { q: "Which directive greets only authenticated users?", options: ["@guest", "@auth", "@can", "@user"], correct: 1, explain: "@auth renders for logged-in users." },
  ],
  '5.3': [
    { q: "Which command makes a Post model and its migration together?", options: ["php artisan make:model Post", "php artisan make:model Post -m", "php artisan make:migration Post", "php artisan model Post --table"], correct: 1, explain: "The -m flag also generates the migration alongside the model." },
    { q: "Which line adds a foreign key from posts to users?", options: ["$table->integer('user_id')", "$table->foreignId('user_id')->constrained()", "$table->foreign('user')", "$table->users()"], correct: 1, explain: "foreignId('user_id')->constrained() infers the users table and adds the constraint." },
    { q: "On the Post model, which relationship points back to its author?", options: ["hasMany", "hasOne", "belongsTo", "belongsToMany"], correct: 2, explain: "A post belongs to one user: belongsTo(User::class)." },
    { q: "Why does Post need a $fillable array?", options: ["For speed", "To allow those fields in Post::create([...]) (mass assignment)", "To define the table", "To add indexes"], correct: 1, explain: "Mass-assignment protection: only listed fields can be set via create()/update() arrays." },
    { q: "On the User model, the matching relationship to many posts is...", options: ["belongsTo(Post::class)", "hasMany(Post::class)", "hasOne(Post::class)", "morphMany(Post::class)"], correct: 1, explain: "A user has many posts: hasMany(Post::class)." },
    { q: "Which command makes the Post model plus a migration?", options: ["php artisan make:model Post", "php artisan make:model Post -m", "php artisan make:migration Post", "php artisan model:make Post"], correct: 1, explain: "-m also generates the migration." },
    { q: "What does ->constrained() add after foreignId('user_id')?", options: ["A default value", "A foreign-key constraint to users.id", "An index name", "A unique rule"], correct: 1, explain: "constrained() infers and adds the FK to users.id." },
    { q: "What does onDelete('cascade') do?", options: ["Blocks deletes", "Deletes children when the parent is deleted", "Soft-deletes", "Nothing"], correct: 1, explain: "Cascading delete removes dependent rows with the parent." },
    { q: "A Post belongs to a User — the method returns...", options: ["$this->hasMany(User::class)", "$this->belongsTo(User::class)", "$this->hasOne(User::class)", "User::all()"], correct: 1, explain: "belongsTo(User::class) on the child." },
    { q: "Which fields belong in Post's $fillable for this blog?", options: ["['id']", "['title', 'body', 'user_id']", "['*']", "none"], correct: 1, explain: "List the mass-assignable columns: title, body, user_id." },
  ],
  '5.4': [
    { q: "Which command creates a controller with the 7 resource methods?", options: ["make:controller PostController", "make:controller PostController --resource", "make:resource PostController", "make:model PostController"], correct: 1, explain: "The --resource flag scaffolds index/create/store/show/edit/update/destroy." },
    { q: "How do you restrict create/store routes to logged-in users?", options: ["Route::middleware('auth')->group(...)", "Route::auth()", "Route::secure()", "Add @auth in the route file"], correct: 0, explain: "Wrap them in Route::middleware('auth')->group(...)." },
    { q: "Why define /posts/create before /posts/{post}?", options: ["Alphabetical order", "Otherwise {post} captures \"create\" as an id", "It runs faster", "Laravel requires it"], correct: 1, explain: "Routes match top-down; {post} would match the literal \"create\" if defined first." },
    { q: "What does Post::latest()->get() return?", options: ["One post", "All posts, newest first", "A query builder", "A boolean"], correct: 1, explain: "latest() orders by created_at desc; get() executes and returns the collection." },
    { q: "With route-model binding, what does show(Post $post) give you?", options: ["The id only", "The matching Post instance, fetched automatically", "A query builder", "Nothing"], correct: 1, explain: "Type-hinting Post $post auto-resolves the model from the {post} route key (404 if missing)." },
    { q: "Which wires all 7 RESTful routes at once?", options: ["Route::get('posts')", "Route::resource('posts', PostController::class)", "Route::all('posts')", "Route::crud('posts')"], correct: 1, explain: "Route::resource maps all 7 actions to the controller." },
    { q: "What does Post::latest() order by?", options: ["id ascending", "created_at descending", "title", "random"], correct: 1, explain: "latest() orders by created_at descending (newest first)." },
    { q: "How do you return the index view with posts?", options: ["return view('posts.index', ['posts' => $posts])", "echo $posts", "return $posts", "render(posts)"], correct: 0, explain: "Pass data as the second argument to view()." },
    { q: "Route-model binding means show(Post $post) does what?", options: ["Nothing", "Auto-fetches the Post by id (404 if missing)", "Creates a Post", "Returns all posts"], correct: 1, explain: "Laravel resolves the model from the route id automatically." },
    { q: "Which middleware should wrap create/store/edit/update/destroy?", options: ["guest", "auth", "throttle only", "none"], correct: 1, explain: "auth — only logged-in users should write." },
  ],
  '5.5': [
    { q: "Which directive outputs an escaped value in Blade?", options: ["{!! $x !!}", "{{ $x }}", "<?= $x ?>", "@$x"], correct: 1, explain: "{{ }} escapes HTML to prevent XSS; {!! !!} prints raw." },
    { q: "How does a child view use a layout?", options: ["@include('layouts.app')", "@extends('layouts.app') plus @section", "@use('layouts.app')", "@layout('app')"], correct: 1, explain: "@extends names the layout; @section fills its @yield slots." },
    { q: "Which helper generates the URL for a named route?", options: ["url('posts.show')", "route('posts.show', $post)", "link('posts.show')", "path('posts.show')"], correct: 1, explain: "route('posts.show', $post) builds the URL from the route name." },
    { q: "Which directive loops over a collection in Blade?", options: ["@for", "@foreach", "@each", "@loop"], correct: 1, explain: "@foreach ($posts as $post) ... @endforeach." },
    { q: "In the layout, where does a child's section render?", options: ["@section", "@yield", "@show", "@slot"], correct: 1, explain: "@yield('content') marks where the child's @section('content') is injected." },
    { q: "Which prints a post title safely in Blade?", options: ["{!! $post->title !!}", "{{ $post->title }}", "<?= $post->title ?>", "{{{ $post->title }}}"], correct: 1, explain: "{{ }} escapes output to prevent XSS." },
    { q: "How do you link to a post's show page?", options: ["route('posts.show', $post)", "url(posts.show)", "link($post)", "@show($post)"], correct: 0, explain: "route('posts.show', $post) builds the URL from the named route." },
    { q: "Which pair defines a layout section in the child?", options: ["@section/@endsection", "@block/@endblock", "@part/@endpart", "@yield/@endyield"], correct: 0, explain: "@section('content') ... @endsection fills the layout's @yield." },
    { q: "Which shows a fallback when there are no posts?", options: ["@forelse ... @empty ... @endforelse", "@ifnone", "@blank", "@nodata"], correct: 0, explain: "@forelse with @empty handles the no-results case." },
    { q: "Where does the layout output a child's content?", options: ["@include", "@yield('content')", "@section", "@push"], correct: 1, explain: "@yield('content') renders the child's matching section." },
  ],
  '5.6': [
    { q: "Which method validates incoming request data?", options: ["$request->check()", "$request->validate([...])", "$request->verify()", "validate($request)"], correct: 1, explain: "$request->validate([...]) validates and redirects back with errors on failure." },
    { q: "What does @csrf add to a form?", options: ["Styling", "A hidden token preventing cross-site request forgery", "Validation rules", "A submit button"], correct: 1, explain: "Every non-GET form needs @csrf or Laravel rejects the request." },
    { q: "How do you set the author on the new post?", options: ["$validated['user_id'] = $request->user()->id", "Post::author()", "Laravel fills it automatically", "$post->user = true"], correct: 0, explain: "Attach the logged-in user id before creating: $request->user()->id." },
    { q: "What does old('title') do after a failed validation?", options: ["Loads an old post", "Refills the field with the user's previous input", "Deletes the input", "Nothing"], correct: 1, explain: "old() repopulates the field so the user need not retype it." },
    { q: "Which directive shows a field's validation message?", options: ["@error('title')", "@invalid('title')", "@fails('title')", "@message('title')"], correct: 0, explain: "@error('title') ... @enderror displays that field's error message." },
    { q: "What does $request->validate([...]) return?", options: ["true", "The validated fields only", "All input", "The errors"], correct: 1, explain: "It returns only the fields that passed validation." },
    { q: "Which rule set fits the title field here?", options: ["'required|max:255'", "'optional'", "'string' only", "'min:255'"], correct: 0, explain: "title is required and capped at 255 chars." },
    { q: "How do you attach the logged-in user as author?", options: ["$validated['user_id'] = $request->user()->id", "$post->author = auth", "it is automatic", "Post::create()"], correct: 0, explain: "Set user_id from $request->user()->id before create." },
    { q: "After a successful store, you typically...", options: ["echo the post", "redirect()->route('posts.index')", "return all posts", "reload the form"], correct: 1, explain: "Redirect to the index (or show) after creating." },
    { q: "A non-GET form without @csrf will...", options: ["Submit fine", "Be rejected (419)", "Be slower", "Skip validation"], correct: 1, explain: "Missing the CSRF token causes a 419 rejection." },
  ],
  '5.7': [
    { q: "Which command creates the Comment model with a migration?", options: ["make:model Comment", "make:model Comment -m", "make:comment", "make:migration Comment"], correct: 1, explain: "make:model Comment -m generates the model and its migration." },
    { q: "A comment belongs to a post, so Comment has...", options: ["hasMany(Post::class)", "belongsTo(Post::class)", "hasOne(Post::class)", "belongsToMany(Post::class)"], correct: 1, explain: "The child side uses belongsTo(Post::class)." },
    { q: "A post has many comments, so Post has...", options: ["belongsTo(Comment::class)", "hasMany(Comment::class)", "hasOne(Comment::class)", "morphTo()"], correct: 1, explain: "The parent side uses hasMany(Comment::class)." },
    { q: "Which foreign key links comments to posts?", options: ["comment_id", "post_id", "user_id", "parent_id"], correct: 1, explain: "comments.post_id references posts.id." },
    { q: "A good URL for posting a comment on post 5 is...", options: ["POST /comments", "POST /posts/5/comments", "GET /posts/5/comments", "PUT /comments/5"], correct: 1, explain: "Nest it under the post: POST /posts/{post}/comments." },
    { q: "Which relationship does Comment declare toward Post?", options: ["hasMany(Post::class)", "belongsTo(Post::class)", "hasOne(Post::class)", "belongsToMany(Post::class)"], correct: 1, explain: "A comment belongs to a post." },
    { q: "Which relationship does Post declare toward Comment?", options: ["belongsTo(Comment::class)", "hasMany(Comment::class)", "hasOne(Comment::class)", "owns(Comment::class)"], correct: 1, explain: "A post has many comments." },
    { q: "Which foreign key links comments to posts?", options: ["comment_id", "post_id", "user_id", "id"], correct: 1, explain: "comments.post_id references posts.id." },
    { q: "A RESTful URL to add a comment to post 5 is...", options: ["GET /comments/5", "POST /posts/5/comments", "PUT /comments", "POST /comment"], correct: 1, explain: "Nested resource: POST /posts/5/comments." },
    { q: "How do you read a post's comments in Blade?", options: ["$post->comments", "$post::comments", "comments($post)", "$post->getComments"], correct: 0, explain: "Access the relationship as a property: $post->comments." },
  ],
  '5.8': [
    { q: "Which command runs the test suite?", options: ["php artisan test", "php artisan phpunit", "npm test", "php artisan check"], correct: 0, explain: "php artisan test runs PHPUnit/Pest with nicer output." },
    { q: "What does the RefreshDatabase trait do?", options: ["Speeds up queries", "Gives each test a fresh migrated database, rolled back after", "Deletes production data", "Caches the schema"], correct: 1, explain: "It ensures each test runs against a clean database." },
    { q: "How do you act as a logged-in user in a test?", options: ["$this->login($user)", "$this->actingAs($user)", "$this->auth($user)", "$user->login()"], correct: 1, explain: "$this->actingAs($user) authenticates the request for that test." },
    { q: "Which assertion checks a row exists in a table?", options: ["assertSee", "assertDatabaseHas", "assertTrue", "assertRedirect"], correct: 1, explain: "assertDatabaseHas('posts', ['title' => 'Hello']) checks the row exists." },
    { q: "Where do feature tests live by default?", options: ["app/Tests", "tests/Feature", "database/tests", "resources/tests"], correct: 1, explain: "Feature tests live in tests/Feature; unit tests in tests/Unit." },
    { q: "Which command runs the test suite?", options: ["php artisan test", "php artisan run:tests", "composer test", "php test"], correct: 0, explain: "php artisan test runs the suite (Pest/PHPUnit)." },
    { q: "Which trait resets the database between tests?", options: ["FreshDatabase", "RefreshDatabase", "ResetDB", "Migrate"], correct: 1, explain: "use RefreshDatabase migrates fresh per test." },
    { q: "How do you make a request as a logged-in user?", options: ["$this->login()", "$this->actingAs($user)", "auth($user)", "$this->as($user)"], correct: 1, explain: "actingAs($user) authenticates the test request." },
    { q: "Which assertion confirms a row exists?", options: ["assertSee", "assertDatabaseHas('posts', [...])", "assertTrue", "assertRow"], correct: 1, explain: "assertDatabaseHas(table, attributes) checks the DB." },
    { q: "A test that POSTs a post should assert the response...", options: ["is 500", "redirects and the DB has the row", "is empty", "times out"], correct: 1, explain: "Assert the redirect plus assertDatabaseHas for the new row." },
  ],
  '5.9': [
    { q: "In production, APP_DEBUG should be...", options: ["true", "false", "1", "removed"], correct: 1, explain: "APP_DEBUG=false in production so error details aren't exposed to users." },
    { q: "What does php artisan key:generate do?", options: ["Creates an SSH key", "Sets APP_KEY, used for encryption", "Generates an API token", "Builds assets"], correct: 1, explain: "It sets APP_KEY, which Laravel uses to encrypt sessions and cookies." },
    { q: "Which command builds front-end assets for production?", options: ["npm run dev", "npm run build", "php artisan build", "composer build"], correct: 1, explain: "npm run build produces optimized, versioned assets via Vite." },
    { q: "Why run migrations with --force in production?", options: ["It runs faster", "To skip the interactive confirmation prompt", "To drop tables", "To seed data"], correct: 1, explain: "php artisan migrate --force runs without the confirmation prompt." },
    { q: "What does php artisan config:cache improve?", options: ["Security only", "Boot performance — config compiled into one cached file", "Database size", "Asset size"], correct: 1, explain: "It caches merged config into a single file. Re-run after config changes." },
    { q: "In production, APP_ENV should be...", options: ["local", "production", "testing", "debug"], correct: 1, explain: "Set APP_ENV=production (and APP_DEBUG=false)." },
    { q: "What does php artisan key:generate set?", options: ["The DB password", "The APP_KEY used for encryption", "The admin user", "The domain"], correct: 1, explain: "It generates the APP_KEY for encryption/sessions." },
    { q: "Why run migrations with --force in production?", options: ["It is faster", "To skip the interactive confirmation prompt", "To undo migrations", "To seed data"], correct: 1, explain: "--force bypasses the confirmation prompt in production." },
    { q: "Which builds optimized front-end assets for production?", options: ["npm run dev", "npm run build", "vite serve", "artisan build"], correct: 1, explain: "npm run build produces minified production assets." },
    { q: "Why must APP_DEBUG be false in production?", options: ["Speed only", "To avoid leaking stack traces/secrets to users", "To enable caching", "It is optional"], correct: 1, explain: "Debug mode exposes sensitive error details — keep it off live." },
  ],
};

// Attach each topic's questions to its lesson.
MODULES.forEach(m => m.lessons.forEach(l => {
  l.quiz = QUIZZES[l.id] || [];
}));;

// Flatten lessons in order so we can navigate prev/next easily.
const ALL_LESSONS = MODULES.flatMap(m => m.lessons.map(l => ({ ...l, moduleTitle: m.title })));

// Exercise answer checkers, keyed by lesson id.
// Each requirement is { re: RegExp, hint: string }. An answer counts as correct
// when EVERY requirement's regex matches the user's input. These check that the
// answer addresses the problem (key constructs/values) rather than matching the
// reference solution character-for-character — many valid styles pass. When a
// requirement fails, its `hint` tells the learner what to fix and why.
const EXERCISE_CHECKS = {
  '1.1': [
    { re: /\b(echo|print)\b/i, hint: 'Use echo (or print) to output text.' },
    { re: /I am learning Laravel/i, hint: 'Output the exact text: I am learning Laravel.' },
  ],
  '1.2': [
    { re: /\$title\s*=/i, hint: 'Create a $title variable.' },
    { re: /\$author\s*=/i, hint: 'Create an $author variable.' },
    { re: /\$year\s*=/i, hint: 'Create a $year variable.' },
    { re: /\becho\b/i, hint: 'Use echo to print the sentence.' },
  ],
  '1.3': [
    { re: /\$car\s*=\s*\[/i, hint: 'Create $car as an array using [ ].' },
    { re: /['"]make['"]\s*=>/i, hint: 'Add a "make" key.' },
    { re: /['"]model['"]\s*=>/i, hint: 'Add a "model" key.' },
    { re: /['"]year['"]\s*=>/i, hint: 'Add a "year" key.' },
    { re: /\becho\b/i, hint: 'Echo the formatted string.' },
    { re: /\(/, hint: 'Wrap the year in parentheses, e.g. (2022).' },
  ],
  '1.4': [
    { re: /foreach\s*\(/i, hint: 'Loop over $scores with foreach.' },
    { re: /\bif\b/i, hint: 'Use an if to test each score.' },
    { re: />=\s*60|60\s*<=|>\s*59/i, hint: 'A pass is 60 or above (score >= 60).' },
    { re: /PASS/, hint: 'Echo "PASS" for passing scores.' },
    { re: /FAIL/, hint: 'Echo "FAIL" for failing scores.' },
  ],
  '1.5': [
    { re: /function\s+isEven/i, hint: 'Define a function named isEven.' },
    { re: /%\s*2/, hint: 'Use the modulo operator (% 2) to test evenness.' },
    { re: /(===|==)\s*0/, hint: 'Check that the remainder equals 0.' },
    { re: /\breturn\b/i, hint: 'Return the boolean result.' },
    { re: /isEven\s*\(\s*4\s*\)/i, hint: 'Call isEven(4).' },
    { re: /isEven\s*\(\s*7\s*\)/i, hint: 'Call isEven(7).' },
  ],
  '1.6': [
    { re: /class\s+Book/i, hint: 'Declare a class named Book.' },
    { re: /function\s+__construct/i, hint: 'Add a __construct() that sets the properties.' },
    { re: /function\s+describe/i, hint: 'Add a describe() method.' },
    { re: /\$this->/, hint: 'Use $this-> to read the properties inside describe().' },
    { re: /new\s+Book/i, hint: 'Create an instance with new Book(...).' },
    { re: /->describe\s*\(/i, hint: 'Call ->describe() and echo the result.' },
  ],
  '1.7': [
    { re: /class\s+Vehicle/i, hint: 'Declare a Vehicle class.' },
    { re: /function\s+move/i, hint: 'Give Vehicle a move() method.' },
    { re: /class\s+Car\s+extends\s+Vehicle/i, hint: 'Car must extend Vehicle: class Car extends Vehicle.' },
    { re: /driving on the road/i, hint: 'Car::move() should return "driving on the road".' },
    { re: /new\s+Car/i, hint: 'Create a Car instance and call ->move().' },
  ],
  '1.8': [
    { re: /use\s+App\\Services\\PaymentService/i, hint: 'Import it with: use App\\Services\\PaymentService;' },
  ],
  '2.1': [
    { re: /GET\s+\/posts\/5\/comments/i, hint: 'View all comments: GET /posts/5/comments' },
    { re: /POST\s+\/posts\/5\/comments/i, hint: 'Create a comment: POST /posts/5/comments' },
    { re: /DELETE\s+\/comments\/17/i, hint: 'Delete a comment: DELETE /comments/17' },
  ],
  '2.2': [
    { re: /1[\s.):\-]*view/i, hint: 'Item 1 (HTML for a profile page) is a View.' },
    { re: /2[\s.):\-]*controller/i, hint: 'Item 2 (fetch a user by ID, pass to a page) is a Controller.' },
    { re: /3[\s.):\-]*model/i, hint: 'Item 3 (fullName combining fields) belongs on the Model.' },
  ],
  '2.3': [
    { re: /insert\s+into\s+posts/i, hint: 'Use INSERT INTO posts ... to add the row.' },
    { re: /['"]hello['"]/i, hint: "Insert the title 'Hello'." },
    { re: /select[\s\S]*from\s+posts/i, hint: 'Use SELECT ... FROM posts to read rows.' },
    { re: /where[\s\S]*user_id\s*=\s*3/i, hint: 'Filter the select with WHERE user_id = 3.' },
  ],
  '3.1': [
    { re: /make:controller\s+OrderController/i, hint: '(a) php artisan make:controller OrderController' },
    { re: /make:model\s+Order\s+-m/i, hint: '(b) php artisan make:model Order -m (the -m also makes the migration).' },
    { re: /\bmigrate\b/i, hint: '(c) php artisan migrate' },
  ],
  '3.2': [
    { re: /\/greet\/\{name\}/i, hint: "Match the path: '/greet/{name}'." },
    { re: /function\s*\(\s*\$name/i, hint: 'The closure must accept the parameter: function ($name).' },
    { re: /\breturn\b/i, hint: 'Return the greeting.' },
    { re: /hi/i, hint: 'The response should say "Hi, ...".' },
    { re: /\$name/, hint: 'Include the $name value in the response.' },
  ],
  '3.3': [
    { re: /function\s+show\s*\(\s*\$id/i, hint: 'Define show($id).' },
    { re: /User::findOrFail\s*\(\s*\$id/i, hint: 'Use User::findOrFail($id) to load the user.' },
    { re: /view\s*\(\s*['"]users\.show['"]/i, hint: "Return view('users.show', ...)." },
    { re: /['"]user['"]\s*=>/i, hint: "Pass the user as 'user' => $user." },
  ],
  '3.4': [
    { re: /@if\s*\(\s*\$user/i, hint: 'Use @if ($user) to test whether the user is set.' },
    { re: /@else/i, hint: 'Add an @else branch for the guest case.' },
    { re: /@endif/i, hint: 'Close the conditional with @endif.' },
    { re: /welcome/i, hint: 'Print a "Welcome, ..." message.' },
    { re: /guest/i, hint: 'The fallback should say "Welcome, guest!".' },
    { re: /\$user->name|\{\{\s*\$user/i, hint: "Show the name with {{ $user->name }}." },
  ],
  '3.5': [
    { re: /Schema::create\s*\(\s*['"]comments['"]/i, hint: "Use Schema::create('comments', ...)." },
    { re: /->id\s*\(/i, hint: 'Add $table->id().' },
    { re: /foreignId\s*\(\s*['"]post_id['"]/i, hint: "Add $table->foreignId('post_id')." },
    { re: /constrained\s*\(/i, hint: 'Chain ->constrained() to link post_id to the posts table.' },
    { re: /->text\s*\(\s*['"]body['"]/i, hint: "Add $table->text('body')." },
    { re: /timestamps\s*\(/i, hint: 'Add $table->timestamps().' },
  ],
  '3.6': [
    { re: /Post::where\s*\(\s*['"]is_published['"]\s*,\s*(true|1)/i, hint: "Filter with Post::where('is_published', true)." },
    { re: /orderBy\s*\(\s*['"]created_at['"]\s*,\s*['"]desc['"]/i, hint: "Order with ->orderBy('created_at', 'desc')." },
    { re: /->get\s*\(/i, hint: 'Execute the query with ->get().' },
  ],
  '3.7': [
    { re: /function\s+post\s*\(/i, hint: 'On Comment, add a post() method.' },
    { re: /belongsTo\s*\(\s*Post::class/i, hint: 'post() should return $this->belongsTo(Post::class).' },
    { re: /function\s+comments\s*\(/i, hint: 'On Post, add a comments() method.' },
    { re: /hasMany\s*\(\s*Comment::class/i, hint: 'comments() should return $this->hasMany(Comment::class).' },
  ],
  '3.8': [
    { re: /=>\s*['"][^'"]*email/i, hint: "email needs the email rule, e.g. 'required|email'." },
    { re: /required/i, hint: 'Mark email and password as required.' },
    { re: /min:8/i, hint: "password needs 'required|min:8'." },
    { re: /nullable/i, hint: 'age is optional, so use nullable.' },
    { re: /integer/i, hint: 'age should be an integer.' },
    { re: /min:13/i, hint: 'age minimum is 13 (min:13).' },
    { re: /max:120/i, hint: 'age maximum is 120 (max:120).' },
  ],
  '3.9': [
    { re: /middleware\s*\(\s*['"]auth['"]/i, hint: "Apply Route::middleware('auth')." },
    { re: /->group\s*\(/i, hint: 'Wrap the routes in ->group(function () { ... }).' },
    { re: /\/account(?!\/edit)/i, hint: 'Include the /account route.' },
    { re: /\/account\/edit/i, hint: 'Include the /account/edit route.' },
  ],
  '3.10': [
    { re: /class\s+EnsureSubscribed/i, hint: 'Name the class EnsureSubscribed.' },
    { re: /function\s+handle\s*\(/i, hint: 'Add a handle(Request $request, Closure $next) method.' },
    { re: /is_subscribed/i, hint: 'Check $request->user()->is_subscribed.' },
    { re: /abort\s*\(\s*403/i, hint: 'Abort with 403 when not subscribed: abort(403, ...).' },
    { re: /return\s+\$next\s*\(\s*\$request/i, hint: 'Let valid requests through with return $next($request).' },
  ],
  '4.1': [
    { re: /\/hello\/\{name\}/i, hint: 'Keep the /hello/{name} route pattern.' },
    { re: /function\s*\(\s*\$name/i, hint: 'The fix: the closure must accept the parameter — function ($name).' },
    { re: /\$name/, hint: 'Use $name in the returned string.' },
  ],
  '4.2': [
    { re: /Post::where/i, hint: "Keep the Post::where('user_id', ...) filter." },
    { re: /->get\s*\(/i, hint: 'The fix: add ->get() (or ->paginate()/->first()) so the query actually runs.' },
  ],
  '4.3': [
    { re: /\$fillable/i, hint: 'The fix: declare protected $fillable on the Post model.' },
    { re: /user_id/i, hint: 'Include user_id in $fillable (the controller mass-assigns it).' },
    { re: /title/i, hint: 'Include title in $fillable.' },
    { re: /body/i, hint: 'Include body in $fillable.' },
  ],
  '4.4': [
    { re: /@foreach\s*\(\s*\$posts\s+as\s+\$post\b/i, hint: 'The fix: @foreach ($posts as $post) — collection on the left, item on the right.' },
    { re: /\$post->title/i, hint: 'Print the singular item: {{ $post->title }}.' },
  ],
  '5.1': [
    { re: /laravel new\s+blog|create-project\s+laravel\/laravel/i, hint: 'Create the app: laravel new blog' },
    { re: /cd\s+blog/i, hint: 'Move into the project: cd blog' },
    { re: /\bmigrate\b/i, hint: 'Run the migrations: php artisan migrate' },
  ],
  '5.2': [
    { re: /composer require\s+laravel\/breeze/i, hint: 'Require Breeze: composer require laravel/breeze --dev' },
    { re: /breeze:install/i, hint: 'Scaffold the auth views: php artisan breeze:install blade' },
    { re: /npm (install|run build|run dev)/i, hint: 'Compile assets: npm install && npm run build' },
    { re: /\bmigrate\b/i, hint: 'Run php artisan migrate' },
  ],
  '5.3': [
    { re: /Schema::create\s*\(\s*['"]posts['"]/i, hint: "Use Schema::create('posts', ...)." },
    { re: /foreignId\s*\(\s*['"]user_id['"]/i, hint: "Add a user_id foreign key: foreignId('user_id')." },
    { re: /constrained\s*\(/i, hint: 'Chain ->constrained() to link user_id to the users table.' },
    { re: /->string\s*\(\s*['"]title['"]/i, hint: "Add the title column: string('title')." },
    { re: /->text\s*\(\s*['"]body['"]/i, hint: "Add the body column: text('body')." },
    { re: /timestamps\s*\(/i, hint: 'Add $table->timestamps().' },
    { re: /\$fillable/i, hint: 'Declare $fillable on the Post model (title, body, user_id).' },
  ],
  '5.4': [
    { re: /function\s+index\s*\(/i, hint: 'Define the index() method.' },
    { re: /Post::(latest|orderBy|all)/i, hint: 'Fetch the posts, e.g. Post::latest().' },
    { re: /->get\s*\(|::all\s*\(/i, hint: 'Execute the query with ->get() (or use Post::all()).' },
    { re: /view\s*\(\s*['"]posts\.index['"]/i, hint: "Return view('posts.index', ...)." },
    { re: /['"]posts['"]\s*=>/i, hint: "Pass the collection as 'posts' => $posts." },
  ],
  '5.5': [
    { re: /@foreach\s*\(\s*\$posts\s+as\s+\$post/i, hint: 'Loop with @foreach ($posts as $post).' },
    { re: /route\s*\(\s*['"]posts\.show['"]/i, hint: "Link with route('posts.show', $post)." },
    { re: /\$post->title/i, hint: 'Print the title: {{ $post->title }}.' },
    { re: /@endforeach/i, hint: 'Close the loop with @endforeach.' },
  ],
  '5.6': [
    { re: /function\s+store\s*\(/i, hint: 'Define store(Request $request).' },
    { re: /->validate\s*\(/i, hint: 'Validate input with $request->validate([...]).' },
    { re: /['"]title['"]\s*=>\s*['"][^'"]*required/i, hint: "title rule: 'required|max:255'." },
    { re: /['"]body['"]\s*=>\s*['"][^'"]*required/i, hint: "body rule: 'required'." },
    { re: /user\(\)->id|user_id/i, hint: 'Attach the author: $request->user()->id.' },
    { re: /Post::create\s*\(/i, hint: 'Create the post with Post::create(...).' },
    { re: /redirect\s*\(/i, hint: 'Redirect after saving.' },
    { re: /posts\.index/i, hint: 'Redirect to the posts.index route.' },
  ],
  '5.7': [
    { re: /function\s+post\s*\(/i, hint: 'On Comment, add a post() method.' },
    { re: /belongsTo\s*\(\s*Post::class/i, hint: 'post() returns $this->belongsTo(Post::class).' },
    { re: /function\s+comments\s*\(/i, hint: 'On Post, add a comments() method.' },
    { re: /hasMany\s*\(\s*Comment::class/i, hint: 'comments() returns $this->hasMany(Comment::class).' },
  ],
  '5.8': [
    { re: /actingAs\s*\(/i, hint: 'Authenticate in the test: $this->actingAs($user).' },
    { re: /->post\s*\(\s*['"]\/posts['"]/i, hint: 'POST to /posts with the form data.' },
    { re: /assertDatabaseHas\s*\(\s*['"]posts['"]/i, hint: "Assert the row exists: assertDatabaseHas('posts', ...)." },
    { re: /['"]Hello['"]/i, hint: "Use the title 'Hello' so you can assert on it." },
  ],
  '5.9': [
    { re: /key:generate/i, hint: 'Generate the app key: php artisan key:generate.' },
    { re: /npm run build/i, hint: 'Build assets for production: npm run build.' },
    { re: /migrate\s+--force/i, hint: 'Run migrations non-interactively: php artisan migrate --force.' },
  ],
};

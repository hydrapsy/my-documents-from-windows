scopenotes.js


var name = 'Todd';
var scope1 = function () {
  // name is available here
  var scope2 = function () {
    // name is available here too
    var scope3 = function () {
      // name is also available here!
    };
  };
};
The only important thing to remember is that Lexical scope does not work backwards. Here we can see how Lexical scope doesn't work:

// name = undefined
var scope1 = function () {
  // name = undefined
  var scope2 = function () {
    // name = undefined
    var scope3 = function () {
      var name = 'Todd'; // locally scoped
    };
  };
};
I can always return a reference to name, but never the variable itself.

Scope Chain

Scope chains establish the scope for a given function. Each function defined has its own nested scope as we know, and any function defined within another function has a local scope which is linked to the outer function - this link is called the chain. It's always the position in the code that defines the scope. When resolving a variable, JavaScript starts at the innermost scope and searches outwards until it finds the variable/object/function it was looking for.

Closures

Closures ties in very closely with Lexical Scope. A better example of how the closure side of things works, can be seen when returning a function reference - a more practical usage. Inside our scope, we can return things so that they're available in the parent scope:

var sayHello = function (name) {
  var text = 'Hello, ' + name;
  return function () {
    console.log(text);
  };
};
The closure concept we've used here makes our scope inside sayHello inaccessible to the public scope. Calling the function alone will do nothing as it returns a function:

sayHello('Todd'); // nothing happens, no errors, just silence...
The function returns a function, which means it needs assignment, and then calling:

var helloTodd = sayHello('Todd');
helloTodd(); // will call the closure and log 'Hello, Todd'
Okay, I lied, you can call it, and you may have seen functions like this, but this will call your closure:

sayHello2('Bob')(); // calls the returned function without assignment
AngularJS uses the above technique for it's $compile method, where you pass the current scope reference into the closure:

$compile(template)(scope);
Meaning we could guess that their code would (over-simplified) look like this:

var $compile = function (template) {
  // some magic stuff here
  // scope is out of scope, though...
  return function (scope) {
    // access to `template` and `scope` to do magic with too
  };
};
A function doesn't have to return in order to be called a closure though. Simply accessing variables outside of the immediate lexical scope creates a closure.

Scope and 'this'

Each scope binds a different value of this depending on how the function is invoked. We've all used the this keyword, but not all of us understand it and how it differs when invoked. By default this refers to the outer most global object, the window. We can easily show how invoking functions in different ways binds the this value differently:

var myFunction = function () {
  console.log(this); // this = global, [object Window]
};
myFunction();

var myObject = {};
myObject.myMethod = function () {
  console.log(this); // this = Object { myObject }
};

var nav = document.querySelector('.nav'); // <nav class="nav">
var toggleNav = function () {
  console.log(this); // this = <nav> element
};
nav.addEventListener('click', toggleNav, false);
There are also problems that we run into when dealing with the this value, for instance if I do this, even inside the same function the scope can be changed and the this value can be changed:

var nav = document.querySelector('.nav'); // <nav class="nav">
var toggleNav = function () {
  console.log(this); // <nav> element
  setTimeout(function () {
    console.log(this); // [object Window]
  }, 1000);
};
nav.addEventListener('click', toggleNav, false);
So what's happened here? We've created new scope which is not invoked from our event handler, so it defaults to the window Object as expected. There are several things we can do if we want to access the proper this value which isn't affected by the new scope. You might have seen this before, where we can cache a reference to the this value using a that variable and refer to the lexical binding:

var nav = document.querySelector('.nav'); // <nav class="nav">
var toggleNav = function () {
  var that = this;
  console.log(that); // <nav> element
  setTimeout(function () {
    console.log(that); // <nav> element
  }, 1000);
};
nav.addEventListener('click', toggleNav, false);
This is a neat little trick to be able to use the proper this value and resolve problems with newly created scope.

Changing scope with .call(), .apply() and .bind()

Sometimes you need to manipulate the scopes of your JavaScript depending on what you're looking to do. A simple demonstration of how to change the scope when looping:

var links = document.querySelectorAll('nav li');
for (var i = 0; i < links.length; i++) {
  console.log(this); // [object Window]
}
The this value here doesn't refer to our elements, we're not invoking anything or changing the scope. Let's look at how we can change scope (well, it looks like we change scope, but what we're really doing is changing the context of how the function is called).

.call() and .apply()
The .call() and .apply() methods are really sweet, they allows you to pass in a scope to a function, which binds the correct this value. Let's manipulate the above function to make it so that our this value is each element in the array:

var links = document.querySelectorAll('nav li');
for (var i = 0; i < links.length; i++) {
  (function () {
    console.log(this);
  }).call(links[i]);
}
You can see I'm passing in the current element in the Array iteration, links[i], which changes the scope of the function so that the this value becomes that iterated element. We can then use the this binding if we wanted. We can use either .call() or .apply() to change the scope, but any further arguments are where the two differ: .call(scope, arg1, arg2, arg3) takes individual arguments, comma separated, whereas .apply(scope, [arg1, arg2]) takes an Array of arguments.

It's important to remember that using .call() or .apply() actually invokes your function, so instead of doing this:

myFunction(); // invoke myFunction
You'll let .call() handle it and chain the method:

myFunction.call(scope); // invoke myFunction using .call()
.bind()
Unlike the above, using .bind() does not invoke a function, it merely binds the values before the function is invoked. It's a real shame this was introduced in ECMASCript 5 and not earlier as this method is fantastic. As you know we can't pass parameters into function references, something like this:

// works
nav.addEventListener('click', toggleNav, false);

// will invoke the function immediately
nav.addEventListener('click', toggleNav(arg1, arg2), false);
We can fix this, by creating a new function inside it:

nav.addEventListener('click', function () {
  toggleNav(arg1, arg2);
}, false);
But again this changes scope and we're creating a needless function again, which will be costly on performance if we were inside a loop and binding event listeners. This is where .bind() shines through, as we can pass in arguments but the functions are not called:

nav.addEventListener('click', toggleNav.bind(scope, arg1, arg2), false);
The function isn't invoked, and the scope can be changed if needed, but arguments are sat waiting to be passed in.

Private and Public Scope

In many programming languages, you'll hear about public and private scope, in JavaScript there is no such thing. We can, however, emulate public and private scope through things like Closures.

By using JavaScript design patterns, such as the Module pattern for example, we can create public and private scope. A simple way to create private scope, is by wrapping our functions inside a function. As we've learned, functions create scope, which keeps things out of the global scope:

(function () {
  // private scope inside here
})();
We might then add a few functions for use in our app:

(function () {
  var myFunction = function () {
    // do some stuff here
  };
})();
But when we come to calling our function, it would be out of scope:

(function () {
  var myFunction = function () {
    // do some stuff here
  };
})();

myFunction(); // Uncaught ReferenceError: myFunction is not defined
Success! We've created private scope. But what if I want the function to be public? There's a great pattern (called the Module Pattern [and Revealing Module Pattern]) which allows us to scope our functions correctly, using private and public scope and an Object. Here I grab my global namespace, called Module, which contains all of my relevant code for that module:

// define module
var Module = (function () {
  return {
    myMethod: function () {
      console.log('myMethod has been called.');
    }
  };
})();

// call module + methods
Module.myMethod();
The return statement here is what returns our public methods, which are accessible in the global scope - but are namespaced. This means our Module takes care of our namespace, and can contain as many methods as we want. We can extend the Module as we wish:

// define module
var Module = (function () {
  return {
    myMethod: function () {

    },
    someOtherMethod: function () {

    }
  };
})();

// call module + methods
Module.myMethod();
Module.someOtherMethod();
So what about private methods? This is where a lot of developers go wrong and pollute the global namespace by dumping all their functions in the global scope. Functions that help our code work do not need to be in the global scope, only the API calls do - things that need to be accessed globally in order to work. Here's how we can create private scope, by not returning functions:

var Module = (function () {
  var privateMethod = function () {

  };
  return {
    publicMethod: function () {

    }
  };
})();
This means that publicMethod can be called, but privateMethod cannot, as it's privately scoped! These privately scoped functions are things like helpers, addClass, removeClass, Ajax/XHR calls, Arrays, Objects, anything you can think of.

Here's an interesting twist though, anything in the same scope has access to anything in the same scope, even after the function has been returned. Which means, our public methods have access to our private ones, so they can still interact but are unaccessible in the global scope.

var Module = (function () {
  var privateMethod = function () {

  };
  return {
    publicMethod: function () {
      // has access to `privateMethod`, we can call it:
      // privateMethod();
    }
  };
})();
This allows a very powerful level of interactivity, as well as code security. A very important part of JavaScript is ensuring security, which is exactly why we can't afford to put all functions in the global scope as they'll be publically available, which makes them open to vulnerable attacks.

Here's an example of returning an Object, making use of public and private methods:

var Module = (function () {
  var myModule = {};
  var privateMethod = function () {

  };
  myModule.publicMethod = function () {

  };
  myModule.anotherPublicMethod = function () {

  };
  return myModule; // returns the Object with public methods
})();

// usage
Module.publicMethod();
One neat naming convention is to begin private methods with an underscore, which visually helps you differentiate between public and private:

var Module = (function () {
  var _privateMethod = function () {

  };
  var publicMethod = function () {

  };
})();
This helps us when returning an anonymous Object, which the Module can use in Object fashion as we can simply assign the function references:

var Module = (function () {
  var _privateMethod = function () {

  };
  var publicMethod = function () {

  };
  return {
    publicMethod: publicMethod,
    anotherPublicMethod: anotherPublicMethod
  }
















// name = undefined
var scope1 = function () {
  // name = undefined
  var scope2 = function () {
    // name = undefined
    var scope3 = function () {
      var name = 'levy'; // locally scoped
    };
  };
};


//Thinking about scope is easy, are we inside Scope A or Scope B?


You'll notice that myOtherFunction isn't being called here, it's simply defined. It's order of call also has effect on how the scoped variables react, here I've defined my function and called it under another console statement:

var myFunction = function () {
  var name = 'Todd';
  var myOtherFunction = function () {
    console.log('My name is ' + name);
  };
  console.log(name);
  myOtherFunction(); // call function
};

// Will then log out:
// `Todd`
// `My name is Todd`
Lexical scope is easy to work with, any variables/objects/functions defined in it's parent scope, are available in the scope chain. For example:

Function scope


Lexical Scope

Whenever you see a function within another function, the inner function has access to the scope in the outer function, this is called Lexical Scope or Closure - also referred to as Static Scope. The easiest way to demonstrate that again:

// Scope A
var myFunction = function () {
  // Scope B
  var name = 'Todd'; // defined in Scope B
  var myOtherFunction = function () {
    // Scope C: `name` is accessible here!
  };
};
Function scope


Lexical Scope

Whenever you see a function within another function, the inner function has access to the scope in the outer function, this is called Lexical Scope or Closure - also referred to as Static Scope. The easiest way to demonstrate that again:

// Scope A
var myFunction = function () {
  // Scope B
  var name = 'Todd'; // defined in Scope B
  var myOtherFunction = function () {
    // Scope C: `name` is accessible here!
  };
};

</head>
<body>
<div style="background-color: skyblue; padding:20px">
    <table border="0" cellpadding=3" cellspacing="3">
        <tr>
            <td>
                Enter Input :
            </td>
            <td>
                <input type='text' value='' id='name' name='name'>
            </td>
        </tr>
        <tr>
            <td>
                Vowels Count :
            </td>
            <td>
                <input type='text' readonly="true" value='' id='findVowels_count' name='findVowels_count'>
            </td>
        </tr>
        <tr>
            <td>
                Vowels :
            </td>
            <td>
                <input type='text' readonly="true" value='' id='findVowels' name='findVowels'>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <input type='button' value='Check' onclick="javascript:findVowels();">
            </td>
        </tr>
    </table>
    </div>
</body>
</html>
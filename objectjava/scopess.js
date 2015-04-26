//create a script that exemplifies global scope and local scope by logging into console.


//What is Scope?

//In JavaScript, scope refers to the current context of your code. Scopes can be globally or locally defined. Understanding JavaScript scope is key to writing bulletproof code and being a better developer. You'll understand where variables/functions are accessible, be able to change the scope of your code's context and be able to write faster and more maintainable code, as well as debug much faster.
What is Global Scope?

Before you write a line of JavaScript, you'
// global scopere in what we call the Global Scope. If we declare a variable, it's defined globally:

var name = 'asuquo';


var myFunction = function () {
  var name = 'asuquo';
  console.log(name); // asuquo;
};
// Uncaught ReferenceError: name is not defined
console.log(name);
The variable name is scoped locally, it isn't exposed to the parent scope and therefore undefined.



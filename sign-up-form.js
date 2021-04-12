/*var input = document.querySelector("input");
var button = document.querySelector("button");
var error = document.querySelector(".error");
var errorMsg = document.querySelector(".errorMsg");
var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


button.addEventListener ('click', function (e) {
    
    if (error.style.display === "none",
        errorMsg.style.display = "none",
        input.value === "",
        !input.value.match(mailformat)) {
        input.style.display.css= ("color", "red"),
        error.style.display = "block",
        errorMsg.style.display = "block"
    }
    else if (input.value.match(mailformat)) {
        alert("Whoop whoop, you're in");
       
    }
    else {
        error.style.display = "none",
        errorMsg.style.display = "none"
    }
    

})*/

const form  = document.getElementsByTagName('form')[0];
const email = document.getElementById('mail');
const firstname = document.getElementById('fname');
const lastname = document.getElementById('lname');
const phonenumber = document.getElementById('pnumber');

// The following is a trick to reach the next sibling Element node in the DOM
// This is dangerous because you can easily build an infinite loop.
// In modern browsers, you should prefer using element.nextElementSibling
let error = email, firstname, lastname, phonenumber;
while ((error = error.nextSibling).nodeType != 1);

// As per the HTML5 Specification
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Many legacy browsers do not support the addEventListener method.
// Here is a simple way to handle this; it's far from the only one.
function addEvent(element, event, callback) {
  let previousEventCallBack = element["on"+event];
  element["on"+event] = function (e) {
    const output = callback(e);

    // A callback that returns `false` stops the callback chain
    // and interrupts the execution of the event callback.
    if (output === false) return false;

    if (typeof previousEventCallBack === 'function') {
      output = previousEventCallBack(e);
      if(output === false) return false;
    }
  }
};

// Now we can rebuild our validation constraint
// Because we do not rely on CSS pseudo-class, we have to 
// explicitly set the valid/invalid class on our email field
addEvent(window, "load", function () {
  // Here, we test if the field is empty (remember, the field is not required)
  // If it is not, we check if its content is a well-formed e-mail address.
  const test = email.value.length === 0 || emailRegExp.test(email.value);
  email.className = test ? "valid" : "invalid";

  

});

// This defines what happens when the user types in the field
addEvent(email, "input", function () {
  const test = email.value.length === 0 || emailRegExp.test(email.value);
  
  if (test) {
    email.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  } else {
    email.className = "invalid";
  }
});

addEvent(firstname, "input", function () {
  const testFN = firstname.value;
  
  if (testFN) {
    firstname.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  } else {
    firstname.className = "invalid";
  }
});

// This defines what happens when the user tries to submit the data
/*addEvent(form, "submit", function () {
  const test = email.value.length === 0 || emailRegExp.test(email.value);

  if (!test) {
    email.className = "invalid";
    error.innerHTML = "Pls enter a valid email";
    error.className = "error active";
    erroricon.style.display = "block";

    // Some legacy browsers do not support the event.preventDefault() method
    return false;
  } else {
    email.className = "valid";
    error.innerHTML = "";
    error.className = "error";
    erroricon.style.display = "none";
  }
});*/
addEvent(form, "submit", function () {
  const test = email.value.length === 0 || emailRegExp.test(email.value);
  const testFN = firstname.value;


  if (!test) {
    email.className = "invalid";
    error.innerHTML = "Pls enter a valid email";
    error.className = "error active";
    erroricon.style.display = "block";

    // Some legacy browsers do not support the event.preventDefault() method
    return false;
  } else {
    email.className = "valid";
    error.innerHTML = "";
    error.className = "error";
    erroricon.style.display = "none";
  }

if (testFN == "") {
    firstname.className = "invalid";
    error.innerHTML = "Pls enter your firstname";
    error.className = "error active";
    erroricon.style.display = "block";

    // Some legacy browsers do not support the event.preventDefault() method
    return false;
  } else {
    firstname.className = "valid";
    error.innerHTML = "";
    error.className = "error";
    erroricon.style.display = "none";
  }
});
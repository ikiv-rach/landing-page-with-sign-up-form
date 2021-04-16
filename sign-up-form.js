
const form  = document.getElementsByTagName('form')[0];
const email = document.getElementById('mail');
const firstname = document.getElementById('fname');
const lastname = document.getElementById('lname');
const phonenumber = document.getElementById('pnumber');


let error = email, firstname, lastname, phonenumber;
while ((error = error.nextSibling).nodeType != 1);

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function addEvent(element, event, callback) {
  let previousEventCallBack = element["on"+event];
  element["on"+event] = function (e) {
    const output = callback(e);

    if (output === false) return false;

    if (typeof previousEventCallBack === 'function') {
      output = previousEventCallBack(e);
      if(output === false) return false;
    }
  }
};

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
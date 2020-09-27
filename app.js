//DOM Elements
const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const showPwd = document.querySelector("i");
const showPwd2 = document.querySelector("#show-password2");

function showError(input, message) {
  const formControl = input.parentElement;
  const errorMsg = formControl.querySelector("small");
  formControl.className = "form-control error";
  errorMsg.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkEmail(input) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(input.value.trim())) {
    showError(input, "Email is not valid");
  } else {
    showSuccess(input);
  }
}

function checkLength(input, min, max) {
  const blankSpaceRegex = /^\s*$/;
  if (blankSpaceRegex.test(input.value.trim())) {
    showError(input, `${getFieldName(input)} is required`);
  } else if (input.value.trim().length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must not surpass ${max} characters.`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordsMatch(input, input2) {
  if (input.value !== input2.value) {
    showError(input2, "Password don't match.");
  }
}

function getFieldName(input) {
  if (input.id === "password2") return "Confirm password";
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showPassword(e) {
  const input = e.target.previousElementSibling;
  if (showPwd.className === "far fa-eye") {
    showPwd.className = "far fa-eye-slash";
    input.type = "text";
  } else {
    showPwd.className = "far fa-eye";
    input.type = "password";
  }
}

function showConfirmPassword(e) {
  const input = e.target.previousElementSibling;
  if (showPwd2.className === "far fa-eye") {
    showPwd2.className = "far fa-eye-slash";
    input.type = "text";
  } else {
    showPwd2.className = "far fa-eye";
    input.type = "password";
  }
}
//EventListeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkEmail(email);
  checkLength(username, 3, 15);
  checkLength(password, 3, 25);
  checkPasswordsMatch(password, password2);
});

showPwd.addEventListener("click", showPassword);
showPwd2.addEventListener("click", showConfirmPassword);

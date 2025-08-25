const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorEl = document.getElementById("error");

// Sign Up
signupBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    errorEl.textContent = "Please enter username and password.";
    return;
  }

  if (localStorage.getItem(`user_${username}`)) {
    errorEl.textContent = "Username already exists!";
    return;
  }

  const userData = {
    password,
    balance: 1000.00,
    transactions: []
  };

  localStorage.setItem(`user_${username}`, JSON.stringify(userData));
  alert("Account created! You can now log in.");
  usernameInput.value = "";
  passwordInput.value = "";
});

// Log In
loginBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  const userData = JSON.parse(localStorage.getItem(`user_${username}`));

  if (!userData || userData.password !== password) {
    errorEl.textContent = "Invalid username or password.";
    return;
  }

  localStorage.setItem("loggedInUser", username); // store currently logged in
  window.location.href = "dashboard.html";
});

// Redirect if not logged in
const loggedInUser = localStorage.getItem("loggedInUser");
if (!loggedInUser) window.location.href = "index.html";

// Load user data
let userData = JSON.parse(localStorage.getItem(`user_${loggedInUser}`));

const balanceEl = document.getElementById("balance");
const transactionsEl = document.getElementById("transactions");

balanceEl.textContent = `$${userData.balance.toFixed(2)}`;

// Tab navigation
const tabs = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".tab");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const target = tab.dataset.tab;
    sections.forEach(section => section.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});

// Add rewards
document.getElementById("add-funds").addEventListener("click", () => {
  const reward = Math.floor(Math.random() * 50) + 1;
  userData.balance += reward;
  userData.transactions.push(`Added $${reward} rewards`);
  balanceEl.textContent = `$${userData.balance.toFixed(2)}`;
  updateTransactions();
  localStorage.setItem(`user_${loggedInUser}`, JSON.stringify(userData));
});

function updateTransactions() {
  transactionsEl.innerHTML = "";
  if (userData.transactions.length === 0) {
    transactionsEl.innerHTML = "<li>No transactions yet.</li>";
    return;
  }
  userData.transactions.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    transactionsEl.appendChild(li);
  });
}

// Change username
document.getElementById("change-username").addEventListener("click", () => {
  const newUsername = document.getElementById("new-username").value.trim();
  if (!newUsername) return;

  localStorage.setItem(`user_${newUsername}`, JSON.stringify(userData));
  localStorage.removeItem(`user_${loggedInUser}`);
  localStorage.setItem("loggedInUser", newUsername);
  alert("Username changed!");
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
});

// Initial transaction render
updateTransactions();

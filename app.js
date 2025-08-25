// Tab functionality
const tabs = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".tab");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const target = tab.dataset.tab;
    sections.forEach(section => {
      section.classList.remove("active");
      if (section.id === target) section.classList.add("active");
    });
  });
});

// Fake transaction & balance logic
let balance = 1000.00;
const balanceEl = document.getElementById("balance");
const transactionsEl = document.getElementById("transactions");
const addFundsBtn = document.getElementById("add-funds");

addFundsBtn.addEventListener("click", () => {
  const reward = Math.floor(Math.random() * 50) + 1; // Random $1-$50
  balance += reward;
  balanceEl.textContent = `$${balance.toFixed(2)}`;
  
  const li = document.createElement("li");
  li.textContent = `Added $${reward.toFixed(2)} in rewards`;
  transactionsEl.appendChild(li);
});

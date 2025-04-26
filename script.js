const form = document.getElementById('expense-form');
const nameInput = document.getElementById('name');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const categoryInput = document.getElementById('category');
const expensesTable = document.getElementById('expenses-table');
const totalDisplay = document.getElementById('total');

let expenses = [];

//Carrega despesas salvas do localStorage
window.onload = () => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
        expenses = JSON.parse(saved);
        renderExpenses();
        updateTotal();
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;
    const category = categoryInput.value;

    if (!name || !amount || !date || !category) return;

    const expense = {
        id: Date.now(),
        name,
        amount,
        date,
        category
};

    expenses.push(expense);
    saveExpenses();
    renderExpenses();
    updateTotal();
    form.reset();
});

function renderExpenses() {
    expensesTable.innerHTML = '';

    expenses.forEach(exp => {
     const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${exp.name}</td>
            <td>${exp.amount.toFixed(2)}</td>
            <td>${new Date(exp.date).toLocaleDateString()}</td>
            <td>${exp.category}</td>
            <td><button onclick="deleteExpense(${exp.id})">Excluir</button></td>
        `;
        expensesTable.appendChild(tr);
    });    
}


function deleteExpense (id) {
    expenses = expenses.filter(exp => exp.id !== id);
    saveExpenses();
    renderExpenses();
    updateTotal();
}

function updateTotal() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalDisplay.textContent = `R$ ${total.toFixed(2)}`;
}

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}
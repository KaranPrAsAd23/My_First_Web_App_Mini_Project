document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const list = document.getElementById('expense-list');
    const totalSpan = document.getElementById('total');
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function renderExpenses() {
        list.innerHTML = '';
        let total = 0;
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${expense.description}</strong> - ₹${expense.amount} (${expense.category}) on ${expense.date}
                </div>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            list.appendChild(li);
            total += parseFloat(expense.amount);
        });
        totalSpan.textContent = total.toFixed(2);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;

        expenses.push({ description, amount, category, date });
        renderExpenses();
        form.reset();
    });

    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            expenses.splice(index, 1);
            renderExpenses();
        }
    });

    renderExpenses();
});

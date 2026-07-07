let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let total = 0;
let editIndex = -1;

function displayExpenses() {
    let list = document.getElementById("list");
    list.innerHTML = "";
    total = 0;

    for (let i = 0; i < expenses.length; i++) {

        let item = document.createElement("li");

        item.innerHTML = `
            <span>
                ${expenses[i].name} - ₹${expenses[i].amount}
                (${expenses[i].category}) ${expenses[i].date}
            </span>
        `;

        // Edit Button
        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.style.backgroundColor = "#2196F3";
        editBtn.style.color = "white";

        editBtn.onclick = function () {
            editExpense(i);
        };

        // Delete Button
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.style.backgroundColor = "#f44336";
        deleteBtn.style.color = "white";

        deleteBtn.onclick = function () {
            deleteExpense(i);
        };

        item.appendChild(editBtn);
        item.appendChild(deleteBtn);

        list.appendChild(item);

        total += Number(expenses[i].amount);
    }

    document.getElementById("total").innerText = total;

    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {

    let name = document.getElementById("name").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;

    if (name === "" || amount === "" || category === "" || date === "") {
        alert("Please fill all fields");
        return;
    }

    if (editIndex === -1) {

        expenses.push({
            name: name,
            amount: amount,
            category: category,
            date: date
        });

    } else {

        expenses[editIndex] = {
            name: name,
            amount: amount,
            category: category,
            date: date
        };

        editIndex = -1;
        document.getElementById("addBtn").innerText = "Add Expense";
    }

    displayExpenses();

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
}

function editExpense(index) {

    document.getElementById("name").value = expenses[index].name;
    document.getElementById("amount").value = expenses[index].amount;
    document.getElementById("category").value = expenses[index].category;
    document.getElementById("date").value = expenses[index].date;

    editIndex = index;

    document.getElementById("addBtn").innerText = "Update Expense";
}

function deleteExpense(index) {

    if (confirm("Are you sure you want to delete this expense?")) {
        expenses.splice(index, 1);
        displayExpenses();
    }
}

displayExpenses();


    
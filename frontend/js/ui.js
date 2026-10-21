let myPieChart = null; // This will hold the Chart.js instance
const chartCanvas = document.getElementById("expenseChart"); // The blank picture frame

// Step 1: Find the Target from the html.
const transactionsData = document.getElementById("transaction-list");

function addExpenseToUI(expense){
    // Step 2: Creating a new, empty <li> tag
    const lst = document.createElement('li');

    // Step 3: Fill the Element
    // In ui.js, update your innerHTML to look like this:
    lst.innerHTML = `
        <span>${expense.description} - $${expense.amount}</span>
        <button class="delete-btn" data-id="${expense.id}">X</button> 
    `;

    transactionsData.appendChild(lst);
}
    
// Calculation about the expenses
function updateTotal(expensesArray){
    let total = 0;
    for(let i=0; i<expensesArray.length; i++){
        total += Number(expensesArray[i].amount); // Math safety check
    }

    // Update the UI..
    const totalBalanceElement = document.getElementById('total-balance');
    totalBalanceElement.innerText = `$${total.toFixed(2)}`;
}

function updateChartData(expensesArray){
    let categoryTotals = {
        "Food": 0,
        "Transport": 0,
        "Utilities": 0,
        "Other": 0,
    };

    expensesArray.forEach(expense => {
        const category = expense.category;
        const amount = Number(expense.amount); // Math safety check

        // FIX: Check if the category exists in your chart tally list. 
        // If it doesn't match "Food", "Transport", or "Utilities", dump it into "Other"!
        if (categoryTotals.hasOwnProperty(category)) {
            categoryTotals[category] += amount;
        } else {
            categoryTotals["Other"] += amount;
        }
    });

    // Print the final tally book to the console to verify
    console.log("Chart Data Sorted:", categoryTotals);

    // If a chart already exists, destroy it before drawing a new one (prevents glitches)
    if (myPieChart !== null) {
        myPieChart.destroy();
    }

    // Give the instructions to the Chart.js artist
    myPieChart = new Chart(chartCanvas, {
        type: 'pie',
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals),
                backgroundColor: ['#00d09c', '#3b82f6', '#f59e0b', '#dc2626'] // Groww theme colors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
}

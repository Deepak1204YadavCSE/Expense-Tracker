// app.js (The Controller): This is where you will write the event listeners to capture form submissions and manage your main array of expenses
//app.js is where we start. This file acts as the "Controller" for your dashboard.

// adding the event listener to form tags... since the all descriptions,amounts,add transaction button all are wrapped into the form tag itself so the ...best pratice is that to add event listener to directly to the form is far better than the adding the individual event-listerner.



// Read the Hard Drive (At the very top)
// Grabs saved data and parses it back into an array, or defaults to an empty array []
// const expenses = []; // creating an array for the storing the data after entering at frontend.
// Change your empty array declaration to
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];


const formEvent = document.getElementById("expense-form");

function SubmitHandler(evnt){
    evnt.preventDefault();

    const description = document.getElementById("description").value;
    // const amount = document.getElementById("amount").value;
    //: Fix the Math by converting text string to a real decimal number

    //• The Problem: Web inputs always return data as text, even for numbers. Using + will just glue the text together (e.g., "50" + "50" = "5050").
    //• The Solution: Convert the text into a real number using parseFloat() so the math adds up correctly (e.g., 50 + 50 = 100).
    const amount = parseFloat(document.getElementById("amount").value);

    const category = document.getElementById("category").value;

    // Create the structured Object with a unique ID
    const newExpense = {
        id: Date.now(), // Unique ID based on the exact millisecond clicked by using Date.now()
        description: description,
        amount: amount,
        category: category
    };

    // CHALLENGE 4: Push the new object into the master array
    expenses.push(newExpense);

    // CHALLENGE 4: Log the entire master array to watch it grow!
    console.log("Master Expense Array:", expenses);

    console.log("Form successfully submitted via the button!");
    console.log("Extracted Data -> Description:", description, "| Amount:", amount, "| Category:", category);
    alert(`Success! Check your console.log`);
    
    // 3. THE MISSING LINK: Pass the data to the UI function so it renders!
    addExpenseToUI(newExpense);

    // 
    updateTotal(expenses);

    //
    updateChartData(expenses);
    
    //
    saveExpenses(expenses);
    
    // 4. Reset the input fields ->> we will eventually call a function to refresh the UI!
    formEvent.reset();
}

formEvent.addEventListener("submit", SubmitHandler);


//because the data is in the array doesn't mean the user can see it.These two lines so your Painter (ui.js) immediately draws your saved data the second the page loads:
expenses.forEach(expense => addExpenseToUI(expense));
updateTotal(expenses);
updateChartData(expenses);


//Deleting the Dynamic Button 
// At the bottom of app.js
document.getElementById('transaction-list').addEventListener('click', function(event) {
    
    // Check if the exact element clicked contains the class 'delete-btn'
    if (event.target.classList.contains('delete-btn')) {
        
        // 1. Grab the unique ID from the button that was clicked
        const idToDelete = parseInt(event.target.getAttribute('data-id'));

        // 2. Filter the master array: Keep everything EXCEPT the one that matches the ID
        expenses = expenses.filter(expense => expense.id !== idToDelete);

        // 3. Save the new, smaller array to the hard drive
        saveExpenses(expenses);

        // 4. Wipe the list completely clean from the screen
        document.getElementById('transaction-list').innerHTML = '';

        // 5. Repaint the screen with the new, smaller array
        expenses.forEach(expense => addExpenseToUI(expense));
        
        // 6. Recalculate the total balance and the pie chart!
        updateTotal(expenses);
        updateChartData(expenses);
        
    }
});




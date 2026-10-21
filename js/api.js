// Data Persistence storage logic belongs in javaScript... later we shifted to the DataBase.
function saveExpenses(expensesArray){
    //Use localStorage.setItem and wrap the array in JSON.stringify
    // We give it a key name (like 'expenses') so the browser knows where to find it later
    localStorage.setItem('expenses', JSON.stringify(expensesArray));
}
/*
Assignment: GUI1 Homework3
Name: Alvin Tran
Date: 10/26/21
Resources Used: https://www.w3schools.com/
*/

/*
After clicking the submit button, the receiveForm function is called.
The receiveForm function gets the minimum and maximum row/column values that will be used
to create the multiplication table and then make calls to the deleteTable, validateForm, and
createTable functions.
*/
function receiveForm() {
    var minRow = parseFloat(document.getElementById("minRow").value);  // get minRow value, turn string into float
    var maxRow = parseFloat(document.getElementById("maxRow").value);  // get maxRow value, turn string into float
    var minCol = parseFloat(document.getElementById("minCol").value);  // get minCol value, turn string into float
    var maxCol = parseFloat(document.getElementById("maxCol").value);  // get maxCol value, turn string into float

    deleteTable(minRow, maxRow, minCol, maxCol);  // delete any existing table
    if (validateForm(minRow, maxRow, minCol, maxCol)) {  // validate the form by checking the inputted values
        createTable(minRow, maxRow, minCol, maxCol);  // everything is all set, create the table with inputted values
    }
}

/*
The deleteTable function will delete any existing table. It does this by getting the number
of rows of the table, even if there isn't any, and it will go through a for loop to delete
the rows until there is none.
*/
function deleteTable(minRow, maxRow, minCol, maxCol) {
    var table_length = document.getElementById("multiplication_table").rows.length;  // get table length

    if (table_length) {  // if table have rows, it exists, go to delete it
        for (var count = 0; count < table_length; count++) {  // delete table row by row
            document.getElementById("multiplication_table").deleteRow(0);
        }
    }
}

/*
The validateForm function takes the inputted values and validate them seeing if the form was
correctly filled with valid inputs. It will check if any values in the form are unfilled as will as
check if the values are not integers. It will also check if the maximum row/column values are smaller 
than the minimum row/column values. Also, we want to check if minimum values are less than -50 and
maximum values are greater than 50. If any of these are true, text will be written to the screen 
informing the user on what's invalid and returning false. Else, returns true if everything valid.
*/
function validateForm(minRow, maxRow, minCol, maxCol) {

    // check if any values unfilled, or filled with anything other than integers
    if (isNaN(minRow) || isNaN(maxRow) || isNaN(minCol) || isNaN(maxCol) || 
    !Number.isInteger(minRow) || !Number.isInteger(maxRow) || !Number.isInteger(minCol) || !Number.isInteger(maxCol)) {
        document.getElementById("validation").innerHTML=("ERROR. Invalid Inputs.");
        document.getElementById("not_filled").innerHTML=("Please fill in all the minimum and maximum row/column values with whole number values.");
        return false;
    } else if ((maxRow < minRow) || (maxCol < minCol)) {  // check if maximum values are smaller than minimum values
        document.getElementById("validation").innerHTML=("ERROR. Invalid Inputs.");
        document.getElementById("not_filled").innerHTML=("");
        document.getElementById("max_greater_than_min").innerHTML=("Minimum values should be less than or equal to maximum values.");
        return false;
    } else if ((minRow < -50) || (maxRow > 50) || (minCol < -50) || (maxCol > 50)) {  // check if min values >= -50 and max values <= 50
        document.getElementById("validation").innerHTML=("ERROR. Invalid Inputs.");
        document.getElementById("not_filled").innerHTML=("");
        document.getElementById("max_greater_than_min").innerHTML=("")
        document.getElementById("out_of_range").innerHTML=("Minimum values must be >= -50 and maximum values must be <= 50.")
        return false;
    }

    // form is valid, remove any invalid text information
    document.getElementById("validation").innerHTML=("");
    document.getElementById("not_filled").innerHTML=("");
    document.getElementById("max_greater_than_min").innerHTML=("");
    document.getElementById("out_of_range").innerHTML=("");
    return true;
}

/*
Dynamically creates the multiplication table using the inputted values from the form.
As the table is created, table rows, table headers, and table data elements gets 
included into to the HTML file.
*/
function createTable(minRow, maxRow, minCol, maxCol) {
    var table = document.getElementById("multiplication_table");

    // Add 2 to numRows, numCols because ...
    //      max-min doesn't give total number of rows so add 1
    //      table headers so add 1 more
    var numRows = maxRow - minRow + 2;
    var numCols = maxCol - minCol + 2;

    var rowCount, colCount;
    var cellValue;
    var tableRow, tableHeader, tableData;

    // Writes very first cell of the multiplication table.
    // First cell contains nothing.
    tableRow = document.createElement("tr");  // creates HTML element "tr" (table row)
    tableRow = table.insertRow(0);  // insert a table row at table row index 0
    tableHeader = document.createElement("th");  // creates an HTML element "th" (table header)
    cellValue = "";
    tableHeader.innerHTML = cellValue;
    tableRow.appendChild(tableHeader);  // include the tableHeader into the tableRow

    // Writes the very first row of our multiplication table through a for loop.
    // First row contatains the minimum column to the maximum column values.
    // All headers.
    for (colCount = 1; colCount < numCols; colCount++) {  // note colCount = 1 because column 1 contains values for minRow to maxRow
        tableHeader = document.createElement("th");
        cellValue = colCount + minCol - 1;
        tableHeader.innerHTML = cellValue;
        tableRow.appendChild(tableHeader);
    }

    // Write rest of the rows of our multiplication table through 2 for loops where we go row by row and column by column.
    // Rows will consist of table headers for minimum row to the maximum row values as well as table data of the product of 
    // minRow to maxRow values by minCol to maxCol values.
    for (rowCount = 1; rowCount < numRows; rowCount++) {  // // note rowCount = 1 because row 1 contains values for minCol to maxCol
        tableRow = document.createElement("tr");
        tableRow = table.insertRow(rowCount);

        for (colCount = 0; colCount < numCols; colCount++) {
            if (colCount == 0) {  // colCount == 0, means it is the minRow to maxRow column, make them into headers
                tableHeader = document.createElement("th");
                cellValue = rowCount + minRow - 1;
                tableHeader.innerHTML = cellValue;
                tableRow.appendChild(tableHeader);
            } else {  // not colCount == 0, means it is the product between minRow to maxRow by minCol by maxCol
                tableData = document.createElement("td")
                cellValue = (rowCount + minRow - 1) * (colCount + minCol - 1);
                tableData.innerHTML = cellValue;
                tableRow.appendChild(tableData);
            }
        }
    }
}
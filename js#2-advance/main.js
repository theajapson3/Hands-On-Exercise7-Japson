let records = [];

let editIndex = -1;

const firstName = document.getElementById("firstName");
const middleName = document.getElementById("middleName");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");


const insertBtn = document.getElementById("insertBtn");
const clearBtn = document.getElementById("clearBtn");
const clearRecordsBtn = document.getElementById("clearRecordsBtn");
const saveBtn = document.getElementById("saveBtn");


const recordTable = document.getElementById("recordTable");

const sortBy = document.getElementById("sortBy");
const sortOrder = document.getElementById("sortOrder");


insertBtn.addEventListener("click", function () {

    const first = firstName.value.trim();
    const middle = middleName.value.trim();
    const last = lastName.value.trim();
    const personAge = age.value.trim();

    if (
        first === "" ||
        middle === "" ||
        last === "" ||
        personAge === ""
    ) {
        alert("Please complete all fields.");
        return;
    }


    const person = {
        firstName: first,
        middleName: middle,
        lastName: last,
        age: Number(personAge)
    };


    if (editIndex !== -1) {

        records[editIndex] = person;

        editIndex = -1;

        insertBtn.textContent = "Insert";

    }

    else {

        records.push(person);

    }


    displayRecords();

    clearInputs();

});


clearBtn.addEventListener("click", function () {

    clearInputs();

    editIndex = -1;

    insertBtn.textContent = "Insert";

});



function displayRecords() {

    recordTable.innerHTML = "";


    records.forEach(function (person, index) {

        const row = document.createElement("tr");


        row.innerHTML = `
            <td>${person.firstName}</td>
            <td>${person.middleName}</td>
            <td>${person.lastName}</td>
            <td>${person.age}</td>

            <td class="action">

                <button onclick="deleteRecord(${index})">
                    Delete
                </button>

                <button onclick="editRecord(${index})">
                    Edit
                </button>

            </td>
        `;


        recordTable.appendChild(row);

    });

}



function deleteRecord(index) {

    records.splice(index, 1);

    displayRecords();

}



function editRecord(index) {

    const person = records[index];


    firstName.value = person.firstName;
    middleName.value = person.middleName;
    lastName.value = person.lastName;
    age.value = person.age;


    editIndex = index;


    insertBtn.textContent = "Update";

}


clearRecordsBtn.addEventListener("click", function () {

    if (records.length === 0) {
        return;
    }


    const confirmDelete = confirm(
        "Are you sure you want to clear all records?"
    );


    if (confirmDelete) {

        records = [];

        displayRecords();

    }

});



sortBy.addEventListener("change", sortRecords);
sortOrder.addEventListener("change", sortRecords);


function sortRecords() {

    const field = sortBy.value;
    const order = sortOrder.value;


    if (field === "") {
        return;
    }


    records.sort(function (a, b) {

        let valueA = a[field].toLowerCase();
        let valueB = b[field].toLowerCase();


        if (valueA < valueB) {
            return order === "asc" ? -1 : 1;
        }


        if (valueA > valueB) {
            return order === "asc" ? 1 : -1;
        }


        return 0;

    });


    displayRecords();

}



saveBtn.addEventListener("click", function () {

    localStorage.setItem(
        "records",
        JSON.stringify(records)
    );


    alert("Records saved to Local Storage.");

});



function clearInputs() {

    firstName.value = "";
    middleName.value = "";
    lastName.value = "";
    age.value = "";

}

function loadRecords() {

    const savedRecords = localStorage.getItem("records");

    if (savedRecords !== null) {

        records = JSON.parse(savedRecords);

        displayRecords();

    }

}

loadRecords();
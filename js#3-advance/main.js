const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");

const table = document.getElementById("todoTable");
const tableBody = document.getElementById("tableBody");



loadBtn.addEventListener("click", function () {

    fetch("https://jsonplaceholder.typicode.com/todos/")
        .then(response => response.json())
        .then(data => {

            tableBody.innerHTML = "";

          
            table.style.display = "table";

        
            data.forEach(todo => {

        
                const row = document.createElement("tr");

          
                let status;

                if (todo.completed === true) {
                    status = `<span class="completed">Completed</span>`;
                } else {
                    status = `<span class="not-completed">Not yet Completed</span>`;
                }

                row.innerHTML = `
                    <td>${todo.userId}</td>
                    <td>${todo.id}</td>
                    <td>${todo.title}</td>
                    <td>${status}</td>
                `;

                tableBody.appendChild(row);
            });

        })
        .catch(error => {
            console.log("Error:", error);
            alert("Failed to load data from the API.");
        });

});


clearBtn.addEventListener("click", function () {

    tableBody.innerHTML = "";

    table.style.display = "none";

});
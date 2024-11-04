function createTable() {
    const table = document.getElementById("table");
    let number = 1;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 6; j++) {
            const cell = document.createElement("td");
            cell.textContent = number;

            if (number === 9) {
                cell.addEventListener("mouseover", () => {
                    cell.style.backgroundColor = getRandomColor();
                });

                cell.addEventListener("click", () => {
                    const chosenColor = document.getElementById("colorPicker").value;
                    cell.style.backgroundColor = chosenColor;
                });

                cell.addEventListener("dblclick", () => {
                    changeColumnColor(cell);
                });
            }

            row.appendChild(cell);
            number++;
        }
        table.appendChild(row);
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeColumnColor(cell) {
    const columnIndex = cell.cellIndex;
    const chosenColor = document.getElementById("colorPicker").value;
    const rows = document.getElementById("table").rows;

    for (let i = cell.parentNode.rowIndex; i < rows.length; i += 2) {
        rows[i].cells[columnIndex].style.backgroundColor = chosenColor;
    }
}

createTable();
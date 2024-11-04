function validateForm() {
    const patterns = {
        pib: /^[А-ЯІЇЄҐа-яіїєґA-Za-z']{2,}\s[A-ЯA-Z]\.[A-ЯA-Z]\.$/,
        variant: /^\d{2}$/, 
        group: /^[A-Za-z\u0400-\u04FF]{2}-\d{2}$/, 
        faculty: /^[A-Za-z\u0400-\u04FF]{2,}$/, 
        birthdate: /^\d{2}\.\d{2}\.\d{4}$/
    };

    let isValid = true;
    let resultText = "<strong>Введені дані:</strong><br>";
    document.querySelectorAll("input").forEach(input => input.classList.remove("error"));

    for (const field in patterns) {
        const input = document.getElementById(field);
        const pattern = patterns[field];
        if (pattern.test(input.value)) {
            if (field === "birthdate") {
                const dateParts = input.value.split(".");
                const birthdate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                const currentDate = new Date();
                const maxDate = new Date();
                maxDate.setFullYear(maxDate.getFullYear() - 150);

                if (birthdate > currentDate || birthdate < maxDate) {
                    input.classList.add("error");
                    isValid = false;
                    resultText += `<span style="color:red">Дата народження не може бути в майбутньому/минулому більше ніж 150 років</span><br>`;
                } else if (
                    birthdate.getFullYear() !== parseInt(dateParts[2]) ||
                    birthdate.getMonth() + 1 !== parseInt(dateParts[1]) ||
                    birthdate.getDate() !== parseInt(dateParts[0])
                ) {
                    input.classList.add("error");
                    isValid = false;
                    resultText += `<span style="color:red">Дата народження є некоректною</span><br>`;
                } else {
                    resultText += `${field}: ${input.value}<br>`;
                }
            } else {
                resultText += `${field}: ${input.value}<br>`;
            }
        } else {
            input.classList.add("error");
            isValid = false;
            resultText += `<span style="color:red">${field}: Невідповідне значення</span><br>`;
        }
    }

    const outputElement = document.getElementById("output");
    outputElement.innerHTML = isValid ? resultText : "Деякі поля містять помилки<br>" + resultText;
}
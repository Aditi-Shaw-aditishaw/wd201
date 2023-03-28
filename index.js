const form = document.getElementById("registrationForm");
const table = document.getElementById("usersTable").getElementsByTagName('tbody')[0];
const users = JSON.parse(localStorage.getItem('users')) || [];

function displayUsers() {
    table.innerHTML = "";
    for (let user of users) {
        const row = table.insertRow();
        row.insertCell().textContent = user.name;
        row.insertCell().textContent = user.email;
        row.insertCell().textContent = user.password;
        row.insertCell().textContent = user.dob;
        row.insertCell().textContent = user.termsAccepted;
    }
}

function addUser(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const termsAccepted = document.getElementById("terms").checked;
    const age = calculateAge(dob);

    if (!isValidEmail(email)) {
        alert("Invalid email address.");
        return;
    }

    if (age < 18 || age > 55) {
        alert("You must be between 18 and 55 years old to register.");
        return;
    }

    users.push({ name, email, password, dob, termsAccepted });
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
    form.reset();
}

function isValidEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

form.addEventListener("submit", addUser);

displayUsers();
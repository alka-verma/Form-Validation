document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const contact = document.getElementById("contact").value;

            if (!validateEmail(email)) {
                alert("Invalid email format!");
                return;
            }

            if (!validatePassword(password)) {
                alert("Password must be 8-16 characters, with uppercase, lowercase, number, and special character.");
                return;
            }

            if (!validateContact(contact)) {
                alert("Invalid contact number!");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.some(user => user.email === email)) {
                alert("Email already exists. Please log in.");
                return;
            }

            users.push({ email, password, contact });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful! You can now log in.");
            window.location.href = "login.html";
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];

            let validUser = users.find(user => user.email === email && user.password === password);

            if (validUser) {
                localStorage.setItem("loggedInUser", email);
                alert("Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid email or password!");
            }
        });
    }
});


function validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/.test(password);
}

function validateContact(contact) {
    return /^\+\d{1,3}\s?\d{7,14}$/.test(contact);
}
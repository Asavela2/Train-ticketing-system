document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const showRegisterLink = document.getElementById('showRegisterForm');
  const registerForm = document.getElementById('registerForm');
  const searchForm = document.getElementById('searchForm');

  showRegisterLink.addEventListener('click', function(event) {
    event.preventDefault();
    registerForm.style.display = "block"; // Show registration form
    loginForm.disabled = false; // Enable login form
  });

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Check if the user has registered before allowing login
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const userExists = registeredUsers.some(user => user.username === username && user.password === password);
    
    if (userExists) {
      alert(`Welcome, ${username}!`);
    } else {
      alert("Please register before logging in.");
    }
  });

  registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const regUsername = document.getElementById('regUsername').value;
    const regPassword = document.getElementById('regPassword').value;

    // Retrieve registered users from local storage
    let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Check if the username is already taken
    const isUsernameTaken = registeredUsers.some(user => user.username === regUsername);

    if (isUsernameTaken) {
        alert("Username already taken. Please choose a different username.");
        return;
    }

    // Add new user to the list of registered users
    registeredUsers.push({ username: regUsername, password: regPassword });

    // Save updated list of registered users to local storage
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    alert("Registration Successful!");
    registerForm.reset(); // Clear the registration form after successful registration
  });

  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    // Here you would perform train search logic, e.g., send a request to the server
    
    // For demonstration purposes, just show search results
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = `<h3>Search Results</h3>
      <p>Source: ${source}</p>
      <p>Destination: ${destination}</p>
      <p>Date: ${date}</p>
      <p>Train 1: Example Train - Departure Time: 08:00, Arrival Time: 12:00, Fare: R50</p>
      <p>Train 2: Another Train - Departure Time: 10:00, Arrival Time: 14:00, Fare: R60</p>`;
  });
});

const apiUrl = 'https://jsonplaceholder.typicode.com/users';

// Fetching users
async function fetchUsers() {
    try {
        const response = await fetch(apiUrl);
        const users = await response.json();
        renderUserTable(users);
    } catch (error) {
        alert('Users not found');
    }
}

// Rendering users table
function renderUserTable(users) {
    let count=users.length

    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    userTable.innerHTML = ''; // Clear the table first
    users.forEach(user => {
        const row = userTable.insertRow();
        row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.address.city}
                    <td>${user.address.street}</td>
                    <td>${user.address.zipcode}</td>
                    </td>
                    <td>
                        <button onclick="editUser(${user.id})">Edit</button>
                        <button onclick="deleteUser(${user.id})">Delete</button>
                    </td>
                `;
    });
}

// Adding  new user
document.getElementById('addUserButton').addEventListener('click', () => {
    document.getElementById('formTitle').textContent = 'Add User';
    document.getElementById('userForm').reset();
    document.getElementById('formContainer').style.display = 'block';
});

// Submit user form (add/edit user)
document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const userData = {
       name: event.target.firstName.value,
       username: event.target.lastName.value,
        email: event.target.email.value,
        Address: event.target.department.value
        
        
    };
    const method = document.getElementById('formTitle').textContent === 'Add User' ? 'POST' : 'PUT';
    const userId = document.getElementById('formContainer').getAttribute('data-user-id');
    
const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    };

    const url = method === 'POST' ? apiUrl : userId;

    try {
        const response = await fetch(url, requestOptions);
        if (response.ok) {
            fetchUsers();
            document.getElementById('formContainer').style.display = 'none';
        }
    } catch (error) {
        alert('Failed to submit user data');
    }
});

// Editing  user
function editUser(userId) {
    const user = Array.from(document.querySelectorAll('#userTable tbody tr')).find(row => row.cells[0].textContent == userId);
    const Name = user.cells[1].textContent;
    const userName = user.cells[2].textContent;
    const email = user.cells[3].textContent;
    const Address = user.cells[4].textContent;

    document.getElementById('formTitle').textContent = 'Edit User';
    document.getElementById('firstName').value = firstName;
    document.getElementById('lastName').value = lastName;
    document.getElementById('email').value = email;
    document.getElementById('department').value = department;

    document.getElementById('formContainer').setAttribute('data-user-id', userId);
    document.getElementById('formContainer').style.display = 'block';
}

// Delete user
async function deleteUser(userId) {
    try {
        const response = await fetch(userId, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchUsers();
        }
    } catch (error) {
        alert('Failed to delete user');
    }
}

// Fetch users on page load
window.onload = fetchUsers; 
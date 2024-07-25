"use strict";

// Sample initial data
let users = [
    {
        name: "Haim Cohen",
        email: "haimC49@gmail.com",
        number: "0505140265",
        address: "HaShoshanim 45, Haifa"
    },
    {
        name: "Eyal Shani",
        email: "ayalS49@gmail.com",
        number: "0525145215",
        address: "HaYarkon 21, Tel Aviv"
    },
    {
        name: "Gordon Ramsay",
        email: "GordonR@gmail.com",
        number: "0545156781",
        address: "Soho st 47, England"
    }
];

// Render contacts with an optional filtered list
function renderContacts(filteredUsers = users) {
    let ul = document.getElementById('list');
    ul.innerHTML = ''; // Clear the list

    // Sort the users by name (or any other property) before rendering
    filteredUsers.sort((a, b) => a.name.localeCompare(b.name));

    filteredUsers.forEach((user, index) => {
        addContact(user, users.indexOf(user));
    });
}

// Function to add a contact to the list
function addContact(user, index) {
    let ul = document.getElementById('list');
    let li = document.createElement('li');
    li.innerHTML = `${user.name} ${user.number}
        <input type="button" class="editbuttom" onclick="editContact(${index})">
        <input type="button" class="delbuttom" onclick="deleteContact(${index})">
        <input type="button" class="showinfo" onclick="openInfo(${index})">
    `;

    let div = document.createElement('div');
    div.className = 'contact';

    // Add mouseover and mouseout events
    div.addEventListener('mouseover', function() {
        div.style.backgroundColor = 'rgba(0, 123, 255, 0.1)'; // Change background on hover
    });

    div.addEventListener('mouseout', function() {
        div.style.backgroundColor = ''; // Revert background on mouse out
    });

    div.append(li);
    ul.append(div);
}

// Search function to filter contacts
function searchContact(e) {
    let query = e.target.value.toLowerCase();
    let filteredList = users.filter((user) => 
        user.name.toLowerCase().startsWith(query) ||
        user.email.toLowerCase().startsWith(query) ||
        user.number.startsWith(query) ||
        user.address.toLowerCase().startsWith(query)
    );
    renderContacts(filteredList);
}

// Show the modal
function openModel() {
    document.getElementById('myModel').style.display = 'flex';
}

// Close the modal
function closeModel(event) {
    if (event.target === document.getElementById('myModel') || event.target === document.getElementById('closeModelBtn')) {
        document.getElementById('myModel').style.display = 'none';
    }
}

// Open contact info in the modal
function openInfo(index) {
    const user = users[index];
    if (user) {
        document.querySelector('.info').innerHTML = `
            <button class="close-btn" id="closeInfoBtn" onclick="closeInfo(event)">X</button>
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>Number: ${user.number}</p>
            <p>Address: ${user.address}</p>
        `;
        document.getElementById('info').style.display = 'flex';
    }
}

// Close contact info modal
function closeInfo(event) {
    if (event.target === document.getElementById('info') || event.target === document.getElementById('closeInfoBtn')) {
        document.getElementById('info').style.display = 'none';
    }
}

// Clear all contacts
function deleteValues() {
    users = [];
    clearContacts();
}

// Clear the contacts list from the DOM
function clearContacts() {
    document.getElementById('list').innerHTML = '';
}

// Save a new contact
function saveContact() {
    let name = document.getElementById('userName').value;
    let email = document.getElementById('userEmail').value;
    let number = document.getElementById('userNumber').value;
    let address = document.getElementById('userAddress').value;

    if (name==""|| number =="")
        alert("All fields are requried")

    else {
    let newUser = {
        name: name,
        email: email,
        number: number,
        address: address
    };

    users.push(newUser);
    renderContacts();
    clearForm();
    document.getElementById('myModel').style.display = 'none';
}
}

// Delete a contact by index
function deleteContact(index) {
    users.splice(index, 1);
    renderContacts();
}

// Clear the form inputs
function clearForm() {
    document.getElementById('userName').value = "";
    document.getElementById('userEmail').value = "";
    document.getElementById('userNumber').value = "";
    document.getElementById('userAddress').value = "";

    document.getElementById('submitBtn').style.display = "flex";
    document.getElementById('updateBtn').style.display = "none";
}

// Edit a contact by index
function editContact(index) {
    const user = users[index];
    if (user) {
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userNumber').value = user.number;
        document.getElementById('userAddress').value = user.address;

        openModel();

        document.getElementById('submitBtn').style.display = "none";
        document.getElementById('updateBtn').style.display = "flex";
        document.getElementById('updateBtn').onclick = function() {
            updateContact(index);
        };
    }
}

// Update a contact by index
function updateContact(index) {
    const user = users[index];
    if (user) {
        user.name = document.getElementById('userName').value;
        user.email = document.getElementById('userEmail').value;
        user.number = document.getElementById('userNumber').value;
        user.address = document.getElementById('userAddress').value;

        renderContacts();
        clearForm();
        document.getElementById('myModel').style.display = 'none';
    }
}

// Ensure contacts are rendered when the page loads
document.addEventListener('DOMContentLoaded', function() {
    renderContacts();
});

// Attach search function to the search input field
document.getElementById('searchbtn').addEventListener('input', searchContact);

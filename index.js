"use strict";

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.header.classList.toggle('dark-mode');
    document.footer.classList.toggle('dark-mode');

 
}

// Contacts Array
let users = [
    {
        name: "Haim Cohen",
        email: "haimC49@gmail.com",
        number: "050-5140265",
        address: "HaShoshanim 45, Haifa",
        description: "Haim Cohen is an Israeli chef, restaurateur, TV presenter and author of cookbooks. Culinary consultant for a Michelin star restaurant. Member of the Grill Knights."
    },
    {
        name: "Eyal Shani",
        email: "ayalS49@gmail.com",
        number: "052-5145215",
        address: "HaYarkon 21, Tel Aviv",
        description: "Eyal Tovia Mordechai Shani is an Israeli chef. Established the restaurants Ocean, Bruno, Zennon, The Salon, North Abraxas and SHMONE. Since 2010, participates as a judge in Keshet 12's Israeli Master Chef."
    },
    {
        name: "Gordon Ramsay",
        email: "GordonR@gmail.com",
        number: "054-5156781",
        address: "Soho st 47, England",
        description: "Gordon James Ramsay is a well-known Scottish chef, one of the three British chefs whose restaurants currently hold three Michelin stars. Ramsay won a total of 16 Michelin stars for all his restaurants and currently holds 8 of them."
    },
    {
        name: "Assaf Granit",
        email: "AssafG@gmail.com",
        number: "054-5155199",
        address: "Nesher 1, Haifa",
        description: "Assaf Elkana Granit  is an Israeli chef, restaurateur, businessman and TV host, who has one Michelin star at Shavor restaurant in Paris."
    }
];

// Render Contacts
function renderContacts(filteredUsers = users) {

    if(users.length == 0)
        document.getElementById('noContactsMessage').style.display = 'flex';

    let ul = document.getElementById('contactList');
    ul.innerHTML = ''; 
    
    filteredUsers.sort((a, b) => a.name.localeCompare(b.name));

    filteredUsers.forEach((user, index) => {
        addContact(user, index);
    });

    applyHoverEffect();
}



function applyHoverEffect() {
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('mouseover', () => item.style.backgroundColor = '#AC9362');
        item.addEventListener('mouseout', () => item.style.backgroundColor = '');
    });
}

// Function to add a contact to the list
function addContact(user, index) {
    let ul = document.getElementById('contactList');
    let li = document.createElement('li');

    li.className = 'contact-item';
    li.innerHTML = `
        <div class="contact-name">${user.name}</div>
        <div class="contact-number">${user.number}</div>
        <div class="contact-actions">
            <input type="button" class="editbuttom" onclick="editContact(${index})">
            <input type="button" class="delbuttom" onclick="deleteContact(${index})">
            <input type="button" class="showinfo" onclick="openInfo(${index})">
        </div>
    `;
    ul.appendChild(li);

    
    document.getElementById('noContactsMessage').style.display = 'none';
}


// Search function to filter contacts
function searchContact(e) {
    let query = e.target.value.toLowerCase();
    let filteredList = users.filter((user) => 
        user.name.toLowerCase().startsWith(query) ||
        user.number.startsWith(query) 
    );
    renderContacts(filteredList);
}

// Show the modal
function openModel(isAdd = false) {
    if(isAdd)
        clearForm()

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
        // Create an array to hold the HTML strings
        let infoHtml = `
            <button class="close-btn" id="closeInfoBtn">X</button>
            <h2>${user.name || ''}</h2>
        `;

        // Conditionally add fields if they are not empty
        if (user.email.trim() !== "") {
            infoHtml += `<p>Email: ${user.email}</p>`;
        }
        if (user.number.trim() !== "") {
            infoHtml += `<p>Number: ${user.number}</p>`;
        }
        if (user.address.trim() !== "") {
            infoHtml += `<p>Address: ${user.address}</p>`;
        }
        if (user.description.trim() !== "") {
            infoHtml += `<p>Description: ${user.description}</p>`;
        }

        // Close the HTML string
        infoHtml += '';

        // Update the modal content
        document.querySelector('.info').innerHTML = infoHtml;
        document.getElementById('info').style.display = 'flex';

        // Add click event listener to the close button
        document.getElementById('closeInfoBtn').addEventListener('click', closeInfo);
    }
}


// Close contact info modal
function closeInfo(event) {
    const infoModal = document.getElementById('info');
    if (event.target === infoModal || event.target === document.getElementById('closeInfoBtn')) {
        infoModal.style.display = 'none';
    }
}

// Attach event listener to close the info modal when clicking outside
document.getElementById('info').addEventListener('click', function(event) {
    if (event.target === this) {
        closeInfo(event);
    }
});

// Attach event listener to close the info modal when clicking outside
document.getElementById('info').addEventListener('click', function(event) {
    if (event.target === this) {
        closeInfo(event);
    }
});

// Clear all contacts
function deleteValues() {
    users = [];
    clearContacts();
     if(users.length == 0)
        document.getElementById('noContactsMessage').style.display = 'flex';
}

// Clear the contacts list from the DOM
function clearContacts() {
    document.getElementById('contactList').innerHTML = '';
}

// Save a new contact
function saveContact() {
    let name = document.getElementById('userName').value;
    let email = document.getElementById('userEmail').value;
    let number = document.getElementById('userNumber').value;
    let address = document.getElementById('userAddress').value;
    let description = document.getElementById('userDescription').value;

    // Validation check
    if (name.trim() === "" || number.trim() === "") {
        alert("Name and Number are required.");
        return; // Prevents further execution if validation fails
    }

    let newUser = {
        name: name,
        email: email,
        number: number,
        address: address,
        description: description
    };

    users.push(newUser);
    renderContacts();
    clearForm();
    document.getElementById('myModel').style.display = 'none';
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
    document.getElementById('userDescription').value = "";

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
        document.getElementById('userDescription').value = user.description

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
        let name = document.getElementById('userName').value;
        let number = document.getElementById('userNumber').value;

        // Validation check
        if (name.trim() === "" || number.trim() === "") {
            alert("Name and Number are required.");
            return; // Prevents further execution if validation fails
        }

        user.name = name;
        user.email = document.getElementById('userEmail').value;
        user.number = number;
        user.address = document.getElementById('userAddress').value;
        user.description = document.getElementById('userDescription').value;

        renderContacts();
        clearForm();
        document.getElementById('myModel').style.display = 'none';
    }
}


// Attach search function to the search input field
document.getElementById('searchbtn').addEventListener('input', searchContact);

// Ensure contacts are rendered when the page loads
document.addEventListener('DOMContentLoaded', function() {
    renderContacts();
});


             




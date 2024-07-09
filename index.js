"use strict";

const users = [
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
    },

];

users.forEach(elem => {
    let ul = document.getElementById('list');

    let li = document.createElement('li');
    li.innerHTML = `${elem.name}
        <input type="button" class="editbuttom">
        <input type="button" class="delbuttom">
    `;

    let div = document.createElement('div');
    div.className = 'contact';

    div.append(li);

    ul.append(div);
});

    


function openModel()
{
    document.getElementById('myModel').style.display = 'flex';
}

function closeModel( event )
{
    if(event.target === document.getElementById('myModel') || event.target === document.getElementById('closeModelBtn'))
        {
            document.getElementById('myModel').style.display = 'none';
        }
}

function deleteContacts()
{
    document.getElementById('list').innerHTML = '';
}

function saveContact()
{
    let name = document.getElementById('userName').value;
    let email = document.getElementById('userEmail').value;
    let number = document.getElementById('userNumber').value;
    let address = document.getElementById('userAddress').value;


    let ul = document.getElementById('list');

    let li = document.createElement('li');
    li.innerHTML = `${name}
        <input type="button" class="editbuttom">
        <input type="button" class="delbuttom">
    `;

    let div = document.createElement('div');
    div.className = 'contact';

    div.append(li);

    ul.append(div);

    document.getElementById('userName').value = ""

    document.getElementById('myModel').style.display = 'none';

    let newUser = {
        name: name,
        email: email,
        number: number,
        address: address
    };

    users.push(newUser);

    console.log(users); // Optionally log the updated users array



}









const viewSection = document.querySelector(".view-section");
const contactsSection = document.querySelector(".contacts-section");

const state = {
  contacts: [],
  selectedContact: null,
};

/* [START] NO NEED TO EDIT */

function getContacts() {
  fetch("http://localhost:3000/contacts")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.contacts = data;
      renderContactsList();
    });
}

const listEl = document.createElement("ul");
listEl.className = "contacts-list";

function renderContactsList() {
  let unblockedContact = state.contacts.filter(function (contact) {
    return contact.blockContact === false;
  });

  for (let i = 0; i < unblockedContact.length; i++) {
    const contact = unblockedContact[i];
    const listItemEl = renderContactListItem(contact);

    listEl.append(listItemEl);
  }

  contactsSection.append(listEl);
}

function renderAddressSection(address) {
  const containerEl = document.createElement("section");

  const headingEl = document.createElement("h2");
  headingEl.innerText = "Address";

  containerEl.append(headingEl);

  const streetText = document.createElement("p");
  streetText.innerText = address.street;

  containerEl.append(streetText);

  const cityText = document.createElement("p");
  cityText.innerText = address.city;

  containerEl.append(cityText);

  const postCodeText = document.createElement("p");
  postCodeText.innerText = address.postCode;

  containerEl.append(postCodeText);

  return containerEl;
}

function renderContactView() {
  const contact = state.selectedContact;

  if (!contact) return;

  viewSection.innerHTML = "";

  const containerEl = document.createElement("article");
  containerEl.className = "center light-shadow address-card";

  const headingEl = document.createElement("h1");

  const fullName = `${contact.firstName} ${contact.lastName}`;
  headingEl.innerText = fullName;

  containerEl.append(headingEl);

  const addressSectionEl = renderAddressSection(contact.address);

  containerEl.append(addressSectionEl);

  viewSection.append(containerEl);
}

/* [END] NO NEED TO EDIT */

function renderContactListItem(contact) {
  const listItemEl = document.createElement("li");

  const headingEl = document.createElement("h3");

  const fullName = `${contact.firstName} ${contact.lastName}`;

  headingEl.innerText = fullName;

  listItemEl.append(headingEl);

  const viewBtn = document.createElement("button");
  viewBtn.className = "button grey";
  viewBtn.innerText = "View";

  viewBtn.addEventListener("click", function () {
    state.selectedContact = contact;

    renderContactView();
  });

  listItemEl.append(viewBtn);

  const editBtn = document.createElement("button");
  editBtn.className = "button blue";
  editBtn.innerText = "Edit";

  editBtn.addEventListener("click", function () {
    // [TODO] Write Code
    editform(contact);
  });

  listItemEl.append(editBtn);

  return listItemEl;
}

function listenNewContactButton() {
  const btn = document.querySelector(".new-contact-btn");

  btn.addEventListener("click", function () {
    // [TODO] Write Code
    viewSection.innerHTML = "";
    createNewcontactForm();
  });
}

// [TODO] Write Code

function main() {
  listenNewContactButton();
  getContacts();
}

main();

// - A user can create a contact via a form when the "New Contact" button is clicked
//     - the created contact should have:
//         - first name
//         - last name
//         - street
//         - city
//         - post code
//         - an option to block the contact
//     - the created contact should be saved in the database
//     - the created contact should be added to the contacts list
// - A useer can edit a contact via a form when the "Edit" button is clicked
//     - the updated contact should be saved in the database
//     - the updated contact should be viewable in the UI
//     - the selected contact can also be deleted from the edit contact form
// - When a user submits a form they should be redirected to see the changes
//     - Use renderContactView to do this.

// Instructions
// - Download files from: https://codesandbox.io/s/address-book-starter-template-4zvw7?file=/src/index.js
// - Run this command in the project directory json-server --watch db/db.json --routes db/routes.json --static .
// - Look for [TODO] Write Code for hints on where you need to write code
// - Create fetch functions for create and edit
// - Create action functions to update state
// - Create render functions for your forms

// Tips
// - Check db/db.json and think about which URLs you are going to need when creating your fetch functions.
// - Use state to keep track of changes and render the UI.

function createNewcontactForm() {
  const containerEl = document.createElement("article");
  containerEl.className = "center light-shadow address-card form-stack";

  const formel = document.createElement("form");
  formel.className = "addform";

  const headingEl = document.createElement("h1");
  headingEl.innerText = "Edit Contact";

  const firstnamelabel = document.createElement("label");
  firstnamelabel.innerText = "First Name";

  const firstnameInput = document.createElement("input");
  firstnameInput.setAttribute("type", "text");
  firstnameInput.setAttribute("name", "firstname");
  firstnamelabel.append(firstnameInput);

  const lastnamelabel = document.createElement("label");
  lastnamelabel.innerText = "Last Name";

  const lastnameInput = document.createElement("input");
  lastnameInput.setAttribute("type", "text");
  lastnameInput.setAttribute("name", "lastname");
  lastnamelabel.append(lastnameInput);

  const Streetlabel = document.createElement("label");
  Streetlabel.innerText = "Street:";

  const StreetInput = document.createElement("input");
  StreetInput.setAttribute("type", "text");
  StreetInput.setAttribute("name", "streetname");
  Streetlabel.append(StreetInput);

  const citylabel = document.createElement("label");
  citylabel.innerText = "City";

  const cityInput = document.createElement("input");
  cityInput.setAttribute("type", "text");
  cityInput.setAttribute("name", "cityname");
  citylabel.append(cityInput);

  const postcodelabel = document.createElement("label");
  postcodelabel.innerText = "Post Code";

  const postcodeInput = document.createElement("input");
  postcodeInput.setAttribute("type", "text");
  postcodeInput.setAttribute("name", "postcode");
  postcodelabel.append(postcodeInput);

  const checkboxlabel = document.createElement("label");
  checkboxlabel.innerText = "Block";
  checkboxlabel.setAttribute("class", "checkbox-section");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "checkbox");
  checkbox.setAttribute("name", "checkbox");
  checkboxlabel.prepend(checkbox);

  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.innerText = "Add New Contact";

  formel.append(
    headingEl,
    firstnamelabel,
    lastnamelabel,
    Streetlabel,
    citylabel,
    postcodelabel,
    checkboxlabel,
    submitBtn
  );

  containerEl.append(formel);

  viewSection.append(containerEl);

  formel.addEventListener("submit", function (event) {
    event.preventDefault();
    updateInfotoState(formel);
  });
}

function updateInfotoState(formel) {
  fetch(" http://localhost:3000/addresses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      street: formel.streetname.value,
      city: formel.cityname.value,
      postCode: formel.postcode.value,
    }),
  })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (resp) {
      return fetch("http://localhost:3000/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: resp.id,
          firstName: formel.firstname.value,
          lastName: formel.lastname.value,
          blockContact: formel.checkbox.checked,
          addressId: resp.id,
        }),
      });
    })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (contact) {
      contact.address = {
        street: formel.streetname.value,
        city: formel.cityname.value,
        postCode: formel.postcode.value,
      };
      state.contacts.push(contact);
      let ulel = document.querySelector(".contacts-list");
      ulel.innerHTML = "";
      renderContactsList();
      formel.remove();
    });
}

function editform(contact) {
  viewSection.innerHTML = "";
  const containerEl = document.createElement("article");
  containerEl.className = "center light-shadow address-card form-stack";

  const formel = document.createElement("form");
  formel.className = "addform";

  const headingEl = document.createElement("h1");
  headingEl.innerText = "Create Contact";

  const firstnamelabel = document.createElement("label");
  firstnamelabel.innerText = "First Name";

  const firstnameInput = document.createElement("input");
  firstnameInput.setAttribute("type", "text");
  firstnameInput.setAttribute("name", "firstname");

  firstnameInput.value = contact.firstName;
  firstnamelabel.append(firstnameInput);

  const lastnamelabel = document.createElement("label");
  lastnamelabel.innerText = "Last Name";

  const lastnameInput = document.createElement("input");
  lastnameInput.setAttribute("type", "text");
  lastnameInput.setAttribute("name", "lastname");
  lastnameInput.value = contact.lastName;
  lastnamelabel.append(lastnameInput);

  const Streetlabel = document.createElement("label");
  Streetlabel.innerText = "Street:";

  const StreetInput = document.createElement("input");
  StreetInput.setAttribute("type", "text");
  StreetInput.setAttribute("name", "streetname");
  StreetInput.value = contact.address.street;
  Streetlabel.append(StreetInput);

  const citylabel = document.createElement("label");
  citylabel.innerText = "City";

  const cityInput = document.createElement("input");
  cityInput.setAttribute("type", "text");
  cityInput.setAttribute("name", "cityname");
  cityInput.value = contact.address.city;
  citylabel.append(cityInput);

  const postcodelabel = document.createElement("label");
  postcodelabel.innerText = "Post Code";

  const postcodeInput = document.createElement("input");
  postcodeInput.setAttribute("type", "text");
  postcodeInput.setAttribute("name", "postcode");
  postcodeInput.value = contact.address.postCode;
  postcodelabel.append(postcodeInput);

  const checkboxlabel = document.createElement("label");
  checkboxlabel.innerText = "Block";
  checkboxlabel.setAttribute("class", "checkbox-section");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "checkbox");
  checkbox.setAttribute("name", "checkbox");
  checkbox.value = contact.blockContact;

  checkboxlabel.prepend(checkbox);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";

  deleteBtn.addEventListener("click", function () {
    let ulel = document.querySelector("ul");
    ulel.innerHTML = "";
    deleteinfo(formel, contact);
  });

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";

  editBtn.addEventListener("click", function () {
    let ulel = document.querySelector("ul");
    ulel.innerHTML = "";
    editinfo(formel, contact);
  });

  formel.append(
    headingEl,
    firstnamelabel,
    lastnamelabel,
    Streetlabel,
    citylabel,
    postcodelabel,
    checkboxlabel,
    deleteBtn,
    editBtn
  );

  containerEl.append(formel);

  viewSection.append(containerEl);

  formel.addEventListener("submit", function (event) {
    event.preventDefault();
  });
}

function editinfo(formel, contact) {
  console.log(contact);
  let identity = contact.id;
  fetch(`http://localhost:3000/addresses/${identity}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      street: formel.streetname.value,
      city: formel.cityname.value,
      postCode: formel.postcode.value,
    }),
  })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (resp) {
      return fetch(`http://localhost:3000/contacts/${identity}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formel.firstname.value,
          lastName: formel.lastname.value,
          blockContact: formel.checkbox.checked,
          addressId: resp.id,
        }),
      });
    })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (updatedcontact) {
      let index = state.contacts.findIndex(function (contact) {
        return updatedcontact.id === contact.id;
      });
      console.log(updatedcontact);
      updatedcontact.address = {
        street: formel.streetname.value,
        city: formel.cityname.value,
        postCode: formel.postcode.value,
      };
      state.contacts[index] = updatedcontact;
      // let ulel = document.querySelector(".contacts-list");
      // ulel.innerHTML = "";
      console.log(state);
      renderContactsList();
      formel.remove();
    });
}

function deleteinfo(formel, contact) {
  console.log(contact);
  let identity = contact.id;
  console.log(identity);
  fetch(`http://localhost:3000/contacts/${identity}`, {
    method: "DELETE",
  })
    .then(function () {
      fetch(`http://localhost:3000/addresses/${identity} `, {
        method: "DELETE",
      });
    })
    .then(function () {
      const updatedstate = state.contacts.filter(function (eachcontact) {
        return eachcontact.id !== identity;
      });
      state.contacts = updatedstate;
      console.log(updatedstate);
      console.log(state);
      renderContactsList();
      formel.remove();
    });
}

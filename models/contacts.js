const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(response);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const foundContact = contacts.find(contact => contact.id === contactId);
    return foundContact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
  const contactForDelete = contacts.find(contact => contact.id === contactId);
  if (!contactForDelete) {
    return null;
  };
  const removedContact = contacts.filter(contact => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(removedContact));
  return contactForDelete;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
try {
  const { name, email, phone } = body;
  const newContact = { id: nanoid(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
} catch (error) {
  console.log(error.message);
}
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone} = body;
    const contacts = await listContacts();
    const [contact] = contacts.filter((item) => item.id === contactId);
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    const newContacts = [...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

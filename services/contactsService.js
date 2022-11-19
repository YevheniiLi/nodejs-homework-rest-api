const { Contact } = require("../db/contactModel");

const getContacts = async () => {
  try {
    const contacts = await Contact.find({});
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contact = await Contact.create(body);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (id, body) => {
  try {
    await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });
    const contact = await Contact.findById(id);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContactById = async (id) => {
  try {
    const contact = await Contact.findByIdAndRemove(id);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateStatusContact = async (id, body) => {
  try {
    const contact = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });
    return contact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContactById,
  updateStatusContact,
};

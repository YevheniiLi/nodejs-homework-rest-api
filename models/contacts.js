const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContactById,
  updateStatusContact,
} = require("../services/contactsService");

const getContactsController = async (req, res) => {
  const contacts = await getContacts();
  res.status(200).json({message: contacts})
};

const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact) {
    res.status(200).json({ message: contact });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const addContactController = async (req, res) => {
  const contact = await addContact(req.body);
  res.status(201).json({message: contact})
};

const updateContactController = async (req, res) => {
  const { id } = req.params;
  const contact = await updateContact (id, req.body);
  if (contact) {
    res.status(201).json({ message: contact });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const removeContactController = async (req, res) => {
  const { id } = req.params;
  const contact = await removeContactById(id);
  if (contact) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const updateStatusContactController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({message: "missing field favorite" })
  }
  const contact = await updateStatusContact(id, req.body );
  if (contact) {
    res.status(200).json({ message: contact });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  removeContactController,
  updateStatusContactController,
};

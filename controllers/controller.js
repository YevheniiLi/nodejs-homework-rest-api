const { Contact } = require("../models/contacts");
const { createError } = require("../helpers/createError");

async function getContacts(req, res, next) {
    const contacts = await Contact.find();
    return res.json({ data: contacts });
};

async function getContactById(req, res, next) { 
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
        throw createError(404, "Not found");
    }
    res.json(result);
};

async function addContact(req, res, next) {
    const newContact = await Contact.create({...req.body});
    return res.status(201).json({ data: { contact: newContact } });
};

async function removeContactById(req, res, next) {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
        throw createError(404, "Not found");
    }
    res.status(200).json({
        message: "contact deleted",
    });
};

async function updateContact(req, res, next) {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
        throw createError(404, "Not found");
    }
    res.status(200).json(result);
};
 
async function updateStatusContact(req, res, next) {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
        throw createError(404, "Not found");
    }
    res.status(200).json(result);
};

module.exports = {
    getContacts,
    getContactById,
    addContact,
    removeContactById,
    updateContact,
    updateStatusContact
};
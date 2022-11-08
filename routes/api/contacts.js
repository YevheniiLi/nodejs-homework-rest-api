const express = require('express');
const {
  postAddContact,
  putChangeContact,
  getContacts,
  getContactId,
  deleteContact,
} =require('../../controllers/contactControllers');

const {
  addContactSchema,
  changeContactSchema
} = require('../middleware/validationSchemes');
const { validation } = require('../middleware/validationBody')

const router = express.Router();

router.get('/', getContacts);

router.get('/:contactId', getContactId);

router.post('/', validation(addContactSchema), postAddContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', validation(changeContactSchema), putChangeContact);

module.exports = router;

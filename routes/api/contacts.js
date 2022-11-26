const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const contactsOperations = require("../../controllers/contactController");
const { validation } = require("../../middlewares/validation");
const { addSchema, schemaUpdate, schemaUpdateFavorite } = require("../../models/contacts");

router.get('/', asyncWrapper(contactsOperations.getContacts));
router.get("/:contactId", asyncWrapper(contactsOperations.getContactById));
router.post('/', validation(addSchema), asyncWrapper(contactsOperations.addContact));
router.delete('/:contactId', asyncWrapper(contactsOperations.removeContactById));
router.put('/:contactId', validation(schemaUpdate), asyncWrapper(contactsOperations.updateContact));
router.patch('/:contactId/favorite', validation(schemaUpdateFavorite), asyncWrapper(contactsOperations.updateStatusContact));


module.exports = router;
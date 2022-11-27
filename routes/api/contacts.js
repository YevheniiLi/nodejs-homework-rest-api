const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const contactsOperations = require("../../controllers/contactController");
const { validation } = require("../../middlewares/validation");
const authenticate = require("../../middlewares/authenticate");
const { addSchema, schemaUpdate, schemaUpdateFavorite } = require("../../models/contacts");

router.get('/', authenticate, asyncWrapper(contactsOperations.getContacts));
router.get("/:contactId", authenticate, asyncWrapper(contactsOperations.getContactById));
router.post('/', authenticate, validation(addSchema), asyncWrapper(contactsOperations.addContact));
router.delete('/:contactId', authenticate, asyncWrapper(contactsOperations.removeContactById));
router.put('/:contactId', authenticate, validation(schemaUpdate), asyncWrapper(contactsOperations.updateContact));
router.patch('/:contactId/favorite', authenticate, validation(schemaUpdateFavorite), asyncWrapper(contactsOperations.updateStatusContact));


module.exports = router;
const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  removeContactController,
  updateStatusContactController,
} = require("../../models/contacts");

const { asyncWrapper } = require("../../Helpers/apiHelpers");
const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/validationSchemes");

const { validation } = require('../../middlewares/validation')

const router = express.Router();

router.get("/", asyncWrapper(getContactsController));
router.get("/:id", asyncWrapper(getContactByIdController));
router.post("/", validation(addContactValidation), asyncWrapper(addContactController));
router.delete("/:id", asyncWrapper(removeContactController));
router.patch("/:id/favorite",asyncWrapper(updateStatusContactController));
router.put(
  "/:id",
  validation(updateContactValidation),
  asyncWrapper(updateContactController)
);

module.exports = router;

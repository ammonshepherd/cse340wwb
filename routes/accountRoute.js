// Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")

// Default account view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to build registration view
router.get(
  "/registration",
  utilities.handleErrors(accountController.buildRegister)
)

// Route to process registration
router.post('/register', utilities.handleErrors(accountController.registerAccount))

module.exports = router

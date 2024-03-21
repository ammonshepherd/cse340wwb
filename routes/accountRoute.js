// Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")

// Default account view
router.get("/login", utilities.handleErrors(accountController.buildLogin))


module.exports = router

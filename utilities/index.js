const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = '<a href="/" title="Home page">Home</a>'
  data.rows.forEach((row) => {
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
  })
  return list
}

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid
  if (data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach((vehicle) => {
      grid += '<li class="card inventory-card">'
      grid += '<a class="vehicle-link" href="../../inv/detail/' + vehicle.inv_id + '" title="View ' + vehicle.inv_make + " " + vehicle.inv_model + 'details"><img src="' + vehicle.inv_thumbnail + '" alt="Image of ' + vehicle.inv_make + " " + vehicle.inv_model + ' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += "<hr />"
      grid += "<h2>"
      grid += '<a class="vehicle-link" href="../../inv/detail/' + vehicle.inv_id + '" title="View ' + vehicle.inv_make + " " + vehicle.inv_model + ' details">' + vehicle.inv_make + " " + vehicle.inv_model + "</a>"
      grid += "</h2>"
      grid += "<span>$" + new Intl.NumberFormat("en-US").format(vehicle.inv_price) + "</span>"
      grid += "</div>"
      grid += "</li>"
    })
    grid += "</ul>"
  } else {
    grid += '<p class="alert warning">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}


/* **************************************
 * Build the vehicle view HTML
 * ************************************ */
Util.buildVehicleView = async function (data) {
  let price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })
  let view = '<div class="card vehicle-card">'
  view += '<div id="vehicle-image"><img src="' + data[0].inv_image + '" alt="photo of a ' + data[0].inv_make + " " + data[0].inv_model + '"></div>'
  view += '<div class="vehicle-info">'
  view += "<h1>" + data[0].inv_year + " " + data[0].inv_make + " " + data[0].inv_model + "</h1>"
  view += "<h2 id='vehicle-price'>No Haggle Price <span id='price'>" + price.format(data[0].inv_price) + "</span></h2>"
  view += "<p><b>Miles:</b> " + Intl.NumberFormat("en-US").format(data[0].inv_miles) + "</p>"
  view += "<p><b>Color:</b> " + data[0].inv_color + "</p>"
  view += "<p>" + data[0].inv_description + "</p>"
  view += "</div>"
  view += "</div>"
  return view
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util

var express = require("express");
var router = express.Router();
var messages = require("../sample.json");
var { generateRandomString } = require("../public/javascripts/helpers.js");
//import messages from "../sample.json" assert { type: "json" };

/* GET secret */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", (req, res) => {
  const id = messages.length + 1;
  const { message } = req.body;
  const secretKey = generateRandomString(7);
  const newMessage = { id, secretKey, message };
  messages.push(newMessage);
  res.json({ secretKey });
});

module.exports = router;

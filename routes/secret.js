var express = require("express");
var router = express.Router();
var messages = require("../sample.json");
var { generateRandomString } = require("../public/javascripts/helpers.js");

/* GET secret */
router.get("/:secretKey", (req, res) => {
  try {
    const { secretKey } = req.params;
    const secretItem = messages.find((x) => x.secretKey == secretKey);
    if (!secretItem) {
      throw new Error("It either never existed or has already been viewed.");
    }
    messages.splice(messages.indexOf(secretItem), 1);
    res.send({ secretMessage: secretItem.message });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/", (req, res) => {
  try {
    const id = messages.length + 1;
    const { message } = req.body;
    const secretKey = generateRandomString(7);
    const newMessage = { id, secretKey, message };
    messages.push(newMessage);
    res.json({ secretKey });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

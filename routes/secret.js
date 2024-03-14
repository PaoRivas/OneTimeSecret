const express = require("express");
const router = express.Router();
const { generateRandomString } = require("../public/javascripts/helpers.js");
require("dotenv").config();

const secretMap = new Map();

/* GET secret */
router.get("/:secretKey", (req, res) => {
  try {
    const { secretKey } = req.params;

    if (!secretMap.has(secretKey)) {
      throw new Error("It either never existed or has already been viewed.");
    }
    const secretMessage = secretMap.get(secretKey);
    secretMap.delete(secretKey);
    res.status(200).send({ secretMessage });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/", (req, res) => {
  try {
    const { message } = req.body;
    const secretKey = generateRandomString(process.env.SECRET_SIZE);
    secretMap.set(secretKey, message);
    res.status(201).json({ secretKey });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { router, secretMap };

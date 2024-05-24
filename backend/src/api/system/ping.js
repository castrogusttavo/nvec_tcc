const express = require("express");
const router = express.Router();
const dns = require('dns');

router.get("/checkInternet", (req, res) => {
  dns.lookup('google.com', (err) => {
    if (err) {
      res.json({ connected: false });
    } else {
      res.json({ connected: true });
    }
  })
});

module.exports = router;
  
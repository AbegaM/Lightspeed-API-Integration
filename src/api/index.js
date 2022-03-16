const express = require("express");
const router = express.Router();

const service = require("../service");

router.get("/test", service.test);
router.get("/auth/signin/lightspeed", service.signinWithLightspeed);
router.get("/auth/callback", service.lightspeedCallback);

module.exports = router;

const express = require("express");
const {
  details,
  payment,
  projects,
  project,
  checkOut,
} = require("../controllers/homeController");
const router = express.Router();
const { authCookie } = require("../utils/helper");
router.get("/", projects);
router.get("/details", details);
router.get("/project-d/:id", project);
router.post("/create-checkout-session", payment);
router.post("/webhook", express.raw({ type: "application/json" }), checkOut);
module.exports = router;

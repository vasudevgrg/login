const express= require("express");
const { allSessions, deleteSession, validSession } = require("../controllers/session");
const { authenticateSessions } = require("../middlewares/authenticateSessions");
const router= express.Router();

router.get("/getsessions",authenticateSessions, allSessions);
router.get("/removedevice/:id",authenticateSessions, deleteSession);
router.get("/sessionvalid/:id", validSession);

module.exports= router;
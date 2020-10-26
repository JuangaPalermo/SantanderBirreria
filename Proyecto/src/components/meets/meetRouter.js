const express = require("express");
const meetRouter = express.Router();
const { getBeers, getTempByDate, postNewMeet, postNewParticipant } = require("./meetController");
const {
  validateGetMeet,
  validateGetTempByDate,
  validatePostNewMeet,
  validatePostNewParticipant
} = require("./validateRequest");

meetRouter.get("/temp", validateGetTempByDate, getTempByDate);

meetRouter.post("/new-meet", validatePostNewMeet, postNewMeet);

meetRouter.post("/new-participant", validatePostNewParticipant, postNewParticipant);

meetRouter.get("/:participants", validateGetMeet, getBeers);

module.exports = { meetRouter };

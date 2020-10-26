const { calcDrinks } = require("../../utils/commonFunctions");
const { getTemp } = require("../../services/openWeatherMapService");
const {
  createMeeting,
  addParticipant,
} = require("../../services/mongoServices");

const getBeers = async (req, res, next) => {
  try {
    const { participants } = req.params;
    const part = parseInt(participants);
    const { date } = req.query;
    const temp = await getTemp(date);

    let howMuchdrink;
    switch (true) {
      case temp <= 20:
        howMuchdrink = 0.75;
        break;

      case temp > 20 && temp <= 24:
        howMuchdrink = 1;
        break;

      case temp > 24:
        howMuchdrink = 2;
        break;
    }
    const resp = calcDrinks(part, howMuchdrink);
    res.status(200).json({
      status: true,
      meeting: date,
      participants: part,
      message: `Se van a necesitar pedir ${resp} cajas`,
    });
  } catch (error) {
    next(error);
  }
};

const getTempByDate = async (req, res, next) => {
  try {
    const { date } = req.query;
    const temp = await getTemp(date);
    res.status(200).json({
      status: true,
      date: date,
      message: `La temperatura para el día indicado es: ${temp} grados.`,
    });
  } catch (error) {
    next(error);
  }
};

const postNewMeet = async (req, res, next) => {
  try {
    const { body } = req;
    await createMeeting(body);
    res.status(201).json({
      status: true,
      message: "Meeting creada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

const postNewParticipant = async (req, res, next) => {
  try {
    const { id } = req.body;
    await addParticipant(id);
    res.status(201).json({
      status: true,
      message: "Participante agregado",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBeers, getTempByDate, postNewMeet, postNewParticipant };

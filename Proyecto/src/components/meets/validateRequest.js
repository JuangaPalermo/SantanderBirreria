const Joi = require("joi").extend(require("@hapi/joi-date"));
Joi.objectId = require("joi-objectid")(Joi);
const { getDates } = require("../../utils/commonFunctions");

const validateGetMeet = async (req, res, next) => {
  try {
    const [today, sevenDate] = getDates();
    const { headers, query, params } = req;

    const schemaQuery = Joi.object({
      date: Joi.date()
        .min(today)
        .max(sevenDate)
        .format("MM/DD/YYYY")
        .required(), // MM/DD/YYYY
    });

    const schemaParams = Joi.object({
      participants: Joi.number().required(),
    });

    await schemaQuery.validateAsync(query);
    await schemaParams.validateAsync(params);
    next();
  } catch (error) {
    error.type = "validation";
    next(error);
  }
};

const validateGetTempByDate = async (req, res, next) => {
  try {
    const [today, sevenDate] = getDates();
    const { query } = req;

    const schemaQuery = Joi.object({
      date: Joi.date()
        .min(today)
        .max(sevenDate)
        .format("MM/DD/YYYY")
        .required(),
    });

    await schemaQuery.validateAsync(query);
    next();
  } catch (error) {
    error.type = "validation";
    next(error);
  }
};

const validatePostNewMeet = async (req, res, next) => {
  try {
    const [today, sevenDate] = getDates();
    const { body } = req;

    const schemaBody = Joi.object({
      name: Joi.string().max(30).min(3),
      date: Joi.date()
        .min(today)
        .max(sevenDate)
        .format("MM/DD/YYYY")
        .required(),
    });

    await schemaBody.validateAsync(body);
    next();
  } catch (error) {
    error.type = "validation";
    next(error);
  }
};

const validatePostNewParticipant = async (req, res, next) => {
  try {
    const { body } = req;

    const schemaBody = Joi.object({
      id: Joi.objectId(),
    });

    await schemaBody.validateAsync(body);
    next();
  } catch (error) {
    error.type = "validation";
    next(error);
  }
};

module.exports = {
  validateGetMeet,
  validateGetTempByDate,
  validatePostNewMeet,
  validatePostNewParticipant,
};

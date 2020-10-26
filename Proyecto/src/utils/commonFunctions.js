const moment = require("moment");

const calcDrinks = (participants, howMuchdrink) => {
  return Math.ceil((parseInt(participants) * howMuchdrink) / 6);
};

const kelvinToCelcius = (gKelvin) => {
  return gKelvin - 273.15;
};

const getDates = () => {
  const today = moment()
    .utc()
    .hours(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0)
    .format("MM/DD/YYYY");

  const sevenDate = moment()
    .utc()
    .add(6, "day")
    .hours(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0)
    .format("MM/DD/YYYY");

  return [today, sevenDate];
};

module.exports = { calcDrinks, kelvinToCelcius, getDates };

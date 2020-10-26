const axios = require("axios");
const { kelvinToCelcius, getDates } = require("../utils/commonFunctions");
const [today] = getDates();

const getTemp = async (date) => {
  const apiKey = process.env.API_KEY;
  const fechaInicio = new Date(today).getTime();
  const fechaFin = new Date(date).getTime();
  const diff = fechaFin - fechaInicio;
  const diffDays = diff / (1000 * 60 * 60 * 24);

  const respWeather = await axios({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/onecall?lat=-34.6083&lon=-58.3712&exclude=hourly,minutely,current&appid=${apiKey}`,
  });

  const tempKelvin = respWeather.data.daily[diffDays].temp.night;
  const temp = kelvinToCelcius(tempKelvin);
  return temp;
};

module.exports = { getTemp };

const axios = require("axios");
const Fortune = require("../models/fortune");

async function getGanji({ year, month, day, isLunar }) {
  const endpoint = isLunar ? "getSolCalInfo" : "getLunCalInfo";
  try {
    const res = await axios.get(`${process.env.API_URL}/${endpoint}`, {
      params: {
        serviceKey: process.env.OPEN_API_KEY,
        [isLunar ? "lunYear" : "solYear"]: year,
        [isLunar ? "lunMonth" : "solMonth"]: month,
        [isLunar ? "lunDay" : "solDay"]: day,
      },
    });

    const items = res.data.response.body.items;
    if (items) {
      console.log(items.item);
      return items.item.lunIljin;
    } else {
      throw new Error("No Data");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get ganji");
  }
}
exports.getFortune = async (ctx) => {
  console.log("GET REQUEST", ctx.request.body);
  const { birthYear, birthMonth, birthDay, calandar } = ctx.request.body;
  const isLunar = calandar == "lunar";

  const ganji = await getGanji({
    year: birthYear,
    month: birthMonth,
    day: birthDay,
    isLunar,
  });

  console.log(ganji);

  try {
    const result = await Fortune.findOne({ ganji });
    console.log(result);

    if (!result) {
      throw new Error("No fortune data available.");
    }

    ctx.response.status = 200;
    ctx.response.body = { fortune: result.fortune };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { message: error.message };
  }
};

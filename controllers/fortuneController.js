const axios = require("axios");
const Fortune = require("../models/fortune");

async function getGanji({ year, month, day, isLunar }) {
  const endpoint = isLunar ? "getSolCalInfo" : "getLunCalInfo";
  try {
    const res = await axios.get(`${process.env.API_URL}/${endpoint}`, {
      params: {
        serviceKey: process.env.OPEN_API_KEY,
        [isLunar ? "lunYear" : "solarYear"]: year,
        [isLunar ? "lunMonth" : "solarMonth"]: month,
        [isLunar ? "lunDay" : "solarDay"]: day,
      },
    });
    return res.data.lunIljin;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get ganji");
  }
}
exports.getFortune = async (req, res) => {
  const { year, month, day, calendar } = req.body;
  const isLunar = calendar == "lunar";

  const ganji = await getGanji({ year, month, day, isLunar });

  try {
    const result = await Fortune.findOne({ ganji });

    if (!result) {
      throw new Error("No fortune data available.");
    }

    return res.status(200).json({ fortune: result.fortune });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

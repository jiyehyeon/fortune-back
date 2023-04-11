const Koa = require("koa");
const router = require("./routes");
const app = new Koa();
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/database");

console.log(process.env.MONGO_URI);
connectDB();

// 라우터 등록
app.use(router.routes());
app.use(router.allowedMethods());

// 서버 시작
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;

const Koa = require("koa");
const router = require("./routes");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/database");

// CORS 미들웨어 추가
const corsOptions = {
  origin: "*", // 추후 가능한 도메인,ip주소로 변경 예정
};

app.use(cors(corsOptions));

// 미들웨어 추가
app.use(bodyParser());

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

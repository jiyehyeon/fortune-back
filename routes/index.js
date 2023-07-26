const Router = require("koa-router");

const router = new Router();
const fortune = require("./fortune");

router.use("/fortune", fortune.routes()); // api 라우트를 /api 경로 하위 라우트로 설정

module.exports = router;

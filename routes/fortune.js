const Router = require("koa-router");
const fortuneController = require("../controllers/fortuneController");

const router = new Router();

router.post("/", fortuneController.getFortune);

module.exports = router;

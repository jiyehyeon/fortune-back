const Router = require("koa-router");
const fortuneController = require("../controllers/fortuneController");

const router = new Router();

router.post("/fortune", fortuneController.getFortune);

module.exports = router;

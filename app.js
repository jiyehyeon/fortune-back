const Koa = require("koa");
const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = "Hello, Koa!";
  await next();
});

app.listen(3000);

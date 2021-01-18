const KoaRouter = require("koa-router");
const Mock = require("mockjs");
const router = new KoaRouter();
const Random = Mock.Random;
router.prefix("/scenic");

router.get("/slideshow/images", (ctx, next) => {
  ctx.body = Mock.mock({
    "images|4": [
      {
        "id|+1": 0,
        src: Random.image("1280x400", Random.color()),
        href: "/scenic/@id",
      },
    ],
  });
});

module.exports = router;

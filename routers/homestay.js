const KoaRouter = require("koa-router");
const Mock = require("mockjs");
const router = new KoaRouter();
const Random = Mock.Random;
router.prefix("/homestay");

router.get("/introduction", (ctx, next) => {
  const query = ctx.query;
  console.log(query);
  ctx.body = Mock.mock({
    serviceId: "0", // 业务id
    title: "民宿",
    "content|4": [
      {
        "id|+1": 0,
        title: "民宿@id",
        desc: "民宿描述@id",
        href: "/homestay/@id",
        imageSrc: Random.image("240x240"),
      },
    ],
  });
});
module.exports = router;

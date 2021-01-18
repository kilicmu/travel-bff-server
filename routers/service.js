const KoaRouter = require("koa-router");
const Mock = require("mockjs");
const router = new KoaRouter();
const Random = Mock.Random;
const { parseArrayParam } = require("../utils/params-utils");

router.prefix("/service");

/**
 * 此接口提供本站点支持的所有服务的索引
 * 可以使用serviceId查询服务的介绍等。
 */
router.get("/supports", (ctx, next) => {
  ctx.body = Mock.mock({
    "supports|3": [
      {
        "serviceId|+1": 0,
        info: "服务@id",
      },
    ],
  });
});

/**
 * params: {
 *  serviceId：请求获取的服务的id, 可以为数组
 *  start: 服务开始获取开始id
 *  end：获取目标简介的结尾id
 * }
 */
router.get("/introduction", (ctx, next) => {
  let { serviceIds, start = 0, end = 4 } = ctx.query;
  serviceIds = parseArrayParam(serviceIds);
  let ret = [];
  console.log(serviceIds);
  ret = serviceIds.reduce((a, b) => {
    return [...a, getIntroduceById(b, Number(start), Number(end))];
  }, []);
  ctx.body = ret;
});

const getIntroduceById = (id, start, end) => {
  const target = [
    Mock.mock({
      serviceId: "0", // 业务id
      title: "去哪儿玩",
      "content|100": [
        {
          "id|+1": 0,
          title: "景点@id",
          desc: "景点描述@id",
          href: "/scenic/@id",
          imageSrc: Random.image("240x240"),
          length: 100,
        },
      ],
    }),
    Mock.mock({
      serviceId: "1", // 业务id
      title: "民宿",
      "content|100": [
        {
          "id|+1": 0,
          title: "民宿@id",
          desc: "民宿描述@id",
          href: "/homestay/@id",
          imageSrc: Random.image("240x240"),
          length: 100,
        },
      ],
    }),
    Mock.mock({
      serviceId: "2", // 业务id
      title: "好物",
      "content|100": [
        {
          "id|+1": 0,
          title: "好物@id",
          desc: "好物描述@id",
          href: "/things/@id",
          imageSrc: Random.image("240x240"),
          length: 100,
        },
      ],
    }),
  ];

  const result = target.filter((i) => String(i.serviceId) === String(id))[0];
  const contentLength = result?.content.length;
  result.content = result?.content.slice(start, end) ?? [];
  result.start = start;
  result.end = end;
  result.contentLength = contentLength;
  return result;
};

module.exports = router;

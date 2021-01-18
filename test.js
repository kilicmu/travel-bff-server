const data = [
  {
    key: "name",
    value: "豆皮范er",
  },
  {
    key: "age",
    value: 1,
  },
];

const processFn = (data) => processData(data);

const processData = (data) => {
  return data.reduce(
    (collection, { key, value }) => ({ ...collection, [key]: value }),
    {}
  );
};

console.log(processFn(data));

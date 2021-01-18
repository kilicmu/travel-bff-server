exports.parseArrayParam = (str) => {
  str = String(str) || "";
  if (str.includes(",")) {
    return [].concat(str.split(","));
  }
  return [str];
};

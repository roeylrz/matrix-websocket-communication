const getMockData = () => {
  return new Promise((resolve, reject) => {
    const content = require("./content.json");
    resolve(JSON.stringify(content));
  });
};

module.exports = {
  getMockData
};

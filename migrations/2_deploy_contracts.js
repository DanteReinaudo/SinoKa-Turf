const SinoKoin = artifacts.require("SinoKoin");

module.exports = function (deployer) {
  deployer.deploy(SinoKoin, 1000);
};

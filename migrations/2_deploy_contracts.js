const HorseRacing = artifacts.require("HorseRacing");

module.exports = function (deployer) {
  deployer.deploy(HorseRacing);
};
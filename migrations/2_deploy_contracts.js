const HorseRacing = artifacts.require("HorseRacing");
const HorseFactory = artifacts.require("HorseFactory");
const HorseHelper = artifacts.require("HorseHelper");

module.exports = function (deployer) {
  deployer.deploy(HorseRacing);
  deployer.deploy(HorseFactory);
  deployer.deploy(HorseHelper);
};
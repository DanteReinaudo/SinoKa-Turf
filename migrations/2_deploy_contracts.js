//const HorseCoin = artifacts.require("HorseCoin");
const HorseRacing = artifacts.require("HorseRacing");
//const HorseFactory = artifacts.require("HorseFactory");

module.exports = function (deployer) {
  deployer.deploy(HorseRacing)
};

/*
var OzToken = artifacts.require("OzToken");
var CartaItem = artifacts.require("CartaItem");
var SubastaFactory = artifacts.require("SubastaFactory");

module.exports = function(deployer, network, accounts) {
    deployer.deploy(OzToken)
        .then(() => OzToken.deployed())
        .then(() => deployer.deploy(SubastaFactory, OzToken.address))
        .then(() => deployer.deploy(CartaItem, OzToken.address, SubastaFactory.address, accounts[1]));
}
*/
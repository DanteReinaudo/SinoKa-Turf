/*
const HorseFactory = artifacts.require("HorseFactory");
const horseNames = ["Horse 1", "Horse 2"];
contract("HorseFactory", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await HorseFactory.new();
    });

    it("should be able to create a new horse", async () => { 
        const result = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        assert.equal(result.receipt.status, true);
        assert.equal(result.logs[0].args.name,horseNames[0]);
    })

    it("should not allow two horses", async () => {
        await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        try {
            await contractInstance.createRandomHorse(horseNames[1], {from: alice});
            assert(true);
        }
          catch (err) {
            return;
        }
        assert(false, "The contract did not throw.");
    })

})
*/
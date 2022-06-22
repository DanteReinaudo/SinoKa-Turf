const HorseOwnership = artifacts.require("HorseOwnership");
const horseNames = ["Horse 1", "Horse 2"];
contract("HorseOwnership", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance= await HorseOwnership.new();
    });
    
    it("should transfer a horse", async () => {
        const result = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        const horseId = result.logs[0].args.horseId.toNumber();
        await contractInstance.transferFrom(alice, bob, horseId, {from: alice});
        const newOwner = await contractInstance.ownerOf(horseId);
        assert.equal(newOwner, bob);
    })

    it("should approve and then transfer a horse when the approved address calls transferFrom", async () => {
        const result = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        const horseId = result.logs[0].args.horseId.toNumber();
        await contractInstance.approve(bob, horseId, {from: alice});
        await contractInstance.transferFrom(alice, bob, horseId, {from: bob});
        const newOwner = await contractInstance.ownerOf(horseId);
        assert.equal(newOwner,bob);
    })

    it("should approve and then transfer a horse when the owner calls transferFrom", async () => {
        const result = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        const horseId = result.logs[0].args.horseId.toNumber();
        await contractInstance.approve(bob, horseId, {from: alice});
        await contractInstance.transferFrom(alice, bob, horseId, {from: alice});
        const newOwner = await contractInstance.ownerOf(horseId);
        assert.equal(newOwner,bob);
     })

})
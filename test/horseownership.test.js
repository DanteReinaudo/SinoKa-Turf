
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
    

    it("should change balace when transfer a horse", async () => {
        const result = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        const horseId = result.logs[0].args.horseId.toNumber();
        const bobHorse = await contractInstance.createRandomHorse(horseNames[1], {from: bob});
        await contractInstance.transferFrom(alice, bob, horseId, {from: alice});

        const newOwner = await contractInstance.ownerOf(horseId);
        const bobAmountHorses = await contractInstance.balanceOf(bob);
        const bobExpected = 2;
        assert.equal(newOwner, bob);
        assert.equal(bobAmountHorses.toString(), bobExpected.toString());

        const aliceAmountHorses = await contractInstance.balanceOf(alice);
        const aliceExpected = 0;
        assert.equal(aliceAmountHorses.toString(), aliceExpected.toString());
    })
    
    
     it("should show all horses from an account", async () => {
        const aliceHorse = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        const aliceHorseId = aliceHorse.logs[0].args.horseId.toNumber();
        const bobHorse = await contractInstance.createRandomHorse(horseNames[1], {from: bob});
        const bobHorseId = bobHorse.logs[0].args.horseId.toNumber();
        await contractInstance.approve(bob, aliceHorseId, {from: alice});
        await contractInstance.transferFrom(alice, bob, aliceHorseId, {from: alice});
        const newOwner = await contractInstance.ownerOf(aliceHorseId);
        const bobHorses = await contractInstance.getHorsesByOwner(bob,{from: alice});
        //const expected = [aliceHorseId.toString(),bobHorseId.toString()];
        assert.equal(newOwner,bob);
        assert.equal(bobHorses[0].toString(),aliceHorseId.toString());
        assert.equal(bobHorses[1].toString(),bobHorseId.toString());
     })

})

const HorseRacing = artifacts.require("HorseRacing");
const horseNames = ["Horse 1", "Horse 2","Horse 3","Horse 4"];
contract("HorseRacing", (accounts) => {
    let [c,alice, bob,carmen,diego] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await HorseRacing.new({from: c});
    });

    
    it("should be able to show bet price", async () => {
        let raceBet = await contractInstance.returnRaceBet();
        assert.equal(raceBet,10);
    })

    it("should be able to change bet price", async () => {
        await contractInstance.setBet(5,{from: c});
        let raceBet = await contractInstance.returnRaceBet();
        assert.equal(raceBet,5);
    })


    it("should be able to bet a horse", async () => { 
        const horse1 = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        const horse1Id = horse1.logs[0].args.horseId.toNumber();
        const horse2 = await contractInstance.createRandomHorse(horseNames[1], {from: bob});
        const horse2Id = horse2.logs[0].args.horseId.toNumber();
        const horse3 = await contractInstance.createRandomHorse(horseNames[2], {from: carmen});
        const horse3Id = horse3.logs[0].args.horseId.toNumber();
        const horse4 = await contractInstance.createRandomHorse(horseNames[3], {from: diego});
        const horse4Id = horse4.logs[0].args.horseId.toNumber();
     
        await contractInstance.bet(horse1Id, {from: alice,value: 10});
        await contractInstance.bet(horse2Id, {from: bob,value:10});
        await contractInstance.bet(horse3Id, {from: carmen,value:10});
        await contractInstance.bet(horse4Id, {from: diego,value:10});

        let totalBet = await contractInstance.returnTotalBet();
        assert.equal(totalBet,40);
    })

    it("should fail if i bet for horse that i dont own", async () => { 
        const horse1 = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        const horse1Id = horse1.logs[0].args.horseId.toNumber();
        try {
            await contractInstance.bet(horse1Id, {from: bob,value: 10});
            assert(true);
        }
          catch (err) {
            return;


        }
        assert(false, "The contract did not throw.");
    })

    it("should fail if my bet is lower than race bet", async () => { 
        const horse1 = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        const horse1Id = horse1.logs[0].args.horseId.toNumber();
        try {
            await contractInstance.bet(horse1Id, {from: alice,value: 5});
            assert(true);
        }
          catch (err) {
            return;


        }
        assert(false, "The contract did not throw.");
    })
    
    /*
    it("cant start a race with insufficient horse", async () => { 
        try {
            let winner =  contractInstance.race({from: c});
            assert(true);
        }
          catch (err) {
            return;
        }
        assert(false, "The contract did not throw.");
    })

    it("cant start a race from another account", async () => { 
        try {
            let winner =  contractInstance.race({from: alice});
            assert(true);
        }
          catch (err) {
            return;
        }
        assert(false, "The contract did not throw.");
    })


    it("obtain race winner", async () => { 
        const horse1 = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        const horse1Id = horse1.logs[0].args.horseId.toNumber();
        const horse2 = await contractInstance.createRandomHorse(horseNames[1], {from: bob});
        const horse2Id = horse2.logs[0].args.horseId.toNumber();
        const horse3 = await contractInstance.createRandomHorse(horseNames[2], {from: carmen});
        const horse3Id = horse3.logs[0].args.horseId.toNumber();
        const horse4 = await contractInstance.createRandomHorse(horseNames[3], {from: diego});
        const horse4Id = horse4.logs[0].args.horseId.toNumber();
     
        await contractInstance.bet(horse1Id, {from: alice,value: 10});
        await contractInstance.bet(horse2Id, {from: bob,value:10});
        await contractInstance.bet(horse3Id, {from: carmen,value:10});
        await contractInstance.bet(horse4Id, {from: diego,value:10});

        let totalBet = await contractInstance.returnTotalBet();
        assert.equal(totalBet,40);

        let race = await contractInstance.race({from: c});
        const winnerId = race.logs[0].args.winnerId.toNumber();

        assert.equal(winnerId,2);
    })

*/
})
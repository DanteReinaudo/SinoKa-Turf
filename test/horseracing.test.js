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

    it("should be able to transfer token", async () => { 
        const aliceTokens = await contractInstance.transferToken(c, alice, 100, {from: c});
        const aliceBalance = await contractInstance.returnBalanceOf(alice);
        const ourBalance = await contractInstance.returnBalanceOf(c);
        const aliceExpected = 100;
        assert.equal(aliceBalance.toString(),aliceExpected.toString());
        const ourExpected = 1e6 -100; 
        assert.equal(ourBalance.toString(),ourExpected.toString());
    })


    it("should be able to sell token", async () => { 
        const aliceTokens = await contractInstance.buyTokens( {from: alice, value: 1 });
        const aliceBalance = await contractInstance.returnBalanceOf(alice);
        const ourBalance = await contractInstance.returnBalanceOf(c);
        const aliceExpected = 100
        const expected = 1e6 -100; 
        //assert.equal(aliceTokens.toString(),aliceExpected.toString());
        assert.equal(aliceBalance.toString(),aliceExpected.toString());
        assert.equal(ourBalance.toString(),expected.toString());
    })

    it("should be able to bet a horse", async () => { 
        const horse1 = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        const aliceTokens = await contractInstance.buyTokens( {from: alice, value: 1 });
        const horse1Id = horse1.logs[0].args.horseId.toNumber(); 
        await contractInstance.bet(horse1Id, {from: alice});
        let totalBet = await contractInstance.returnTotalBet();
        let totalExpected = 10;
        assert.equal(totalBet.toString(),totalExpected.toString());

        const aliceBalance = await contractInstance.returnBalanceOf(alice);
        const ourBalance = await contractInstance.returnBalanceOf(c);
        const aliceExpected = 90
        const expected = 1e6 - 100 + 10; 
        assert.equal(aliceBalance.toString(),aliceExpected.toString());
        assert.equal(ourBalance.toString(),expected.toString());
    })

    
    it("should be able to bet horses", async () => {
        const aliceTokens = await contractInstance.buyTokens( {from: alice, value: 1 });
        const bobTokens = await contractInstance.buyTokens( {from: bob, value: 1 });
        const carmenTokens = await contractInstance.buyTokens( {from:carmen, value: 1 });
        const diegoTokens = await contractInstance.buyTokens( {from: diego, value: 1 });
        const horse1 = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        const horse1Id = horse1.logs[0].args.horseId.toNumber();
        const horse2 = await contractInstance.createRandomHorse(horseNames[1], {from: bob});
        const horse2Id = horse2.logs[0].args.horseId.toNumber();
        const horse3 = await contractInstance.createRandomHorse(horseNames[2], {from: carmen});
        const horse3Id = horse3.logs[0].args.horseId.toNumber();
        const horse4 = await contractInstance.createRandomHorse(horseNames[3], {from: diego});
        const horse4Id = horse4.logs[0].args.horseId.toNumber();
     
        await contractInstance.bet(horse1Id, {from: alice});
        await contractInstance.bet(horse2Id, {from: bob});
        await contractInstance.bet(horse3Id, {from: carmen});
        await contractInstance.bet(horse4Id, {from: diego});

        let totalBet = await contractInstance.returnTotalBet();
        assert.equal(totalBet,40);
    })


    it("should store horses in the race", async () => { 
        const aliceTokens = await contractInstance.buyTokens( {from: alice, value: 1 });
        const bobTokens = await contractInstance.buyTokens( {from: bob, value: 1 });
        const carmenTokens = await contractInstance.buyTokens( {from:carmen, value: 1 });
        const diegoTokens = await contractInstance.buyTokens( {from: diego, value: 1 });
        const horse1 = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        const horse1Id = horse1.logs[0].args.horseId.toNumber();
        const horse2 = await contractInstance.createRandomHorse(horseNames[1], {from: bob});
        const horse2Id = horse2.logs[0].args.horseId.toNumber();
        const horse3 = await contractInstance.createRandomHorse(horseNames[2], {from: carmen});
        const horse3Id = horse3.logs[0].args.horseId.toNumber();
        const horse4 = await contractInstance.createRandomHorse(horseNames[3], {from: diego});
        const horse4Id = horse4.logs[0].args.horseId.toNumber();
     
        let amountHorses0 = await contractInstance.returnRaceLength();
        assert.equal(amountHorses0,0);
        await contractInstance.bet(horse1Id, {from: alice});
        let amountHorses1 = await contractInstance.returnRaceLength();
        assert.equal(amountHorses1,1);
        await contractInstance.bet(horse2Id, {from: bob});
        let amountHorses2 = await contractInstance.returnRaceLength();
        assert.equal(amountHorses2,2);
        await contractInstance.bet(horse3Id, {from: carmen});
        let amountHorses3 = await contractInstance.returnRaceLength();
        assert.equal(amountHorses3,3);
        await contractInstance.bet(horse4Id, {from: diego});
        let amountHorses4 = await contractInstance.returnRaceLength();
        assert.equal(amountHorses4,4);

        let totalBet = await contractInstance.returnTotalBet();
        assert.equal(totalBet,40);
    })
    

    it("should transfer tokens to the winner ", async () => { 
        const aliceTokens = await contractInstance.buyTokens( {from: alice, value: 1 });
        const bobTokens = await contractInstance.buyTokens( {from: bob, value: 1 });
        const carmenTokens = await contractInstance.buyTokens( {from:carmen, value: 1 });
        const diegoTokens = await contractInstance.buyTokens( {from: diego, value: 1 });
        const horse1 = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        const horse1Id = horse1.logs[0].args.horseId.toNumber();
        const horse2 = await contractInstance.createRandomHorse(horseNames[1], {from: bob});
        const horse2Id = horse2.logs[0].args.horseId.toNumber();
        const horse3 = await contractInstance.createRandomHorse(horseNames[2], {from: carmen});
        const horse3Id = horse3.logs[0].args.horseId.toNumber();
        const horse4 = await contractInstance.createRandomHorse(horseNames[3], {from: diego});
        const horse4Id = horse4.logs[0].args.horseId.toNumber();
     
        
        await contractInstance.bet(horse1Id, {from: alice});
        await contractInstance.bet(horse2Id, {from: bob});
        await contractInstance.bet(horse3Id, {from: carmen});
        await contractInstance.bet(horse4Id, {from: diego});
        
        await contractInstance.mock_race(2,{from:c});

        let aliceBalance  = await contractInstance.returnBalanceOf(alice);
        assert.equal(aliceBalance,90);
        let bobBalance  = await contractInstance.returnBalanceOf(bob);
        assert.equal(bobBalance,90);
        let carmenBalance  = await contractInstance.returnBalanceOf(carmen);
        assert.equal(carmenBalance,130);
        let diegoBalance  = await contractInstance.returnBalanceOf(diego);
        assert.equal(diegoBalance,90);

        let totalBet = await contractInstance.returnTotalBet();
        assert.equal(totalBet,0);
        let raceLength = await contractInstance.returnRaceLength();
        assert.equal(raceLength,0);

    })


 
    it("should fail if i bet for horse that i dont own", async () => { 
        const bobTokens = await contractInstance.buyTokens( {from: bob, value: 1 });
        const horse1 = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        const horse1Id = horse1.logs[0].args.horseId.toNumber();
        try {
            await contractInstance.bet(horse1Id, {from: bob});
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
            await contractInstance.bet(horse1Id, {from: alice});
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
    */
})
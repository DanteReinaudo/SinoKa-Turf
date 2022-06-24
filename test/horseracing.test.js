const HorseRacing = artifacts.require("HorseRacing");
const horseNames = ["Horse 1", "Horse 2","Horse 3","Horse 4"];
contract("HorseRacing", (accounts) => {
    let [alice, bob,carmen,diego] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await HorseRacing.new();
    });

    it("should be able to create a new horse", async () => { 
        const horse1 = await contractInstance.createRandomHorse(horseNames[0], {from: alice});
        const horse1Id = horse1.logs[0].args.horseId.toNumber();
        const horse2 = await contractInstance.createRandomHorse(horseNames[0], {from: bob});
        const horse2Id = horse2.logs[0].args.horseId.toNumber();
        const horse3 = await contractInstance.createRandomHorse(horseNames[0], {from: carmen});
        const horse3Id = horse3.logs[0].args.horseId.toNumber();
        const horse4 = await contractInstance.createRandomHorse(horseNames[0], {from: diego});
        const horse4Id = horse4.logs[0].args.horseId.toNumber();
        
        contractInstance.setBet(10);
        contractInstance.mock_bet(horse1Id, {from: alice});
        contractInstance.mock_bet(horse2Id, {from: bob});
        contractInstance.mock_bet(horse3Id, {from: carmen});
        contractInstance.mock_bet(horse4Id, {from: diego});

        let bob_balance = address(bob).balance;

        assert_eq(bob_balance,90);


    })

    /*
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
    */

})
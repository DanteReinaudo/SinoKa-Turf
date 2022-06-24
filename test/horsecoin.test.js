/*
const HorseCoin = artifacts.require("HorseCoin");
const horseNames = ["Horse 1", "Horse 2"];
contract("HorseCoin", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance= await HorseCoin.new(1000,{from: alice});
    });


    
    it("should initialize coin", async () => {
        const total_supply = await contractInstance.totalSupply({from: alice});
        assert.equal(total_supply, 1000);
    })

    it("should transfer coin", async () => {
        await contractInstance.transfer(bob, 500, {from: alice});
        const alice_supply = await contractInstance.balanceOf(alice,{from: alice});
        const bob_supply = await contractInstance.balanceOf(bob,{from: alice});
        assert.equal(alice_supply, 500);
        assert.equal(bob_supply, 500);
    })

    it("not allow transferring more tokens than what is in account", async () => {
        try {
            await contractInstance.transfer(bob, 1500, {from: alice});
            assert(true);
        }
          catch (err) {
            return;
        }
        assert(false, "The contract did not throw.");
    })

    
    it("should approve and then transfer coin when the approved address calls transferFrom", async () => {
        await contractInstance.approve(bob, 250, {from: alice});
        await contractInstance.transferFrom(alice, bob, 250, {from: bob});
        const alice_supply = await contractInstance.balanceOf(alice,{from: alice});
        const bob_supply = await contractInstance.balanceOf(bob,{from: alice});
        assert.equal(alice_supply, 750);
        assert.equal(bob_supply, 250);
    })
/
    it("should show allowance when approve", async () => {
        await contractInstance.approve(bob, 500, {from: alice});
        const expected = 500;
        const alice_supply = await contractInstance.balanceOf(alice,{from: alice});
        const bob_supply = await contractInstance.balanceOf(bob,{from: alice});
        const bob_allowance = await contractInstance.allowance(alice,bob,{from: alice});
        assert.equal(alice_supply, 1000);
        assert.equal(bob_supply, 0);
        assert.equal(bob_allowance.toString(), expected.toString());
     })

     it("should show remaining allowance when transfer", async () => {
        await contractInstance.approve(bob, 500, {from: alice});
        await contractInstance.transferFrom(alice, bob, 250, {from: bob});
        const alice_supply = await contractInstance.balanceOf(alice,{from: alice});
        const bob_supply = await contractInstance.balanceOf(bob,{from: alice});
        const bob_allowance = await contractInstance.allowance(alice,bob,{from: alice});
        const expected = 250;
        assert.equal(alice_supply, 750);
        assert.equal(bob_supply, 250);
        assert.equal(bob_allowance.toString(), expected.toString());
     })

})
*/
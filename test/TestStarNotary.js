const StarNotary = artifacts.require('StarNotary')
const starPrice = web3.utils.toWei('.01', 'ether')

contract('StarNotary', accounts => {
    it('can create a star', async () => {
        const instance = await StarNotary.deployed()
        await instance.createStar('Awesome Star!', 1, { from: accounts[0] })

        assert.equal(await instance.tokenIdToStarInfo(1), 'Awesome Star!')
    })
    
    it('user can put star up for sale', async() => {
        const instance = await StarNotary.deployed()

        await instance.createStar('awesome star', 2, { from: accounts[1] })
        await instance.putStarUpForSale(2, starPrice, { from: accounts[1] })

        assert.equal(await instance.starsForSale(2), starPrice)
    })
    
    it('allows user1 get the funds after the sale', async() => {
        const instance = await StarNotary.deployed()
        const balance = web3.utils.toWei('.05', 'ether')

        await instance.createStar('awesome star', 3, { from: accounts[1] })
        await instance.putStarUpForSale(3, starPrice, { from: accounts[1] })
        const user1BalanceOriginal = Number(await web3.eth.getBalance(accounts[1]))
        await instance.buyStar(3, { from: accounts[2], value: balance })
        const user1Balance = Number(await web3.eth.getBalance(accounts[1]))

        assert.equal(user1BalanceOriginal + Number(starPrice), user1Balance)
    })
    
    it('allows user2 buy a star if it is put up for sale', async() => {
        const instance = await StarNotary.deployed()
        const balance = web3.utils.toWei('.05', 'ether')

        await instance.createStar('awesome star', 4, { from: accounts[1] })
        await instance.putStarUpForSale(4, starPrice, { from: accounts[1] })
        await instance.buyStar(4, { from: accounts[2], value: balance })

        assert.equal(await instance.ownerOf(4), accounts[2])
    })
    
    it('allows user2 to buy a star and decreases its balance in ether', async() => {
        const instance = await StarNotary.deployed()
        const balance = web3.utils.toWei('.05', 'ether')

        await instance.createStar('awesome star', 5, { from: accounts[1] })
        await instance.putStarUpForSale(5, starPrice, { from: accounts[1] })
        const user2BalanceOriginal = Number(await web3.eth.getBalance(accounts[2]))
        await instance.buyStar(5, { from: accounts[2], value: balance, gasPrice:0 })
        const user2Balance = Number(await web3.eth.getBalance(accounts[2]))

        assert.equal(user2BalanceOriginal - user2Balance, starPrice)
    })
    
    // Implement Task 2 Add supporting unit tests
    // 1. create a Star with different tokenId
    //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
    it('can add the star name and star symbol properly', async() => {
        const instance = await StarNotary.deployed()
        
        await instance.createStar('Test Star 5', 6, { from: accounts[1] })
        
        assert.equal(await instance.name.call(), 'ZETA')
        assert.equal(await instance.symbol.call(), 'ζ')
    })
    
    // 1. create 2 Stars with different tokenId
    // 2. Call the exchangeStars functions implemented in the Smart Contract
    // 3. Verify that the owners changed
    it('lets 2 users exchange stars', async() => {
        const instance = await StarNotary.deployed()
    
        await instance.createStar('Test Star 6', 7, { from: accounts[2] })
        await instance.createStar('Test Star 7', 8, { from: accounts[3] })
        await instance.exchangeStars(7, 8, { from: accounts[2] })

        assert.equal(await instance.ownerOf(7), accounts[3])
        assert.equal(await instance.ownerOf(8), accounts[2])
    })
    
    // 1. create a Star with different tokenId
    // 2. use the transferStar function implemented in the Smart Contract
    // 3. Verify the star owner changed.
    it('lets a user transfer a star', async() => {
        const instance = await StarNotary.deployed()
    
        await instance.createStar('Test Star 9', 9, { from: accounts[2] })
        await instance.transferStar(accounts[3], 9, { from: accounts[2] })
    
        assert.equal(await instance.ownerOf(9), accounts[3])
    })
    
    it('lookUptokenIdToStarInfo test', async() => {
        // 1. create a Star with different tokenId
        // 2. Call your method lookUptokenIdToStarInfo
        // 3. Verify if you Star name is the same
    
        const instance = await StarNotary.deployed()
    
        await instance.createStar('Test Star 10', 10, { from: accounts[2] })

        assert.equal(await instance.lookUptokenIdToStarInfo(10, { from: accounts[2] }), 'Test Star 10')
    })
})


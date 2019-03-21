import Web3 from 'web3'
import starNotaryArtifact from '../../build/contracts/StarNotary.json'

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    try {
      const networkId = await this.web3.eth.net.getId()

      this.meta = new this.web3.eth.Contract(
        starNotaryArtifact.abi,
        starNotaryArtifact.networks[networkId].address,
      )

      this.account = (await this.web3.eth.getAccounts())[0]
    } catch (error) {
      console.error('Could not connect to contract or chain.')
    }
  },

  setStatus: function(message) {
    document.getElementById('status').innerHTML = message
  },

  createStar: async function() {
    const name = document.getElementById('starName').value
    const id = document.getElementById('starId').value

    await this.meta.methods.createStar(name, id).send({ from: this.account })

    App.setStatus(`New Star Owner is ${ this.account }.`)
  },

  // Implement Task 4 Modify the front end of the DAPP
  lookUp: async function () {
    const id = document.getElementById('lookid').value
    const name = await this.meta.methods.lookUptokenIdToStarInfo(id).call()

    App.setStatus(`Star belongs to ${ name }.`)
  }
}

window.App = App

window.addEventListener('load', async function() {
  if (window.ethereum) {
    App.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
    App.start()
  } else {
    alert('install metamask extension')
  }
})
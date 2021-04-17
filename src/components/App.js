import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Copyright from '../abis/Copyright.json'
import Navbar from './Navbar'
import Main from './Main'
import ReactTable from "react-table"
//import Main from './Main'

class App extends Component {

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts);
    this.setState({account: accounts[0]})
    //Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Copyright.networks[networkId]
    if(networkData) {
      const copyright = new web3.eth.Contract(Copyright.abi, networkData.address)
      this.setState({ copyright })
      console.log(copyright)

      
      //Load Users
      // const users = await copyright.methods.display().call()
      // this.setState({ users })
      // console.log(users)
      // for (var i =0; i < numberOfUsers; i++) {
      //   const users2 = await users[i]
      //   this.setState({
      //     display: [...this.state.display, users2]
      //   })
      // }
      const count = await copyright.methods.count().call()
      this.setState({ count })

      const b = await copyright.methods.balanceOf1().call()
      this.setState({ b })
      // const b = await copyright.methods.amount().call()
      // this.setState({ b })
      const list = await copyright.methods.display().call()
      this.setState({ list })
      console.log(list)
      this.setState( {loading: false})

    } 
    else {
      window.alert('Copyright contract not deployed on detected network')
    }

  }

  get(videoid,channelId,channelname){
    this.setState( { loading: true })
    this.state.copyright.methods.get(videoid,channelId,channelname).send({ from: this.state.account, value: "1000000000000000000" })
    .then(function(error, receipt) {
      //this.setState({ status: true })
      //console.log(error);
      
      // this.setState({ status: true })
      // if(this.state.status!==true){
      //   this.setState({ status:false })
      // }
      setTimeout("location.reload(true);", 10000);
    })
    
    
    this.setState({ status: true })
       
  }
  debit(){
    this.state.copyright.methods.debit().send({ from:this.state.account })
    .then(function(error,receipt){
      setTimeout("location.reload(true);", 2000);
    })
  }
  







  constructor(props) {
    super(props)
    this.state = {
      account: '',
      copyright: null,
      numberOfUsers: 0,
      list: [],
      loading: true,
      status: false,
      bal:[],
      at:'',
      b:'',
      count:0
    }
    this.get = this.get.bind(this)
    this.debit = this.debit.bind(this)
    
  }

  render() {
    
    return (
    
      <div>
        {/* <p>Balance: {this.state.b} Wei</p> */}
        <Navbar account={this.state.account}/>
        {this.state.loading
            ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
            :<Main get={this.get}
              b={this.state.b}
              debit={this.debit}
              list={this.state.list}
            />
          }
        {this.state.status
          ?<div id="success"className="text-center mt-5"><p>After Successful transaction the page will automatically reload in <span><b>10 SECONDS</b></span> </p>
          <p>Do Not <span><b>Manually Reload</b></span></p></div>
          :<div id="success"className="text-center mt-5"><p></p></div>
          }

        </div>
    );
  }
}

export default App;

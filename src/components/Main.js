import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main extends Component {

  render() {
   // const re = this.props.numberOfUsers
    //let re1 = re.value
    return (
      <div className="container-fluid mt-5">
        <p>&nbsp;</p>
        <div className="row">

          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              
             {/* <p>{re1}</p> */}
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const videoid = this.videoid.value
                  // const fee = this.fee.value
                  const channelId= this.channelId.value
                  const channelname = this.channelname.value
                  this.props.get(videoid,channelId,channelname)
                  
                }}>
                <div className="form-group mr-sm-2">
                  <input
                    id="videoid"
                    type="text"
                    ref={(input) => { this.videoid = input }}
                    className="form-control"
                    placeholder="VideoId"
                    Value="11"
                    required 
                    readOnly
                    />
                    <br></br>
                     <input
                    id="channelId"
                    type="text"
                    ref={(input)=> {this.channelId = input}}
                    className="form-control"
                    placeholder="Channel Id"
                    required
                    />
                    <br></br>
                    <input
                      id="channelname"
                      type="text"
                      ref={(input) => this.channelname = input}
                      className="form-control"
                      placeholder="Channel Name"
                      required
                    />
                    <br></br>
                    <label>
                      Fee: 1 Ether
                    </label>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
                <p>&nbsp;</p>
                <br></br>
                <p>Balance: {this.props.b} Wei</p>
                    <form onSubmit={(event) => {
                  event.preventDefault()
                  this.props.debit()
                  
                }}> <button type="submit" className="btn btn-primary btn-block">Transfer Balance</button>
                </form>
                <p>&nbsp;</p><p>&nbsp;</p>
            <small className="text-secondary">
            *Terms & Conditions
                <small><br></br>  You are entitled to 50% of earnings<br></br>The amount will be transferred by Youtube only</small>
            </small>   
   
 
            </div>
            

            
          
            
          </main>
          <div className="ml-auto mr-auto width-100">
          <table >
            <tr>
              <th colspan="2">Channel Id</th>
              <th colspan="4"> Channel Name</th>
              <th colspan="2">Timestamp</th>
            </tr>
            {this.props.list.map(items=>{
              return(
                <tr>
                  <td colspan="2">{items[1]}</td>
                  <td colspan="4">{items[2]}</td>
                  <td colspan="2">{items[5]}</td>
                </tr>
              )
            })}

            </table>
            </div> 

        </div>
      </div>
    );
  }
}

export default Main;

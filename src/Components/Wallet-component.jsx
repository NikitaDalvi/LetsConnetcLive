/*jshint esversion:6*/

import React from "react";
import {Container} from 'react-bootstrap';


class Wallet extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }

  render(){
    return(
        <div>
        <Container>
        <div className="row">
          <h1 className="display-4 col-lg-6">Wallet Balance</h1>
          <div className="col-lg-6" style={{textAlign:"right",marginTop:"20px"}}>
          <a className="btn" style={{borderRadius:"5px", border:"1px solid #C104C9"}} href={"/UserPage/Service-Provider"}>Back to Dashboard</a>
          </div>
        </div>
        <hr/>
        <div style={{textAlign:"center"}}>
        <br/>
          <h1 className="display-1" style={{color:"#4B66EA"}}>&#8377;4000{this.props.balance}</h1>
        </div>
        </Container>
        </div>
    );
  }
}

export default Wallet;

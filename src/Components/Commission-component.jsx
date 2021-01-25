/*jshint esversion:6*/

import React from "react";
import CommissionTable from './subComponents/CommissionTable-component';
import {Container,AppBar,Toolbar,Typography} from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

function Wallet(){


    return(
        <Container style={{marginBottom:'200px'}}>
        <AppBar position="static" style={{borderRadius:'5px',height:'60px',backgroundColor:'white'}}>
      <Toolbar variant="dense" style={{marginTop:'5px'}}>
              <AccountBalanceIcon style={{color:'black'}}/>
        <Typography variant="h6" style={{color:'black',marginLeft:'10px'}}>
          Commission Due
        </Typography>
      </Toolbar>
    </AppBar>
          <hr/>
        <CommissionTable/>
        </Container>
    );

}

export default Wallet;

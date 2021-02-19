/*jshint esversion:9*/

import React from 'react';
import {Typography,Divider} from '@material-ui/core';

export default function NotificationPost({text,time}){
  return(
    <div>
      <Typography variant='subtitle1'>{text}</Typography>
      <Typography component='p' style={{color:'gray',textAlign:'right',fontSize:'12px'}}>{time}</Typography>
      <Divider/>
    </div>
  )
}

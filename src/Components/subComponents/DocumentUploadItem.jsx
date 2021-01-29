import React,{useState} from "react";
//import Input from "./Input"
import {TextField,FormControl,InputAdornment,IconButton,OutlinedInput,makeStyles,Grid,Button} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useMediaQuery } from 'react-responsive';

function UploadItem(props){
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
const [file,setFile] = React.useState('');
  const useStyles = makeStyles(theme =>({
    formControl:{
      margin: theme.spacing(1),
      width:'75%'
    },
    inputFile:{
      width:isMobile?'200px':'300px',
      border:file!==''?'2px solid #07C306':'',
    }

  }));

const classes = useStyles();

function fileChange(event){
  const {value} = event.target;
  var newValue = value.replace(/C:\\fakepath\\/i, '');
  setFile(newValue);
  props.change(event,props.id);
}

  return(
    <div style={{textAlign:'center'}}>
    <FormControl className={classes.formControl}>
{ props.item !=="uploadDocuments"&&<Grid container>
    <Grid item style={{marginBottom:'10px'}}>
    <OutlinedInput
         id="outlined-adornment-weight"
         aria-describedby="outlined-weight-helper-text"
         endAdornment={file!==''?<span position="end" style={{color:'#07C306'}}>&#10004;</span>:''}
        disabled
        error={(props.item==='Pan Card' && props.validate)?true:false}
        value={file}
        className={classes.inputFile}
       />
      <input name='file' onChange={fileChange} variant='outlined' id={`document${props.id}`} style={{display:'none'}} type='file'/>
      </Grid>
      <Grid item>
      <label htmlFor={`document${props.id}`}>
      <IconButton color="primary" aria-label="upload picture" component="span">
        <CloudUploadIcon   />
      </IconButton>
    </label>
    </Grid>
</Grid>}
{props.item!=='CA Certificate'&&<TextField id="outlined-basic" onChange={(event)=>{props.change(event,props.id);}} name='number' label={`${props.item} number`} variant="outlined" />}
    </FormControl>
    <br/>
    </div>

  );
}

export default UploadItem;
//  document.getElementById({props.index}).innerText = newValue;

// <div className="form-row" style={{paddingLeft:"70px" }}>
//   <div class="custom-file" style={{width:"87%"}}>
//       <input onChange={(event)=>{props.change(event,props.id);}} type="file" name='file' class="custom-file-input" id="customFile"/>
//       <label id={"document"+props.id} class="custom-file-label" for="customFile" style={{textAlign:"left"}}>Upload {props.item} here..</label>
//   </div>
//   <br/>
//   <br/>
// </div>
// <div className="form-row" style={{paddingLeft:"70px", width:"80%"}}>
//   <label>{props.item} Number:</label>
//       <input className="form-control" onChange={(event)=>{props.change(event,props.id);}} type="text" name='number' placeholder="Type number here.."/>
//       <br/>
// </div>

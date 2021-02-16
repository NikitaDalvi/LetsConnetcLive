import React from "react";
import { Typography, makeStyles, Container } from '@material-ui/core';

function SubscriptionCard(props) {

  console.log(props)
  const calculatediscount = () => {
    let { price, discount } = props
    return price- (price * discount / 100)

  }

  const useStyles = makeStyles(theme => ({
    subContainer: {
      width: '70%'
    }
  }));

  React.useEffect(() => {
    console.log(props.description);
  }, [])

  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="sm" className={classes.subContainer} >
        <img src={props.img} style={{ width: '100%', height: 'auto' }} />
        <br />
        <br />
       
        <Typography variant='h5' style={{ fontWeight: 'bold' }}>{props.type}</Typography>
        <Typography variant="subtitle1" gutterBottom>{props.discount===null?<span style={{ fontSize: "16px",fontWeight: 'bold'}}>At ₹ {props.price}</span>:
        <span><span style={{ fontSize: "16px",fontWeight: 'bold',textDecoration: 'line-through'}}>At ₹ {props.price}</span><span style={{ fontSize: "16px", fontWeight: 'bold'}}>&nbsp;&nbsp;{props.discount}&nbsp;%Off&nbsp;&nbsp; ₹{calculatediscount()}</span></span>}</Typography>
         <Typography variant="subtitle1" gutterBottom>After GST At ₹ {props.PriceAfterGST}</Typography>
        <br />
        <Typography variant='subtitle2'>{props.description}</Typography>
        <br />
      </Container>
    </div>
  );
}



export default SubscriptionCard;

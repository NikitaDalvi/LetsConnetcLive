import React from "react";
import { Typography, makeStyles, Container } from '@material-ui/core';

function SubscriptionCard(props) {

  const calculatediscount = () => {
    let { price, discount } = props
    return (price * discount / 100)
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
        <Typography variant="subtitle1" gutterBottom><span style={{ fontSize: "16px",fontWeight: 'bold',textDecoration: 'line-through'}}></span>At Rs {props.price}<span style={{ fontSize: "16px", fontWeight: 'bold'}}>&nbsp;&nbsp;{props.discount}&nbsp;%Off&nbsp;&nbsp; {calculatediscount()}</span></Typography>
        <Typography variant='subtitle3'><span style={{ fontSize: "16px", fontWeight: 'bold'}}>&nbsp;&nbsp;{props.discount}&nbsp;%Off&nbsp;&nbsp; {calculatediscount()}</span></Typography>
        <br />
        <Typography variant='subtitle2'>{props.description}</Typography>
        <br />
      </Container>
    </div>
  );
}



export default SubscriptionCard;

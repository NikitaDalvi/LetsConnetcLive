/*jshint esversion:9*/
import React from 'react';
import {Typography,Container,makeStyles,Grid,Grow} from '@material-ui/core';
import people from '../Images/officePeople.png';
import man from '../Images/OfficeSingle.png';
import VizSensor from 'react-visibility-sensor';
import { useMediaQuery } from 'react-responsive';

const useStyles = makeStyles((theme) => ({
  firstImg:{
    width:'100%'
  },
  secondImg:{
    width:'100%'
  }
}));

function About(){
    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const [checked, setChecked] = React.useState(false);
  const [bottomChecked,setBottom] = React.useState(true);
  const classes = useStyles();
  return(
    <Container style={{marginTop:'50px'}}>
    <VizSensor
        partialVisibility
        onChange={(isVisible) => {
          setChecked(!checked);
        }}
      >
    <Grid container>
    <Grid item xs={isMobile?'12':'6'} style={{padding:'60px 0',display:isMobile?'':'none'}}>
    <Grow
      in={checked}
      {...(checked ? { timeout: 1500 } : {})}
    >
          <img alt='people' className={classes.firstImg} src={people}/>
          </Grow>
    </Grid>
      <Grid item xs={isMobile?'12':'6'} style={{padding:'50px 10px'}}>
      <Grow
        in={checked}
        {...(checked ? { timeout: 3000 } : {})}
      >
      <div>
        <Typography variant='h3' style={{color:'#FF5343'}}>About Us</Typography>
        <br/>
        <Typography variant='subtitle1'>LetsConnect is an idea, a vision and brainchild of professionals in the field of Finance and
Information technology. The question one day we asked ourselves was can we share time of
professional to make the optimum use of professional time and services, can professional work as
per their time schedules, can professional buy professionals time.</Typography>
        <br/>
        <Typography variant='subtitle1'>When we thought about companies or professional clients, we asked ourselves can I hire
professional as per my requirements, can I reduce my fixed cost like salary, rent and overheads like
electricity, infrastructure etc, can I get experts to do my work, is the GIG economy the answer for all
this? </Typography>
<br/>
<Typography variant='subtitle1'>We realised that the alternative workforce can be a long-term solution to tight talent markets—but
only if treated strategically and in an organised manner.</Typography>
<br/>
<br/>
<Typography variant='subtitle1'>LetsConnect was started in 2020 in the era of COVID 19 pandemic to help professionals in Jobs,
practices or freelancing industry to share their available time with the Companies, organisation or
other professionals in need of getting specific jobs at specific time and affordable cost.</Typography>
<br/>
</div>
</Grow>
      </Grid>
      <Grid item xs={isMobile?'12':'6'} style={{padding:'60px 0',display:isMobile?'none':''}}>
      <Grow
        in={checked}
        {...(checked ? { timeout: 1500 } : {})}
      >
            <img alt='people' className={classes.firstImg} src={people}/>
            </Grow>
      </Grid>
    </Grid>
                </VizSensor>
    <br/>
    <br/>
    <VizSensor
    partialVisibility
        onChange={() => {
          setBottom(!bottomChecked);
          console.log(bottomChecked);
        }}
      >
    <Grid container>

      <Grid item xs={isMobile?'12':'6'} style={{padding:'60px 0'}}>
      <Grow
        in={bottomChecked}
        {...(bottomChecked ? { timeout: 1500 } : {})}
      >
        <img alt='man' className={classes.secondImg} src={man}/>
        </Grow>
      </Grid>
      <Grid item xs={isMobile?'12':'6'} style={{padding:'200px 10px'}}>
      <Grow
        in={bottomChecked}
        {...(bottomChecked ? { timeout: 3000 } : {})}
      >
      <div>
        <Typography variant='h3' style={{color:'#FF5343'}}>Vision</Typography>
        <br/>
        <Typography variant='subtitle1'>LetsConnect has a vision create the world biggest platform of professional time share in an
organised manner and also help Users get the best talents available in the Industry at best price.</Typography>
</div>
</Grow>
      </Grid>
    </Grid>
      </VizSensor>
    </Container>
  );
}

export default About;

  import React,{useState} from "react";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import {Container} from 'react-bootstrap';

function CAcard(props){
 const [open, setOpen] = useState(false);

  return(
    <div className="card" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title h1" style={{textAlign:"center", color:"#C104C9"}}>CA</h5>
    <br/>
    <div className="row">
    <h6 className="card-subtitle mb-2 col-lg-5 " style={{marginTop:"2px"}}>Experience:</h6>
    <p className="card-text col-lg-6" style={{textAlign:"left", paddingLeft:"0"}}>{props.experience} years</p>
    </div>
    <div className="row" style={{marginBottom:"5px"}}>
    <h6 className="card-subtitle mb-2 col-lg-5 " style={{marginTop:"2px"}}>Rating:</h6>
    <p className="card-text col-lg-6" style={{textAlign:"left", paddingLeft:"0"}}>{props.rating}/5</p>
    </div>

    <Button
     onClick={() => setOpen(!open)}
     aria-controls={"collapse"+props.id}
     aria-expanded={open}
     variant="link"
   >
     Services >
   </Button>
  <Container>
   <Collapse in={open}>
     <div id={"collapse"+props.id}>
      <ul>
        {props.services.map(service => (
          <li>{service}</li>
        ))}
      </ul>
     </div>
   </Collapse>
   </Container>
   <br/>
    <div style={{textAlign:"center"}}>
    <Button variant="flat" onClick={() => {props.selectCA(props.id);}}>Select</Button>
    </div>
  </div>
</div>
  );
}

export default CAcard;

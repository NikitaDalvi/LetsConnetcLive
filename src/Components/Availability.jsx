import React,{useState} from "react";
import Heading from "./subComponents/page-headings";
import {Link} from "react-router-dom";
import  DayTime from './subComponents/DayTime';
import {Button} from 'react-bootstrap';

function Availability(){




  const days =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  return (
      <div style={{textAlign:"center"}}>
        <br/>
        <Heading text="When are you available?.."/>

        <div className="container Availability-Container">

        {
          days.map((day,index) => (
            <DayTime key={index} id={index} day={day} />
          ))
        }


          <br/>
          <Link to="/UserPage/ServiceProvider/Dashboard" style={{textDecoration: "none"}}>
          <a><Button variant='login' type="submit">Next</Button></a>
          </Link>
        </div>
</div>
  );
}


export default Availability;


//
// <div className="form-row">
// <div className="col-lg-3" style={{textAlign:"left"}}>
//   <input name="Sunday"  onClick={handleCheck} type="checkbox" className="form-check-input col-lg-1" id="exampleCheck1" style={{marginTop:"8px", position:"static", marginLeft:"10px"}}/>
//   <label className="form-check-label col-lg-3" for="exampleCheck1" style={{fontSize:"20px", textAlign:"left", color:"#C104C9"}}>Sunday</label>
// </div>
// <div className="col-lg-9 form-row" id="Sunday" style={{display: "none"}}>
//   <div className="col-lg-3" style={{marginLeft:"20px"}}>
//   <input type="text" className="form-control" placeholder="From"/>
//     </div>
//     <div className="col-lg-2">
//     <select className="custom-select " id="inputGroupSelect01">
//       <option selected>AM</option>
//       <option value="1">PM</option>
//     </select>
//     </div>
//     <div className="col-lg-3">
//     <input type="text" className="form-control" placeholder="To"/>
//       </div>
//       <div className="col-lg-2">
//       <select className="custom-select " id="inputGroupSelect01">
//         <option >AM</option>
//         <option selected>PM</option>
//       </select>
//       </div>
// </div>
// </div>
// <br/>
// <div className="form-row">
// <div className="col-lg-3" style={{textAlign:"left"}}>
//   <input name="Monday" onClick={handleCheck} type="checkbox" className="form-check-input col-lg-1" id="exampleCheck1" style={{marginTop:"8px", position:"static", marginLeft:"10px"}}/>
//   <label className="form-check-label col-lg-3" for="exampleCheck1" style={{fontSize:"20px", textAlign:"left", color:"#C104C9"}}>Monday</label>
// </div>
// <div className="col-lg-9 form-row" id="Monday" style={{display:"none"}} >
//   <div className="col-lg-3" style={{marginLeft:"20px"}}>
//   <input type="text" className="form-control" placeholder="From"/>
//     </div>
//     <div className="col-lg-2">
//     <select className="custom-select " id="inputGroupSelect01">
//       <option selected>AM</option>
//       <option value="1">PM</option>
//     </select>
//     </div>
//     <div className="col-lg-3">
//     <input type="text" className="form-control" placeholder="To"/>
//       </div>
//       <div className="col-lg-2">
//       <select className="custom-select " id="inputGroupSelect01">
//         <option >AM</option>
//         <option selected>PM</option>
//       </select>
//       </div>
// </div>
// </div>
// <br/>
// <div className="form-row">
// <div className="col-lg-3" style={{textAlign:"left"}}>
//   <input name="Tuesday" onClick={handleCheck} type="checkbox" className="form-check-input col-lg-1" id="exampleCheck1" style={{marginTop:"8px", position:"static", marginLeft:"10px"}}/>
//   <label className="form-check-label col-lg-3" for="exampleCheck1" style={{fontSize:"20px", textAlign:"left", color:"#C104C9"}}>Tuesday</label>
// </div>
// <div className="col-lg-9 form-row" id="Tuesday" style={{display: day === "Tuesday"? "" : "none"}}>
//   <div className="col-lg-3" style={{marginLeft:"20px"}}>
//   <input type="text" className="form-control" placeholder="From"/>
//     </div>
//     <div className="col-lg-2">
//     <select className="custom-select " id="inputGroupSelect01">
//       <option selected>AM</option>
//       <option value="1">PM</option>
//     </select>
//     </div>
//     <div className="col-lg-3">
//     <input type="text" className="form-control" placeholder="To"/>
//       </div>
//       <div className="col-lg-2">
//       <select className="custom-select " id="inputGroupSelect01">
//         <option >AM</option>
//         <option selected>PM</option>
//       </select>
//       </div>
// </div>
// </div>
// <br/>
// <div className="form-row">
// <div className="col-lg-3" style={{textAlign:"left"}}>
//   <input name="Wednesday" onClick={handleCheck} type="checkbox" className="form-check-input col-lg-1" id="exampleCheck1" style={{marginTop:"8px", position:"static", marginLeft:"10px"}}/>
//   <label className="form-check-label col-lg-3" for="exampleCheck1" style={{fontSize:"20px", textAlign:"left", color:"#C104C9"}}>Wednesday</label>
// </div>
// <div className="col-lg-9 form-row" id="Wednesday"  style={{display: day === "Wednesday"? "" : "none"}}>
//   <div className="col-lg-3" style={{marginLeft:"20px"}}>
//   <input type="text" className="form-control" placeholder="From"/>
//     </div>
//     <div className="col-lg-2">
//     <select className="custom-select " id="inputGroupSelect01">
//       <option selected>AM</option>
//       <option value="1">PM</option>
//     </select>
//     </div>
//     <div className="col-lg-3">
//     <input type="text" className="form-control" placeholder="To"/>
//       </div>
//       <div className="col-lg-2">
//       <select className="custom-select " id="inputGroupSelect01">
//         <option >AM</option>
//         <option selected>PM</option>
//       </select>
//       </div>
// </div>
// </div>
// <br/>
// <div className="form-row">
// <div className="col-lg-3" style={{textAlign:"left"}}>
//   <input name="Thursday" onClick={handleCheck} type="checkbox" className="form-check-input col-lg-1" id="exampleCheck1" style={{marginTop:"8px", position:"static", marginLeft:"10px"}}/>
//   <label className="form-check-label col-lg-3" for="exampleCheck1" style={{fontSize:"20px", textAlign:"left", color:"#C104C9"}}>Thursday</label>
// </div>
// <div className="col-lg-9 form-row" id="Thursday" style={{display: day === "Thursday"? "" : "none"}} >
//   <div className="col-lg-3" style={{marginLeft:"20px"}}>
//   <input type="text" className="form-control" placeholder="From"/>
//     </div>
//     <div className="col-lg-2">
//     <select className="custom-select " id="inputGroupSelect01">
//       <option selected>AM</option>
//       <option value="1">PM</option>
//     </select>
//     </div>
//     <div className="col-lg-3">
//     <input type="text" className="form-control" placeholder="To"/>
//       </div>
//       <div className="col-lg-2">
//       <select className="custom-select " id="inputGroupSelect01">
//         <option >AM</option>
//         <option selected>PM</option>
//       </select>
//       </div>
// </div>
// </div>
// <br/>
// <div className="form-row">
// <div className="col-lg-3" style={{textAlign:"left"}}>
//   <input name="Friday" onClick={handleCheck} type="checkbox" className="form-check-input col-lg-1" id="exampleCheck1" style={{marginTop:"8px", position:"static", marginLeft:"10px"}}/>
//   <label className="form-check-label col-lg-3" for="exampleCheck1" style={{fontSize:"20px", textAlign:"left", color:"#C104C9"}}>Friday</label>
// </div>
// <div className="col-lg-9 form-row" id="Friday" style={{display: day === "Friday"? "" : "none"}}>
//   <div className="col-lg-3" style={{marginLeft:"20px"}}>
//   <input type="text" className="form-control" placeholder="From"/>
//     </div>
//     <div className="col-lg-2">
//     <select className="custom-select " id="inputGroupSelect01">
//       <option selected>AM</option>
//       <option value="1">PM</option>
//     </select>
//     </div>
//     <div className="col-lg-3">
//     <input type="text" className="form-control" placeholder="To"/>
//       </div>
//       <div className="col-lg-2">
//       <select className="custom-select " id="inputGroupSelect01">
//         <option >AM</option>
//         <option selected>PM</option>
//       </select>
//       </div>
// </div>
// </div>
// <br/>
// <div className="form-row">
// <div className="col-lg-3" style={{textAlign:"left"}}>
//   <input name="Saturday" onClick={handleCheck} type="checkbox" className="form-check-input col-lg-1" id="exampleCheck1" style={{marginTop:"8px", position:"static", marginLeft:"10px"}}/>
//   <label className="form-check-label col-lg-3" for="exampleCheck1" style={{fontSize:"20px", textAlign:"left", color:"#C104C9"}}>Saturday</label>
// </div>
// <div className="col-lg-9 form-row" id="Saturday" style={{display: day === "Saturday"? "" : "none"}}>
//   <div className="col-lg-3" style={{marginLeft:"20px"}}>
//   <input type="text" className="form-control" placeholder="From"/>
//     </div>
//     <div className="col-lg-2">
//     <select className="custom-select " id="inputGroupSelect01">
//       <option selected>AM</option>
//       <option value="1">PM</option>
//     </select>
//     </div>
//     <div className="col-lg-3">
//     <input type="text" className="form-control" placeholder="To"/>
//       </div>
//       <div className="col-lg-2">
//       <select className="custom-select " id="inputGroupSelect01">
//         <option >AM</option>
//         <option selected>PM</option>
//       </select>
//       </div>
// </div>
// </div>

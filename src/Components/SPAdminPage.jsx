/*jshint esversion: 6*/
import React,{useState} from "react";
import EmployeeTableItem from "./subComponents/AdminPageItem";
import Heading from './subComponents/page-headings';
import {Button} from 'react-bootstrap';

function SPAdmin(props){
  const [EmployeeDetail, setDetail]=useState({
    name:"",
    email:"",
    contact:""
  });

  const[Employee,setEmployee]=useState([]);
  const[btnName,setBtn]=useState("Add");
  const[Identity,setID]=useState("");


  function handleChange(event){
    const {name,value}=event.target;
    setDetail(prevValue=>{
      return{
        ...prevValue,
        [name]:value
    };
  });
  }

  function Add(){
    setEmployee(prevValue => {
      return [ ...prevValue,EmployeeDetail];
    });
      setDetail({
        name:"",
        email:"",
        contact:""
      });
  }

  function Edit(){
    var id = Identity+1;
    removeEmployee(id);
    Add();
    setBtn('Add')
  }

  function addEmployee(){
  btnName ==="Add" ?
  Add()
:Edit()
  }

  function removeEmployee(id){
    var ID = id -1;
    setEmployee(prevValue => {
      return prevValue.filter((Employee, index) => {
        return index !== ID;
      });
    });
}

function handleEdit(id){
  var ID = id -1;
  var CA = Employee.filter((emp,index)=>{
    return index === ID;
  });
  setDetail({
    name: CA[0].name,
    email: CA[0].email,
    contact: CA[0].contact
  });
  console.log(ID);
  setID(ID);
  setBtn("Edit");
}




  return (

    <div>
    <br/>
    <div style={{marginLeft:"20px"}}>
      <Heading text="Welcome User!"/>
      </div>
      <div className="container SPAdmin-container">
        <div className="form-row">
          <input onChange={handleChange} name="name" className="form-control col-lg-3" type="text" placeholder="Fullname" value={EmployeeDetail.name} style={{marginRight:"10px"}}/>
          <input onChange={handleChange} name="email" className="form-control col-lg-4" type="text" placeholder="Email" value={EmployeeDetail.email} style={{marginRight:"10px"}}/>
          <input onChange={handleChange} name="contact" className="form-control col-lg-3" type="text" placeholder="Contact No." value={EmployeeDetail.contact} style={{marginRight:"10px"}}/>
          <Button variant='login' onClick={addEmployee} className=" col-lg-1" type="submit" style={{marginLeft:"20px"}} >{btnName}</Button>
        </div>
        </div>
        <div style={{textAlign:"center"}}>
        <p class="lead" style={{textDecoration:"underline"}}>Employee List</p>
        <table className="table admin-table">
          <thead style={{color:"#4B66EA"}}>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact No.</th>
            <th scope="col">KYC Status</th>
            <th scope="col"></th>
          </thead>
          <tbody>
            {
              Employee.map((emp,index) => {
              return <EmployeeTableItem key={index} id={index+1} name={emp.name} email={emp.email} contact={emp.contact} isRemove={removeEmployee} isEdit={handleEdit} kyc="In process" />
            })
          }
          </tbody>
        </table>
</div>
      </div>
  );
}



export default SPAdmin;

/*jshint esversion: 9*/
import React from "react";
import UploadItem from "./subComponents/DocumentUploadItem";
import EmployeeList from "./subComponents/EmployeeList";
import {
  Typography,
  makeStyles,
  Grid,
  Button,
  Container,
} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  selectUserType,
  selectRegisteredUser,
  selectSubscriptionType,
} from "../redux/user/user-selector";
import {
  setRegisteredUser,
  setProgress,
  setCurrentUser,
  setUserStatus,
  setUserType,
} from "../redux/user/user-actions";
import { API } from "../API";

function DocumentUpload({
  userType,
  history,
  subsType,
  user,
  setRegisteredUserId,
  setProgress,
  setUser,
  setUserStatus,
  setUserType,
}) {
  var SPitem = [];
  if (subsType === "Individual") {
    SPitem = ["Adhaar Card", "Pan Card", "CA Certificate"];
  } else {
    SPitem = [
      "Company PAN Card",
      "Incorporation Certificate/Incorporation proof",
      "Udhyog Adhaar",
      "CA Certificate",
    ];
  }

  var Items;

  Items = SPitem;

  const [validation, setValidation] = React.useState(true);

  const [
    incorporationCertificate,
    setIncorporationCertificate,
  ] = React.useState({
    file: null,
    type: 5,
    number: "",
  });

  const [AdhaarCard, setAdhaarCard] = React.useState({
    file: null,
    type: 1,
    number: "",
  });

  const [CACertificate, setCACertificate] = React.useState({
    file: null,
    type: 4,
    number: "",
  });

  const [panCard, setPanCard] = React.useState({
    file: null,
    type: 2,
    number: "",
  });

  const [udyogAdhar, setUdyogAdhar] = React.useState({
    file: null,
    type: 7,
    number: "",
  });

  function handleChange(event, id) {
    console.log("called");
    const { name, value } = event.target;

    const item = Items.filter((i, index) => {
      return index === id;
    });
    console.log(item[0]);

    switch (item[0]) {
      case "Incorporation Certificate/Incorporation proof":
        if (name === "file") {
          let file = event.target.files[0];
          setIncorporationCertificate((prevValue) => {
            return {
              ...prevValue,
              file: file,
            };
          });
        } else {
          setIncorporationCertificate((prevValue) => {
            console.log(prevValue.number);
            return {
              ...prevValue,
              number: value,
            };
          });
        }

        break;

      case "Adhaar Card":
        if (name === "file") {
          let file = event.target.files[0];
          console.log(file.name);
          setAdhaarCard((prevValue) => {
            return {
              ...prevValue,
              file: file,
            };
          });
        } else {
          setAdhaarCard((prevValue) => {
            console.log(prevValue.number);
            return {
              ...prevValue,
              number: value,
            };
          });
        }

        break;

      case "CA Certificate":
        if (name === "file") {
          let file = event.target.files[0];
          setCACertificate((prevValue) => {
            return {
              ...prevValue,
              file: file,
            };
          });
        } else {
          setCACertificate((prevValue) => {
            console.log(prevValue.number);
            return {
              ...prevValue,
              number: value,
            };
          });
        }

        break;

      case "Company PAN Card":
      case "Pan Card":
        if (name === "file") {
          let file = event.target.files[0];
          console.log(file);
          setPanCard((prevValue) => {
            return {
              ...prevValue,
              file: file,
            };
          });
        } else {
          setPanCard((prevValue) => {
            return {
              ...prevValue,
              number: value,
            };
          });
          console.log(panCard);
        }

        break;
      case "Udhyog Adhaar":
        if (name === "file") {
          let file = event.target.files[0];
          setUdyogAdhar((prevValue) => {
            return {
              ...prevValue,
              file: file,
            };
          });
        } else {
          setUdyogAdhar((prevValue) => {
            return {
              ...prevValue,
              number: value,
            };
          });
        }

        break;
      default:
    }
  }

  React.useEffect(() => {
    if (user) {
      setUserType("Service-Provider");
      setProgress(100);
    }
  }, [setProgress, user]);

  const uploadDocuments = () => {
    if (
      subsType === "Individual" &&
      (AdhaarCard.file === null || AdhaarCard.number === "")
    ) {
      alert("Adhaar Card document and Adhaar Card number is mandatory!");
      return;
    }
    debugger;
    const allDocuments = [];
    let result = null;
    if (subsType === "Individual") {
      allDocuments.push(AdhaarCard, panCard, CACertificate);
    } else {
      allDocuments.push(
        incorporationCertificate,
        panCard,
        udyogAdhar,
        CACertificate
      );
    }

    console.log(allDocuments);
    allDocuments.map(async (document) => {
      let formdata = new FormData();
      formdata.append("Files", document.file);
      formdata.append("AddedById", user.Id);
      formdata.append("DocumentType", document.type);
      formdata.append("DocumentNumber", document.number);
      result = await fetch(
        `${API.URL}UploadDocuments/${user.Id}/${document.type}/${document.number}`,
        {
          method: "POST",
          body: formdata,
        }
      );
      let res = await result.json();
      if (res) {
        setUserStatus(3);
        console.log(res);
        setUser(user);
        if (user.UserRole !== 6) {
          history.push("/UserPage/ServiceProvider/Dashboard");
        } else {
          history.push("/UserPage/SPAdmin/MyEmployees");
        }
      }

      console.log(res);
    });
  };

  const useStyles = makeStyles((theme) => ({
    title: {
      textAlign: "center",
    },
    btnUpload: {
      margin: theme.spacing(1),
      width: "200px",
      fontSize: "12px",
      background: "linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)",
      height: "40px",
      color: "white",
      borderRadius: "8px",
    },
  }));

  const classes = useStyles();
  console.log(subsType);
  console.log(Items);
  return (
    <Container maxWidth="sm">
      <Typography className={classes.title} variant="h4">
        KYC verification
      </Typography>
      <br />
      <br />
      {Items.map((uploadItem, index) => (
        <UploadItem
          item={uploadItem}
          validate={validation}
          change={handleChange}
          id={index}
        />
      ))}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <a>
          <Button
            className={classes.btnUpload}
            type="submit"
            onClick={() => {
              uploadDocuments();
            }}
          >
            UPLOAD AND VERIFY
          </Button>
        </a>
      </div>
    </Container>
  );
}
const mapStateToProps = createStructuredSelector({
  userType: selectUserType,
  user: selectRegisteredUser,
  subsType: selectSubscriptionType,
});

const mapDispatchToProps = (dispatch) => ({
  setRegisteredUser: (value) => dispatch(setRegisteredUser(value)),
  setProgress: (value) => dispatch(setProgress(value)),
  setUser: (value) => dispatch(setCurrentUser(value)),
  setUserStatus: (value) => dispatch(setUserStatus(value)),
  setUserType: (value) => dispatch(setUserType(value)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentUpload)
);

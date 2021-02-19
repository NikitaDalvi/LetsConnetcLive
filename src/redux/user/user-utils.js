/*jshint esversion:9*/
/*jshint -W087*/
export const ChangeUserServiceStatus = (currentUser,object) => {

  const{type,ServiceCharge,ServiceGiven} = object;
  var chargeType = 0;
  var serviceType = 0;
  if(type===1){
    switch (ServiceCharge) {
      case "PerHr":
        chargeType = 1;
        break;
      case "PerAs":
      chargeType = 2;
      break;
      case "Full_Time":
      chargeType = 3
      break;
      default:
        chargeType = 0
    }

    switch (ServiceGiven) {
      case "Onsite":
        serviceType = 1;
        break;
      case "OffShore":
        serviceType = 2;
        break;
      case "Remote":
        serviceType = 3;
        break;
      case "All":
        serviceType = 4;
        break;
      default:

    }
    currentUser.ServiceCharge = chargeType;
    currentUser.ServiceGiven = serviceType;
  }

  switch (type) {
    case 1:
      //currentUser.isServicesAdded = true;
      break;
    case 2:
      currentUser.isWorkingHoursAdded = true;
      break;
    case 3:
      currentUser.isLocationsAdded = true;
      break;
    default:

  }
        return currentUser;
};


// 
// export const setProfilePicture = file => {
//
//   return srcEncoded;
// };

/*jshint esversion:9*/
/*jshint -W087 */
import { v4 as uuidv4 } from 'uuid';

export const addServiceType = (serviceTypes,typeToAdd) => {
    const existingType = serviceTypes.find(type => type.Id === typeToAdd.Id);
    if(existingType){
      return [...serviceTypes];
    }else{
      return[...serviceTypes,typeToAdd];
    }
};

export const addService = (serviceList,serviceToAdd) => {
  const existingService = serviceList.find(Service => Service.service === serviceToAdd.service);

  if(existingService){
    return serviceList.map(Service => Service.service === serviceToAdd.service? {
      ...Service,location:serviceToAdd.location,fees:serviceToAdd.fees,type:serviceToAdd.type
    }:Service);
  }
      return [...serviceList,serviceToAdd];
};

export const addLocation = (locationList,locationToAdd) => {
  const existingLocation = locationList.find(Location => Location.entryId === locationToAdd.entryId);

  if(existingLocation){
    return locationList.map(Location => Location.entryId === locationToAdd.entryId? {
      ...Location,Address:locationToAdd.Address
    }:Location);
  }

            return [...locationList,{...locationToAdd,entryId:uuidv4()}];


};

export const addAvailability = (availabilityList,availabilityToAdd) => {
  debugger;
  const existingDay = availabilityList.find(availability => availability.WorkingDays === availabilityToAdd.WorkingDays);

  if(existingDay){
    return availabilityList.map(item => item.WorkingDays === availabilityToAdd.WorkingDays?{
      ...item,TimeSlotDetails:[...item.TimeSlotDetails,availabilityToAdd.TimeSlotDetails]
    }:item);
  }

  const {ServiceProviderId,ServiceTypeId,WorkingDays} = availabilityToAdd;
      return [...availabilityList,{ServiceProviderId,ServiceTypeId,WorkingDays,TimeSlotDetails:[availabilityToAdd.TimeSlotDetails]}];
};


export const removeTimeSlot = (availabilityList, object) => {
  debugger;
  const existingDay = availabilityList.find(availability => availability.WorkingDays === object.day);

  if(existingDay){
    return availabilityList.map(item => item.WorkingDays === object.day?{
      ...item,TimeSlotDetails:item.TimeSlotDetails.filter(slot => slot.Id !== object.Id)
    }:item);
  }
  return   availabilityList;
};

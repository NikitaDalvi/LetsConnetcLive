/*jshint esversion:9*/

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

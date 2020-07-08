/*jshint esversion:9*/

import {createSelector} from 'reselect';

const selectService = state => state.service;

export const selectServiceType = createSelector(
  selectService,
  service =>service.serviceType
);

export const selectDropdownItems = createSelector(
  selectService,
  service =>service.dropdownList
);

export const selectServices = createSelector(
  selectService,
  service => service.serviceList
);

export const selectAllServiceTypes = createSelector(
  selectService,
  service => service.serviceTypes
);

export const selectLocations = createSelector(
  selectService,
  service => service.locationList
);

export const selectWorkingHours = createSelector(
  selectService,
  service => service.workingHours
);

export const selectRatingAndReviews = createSelector(
  selectService,
  service => service.ratingAndReviews
);

export const selectMyServicesProgress = createSelector(
  selectService,
  service => service.myServicesProgress
);


export const selectSavedServices = createSelector(
  selectService,
  service => service.savedServices
);

export const selectNearbySPList = createSelector(
  selectService,
  service => service.nearbySPList
);

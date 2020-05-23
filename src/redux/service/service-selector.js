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

/*jshint esversion:9*/

import {createSelector} from 'reselect';


const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectIsHome = createSelector(
  [selectUser],
  user => user.isHome
);

export const selectProgress = createSelector(
  [selectUser],
  user => user.progress
);

export const selectUserType = createSelector(
  [selectUser],
  user => user.userType
);

export const selectRegisteredUser = createSelector(
  [selectUser],
  user => user.registeredUser
);

export const selectSubscriptionType = createSelector(
  [selectUser],
  user => user.subscriptionType
);

export const selectIndividualSub = createSelector(
  [selectUser],
  user => user.IndividualSub
);

export const selectDashboardDetails = createSelector(
  [selectUser],
  user => user.DashboardDetails
);

export const selectProfessionalList = createSelector(
  [selectUser],
  user => user.professionalList
);

export const selectExpertId = createSelector(
  [selectUser],
  user => user.ExpertId
);

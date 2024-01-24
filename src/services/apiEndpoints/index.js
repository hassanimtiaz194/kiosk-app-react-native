export const apiEndpoints = {
  GET_ALL_PROVIDER_SERVICES: {
    path: '/v2/scheduling/service/unique',
    method: 'GET',
  },
  FETCH_INSURANCE: {
    path: '/report-service-node/payers/by-state-name/{state}',
    method: 'GET',
  },
  GET_AVAILABLE_SLOTS: {
    path: '/v2/scheduling/schedule/masterSchedule',
    method: 'GET',
  },
  GET_STATES_SIMPLE: {
    path: 'report-service-node/states/simple',
    method: 'GET',
  },
  GET_PAYERS: {
    path: '/report-service-node/payers/{stateId}',
    method: 'GET',
  },
  CHECK_EMAIL_PHONE_UNIQUENESS: {
    path: '/auth/emailPhoneUniquenessCheck',
    method: 'POST',
  },
  SAVE_PROVISIONAL_USER: {
    path: '/auth/public/provisionalUser',
    method: 'POST',
  },
  PUBLIC_BOOK_APPOINTMENT: {
    path: '/auth/login/web/magicLink',
    method: 'POST',
  },
};



// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const config = {
  apiKey: 'AIzaSyA7IlS0S_mOFVrPpBp8HBRwihzsDjaegRs',
  authDomain: 'blazebase-bcc0a.firebaseapp.com',
  databaseURL: 'https://blazebase-bcc0a.firebaseio.com',
  projectId: 'blazebase-bcc0a',
  storageBucket: 'blazebase-bcc0a.appspot.com',
  messagingSenderId: '568610930926'
};

export const environment = {
  production: false,
  firebase: config,
  mapbox: 'pk.eyJ1IjoiY2FydGU3MDAwIiwiYSI6ImNpbmdsZm41ZzA1d2l1a2x5aG13cGR3dXMifQ.4xGvifRUQjT1DBctXy2lwA'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

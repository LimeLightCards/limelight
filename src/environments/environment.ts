// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'limelight-cards',
    appId: '1:808668109682:web:a6b9587e05d22d6fa59beb',
    storageBucket: 'limelight-cards.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyCXuNqau5utVnyMQw5P0gjgpvzF0gcfWF4',
    authDomain: 'limelight-cards.firebaseapp.com',
    messagingSenderId: '808668109682',
  },
  api: 'http://localhost:3535',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

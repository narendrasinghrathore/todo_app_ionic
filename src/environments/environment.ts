// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCi-brJq3YSwl5xYEnbMY0C9t7UL4a9Kyk',
    authDomain: 'todoappionic-9bdc5.firebaseapp.com',
    databaseURL: 'https://todoappionic-9bdc5.firebaseio.com',
    projectId: 'todoappionic-9bdc5',
    storageBucket: 'todoappionic-9bdc5.appspot.com',
    messagingSenderId: '972882468894',
    webClientID:
      '972882468894-spen23i998806rs6r80s9jf3l6rn8q34.apps.googleusercontent.com',
    webClientSecret: 'aT7rxFUSl0ec8YgVvBg7s5gp'
  },
  store: {
    login: {
      storeName: 'login'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

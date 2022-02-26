// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ATM_API_GATEWAY: window["env"]["apiUrl"] || "http://117.5.229.237:8024",
  ATM_CARD_READER: window["env"]["reader"] || "/api/v1",
  ATM_CARD_DISPENSER: window["env"]["dispenser"] || "/api/v1",
  ATM_BANK: window["env"]["bank"] || "/api/v1",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

import {Response} from '@angular/http';
import {Notification} from "./notification";
import {isNullOrUndefined} from "util";

export class ErrorHandler {
  constructor() {
    //console.log('ray : error_handler.ts constructor');
  }

  static extractData(success: Response) {
    let body = success.json() || '';
    console.log('ray : error_handler.ts extractData success.json() => ', success.json());

    // ray comment : notification
    if (body.code == '201' || body.code == '200') { // ray comment : the criteria of Success are based on custom code
      Notification.notifySuccess(success);
    }
    else if (isNullOrUndefined(body.code)) { // ray comment : the criteria of Info or Success are based on normal code
      Notification.notifyNormals(success);
    }
    else { // ray comment : the criteria of Info are based on custom code
      Notification.notifyInfo(success);
    }

    return body;
  }

  static handleError(errors: Response | any) {
    let body = errors.json() || '';
    console.error(body);

    // ray comment : notification
    if (isNullOrUndefined(body.code)) { // ray comment : the criteria of Errors are based on normal code
      Notification.notifyNormals(errors);
    }
    else { // ray comment : the criteria of Errors are based on custom code
      Notification.notifyErrors(errors);
    }

    // ray comment : process returning value
    let errMsg: string;
    if (errors instanceof Response) {
      const body = errors.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${errors.status} - ${errors.statusText || ''} ${err}`;
    } else {
      errMsg = errors.message ? errors.message : errors.toString();
    }
    return Promise.reject(errMsg);
  }
}
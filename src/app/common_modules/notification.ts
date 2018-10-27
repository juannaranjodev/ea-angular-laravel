import 'assets/pages/scripts/ui-toastr.js';
import {forEach} from "@angular/router/src/utils/collection";
import {Response} from '@angular/http';
import {isNullOrUndefined} from "util";

declare let RunUIToastr;
declare let EmitNotification;
declare let jQuery;

/* Manual
Reference : assets/global/plugins/bootstrap-toastr/toastr.js => Notification library

Params :
  option.type
    'success'
    'info'
    'warning'
    'error'
  option.show_easing
    'swing'
  option.hide_easing
    'linear'
  option.show_method
    'fadeIn'
  option.hide_method
    'fadeOut'
  option.show_duration
    '1000'
  option.hide_duration
    '1000'
  option.timeout
    '5000'
  option.exteded_timeout
    '1000'
  option.show_easing
    'swing'
  option.hide_easing
    'linear'
  option.show_method
    'fadeIn'
  option.hide_method
    'fadeOut'
 */

// ray comment : metronic style for notification
export class Notification {
  constructor() {
  }

  static init() {
    RunUIToastr(jQuery);
  }

  static notifyAny(option) {
    option.position_class = "toast-bottom-right";
    if(isNullOrUndefined(option.title)) {
      option.title = "Server";
    }
    Notification.init();
    EmitNotification(jQuery, option);
  }

  static getNotifyType(response) {
    let type: string;
    switch (response.status.toString()) {
      case '200' :
      case 'success' :
        type = 'success';
        break;
      case '201' :
      case 'created ' :
        type = 'success';
        break;
      case '204' :
      case 'noContent' :
        type = 'error';
        break;
      case '304' :
      case 'notModified' :
        type = 'error';
        break;
      case '400' :
      case 'badRequestError' :
        type = 'error';
        break;
      case '401' :
      case 'unauthorizedError' :
        type = 'error';
        break;
      case '403' :
      case 'forbiddenError' :
        type = 'error';
        break;
      case '404' :
      case 'notFoundError' :
        type = 'error';
        break;
      case '405' :
      case 'notAllowedError' :
        type = 'error';
        break;
      case '406' :
      case 'notAcceptableError' :
        type = 'error';
        break;
      case '409' :
      case 'conflictError' :
        type = 'error';
        break;
      case '410' :
      case 'goneError' :
        type = 'error';
        break;
      case '422' :
      case 'unprocessableError' :
        type = 'error';
        break;
      case '429' :
      case 'tooManyRequestsError' :
        type = 'error';
        break;
      case '500' :
      case 'internalError' :
        type = 'error';
        break;
      default :
        type = 'error';
        break;
    }
    return type;
  }

  // ray comment : notification for processing all kinds of code when based on normal respond at laravel
  // e.g. "return json()->success('Success'); // At laravel controller"
  static notifyNormals(response) {
    // In a real world app, we might use a remote logging infrastructure
    let resMsg: string;
    let res;
    let type;
    let message;
    let title;
    if (response instanceof Response) {
      let body: any = response.json() || '';
      res = body.error || body.success || JSON.stringify(body);
      resMsg = `${response.status} - ${response.statusText || ''} ${res}`;
      type = Notification.getNotifyType(response);
      message = `${response.status}` + ' - ' + res.message;
      title = `${response.statusText}`;
      if(response.status == 0) {
        message = 'Server connection failed.';
        title = 'Server';
      }
    } else {
      resMsg = response.message ? response.message : response.toString();
      type = 'info';
      message = resMsg;
      title = 'Info';
    }

    let option = {type: type, message: message, title: title, position_class: "toast-bottom-right"};
    Notification.init();
    EmitNotification(jQuery, option);
  }

  static notifyInfo(response: Response | any) {
    // console.log('ray : notification info');
    Notification.init();
    let option = {type: 'info', message: response.json().message, title: 'Info', position_class: "toast-bottom-right"};
    EmitNotification(jQuery, option);
  }

  static notifySuccess(success) {
    // console.log('ray : notification success');
    Notification.init();
    let option = {type: 'success', message: success.json().message, title: 'Success', position_class: "toast-bottom-right"};
    EmitNotification(jQuery, option);
  }

  static notifyErrors(errors: Response | any) {
    // console.log('ray : notification notifyErrors');
    Notification.init();
    forEach(errors.json().errors, function (error) {
      // console.log('ray : error => ' + error);
      let option = {type: 'error', message: error, title: errors.json().code, position_class: "toast-bottom-right"};
      if(error == "token_not_provided") return;
      EmitNotification(jQuery, option);
    });
  }
}
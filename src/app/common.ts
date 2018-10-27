import {Router} from "@angular/router";
import {isArray, isNullOrUndefined} from "util";

declare let $;
declare let jqxWindow;

export class Common {
  static IS_STATIC_PAGE = false; // Is static pages or backend combined pages
  static BASE_URL = 'http://localhost:8000';
  static FRONT_URL = 'http://localhost:4200';

  static login() {
    localStorage.setItem('logged_in', 'yes');
  }

  static logout() {
    localStorage.setItem('token', null);
    localStorage.setItem('role', null);
    localStorage.setItem('user_id', null);
    localStorage.setItem('logged_in', 'no');
  }

  static getUser() {
    return {
      username: 'Tony',
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
      user_id: localStorage.getItem('user_id'),
      logged_in: localStorage.getItem('logged_in') == null
        ? 'no'
        : localStorage.getItem('logged_in'),
      is_logged: function () {
        return this.logged_in == 'yes';
      },
    }
  }
}
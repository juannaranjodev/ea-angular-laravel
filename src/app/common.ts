import { getDefaultService } from "selenium-webdriver/edge";

export const Common  = {
    isAdmin() {
        return this.getUser().role == 'admin' ? true: false;
    },
    getUser(){
        return JSON.parse(localStorage.getItem("currentUser"));
    }
  };
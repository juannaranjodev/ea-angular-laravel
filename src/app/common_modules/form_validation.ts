import 'assets/pages/scripts/form-validation.js'; // ray comment : metronic style for validation
import 'assets/pages/scripts/login.js'; // ray comment : metronic style for login

declare var RunLoginFamily;
declare var RunFormValidation;
declare var jQuery;

export class FormValidation {
    constructor() {
        //console.log('ray : form_validation.ts constructor');
    }

    static validate(form_id, callback) {
        RunFormValidation(jQuery, form_id, callback);
    }

    static loginValidate(callback) {
        RunLoginFamily(jQuery, callback);
    }
}
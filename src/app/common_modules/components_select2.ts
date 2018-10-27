import 'assets/plugins/components-selectlawfirm.js'; // ray comment : metronic style for validation

declare var RunComponentsSelectLawfirm;
declare var jQuery;

export class ComponentsSelectLawfirm {
  constructor() {
    //console.log('ray : form_validation.ts constructor');
  }

  static init() {
    RunComponentsSelectLawfirm(jQuery);
  }
}

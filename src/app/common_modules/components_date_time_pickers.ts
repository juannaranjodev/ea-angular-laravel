import 'assets/pages/scripts/components-date-time-pickers.js'; // ray comment : metronic style for validation

declare var RunComponentsDateTimePickers;
declare var jQuery;

export class ComponentsDateTimePickers {
  constructor() {
    //console.log('ray : form_validation.ts constructor');
  }

  static init() {
    RunComponentsDateTimePickers(jQuery);
  }
}

import { Routes } from '@angular/router';

import { TableComponent } from './table.component';
import { LicenseComponent } from './license/license.component';

export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TableComponent
      },
      {
        path: 'detail/:email',
        component: TableComponent
      },
      {
        path: 'license/:ea_id/:user_id',
        component: LicenseComponent
      },
    ]
  }
];

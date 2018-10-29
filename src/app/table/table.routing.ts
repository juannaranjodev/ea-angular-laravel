import { Routes } from '@angular/router';

import { TableComponent } from './table.component';

export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TableComponent
      },
    ]
  }
];

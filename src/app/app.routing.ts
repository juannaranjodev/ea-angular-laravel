import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
// ruby test below
import { AppBlankComponent } from './layouts/blank/blank.component';
import { AuthGuard } from './_guards';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard], // ruby test
    children: [
      {
        path: '',
        redirectTo: '/table',
        pathMatch: 'full'
      },
      {
        path: 'material',
        loadChildren:
          './material-component/material.module#MaterialComponentsModule'
      },
      {
        path: 'starter',
        loadChildren: './starter/starter.module#StarterModule',
      },
      {
        path: 'icons',
        loadChildren: './icons/mat-icon.module#IconsModule'
      },
      {
        path: 'table',
        loadChildren: './table/table.module#TablesModule'
      }
    ]
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren:
          './authentication/authentication.module#AuthenticationModule'
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'authentication/404'
  }
];

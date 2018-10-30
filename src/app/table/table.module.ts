import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TablesRoutes } from './table.routing';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { TableComponent} from './table.component';
import { DialogOverviewExampleDialogComponent} from './create-ea-product/create-ea-product.component';
import { LicenseComponent } from './license/license.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TablesRoutes),
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
  ],
  entryComponents: [DialogOverviewExampleDialogComponent],
  declarations: [
    DialogOverviewExampleDialogComponent,
    TableComponent,
    LicenseComponent
  ]
})
export class TablesModule {}

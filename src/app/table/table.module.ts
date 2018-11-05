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
import { CreateEaProductComponent} from './create-ea-product/create-ea-product.component';
import { EditEaProductComponent} from './edit-ea-product/edit-ea-product.component';
import { CreateLicenseComponent} from './license/create-license/create-license.component';
import { EditLicenseComponent} from './license/edit-license/edit-license.component';
import { LicenseComponent } from './license/license.component';
import { ConfirmComponent } from './confirm.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TablesRoutes),
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,

  ],
  entryComponents: [CreateEaProductComponent, EditEaProductComponent, CreateLicenseComponent, EditLicenseComponent, ConfirmComponent],
  declarations: [
    CreateEaProductComponent,
    EditEaProductComponent,
    CreateLicenseComponent,
    EditLicenseComponent,
    TableComponent,
    LicenseComponent,
    ConfirmComponent
  ]
})
export class TablesModule {}

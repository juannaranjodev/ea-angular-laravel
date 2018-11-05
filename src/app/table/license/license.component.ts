import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

// ruby test added
import { License } from '../../_models';
import { EaProductService, UserService, LicenseService} from '../../_services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';

import { CreateLicenseComponent} from './create-license/create-license.component';
import { EditLicenseComponent} from './edit-license/edit-license.component';
import { Common } from '../../common';
import { ConfirmComponent} from '../confirm.component';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent implements AfterViewInit {
  displayedColumns = ['account_number', 'allow_flag', 'action'];
  dataSource: MatTableDataSource<LicenseData>;
  licenses: License[] = [];
  ea_id: string;
  user_id: string;
  isAdmin: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private eaproductService: EaProductService,
    private userService: UserService,
    private licenseService: LicenseService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public toastr: ToastrManager,
    private router: Router,
  ){}

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.route.params.subscribe(params => { this.ea_id = params['ea_id'],  this.user_id = params['user_id'] });
    console.log("ruby::::::: license ngOnInit-", this.ea_id, ", user_id ",this.user_id);
    this.isAdmin = Common.isAdmin();
    if(!this.isAdmin && Common.getUser().id.toString() != this.user_id){
      this.toastr.errorToastr('The account list is not accessable.', 'Error', {animate: "slideFromTop"});
      this.router.navigate(['/table']);
    }
    this.loadAllLicenses(this.ea_id);
    
  }

  deleteLicense(id: number, allow_flag: boolean) {
    if(!this.isAdmin && !allow_flag) {
      this.toastr.errorToastr('This account is not editable.', 'Error', {animate: "slideFromTop"});
      return;
    }

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.licenseService.delete(id).pipe(first()).subscribe(
          res => {
            this.toastr.successToastr('Successfully Deleted.', 'Success!', {animate: "slideFromTop"});
            this.loadAllLicenses(this.ea_id);
            // check for errors
          },
          error => {
              this.toastr.errorToastr('There might be some problems.', 'Error', {animate: "slideFromTop"});
          }
        );
      }
    });
  }

  private loadAllLicenses(ea_id: string) {
      this.licenseService.getByEaId(ea_id).pipe(first()).subscribe(licenses => {
        console.log("ruby: licenses from back", licenses);
          this.licenses = licenses.data;
          // Create 100 users
          const licensedata: LicenseData[] = [];
          for (let i = 0; i < this.licenses.length; i++) {
            licensedata.push({
              ea_id: this.licenses[i].ea_id,
              account_number: this.licenses[i].account_number,
              //hash_key: this.licenses[i].hash_key,
              email: this.licenses[i].email,
              allow_flag: this.licenses[i].allow_flag,
              user_id: this.licenses[i].user_id,
              id: this.licenses[i].id
            });
          }

          // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(licensedata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      });
  }

  openLiscense(ea_id: string) {
    console.log("ruby clicked here: ", ea_id);
  }

  // ruby test
  createNewLicense(): void {
    if(!this.isAdmin && this.licenses.length >= 3) {
      this.toastr.errorToastr("You can't add an account any more.", 'Error', {animate: "slideFromTop"});
      return;
    }
    const dialogRef = this.dialog.open(CreateLicenseComponent, {
      width: '480px',
      data: { ea_id: this.ea_id, user_id: this.user_id, licenses: this.licenses }
      // data: { newEaId: this.newEaId, newEaName: this.newEaName, newParameter: this.newParameter }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAllLicenses(this.ea_id);
    });
  }

  editLicense(row: any): void {
    if(!this.isAdmin && !row.allow_flag) {
      this.toastr.errorToastr('This account is not editable.', 'Error', {animate: "slideFromTop"});
      return;
    }
    const dialogRef = this.dialog.open(EditLicenseComponent, {
      width: '480px',
      height: 'auto',
      data: { selectedId: row.id,  selectedEaId: row.ea_id, selectedAccountNumber: row.account_number 
                , selectedAllowFlag: row.allow_flag, selectedUserId: row.user_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAllLicenses(this.ea_id);
    });
  }
}


export interface LicenseData {
  ea_id: string;
  email: string;
  account_number: string;
  //hash_key: string;
  allow_flag: boolean;
  user_id: number;
  id: number;
}

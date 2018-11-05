import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, ViewChild, AfterViewInit,Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { LicenseService, UserService } from '../../../_services';
import { User, License } from '../../../_models';
import { first } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Common } from '../../../common';
//ruby dialog test
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './create-license.component.html'
})
export class CreateLicenseComponent {
  users: User[] = [];
  newEaId: string;
  newAccountNumber: string;
  newHashKey: string;
  newUserId: number;
  newAllowFlag: boolean;
  email: number;
  isAdmin: boolean;
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<CreateLicenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private licenseService: LicenseService,
    public toastr: ToastrManager
  ) {}

  ngOnInit() {
    console.log("ruby test");
    this.isAdmin = Common.isAdmin();
    this.loadUsers();
    this.loading = false;
    this.newAllowFlag = true;
  }

  onSubmit(): void {
    if(this.loading){
      return;
    }
    this.loading = true;
    let license = new License();

    license.ea_id = this.data.ea_id;
    license.account_number = this.newAccountNumber;
    let checkUnique = this.data.licenses.find(license => license.account_number == this.newAccountNumber)
    if(checkUnique) {
      this.toastr.errorToastr("Account Number already exists.", "Error!", {animate: "slideFromTop"});
      this.loading = false;
      return;
    }
    // license.hash_key = this.newHashKey;
    license.user_id = this.data.user_id;
    license.allow_flag = (this.isAdmin) ? this.newAllowFlag : true;
    license.is_admin = (this.isAdmin) ? true : false;
    console.log(license);
    this.licenseService.add(license)
    .subscribe(
      res => {
        if(res.success == undefined){
          this.toastr.successToastr('Successfully Added.', 'Success!', {animate: "slideFromTop"});
          console.log("ruby: test save eaproduct,", res);
          this.dialogRef.close();
          this.loading = false;
          // check for errors
        }else {
          this.toastr.errorToastr("You can't add an account any more", 'Error', {animate: "slideFromTop"});
        }
      },
      error => {
          console.log('ruby : failed to save new account');
          this.toastr.errorToastr('Failed in add new account.', 'Error', {animate: "slideFromTop"});
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users.data;
      console.log("ruby: create ea, users", this.users);
    });
  }

}
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, ViewChild, AfterViewInit,Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { LicenseService, UserService } from '../../../_services';
import { User, License } from '../../../_models';
import { first } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';

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
  constructor(
    public dialogRef: MatDialogRef<CreateLicenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private licenseService: LicenseService,
    public toastr: ToastrManager
  ) {}

  ngOnInit() {
    console.log("ruby test");
    this.loadUsers();
  }

  onSubmit(): void {
    console.log("ruby: submit", this.email)
    let license = new License();
    //   ea_id: this.newEaId,
    //   ea_name: this.newEaName,
    //   parameter: this.newParameter,
    //   user_id: this.email,
    // });
    license.ea_id = this.data.ea_id;
    license.account_number = this.newAccountNumber;
    license.hash_key = this.newHashKey;
    license.user_id = this.email;
    license.allow_flag = this.newAllowFlag;
    console.log(license);
    this.licenseService.add(license)
    .subscribe(
      res => {
        this.toastr.successToastr('Successfully Added.', 'Success!', {animate: "slideFromTop"});
        console.log("ruby: test save eaproduct,", res);
        this.dialogRef.close();
        // check for errors
      },
      error => {
          console.log('ruby : failed to save ea product');
          this.toastr.errorToastr('There might be some problems.', 'Error', {animate: "slideFromTop"});
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
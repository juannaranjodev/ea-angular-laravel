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
  templateUrl: './edit-license.component.html'
})
export class EditLicenseComponent {
  users: User[] = [];
  newEaId: string;
  newEaName: string;
  newParameter: string;
  newUserId: number;
  email: number;
  isAdmin: boolean;
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditLicenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private licenseService: LicenseService,
    public toastr: ToastrManager
  ) {}

  ngOnInit() {
    console.log("ruby test", this.data);
    this.isAdmin = Common.isAdmin();
    this.loadUsers();
    this.loading = false;
  }

  onSubmit(): void {
    if(this.loading) {
      return;
    }
    this.loading = true;
    console.log("ruby: submit", this.email)
    let license = new License();

    license.id = this.data.selectedId;
    license.ea_id = this.data.selectedEaId;
    license.account_number = this.data.selectedAccountNumber;
    //license.hash_key = this.data.selectedHashKey;
    license.allow_flag = this.data.selectedAllowFlag;
    license.user_id = this.data.selectedUserId;//this.users.find(user => user.email == this.data.selectedEmail).id;
    console.log(license);
    this.licenseService.update(license)
    .subscribe(
      res => {
        this.toastr.successToastr('Successfully Updated.', 'Success!', {animate: "slideFromTop"});
        console.log("ruby: test save eaproduct,", res);
        this.dialogRef.close();
        this.loading = false;
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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, ViewChild, AfterViewInit,Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { EaProductService, UserService } from '../../_services';
import { User, Ea_Product } from '../../_models';
import { first } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Common } from '../../common';
import { CustomValidators } from 'ng2-validation';

//ruby dialog test
@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent {
  newEmail: string;
  newPassword: string;
  newIsAllowed: boolean;
  loading: boolean;
  public form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private eaProductService: EaProductService,
    public toastr: ToastrManager,
    private fb: FormBuilder,
    
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      password: [null, Validators.compose([Validators.required])]
    });
    this.loading = false;
  }

  onSubmit(): void {
    if(this.loading)
      return;
    this.loading = true;
    let newUser = new User();

    this.userService.register(
      'UserName',
      this.form.controls.email.value,
      this.form.controls.password.value,
    )
    .pipe(first())
    .subscribe(
        res => {
            console.log("ruby: test subscribe,", res);
            if (res.token) {
              this.toastr.successToastr('Successfully Added.', 'Success!', {animate: "slideFromTop"});
              this.dialogRef.close();
            }else {
              this.toastr.errorToastr('Failed in adding user. Check the email and password again.', 'Error', {animate: "slideFromTop"});
            }
            this.loading = false;
        },
        error => {
            this.toastr.errorToastr('Failed in adding user. Try again.', 'Error', {animate: "slideFromTop"});
            this.loading = false;
            console.error(error);
        }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // loadUsers() {
  //   this.userService.getAll().pipe(first()).subscribe(users => {
  //     this.users = users.data;
  //     console.log("ruby: create ea, users", this.users);
  //   });
  // }

  // getUserId(email: string) {
  //   let user = this.users.find(user => user.email == email);
  //   if(user) {
  //     return user.id;
  //   }
  //   return -1;
  // }
}
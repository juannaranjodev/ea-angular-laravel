import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, ViewChild, AfterViewInit,Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { EaProductService, UserService } from '../../_services';
import { User, Ea_Product } from '../../_models';
import { first } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Common } from '../../common';
//ruby dialog test
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './create-ea-product.component.html'
})
export class CreateEaProductComponent {
  users: User[] = [];
  newEaId: string;
  newEaName: string;
  newParameter: string;
  newUserId: number;
  email: string;
  currentUser: any;
  loading: boolean;
  constructor(
    public dialogRef: MatDialogRef<CreateEaProductComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private eaProductService: EaProductService,
    public toastr: ToastrManager
  ) {}

  ngOnInit() {
    this.currentUser = Common.getUser();
    console.log("ruby test: create table, cur user", this.currentUser);
    this.loadUsers();
    this.loading = false;
  }

  onSubmit(): void {
    if(this.loading)
      return;
    this.loading = true;
    let newEaProduct = new Ea_Product();
    newEaProduct.user_id = this.currentUser.role == "admin" ? this.getUserId(this.email) : this.currentUser.id;
    
    if(newEaProduct.user_id < 0) {
      this.toastr.errorToastr('Invalid email!', 'Error!', {animate: "slideFromTop"});
      this.loading = false;
      return;
    }
    if(!(this.newEaName && this.newParameter && this.newParameter)){
      this.toastr.errorToastr('Invalid input.', 'Error!', {animate: "slideFromTop"});
      return;
    }

    newEaProduct.ea_id = this.newEaId.split(' ').join('');
    newEaProduct.ea_name = this.newEaName;
    newEaProduct.parameter = this.newParameter;
    
    this.eaProductService.add(newEaProduct)
    .subscribe(
      res => {
        this.toastr.successToastr('Successfully Added.', 'Success!', {animate: "slideFromTop"});
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

  getUserId(email: string) {
    let user = this.users.find(user => user.email == email);
    if(user) {
      return user.id;
    }
    return -1;
  }
}
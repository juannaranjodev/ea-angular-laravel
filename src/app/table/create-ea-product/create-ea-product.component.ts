import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, ViewChild, AfterViewInit,Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { EaProductService, UserService } from '../../_services';
import { User, Ea_Product } from '../../_models';
import { first } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';

//ruby dialog test
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './create-ea-product.component.html'
})
export class DialogOverviewExampleDialogComponent {
  users: User[] = [];
  newEaId: string;
  newEaName: string;
  newParameter: string;
  newUserId: number;
  email: number;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private eaProductService: EaProductService,
    public toastr: ToastrManager
  ) {}

  ngOnInit() {
    console.log("ruby test");
    this.loadUsers();
  }

  onSubmit(): void {
    console.log("ruby: submit", this.email)
    let newEaProduct = new Ea_Product();
    //   ea_id: this.newEaId,
    //   ea_name: this.newEaName,
    //   parameter: this.newParameter,
    //   user_id: this.email,
    // });
    newEaProduct.ea_id = this.newEaId;
    newEaProduct.ea_name = this.newEaName;
    newEaProduct.parameter = this.newParameter;
    newEaProduct.user_id = this.email;
    this.eaProductService.add(newEaProduct)
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
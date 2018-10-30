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
  templateUrl: './edit-ea-product.component.html'
})
export class EditEaProductComponent {
  users: User[] = [];
  newEaId: string;
  newEaName: string;
  newParameter: string;
  newUserId: number;
  email: number;
  constructor(
    public dialogRef: MatDialogRef<EditEaProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private eaProductService: EaProductService,
    public toastr: ToastrManager
  ) {}

  ngOnInit() {
    console.log("ruby test", this.data);
    this.loadUsers();
  }

  onSubmit(): void {
    console.log("ruby: submit", this.email)
    let editEaProduct = new Ea_Product();
    //   ea_id: this.newEaId,
    //   ea_name: this.newEaName,
    //   parameter: this.newParameter,
    //   user_id: this.email,
    // });
    editEaProduct.id = this.data.selectedId;
    editEaProduct.ea_id = this.data.selectedEaId;
    editEaProduct.ea_name = this.data.selectedEaName;
    editEaProduct.parameter = this.data.selectedParameter;
    editEaProduct.user_id = this.users.find(user => user.email == this.data.selectedEmail).id;
    console.log(editEaProduct);
    this.eaProductService.update(editEaProduct)
    .subscribe(
      res => {
        this.toastr.successToastr('Successfully Updated.', 'Success!', {animate: "slideFromTop"});
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
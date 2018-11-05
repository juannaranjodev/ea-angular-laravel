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
  loading: boolean;
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
    this.loading = false;
  }

  onSubmit(): void {
    if(this.loading){
      return;
    }
    this.loading = true;
    console.log("ruby: submit", this.email)
    let editEaProduct = new Ea_Product();
    editEaProduct.user_id = this.getUserId(this.data.selectedEmail);
    if(editEaProduct.user_id < 0) {
      this.toastr.errorToastr('Invalid email!', 'Error!', {animate: "slideFromTop"});
      this.loading = false;
      return;
    }
    editEaProduct.id = this.data.selectedId;
    editEaProduct.ea_id = this.data.selectedEaId.split(' ').join('');
    editEaProduct.ea_name = this.data.selectedEaName;
    editEaProduct.parameter = this.data.selectedParameter;
    
    //console.log(editEaProduct);
    this.eaProductService.update(editEaProduct)
    .subscribe(
      res => {
        this.toastr.successToastr('Successfully Updated.', 'Success!', {animate: "slideFromTop"});
        console.log("ruby: test save eaproduct,", res);
        this.dialogRef.close();
        this.loading = false;
      },
      error => {
          console.log('ruby : failed to save ea product');
          this.toastr.errorToastr('Failed in updating data', 'Error', {animate: "slideFromTop"});
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
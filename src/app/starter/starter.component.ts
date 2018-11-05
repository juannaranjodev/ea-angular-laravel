import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

import { User } from '../_models';
import { UserService, EaProductService , LicenseService } from '../_services';
import { first } from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Common } from '../common';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ConfirmComponent} from './confirm.component';
import { Router} from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateUserComponent } from './create-user/create-user.component';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements AfterViewInit {
  displayedColumns = ['id', 'email', 'is_allowed', 'action'];
  dataSource: MatTableDataSource<UserData>;
  users: User[] = [];
  isAdmin: boolean;
  loading: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private licenseService: LicenseService,
    private eaProductService: EaProductService,
    public toastr: ToastrManager,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngAfterViewInit() {}

  ngOnInit() {
    this.loadAllUsers(); 
    this.isAdmin = Common.isAdmin();
    this.loading = false;
    if(!this.isAdmin) {
      this.router.navigate(['/table']);
    }
  }

  deleteUser = (id: number) => {
    if(id == Common.getUser().id) {
      this.toastr.errorToastr('Failed to delete user!', 'Error', {animate: "slideFromTop"});
      return;
    }

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        //this.licenseService.delete()
        this.userService.delete(id).pipe(first()).subscribe(
          res => {
            this.toastr.successToastr('Successfully Deleted.', 'Success!', {animate: "slideFromTop"});
            this.loadAllUsers();
          },
          error => {
              this.toastr.errorToastr('Failed to delete User', 'Error', {animate: "slideFromTop"});
          }
        );
      }
    });
  }

  createUser () {
    console.log("ruby: create user");
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '480px',
      //data: { newEaId: this.newEaId, newEaName: this.newEaName, newParameter: this.newParameter }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAllUsers();
    });
  }
 
  openEaPage(row) {
    console.log("ruby: openEaPage", row);
    this.router.navigate(['/table/detail', row.email]);
  }

  setAllowStatus(row) {
    if(this.loading) {
      return;
    }
    if(row.id == Common.getUser().id) {
      this.toastr.errorToastr('Failed to change status!', 'Error', {animate: "slideFromTop"});
      return;
    }
    this.loading = true;
    row.is_allowed = !row.is_allowed;
    console.log("ruby: val:", row);
    this.userService.update(row).pipe(first()).subscribe(
      res => {
        console.log("ruby: changed allow status subscribe,", res);
        this.loading = false;
        this.loadAllUsers();
        this.toastr.successToastr('Status Changed!', 'Success!', {animate: "slideFromTop"});
      },
      error => {
        console.log('ruby : failed to change allow status');
        this.loading = false;
        this.toastr.errorToastr('Failed to change status!', 'Error', {animate: "slideFromTop"});
      }
    );
  }

  applyFilter(filterValue: string) {

    console.log("ruby filter: ", filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;

  }

  private loadAllUsers() {
      this.userService.getAll().pipe(first()).subscribe(users => {
          console.log("ruby: ea products all = ", users);
          this.users = users.data;

          const userdata: UserData[] = [];
          for (let i = 0; i < this.users.length; i++) {
            userdata.push({
              id: this.users[i].id,
              email: this.users[i].email,
              is_allowed: this.users[i].is_allowed,
            });
          }

          // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(userdata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

      });
  }
}

export interface UserData {
  email: string;
  id: number;
  is_allowed: boolean;
}

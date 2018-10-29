import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

// ruby test added
import { License } from '../../_models';
import { EaProductService, UserService, } from '../../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent implements AfterViewInit {
  displayedColumns = ['ea_id', 'email', 'account_number', 'hash_key', 'allow_flag'];
  dataSource: MatTableDataSource<LicenseData>;
  licenses: License[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private eaproductService: EaProductService,
    private userService: UserService
  ){
  }

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
    this.loadAllEaProducts();
  }

  deleteEaProduct(id: number) {
      this.eaproductService.delete(id).pipe(first()).subscribe(() => { 
          this.loadAllEaProducts() 
      });
  }

  private loadAllEaProducts() {
      this.eaproductService.getAll().pipe(first()).subscribe(licenses => {
          this.licenses = licenses.data;
          // Create 100 users
          const eadata: LicenseData[] = [];
          for (let i = 0; i < this.licenses.length; i++) {
            let userdata = this.userService.getById(this.licenses[i].user_id);
            console.log("ruby:: userdata = ", userdata);
            eadata.push({
              ea_id: this.licenses[i].ea_id,
              account_number: this.licenses[i].account_number,
              hash_key: this.licenses[i].hash_key,
              email: this.licenses[i].user_id.toString(),//this.userService.getById(this.ea_products[i].user_id).email,
              allow_flag: this.licenses[i].allow_flag
            });
          }

          // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(eadata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      });
  }

  openLiscense(ea_id: string) {
    console.log("ruby clicked here: ", ea_id);
  }
}


export interface LicenseData {
  ea_id: string;
  email: string;
  account_number: string;
  hash_key: string;
  allow_flag: boolean;
}

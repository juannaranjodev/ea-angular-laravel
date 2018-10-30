import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

// ruby test added
import { License } from '../../_models';
import { EaProductService, UserService, LicenseService} from '../../_services';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent implements AfterViewInit {
  displayedColumns = ['ea_id', 'email', 'account_number', 'hash_key', 'allow_flag'];
  dataSource: MatTableDataSource<LicenseData>;
  licenses: License[] = [];
  ea_id: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private eaproductService: EaProductService,
    private userService: UserService,
    private licenseService: LicenseService,
    private route: ActivatedRoute,
  ){}

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
    this.route.params.subscribe(params => { this.ea_id = params['ea_id']; });
    console.log("ruby::::::: license ngOnInit-", this.ea_id);
    this.loadAllLicenses(this.ea_id);
  }

  deleteLicense(id: number) {
      this.licenseService.delete(id).pipe(first()).subscribe(() => { 
          this.loadAllLicenses(this.ea_id);
      });
  }

  private loadAllLicenses(ea_id: string) {
      this.licenseService.getByEaId(ea_id).pipe(first()).subscribe(licenses => {
        console.log("ruby: licenses from back", licenses);
          this.licenses = licenses.data;
          // Create 100 users
          const licensedata: LicenseData[] = [];
          for (let i = 0; i < this.licenses.length; i++) {
            let userdata = this.userService.getById(this.licenses[i].user_id);
            console.log("ruby:: userdata = ", userdata);
            licensedata.push({
              ea_id: this.licenses[i].ea_id,
              account_number: this.licenses[i].account_number,
              hash_key: this.licenses[i].hash_key,
              email: this.licenses[i].user_id.toString(),//this.userService.getById(this.ea_products[i].user_id).email,
              allow_flag: this.licenses[i].allow_flag
            });
          }

          // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(licensedata);
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

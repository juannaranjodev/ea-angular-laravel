import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

// ruby test added
import { Ea_Product } from '../_models';
import { EaProductService, UserService } from '../_services';
import { first } from 'rxjs/operators';
import { Router} from '@angular/router';

/** Constants used to fill up our data base. */
const COLORS = [
  'maroon',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'purple',
  'fuchsia',
  'lime',
  'teal',
  'aqua',
  'blue',
  'navy',
  'black',
  'gray'
];

const NAMES = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth'
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  displayedColumns = ['ea_id', 'ea_name', 'email', 'color'];
  dataSource: MatTableDataSource<EAData>;
  ea_products: Ea_Product[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private eaproductService: EaProductService,
    private userService: UserService,
    private router: Router
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
    this.loadAllEaProducts();
  }

  deleteEaProduct(id: number) {
      this.eaproductService.delete(id).pipe(first()).subscribe(() => { 
          this.loadAllEaProducts() 
      });
  }

  private loadAllEaProducts() {
      this.eaproductService.getAll().pipe(first()).subscribe(ea_products => {
          this.ea_products = ea_products.data;
          // Create 100 users
          const eadata: EAData[] = [];
          for (let i = 0; i < this.ea_products.length; i++) {
            let userdata = this.userService.getById(this.ea_products[i].user_id);
            console.log("ruby:: userdata = ", userdata);
            eadata.push({
              ea_id: this.ea_products[i].ea_id,
              ea_name: this.ea_products[i].ea_name,
              email: this.ea_products[i].user_id.toString(),//this.userService.getById(this.ea_products[i].user_id).email,
              color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
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
    if(ea_id) {
      this.router.navigate(['/table/license', ea_id]);
    }
  }
}


export interface EAData {
  ea_id: string;
  ea_name: string;
  email: string;
  color: string;
}

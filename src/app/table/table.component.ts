import { Component, ViewChild, AfterViewInit,Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// ruby test added
import { Ea_Product } from '../_models';
import { EaProductService, UserService } from '../_services';
import { first } from 'rxjs/operators';
import { Router} from '@angular/router';
import { DialogOverviewExampleDialogComponent} from './create-ea-product/create-ea-product.component';

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

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  displayedColumns = ['ea_id', 'ea_name', 'email', 'color'];
  dataSource: MatTableDataSource<EAData>;
  ea_products: Ea_Product[] = [];
  // ruby test
  newEaId: string;
  newEaName: string;
  newParameter: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private eaproductService: EaProductService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
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
          
          const eadata: EAData[] = [];
          for (let i = 0; i < this.ea_products.length; i++) {
            eadata.push({
              ea_id: this.ea_products[i].ea_id,
              ea_name: this.ea_products[i].ea_name,
              email: this.ea_products[i].email,
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

  // ruby test
  openNewDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '480px',
      data: { newEaId: this.newEaId, newEaName: this.newEaName, newParameter: this.newParameter }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.newEaId = result.newEaId;
    //   this.newEaName = result.newEaName;
    //   this.newParameter = result.newParameter;
    //   console.log("ruby: closed data", result);

    // });
  }
}

export interface EAData {
  ea_id: string;
  ea_name: string;
  email: string;
  color: string;
}

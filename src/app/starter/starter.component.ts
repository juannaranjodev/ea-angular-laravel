import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

import { Ea_Product } from '../_models';
import { EaProductService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements AfterViewInit {
  ea_products: Ea_Product[] = [];

  constructor(private eaproductService: EaProductService) {
  }

  ngAfterViewInit() {}

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
          console.log("ruby: ea products all = ", ea_products);
          this.ea_products = ea_products.data; 
      });
  }
}

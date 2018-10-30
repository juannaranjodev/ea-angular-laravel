import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Ea_Product } from '../_models';
import { environment } from '../../environments/environment'; // ruby test
import { map } from 'rxjs/operators';
@Injectable()
export class EaProductService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/ea_products`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/ea_products/` + id);
    }

    add(ea_product: Ea_Product) {
        return this.http.post(`${environment.apiUrl}/ea_products/`, ea_product)
        .pipe(map(res => {
            // add ea product successful
            console.log("ruby: ea product save res = ", res);
            return res;
        }));
    }

    update(ea_product: Ea_Product) {
        return this.http.put(`${environment.apiUrl}/ea_products/` + ea_product.id, ea_product);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/ea_products/` + id);
    }
}
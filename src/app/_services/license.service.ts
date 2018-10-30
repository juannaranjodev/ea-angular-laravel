import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Ea_Product } from '../_models';
import { License } from '../_models';
import { environment } from '../../environments/environment'; // ruby test
@Injectable()
export class LicenseService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/licenses`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/licenses/` + id);
    }

    getByEaId(ea_id: string) {
        return this.http.get<any>(`${environment.backUrl}/licenses/getbyeaid/` + ea_id);
    }

    add(license: License) {
        return this.http.post(`${environment.apiUrl}/licenses/`, license);
    }

    update(license: License) {
        return this.http.put(`${environment.apiUrl}/licenses/` + license.id, license);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/licenses/` + id);
    }
}
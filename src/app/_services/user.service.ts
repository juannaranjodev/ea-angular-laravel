import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { environment } from '../../environments/environment'; // ruby test

@Injectable()
export class UserService {
    private readonly apiUrl = environment.apiUrl; // ruby test

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>( this.apiUrl + '/users');
    }

    getById(id: number) {
        return this.http.get(`${this.apiUrl}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${this.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${this.apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/users/` + id);
    }
}
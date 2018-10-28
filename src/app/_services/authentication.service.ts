import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'; // ruby test

@Injectable()
export class AuthenticationService {
    public token: string;
    private readonly apiUrl = environment.apiUrl;
    private readonly baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        console.log("ruby: auth service / login=", email , password);
        return this.http.post<any>(this.apiUrl + '/login', { email: email, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    console.log("ruby: authenticaation / login, user = ", user);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
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
        return this.http.post<any>(
            this.apiUrl + '/login',
                { email: email, password: password })
                .pipe(map(user => {
                    // login successful if there's a jwt token in the response
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                    return user;
                }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    // ruby test added : send email link
    forgotPassword(email: string) {
        let url = this.baseUrl + '/authentication/resetpassword';

        return this.http.post<any>(
            this.apiUrl + '/password-reset-email',
            { email: email, url: url })
            .pipe(map(res => {
                if (res && res.success) {
                    console.log("ruby: authenticaation / forgot pw, res = ", res);
                }
                return res;
            }));
    }

    resetPassword(password: string, md_password: string, email: string) {
        console.log("ruby: auth service : reset Password");

        return this.http.post<any>(
            this.apiUrl + '/reset-password',
            {
                password: password,
                md_password: md_password,
                email: email,
            })
            .pipe(map(res => {
                console.log("ruby: authenticaation / reset pw, res = ", res);
                if (res && res.success) {
                    console.log("ruby: authenticaation / reset pw, res = ", res);
                }
                return res;
            }));
    }

}
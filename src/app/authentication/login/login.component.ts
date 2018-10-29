import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

import { AlertService, AuthenticationService } from '../../_services';
import { first } from "rxjs/operators";
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // ruby test <
  public form: FormGroup;
  public loading = false;
  private warningMessage: string;
  returnUrl: string;
  // ruby test >

  constructor(
      private fb: FormBuilder,
      private router: Router,
      // ruby test added
      private authenticationService: AuthenticationService,
      private route: ActivatedRoute,
      private alertService: AlertService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      password: [null, Validators.compose([Validators.required])]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    // ruby test <
    if(this.form.invalid){
      return;
    }

    this.loading = true;
    console.log("ruby: login component, email = ", this.form.controls.email.value);
    this.authenticationService.login(this.form.controls.email.value, this.form.controls.password.value)
    .pipe(first())
    .subscribe(
        res => {
            console.log("ruby: test subscribe,", res);
            // check for errors
            this.warningMessage = '';
            // if not errors - navigate to home
            console.log("ruby: res.success", res.success);
            if (res.token) {
              this.router.navigate(['/starter']);
            }
            

        },
        error => {
            console.log('ray : failed to login');
            // this.warningMessage = "Invalid Credentials!";
            // this.error = error;
            this.loading = false;
            console.error(error);
        }
    );
    // ruby test >

  }
}

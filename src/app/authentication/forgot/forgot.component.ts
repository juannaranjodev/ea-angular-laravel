import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { first } from "rxjs/operators";
import { AlertService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  // ruby test <
  public form: FormGroup;
  public loading = false;
  private warningMessage: string;
  returnUrl: string;
  // ruby test >
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private alertService: AlertService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ]
    });
  }

  onSubmit() {
    // ruby test <
    if(this.form.invalid){
      return;
    }
    this.loading = true;
    
    console.log("ruby: forgot pw component, email = ", this.form.controls.email.value);
    this.authenticationService.forgotPassword(this.form.controls.email.value)
    .pipe(first())
    .subscribe(
        res => {
            console.log("ruby: forgot pw subscribe,", res);
            // check for errors
            this.warningMessage = '';
            // if not errors - navigate to home
            console.log("ruby: res.success", res.success);
            if (res.success) {
              this.router.navigate(['/authentication/login']);
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

    this.router.navigate(['/authentication/login']);
  }
}

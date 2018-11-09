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
import { ToastrManager } from 'ng6-toastr-notifications';

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
    private alertService: AlertService,
    public toastr: ToastrManager
    ) {}

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
              this.toastr.successToastr('Email has been sent!', 'Success!', {animate: "slideFromTop"});
            }else {
              this.toastr.errorToastr('Sending reset email failed!', 'Error', {animate: "slideFromTop"});
            }

        },
        error => {
            console.log('ray : failed to send reset email');
            // this.warningMessage = "Invalid Credentials!";
            // this.error = error;
            this.loading = false;
            this.toastr.errorToastr('Sending reset email failed!', 'Error', {animate: "slideFromTop"});
        }
    );

    this.router.navigate(['/authentication/login']);
  }
}

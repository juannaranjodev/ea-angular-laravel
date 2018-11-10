import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

// ruby test import
import { CustomValidators } from 'ng2-validation';
import { AlertService, AuthenticationService } from '../../_services';
import { first } from "rxjs/operators";
import { ToastrManager } from 'ng6-toastr-notifications';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup;
  loading: false;
  tokenParam: string;

  private warningMessage: string;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    // ruby test added
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    public toastr: ToastrManager
    ) {}

  ngOnInit() {
    this.form = this.fb.group({
      password: password,
      confirmPassword: confirmPassword
    });
  }

  urldecode(text) {
    return decodeURIComponent((text + '').replace(/\+/g, '%20'));
  }

  onSubmit() {
    // ruby test <
    this.route.params.subscribe(params => { this.tokenParam = params['id']; });
    let array1 = this.tokenParam.split('_FAI35_');
    let email = this.urldecode(array1[0]);//atob(array1[0]);
    let md_password = array1[1];
   
    if(this.form.invalid){
      return;
    }
    this.authenticationService.resetPassword(
      this.form.controls.password.value,
      md_password,
      email
    )
    .pipe(first())
    .subscribe(
        res => {
            console.log("ruby: test subscribe,", res);
            // check for errors
            this.warningMessage = '';
            if (res.success) {
              this.router.navigate(['/authentication/login']);
              this.toastr.successToastr('Password has been reset!', 'Success!', {animate: "slideFromTop"});
            }else {
              this.toastr.errorToastr('Password reset failed!', 'Error', {animate: "slideFromTop"});
            }
        },
        error => {
            console.log('ruby : failed to reset password');
            // this.warningMessage = "Invalid Credentials!";
            // this.error = error;
            this.loading = false;
            this.toastr.errorToastr('Password reset failed!', 'Error', {animate: "slideFromTop"});
        }
    );
    // ruby test >
  }
}

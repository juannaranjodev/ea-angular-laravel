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
import { AlertService, UserService } from '../../_services';
import { first } from "rxjs/operators";
import { ToastrManager } from 'ng6-toastr-notifications';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  loading: false;
  password: "";
  private warningMessage: string;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    // ruby test added
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    public toastr: ToastrManager
    ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      password: password,
      confirmPassword: confirmPassword
    });
  }

  onSubmit() {
    // ruby test <
    if(this.form.invalid){
      return;
    }

    console.log("ruby: register component, email = ", this.form.controls.email.value);
    let user = {
      name: 'My Name',
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    };

    this.userService.register(
      'My Name',
      this.form.controls.email.value,
      this.form.controls.password.value,
    )
    .pipe(first())
    .subscribe(
        res => {
            console.log("ruby: test subscribe,", res);
            // check for errors
            this.warningMessage = '';
            // if not errors - navigate to home
            // console.log("ruby: res.success", res.success);
            if (res.token) {
              this.router.navigate(['/authentication/login']);
              this.toastr.successToastr('Successfully Registered. Please wait until allowed.', 'Success!', {animate: "slideFromTop"});
            }else {
              this.toastr.errorToastr('Failed in register. Try again.', 'Error', {animate: "slideFromTop"});
            }
        },
        error => {
            this.toastr.errorToastr('Failed in register. Try again.', 'Error', {animate: "slideFromTop"});
            // this.warningMessage = "Invalid Credentials!";
            // this.error = error;
            this.loading = false;
            console.error(error);
        }
    );
    // ruby test >
  }
}

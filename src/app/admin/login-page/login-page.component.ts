import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  loading: boolean = false
  message: string

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/admin', 'dashboard'])
    }

    this.route.queryParams.subscribe(params => {
      if (params['sessionExp']) {
        this.message = 'Access denied. Please login'
      } else if (params['authError']) {
        this.message = 'Session expired. Please login again'
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.loading = false
      this.router.navigate(['/admin', 'dashboard'])
    }, () => {
      this.loading = false
    })
  }
}

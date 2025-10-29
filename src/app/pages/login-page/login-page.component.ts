import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {delay, from, map, skip, take, tap} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false)

  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  })

  constructor() {
    from([1,2,3,4,5,6,7,8,9, 10])
      .pipe(
        // map(val => val*2),
        // take(5),
        skip(5)
        // delay(3000)
        // tap(value => {
        //   this.form.patchValue({password: value.toString() })
        // })
      )

      .subscribe(value => {
        console.log(value)
      })
  }

  onSubmit() {

    if (this.form.valid) {
      //@ts-ignore
      this.authService.login(this.form.value).subscribe(res => {
        this.router.navigate(['/']);
        console.log(res)
        }
      )
    }
  }

  protected readonly onsubmit = onsubmit;
}

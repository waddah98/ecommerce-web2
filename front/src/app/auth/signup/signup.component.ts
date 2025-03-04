import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { emailValidator } from '../../validators/email.validators';
import { similarPassword } from '../../validators/matching-password-validators';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  signupForm!: FormGroup;

  public signinup: boolean = false;
  hasUserTyped: boolean = false;


  ngOnInit(){
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, emailValidator()]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm_password: new FormControl('', [Validators.required]),
    },
    { validators: similarPassword()  }
  );
  }

  onSubmit(){
    this.signinup = true;
    if(this.signupForm.valid){
      this.authService.signup(this.signupForm.value).subscribe({
        next: (res) => {
          this.signupForm.reset();
          this.router.navigate(['client/home']);
        },
        error: (err) =>{
          this.signinup = false;

        },
        complete: () => {
          this.signinup = false;
        }
      })
    }
  }

  onPasswordInput(){
    this.hasUserTyped = true;
  }
  validatePassword(): boolean{
    const password = this.signupForm.get("password")?.value;
    const confirmPassword = this.signupForm.get("confirm_password")?.value;
    return password === confirmPassword;
  }

  validPasswordLength(){
    const isLong = this.signupForm.get('password')?.hasError('minLength');
    isLong === true ? true : false;
    return {
      msg: "Minimum length of a password is 8",
      isLong,
    }
  }
}

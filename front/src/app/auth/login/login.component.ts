import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { emailValidator } from '../../validators/email.validators';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    // ProgressSpinner,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  constructor(private authService:AuthService, private router:Router){}

  loggingIn: boolean = false;

  loginForm !: FormGroup;
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, emailValidator()]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    },{}
  )
  }

  onSubmit(){
    // this.loggingIn = true;
    // if(this.loginForm.valid){
    //   this.authService.signin(this.loginForm.value).subscribe({
    //     next: (res) => {
    //       this.loginForm.reset();
    //       this.authService.saveDataToLocalStorage(res);
    //       if(this.authService.getRole() === 'admin'){
    //         this.router.navigate(['admin']);
    //       }else{
    //         this.router.navigate(['home-user'])
    //       }
    //     },
    //     error: (err) => {
    //       this.loggingIn = false;
    //       this.notyf.error({
    //         message:err.error.message,
    //         duration: 5000,
    //       });
    //       console.log("loginForm not valid. Why?", err.error.message);
    //     },
    //     complete: () => {
    //       // this.notyf.success('Login Successful');
    //       this.loggingIn = false;
    //     },
    //   })

    // }else{
    //   console.log("loginForm not valid");
    // }
}

signin(){
  this.loggingIn = true;
  if(this.loginForm.valid){
    this.authService.login(this.loginForm.value).subscribe({
      next: (response:any)=>{
        this.loginForm.reset();
        this.authService.saveToken(response.token)
        if(this.authService.getRole() === 'admin'){
            this.router.navigate(['admin/home']);
          } else{
            this.router.navigate(['client/home'])
          }
      },
      error: (err)=>{
        this.loggingIn = false;
      },
      complete: ()=>{
        this.loggingIn = false;
      }
    })
  }
}
}

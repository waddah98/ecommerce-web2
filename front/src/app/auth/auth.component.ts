import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    LoginComponent,
    SignupComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  public signupButtonClicked:boolean = false;
  public loginButtonClicked:boolean = true;
  
  public  isLoading=true;
  @Input() isLoggingIn: boolean = false;
  
  public clickedMyStyles = {
    'background-color':'#0944ba',
    'padding': '10px',
    'color': 'white',
    'font-weight': 'bold',
    'font-size': '18px',
    'border-radius': '10px',
    'border-color': '',
  };

  public myStyles = {
    'background-color':'white',
    'padding': '10px',
    'color': '#0944ba',
    'font-size': '18px',
    'border': '1px solid',
    'border-radius': '10px',
    'border-color': '#0944ba',
  };

  loginClicked(){
    this.loginButtonClicked = true;
    this.signupButtonClicked =false;
  };
  
  signupClicked(){
    this.loginButtonClicked = false;
    this.signupButtonClicked =true;
  };

}

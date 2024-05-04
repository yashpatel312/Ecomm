import { Component } from '@angular/core';
import { ServicesService } from '../service/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  constructor(private seller: ServicesService, private router: Router) { }

  showLogin = false;
  authError:string = '';
  input: string = '';
  email: string = '';
  password: string = '';




  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  isLogin() { this.showLogin = true }
  isSignUp() { this.showLogin = false }
  onSubmit(data: any) {
    this.seller.userSignup(data);
    this.input = '';
    this.email = '';
    this.password = '';
  }
  onSubmitLogin(data: any) {
    this.seller.userLogIn(data);
    this.seller.isLoginError.subscribe((error) => {
      if (error) {
        this.authError = "Email or password is not correct";
      }
    })
    this.input = '';
    this.password = '';
  }

}

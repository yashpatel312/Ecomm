import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { login, signup } from '../../datatype';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) {
    this.reloadSeller()
  }




  userSignup(data: signup) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        }
      });
  }

  userLogIn(data: login) {
    console.warn(data)
    this.http.get(`http://localhost:3000/seller?input=${ data.username }&password=${ data.password }`, { observe: 'response' })
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          this.isLoginError.emit(true)
          console.log("No User Found");
        }
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }
  logout() {
    this.isSellerLoggedIn.next(false)
    localStorage.removeItem('seller')
    this.router.navigate(['seller'])  
  }
}

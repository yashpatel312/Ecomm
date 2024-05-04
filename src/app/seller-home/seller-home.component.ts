import { Component } from '@angular/core';
import { ServicesService } from '../service/services.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  constructor(private seller: ServicesService) { }

  logout(): void {
    this.seller.logout();
  }
}

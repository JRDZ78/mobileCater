import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvService} from "./env.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
      private http: HttpClient,
      private env: EnvService
  ) { }

  addToCart(user_id, menu_id, cater_id) {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.post(this.env.API_URL + 'auth/storeCart',
        {
          user_id: user_id,
          menu_id: menu_id,
          cater_id: cater_id
        }, {headers: headers}
    );
  }

    deleteCart(id) {
        const headers = new HttpHeaders({
            'Accept': 'application/json'
        });
        return this.http.post(this.env.API_URL + 'auth/deleteCart',
            {
                id: id
            }, {headers: headers}
        );
    }

    checkOut(user_id, menu_id, carts, price, quantity, deliver_date: Date, deliver_location: Text, dateValue: number, getWeekDay) {
        const headers = new HttpHeaders({
            'Accept': 'application/json'
        });
        return this.http.post(this.env.API_URL + 'auth/checkOut',
            {
                user_id: user_id,
                menu_id: menu_id,
                carts: carts,
                price: price,
                quantity: quantity,
                deliver_date: deliver_date,
                deliver_location: deliver_location,
                dateValue: dateValue,
                getWeekDay: getWeekDay
            },{headers: headers}
        )
    }
}

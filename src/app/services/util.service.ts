import { Injectable } from '@angular/core';
import {EnvService} from "./env.service";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
      private env: EnvService,

  ) { }

  getImageUrl(urlString){
    return this.env.APP_URL + urlString;
  }
}

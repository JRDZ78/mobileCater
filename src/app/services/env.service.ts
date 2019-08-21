import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  //API_URL = 'http://192.168.1.9/skripsicatering/public/api/';
  API_URL = 'http://10.20.51.83/skripsicatering/public/api/';

  client_secret:string = "dkanXcct5FAMFGG8Z4NZlkMqpZP6YFxfliogQoY06c";
  client_id:number = 1;
  //APP_URL = 'http://192.168.1.9/skripsicatering/public/';
  APP_URL = 'http://10.20.51.83/skripsicatering/public/';

  constructor() {

  }
}

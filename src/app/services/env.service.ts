import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://127.0.0.1:8000/api/';
  client_secret:string = "dkanXcct5FAMFGG8Z4NZlkMqpZP6YFxflgQoY06c";
  client_id:number = 1;

  constructor() { }
}

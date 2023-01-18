import { Injectable } from '@angular/core';
import { ContactModel } from '../models/contact';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../resources/endPoints';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  GetCityState(){
    return this.http.get(`${ENDPOINTS.URL_BASE}${ENDPOINTS.ContactServices.GET_CITY_AND_STATE}`);
  }

  SendMessage(contact: ContactModel)
  {
    return this.http.post(`${ENDPOINTS.URL_BASE}${ENDPOINTS.ContactServices.POST_CONTACT}`, contact)
    .pipe(map((data:any)=> data));
  }
}

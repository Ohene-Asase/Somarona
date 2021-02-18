import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) { }

  getCoronaSummary() {
    return this.http.get<any>(`${environment.coronaApi}/summary`).toPromise();
  }

  getUserLocation() {
    return this.http.get<any>(`${environment.ipapi}/json`).toPromise();
  }

  getCountryFlags() {
    return this.http.get<any[]>(environment.restApi).toPromise();
  }

}

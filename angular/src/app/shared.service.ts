import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // handel syncoronic request and responses

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = 'http://localhost:5000/api';
  readonly PhotoUrl = 'http://localhost:5000/Photos/';

  constructor(private http: HttpClient) {}

  getEmpList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Employee');
  }
  addEmployee(val: any) {
    return this.http.post(this.APIUrl + '/Employee', val);
  }
  updateEmployee(val: any) {
    return this.http.put(this.APIUrl + '/Employee', val);
  }
  deleteEmployee(val: any) {
    return this.http.delete(this.APIUrl + `/Employee/${val}`);
  }

  UploadPhoto(val: any) {
    return this.http.post(this.APIUrl + '/Employee/SaveFile', val);
  }
}

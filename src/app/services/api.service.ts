import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  // api = 'https://retoolapi.dev/XwcKWB/data';

  postLoan(data: any) {
    return this.httpClient.post<ApiResponse>(environment.api, data)
  }

  getLoan() {
    return this.httpClient.get<ApiResponse>(environment.api)
  }

  putLoan(data: any, id: string) {
    return this.httpClient.put<ApiResponse>(environment.api+'/'+id, data)
  }

  refresh(): void {
    window.location.reload();
  }

}

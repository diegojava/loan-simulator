import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../model/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  api = 'http://localhost:3000/loanList';

  postLoan(data: any) {
    return this.httpClient.post<ApiResponse>(this.api, data)
  }

  getLoan() {
    return this.httpClient.get<ApiResponse>(this.api)
  }

  putLoan(data: any, id: string) {
    return this.httpClient.put<ApiResponse>(this.api+'/'+id, data)
  }

  refresh(): void {
    window.location.reload();
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}
  getData() {
    return this.http.get(`https://reqres.in/api/users`).pipe(
      switchMap((val: any) => {
        let page = val.page;
        let perPage = val.total;
        return this.http.get(
          `https://reqres.in/api/users?page=${page}&per_page=${perPage}`
        );
      })
    );
  }
  getDataWithPagination(page: any, perPage: any){
    return this.http.get(
      `https://reqres.in/api/users?page=${page}&per_page=${perPage}`
    );
  }
}

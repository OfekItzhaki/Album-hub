import { Injectable } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable, throwError } from 'rxjs';  
import { catchError } from 'rxjs/operators';  
  
const httpOptions={  
  headers : new HttpHeaders({  
    'Authorization':'563492ad6f91700001000001dca9fbf975be4b0b94a3b6cf55e7e9d0'
  })  
}  
  
@Injectable({  
  providedIn: 'root'  
})  
export class PexelPhotoSearchService {
   
  constructor( private http: HttpClient ) { }  

  getData(searchData: string, perPage: number): Observable<any> {

    const url: string = "https://api.pexels.com/v1/search?query="+ searchData + "&per_page="+ perPage;

    return this.http.get(url, httpOptions)
                    .pipe(catchError(this.handleError))
  }

  handleError(error: any) {
    return throwError(error.message || "Server error");
  }

}  
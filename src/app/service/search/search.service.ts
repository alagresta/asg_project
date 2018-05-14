import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiConfig } from '../api/api.config';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class SearchService {
  public url: string;

  constructor(
    public http: HttpClient
  ) {
    this.url = ApiConfig.url;
  }
  find( search: string = null, offset: number, limit: number = 40 ): Observable<any> {
    var params = new HttpParams();
    let url = '';
    if (search) {
      url = this.url + 'q=' + search.split(' ').join('+') + '&limit=' + limit + '&offset=' + offset;
      params.set('search', search);
    }
   /* if (page) {
      params.set('page', String(page));
    }
    if (limit) {
      params.set('limit', String(limit));
    }*/
    console.log(this.http.get(url))
    return this.http.get(url).pipe(
      tap(data => {console.log('search fetched...');
        //console.log(data);
      }),
      catchError(this.handleError('find', []))
    );
      ;
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error('Operation : '+ operation + ' - ' + error); // log to console instead
      return of(result as T);
    };
  }


}

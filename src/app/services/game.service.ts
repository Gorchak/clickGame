import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  userName: string;
  fieldSize: number;
  delay: number;
  field = [];
  isFinished = false;

  progress = new Subject<any>();
  result = new Subject<any>();
  winner;

  sendResult(value): void {
    this.result.next({ winner: value });
  }
  getResult(): Observable<any> {
    return this.result.asObservable();
  }

  sendProgress(value): void {
    this.progress.next({ isFinished: value });
  }
  getProgress(): Observable<any> {
    return this.progress.asObservable();
  }

  getLeaders(): Observable<any> {
    return this.http.get('http://starnavi-frontend-test-task.herokuapp.com/winners')
      .pipe(map((res: Response) => {
        return res;
      }));
  }


  postResult(result): Observable<any> {
    return this.http.post('http://starnavi-frontend-test-task.herokuapp.com/winners', result)
      .pipe(map((res: Response) => {
        return res;
      }));
  }

}

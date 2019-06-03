import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs/internal/Observable';
import { Subject, Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient
  ) { }

  subject = new Subject<any>();
  currentSettings;

  sendSetings(value): void {
    this.subject.next({ currentSettings: value });
  }
  getSettings(): Observable<any> {
    return this.subject.asObservable();
  }

  getSettingsData(): Observable<any> {
    return this.http.get('http://starnavi-frontend-test-task.herokuapp.com/game-settings')
      .pipe(map((res: Response) => {
        return res;
      }));
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Exam } from '../exam';

@Injectable({
  providedIn: 'root',
})
export class PlexamsService {
  private plexamsUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getExamList(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.plexamsUrl + 'exams');
  }

  getExamDays(): Observable<string[]> {
    return this.http.get<string[]>(this.plexamsUrl + 'examDays');
  }

  getExamTimes(): Observable<string[]> {
    return this.http.get<string[]>(this.plexamsUrl + 'slotsPerDay');
  }
}

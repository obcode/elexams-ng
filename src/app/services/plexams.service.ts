import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getSlots(): Observable<Map<number, Map<number, Array<Exam>>>> {
    return this.http.get<Array<any>>(this.plexamsUrl + 'slots').pipe(
      map(slots =>
        slots.reduce((acc, [index, examsObj]) => {
          const dayIndex = index[0];
          const slotIndex = index[1];
          const exams = Object.values(examsObj.examsInSlot);
          console.log(index);
          console.log(acc);
          if (!acc.has(dayIndex)) {
            let slotMap = new Map();
            slotMap.set(slotIndex, exams);
            acc.set(dayIndex, slotMap);
          } else {
            let dayMap = acc.get(dayIndex);
            dayMap.set(slotIndex, exams);
          }
          return acc;
        }, new Map<number, Map<number, Array<Exam>>>())
      )
    );
  }
}

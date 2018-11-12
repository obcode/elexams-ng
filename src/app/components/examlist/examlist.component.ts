import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { PlexamsService } from '../../services/plexams.service';
import { Exam } from '../../exam';

export interface ExamData {
  anCode: number;
  name: string;
  lecturer: string;
  day: string;
  time: string;
  slot: number[];
}

@Component({
  selector: 'app-examlist',
  templateUrl: './examlist.component.html',
  styleUrls: ['./examlist.component.scss'],
})
export class ExamlistComponent implements OnInit {
  displayedColumns: string[] = ['anCode', 'name', 'lecturer', 'day', 'time', 'slot'];
  dataSource: MatTableDataSource<ExamData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  exams: ExamData[];
  examDays: string[];
  examTimes: string[];

  constructor(private plexamsService: PlexamsService) {}

  ngOnInit() {
    this.getExamDays();
    this.getExamTimes();
    this.getExams();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getExams() {
    this.plexamsService.getExamList().subscribe(exams => {
      this.exams = exams.map(e => examToExamData(e));
      this.dataSource = new MatTableDataSource(this.exams);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (this.examDays !== null) {
        this.exams = this.exams.map(e => setDayOnExam(e, this.examDays));
      }
      if (this.examTimes !== null) {
        this.exams = this.exams.map(e => setTimeOnExam(e, this.examTimes));
      }
    });
  }

  getExamDays() {
    this.plexamsService.getExamDays().subscribe(examDays => {
      this.examDays = examDays;
      if (this.exams !== undefined) {
        this.exams = this.exams.map(e => setDayOnExam(e, this.examDays));
      }
    });
  }

  getExamTimes() {
    this.plexamsService.getExamTimes().subscribe(examTimes => {
      this.examTimes = examTimes;
      if (this.exams !== undefined) {
        this.exams = this.exams.map(e => setTimeOnExam(e, this.examTimes));
      }
    });
  }
}

function examToExamData(e: Exam): ExamData {
  return {
    anCode: e.anCode,
    name: e.name,
    lecturer: e.lecturer.personShortName,
    slot: e.slot,
    day: null,
    time: null,
  };
}

function setDayOnExam(e: ExamData, days: string[]): ExamData {
  if (e.slot !== null) {
    e.day = days[e.slot[0]];
  }
  return e;
}

function setTimeOnExam(e: ExamData, days: string[]): ExamData {
  if (e.slot !== null) {
    e.time = days[e.slot[1]];
  }
  return e;
}

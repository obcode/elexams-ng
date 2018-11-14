import { Component, OnInit } from '@angular/core';

import { PlexamsService } from '../../services/plexams.service';
import { Exam } from '../../exam';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
  exams: Exam[];
  examDays: string[];
  examTimes: string[];

  constructor(private plexamsService: PlexamsService) {}

  ngOnInit() {
    this.getExamDays();
    this.getExams();
  }

  getExams() {
    this.plexamsService.getExamList().subscribe(exams => {
      this.exams = exams;
    });
  }

  getExamDays() {
    this.plexamsService.getExamDays().subscribe(examDays => {
      this.examDays = examDays;
    });
  }
}

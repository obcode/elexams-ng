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
  slots: Map<number, Map<number, Array<Exam>>>;
  slotsFilled: boolean = false;

  constructor(private plexamsService: PlexamsService) {}

  ngOnInit() {
    this.getExamDays();
    this.getExams();
    this.getExamTimes();
    this.getSlots();
    console.log(this.slots);
  }

  getExamsInSlot(dayIndex: number, slotIndex: number): Array<Exam> {
    const exams = this.slots.get(dayIndex).get(slotIndex);
    console.log(exams);
    return exams;
  }

  getExams() {
    this.plexamsService.getExamList().subscribe(exams => {
      this.exams = exams.map(e => enrichExam(e));
    });
  }

  getExamDays() {
    this.plexamsService.getExamDays().subscribe(examDays => {
      this.examDays = examDays;
    });
  }

  getExamTimes() {
    this.plexamsService.getExamTimes().subscribe(examTimes => {
      this.examTimes = examTimes;
    });
  }

  getSlots() {
    this.plexamsService.getSlots().subscribe(slots => {
      this.slots = slots;
      console.log(slots);
      this.slotsFilled = true;
    });
  }
}

function enrichExam(exam: Exam): Exam {
  exam.groups = exam.groups.map(g => addGroupString(g));
  return exam;
}

function addGroupString(g: any): any {
  g.groupString =
    g.groupDegree +
    (g.groupSemester !== null ? g.groupSemester : '') +
    (g.groupSubgroup !== null ? g.groupSubgroup : '');
  return g;
}

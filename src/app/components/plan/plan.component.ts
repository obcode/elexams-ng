import { Component, OnInit } from '@angular/core';

import { PlexamsService } from '../../services/plexams.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
  examDays: string[];

  constructor(private plexamsService: PlexamsService) {}

  ngOnInit() {
    this.getExamDays();
  }

  getExamDays() {
    this.plexamsService.getExamDays().subscribe(exams => {
      this.examDays = this.examDays;
    });
  }
}

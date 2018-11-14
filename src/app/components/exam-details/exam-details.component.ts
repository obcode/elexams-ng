import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import { Exam } from '../../exam';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.scss'],
})
export class ExamDetailsComponent implements OnInit {
  @Input() exam: Exam;

  constructor(private bottomSheet: MatBottomSheet) {}

  ngOnInit() {}

  openBottomSheet(exam: Exam): void {
    this.bottomSheet.open(ExamDetailsBottomSheet, { data: exam });
  }
}

@Component({
  selector: 'exam-details-bottomsheet',
  templateUrl: 'exam-details.bottomsheet.html',
})
export class ExamDetailsBottomSheet {
  exam: Exam;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<ExamDetailsBottomSheet>
  ) {
    this.exam = data;
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

export class Exam {
  anCode: number;
  name: string;
  lecturer: { personShortName: string; personFullName: string };
  slot: number[];
  reExam: boolean;
}

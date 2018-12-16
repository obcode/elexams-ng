export class Exam {
  anCode: number;
  name: string;
  lecturer: { personShortName: string; personFullName: string };
  slot: number[];
  reExam: boolean;
  groups: Array<{ groupDegree: string }>;
  registeredGroups: Array<{ registeredGroupStudents: number; registeredGroupDegree: string }>;
  registeredStudentsCount: number;
  isGOExam: boolean;
}

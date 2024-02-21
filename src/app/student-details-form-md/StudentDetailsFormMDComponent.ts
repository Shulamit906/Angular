import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SchoolYear, Student } from '../models/student.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_SUB, Sub } from '../models/sub.model';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-student-details-form-md',
  templateUrl: './student-details-form-md.component.html',
  styleUrls: ['./student-details-form-md.component.scss']
})
export class StudentDetailsFromMDComponent {

  subList: Sub[] = APP_SUB;

  schoolYearType = SchoolYear;

  private _student: Student;
  // newStudent:boolean=false;

  public get student(): Student {
    return this._student;
  }

  @Input()
  public set student(value: Student) {
    this._student = value;
    if (this._student != undefined) {
      this.studentForm = new FormGroup({
        "id": new FormControl(this.student.id),
        "firstName": new FormControl(this.student.firstName, [Validators.required, Validators.minLength(3)]),
        "lastName": new FormControl(this.student.lastName, [Validators.required, Validators.minLength(3)]),
        "address": new FormControl(this.student.address),
        "phone": new FormControl(this.student.phone, [Validators.required, Validators.maxLength(10)]),
        "isActive": new FormControl(this.student.isActive, Validators.required),
        "leaveDate": new FormControl(this.student.leaveDate),
        "markAvg": new FormControl(this.student.markAvg),
        "subId": new FormControl(this.student.subId),
        "schoolYear": new FormControl(this.student.schoolYear)
      });
    }
  }

  @Output()
  onSaveStudent: EventEmitter<Student> = new EventEmitter();

  studentForm: FormGroup = new FormGroup({});

  missingFormDate: Date;
  missingDays?: number;

  totalMissingDays: number = 0;

  saveNewStudent() {
    let stu = this.studentForm.value
    stu['absenceDays'] = this._studentService.STUDENTS.find((x => x.id == stu.id))?.absenceDays || []
    if (this.missingDays && this.missingDays > 0 && this.missingFormDate) {
      stu['absenceDays']?.push({
        date: this.missingFormDate,
        totalDays: this.missingDays
      });
    }
    this.onSaveStudent.emit(stu);
  }

  total(): number {
    if (this.student?.id)
      return this._studentService.getSum(this.student.id);
    return 0;
  }
  constructor(private _studentService: StudentService) { }

  ngOnInit(): void {
  }
}

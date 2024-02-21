import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from '../student.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html'
})
export class StudentListComponent implements OnInit {

  //students: Student[] = [{ id: 1, firstName: "yosef", lastName: "cohen", address: "nehemya 5", phone: "0583287909", isActive: 'true', markAvg: 92, quizes: [{ id: 1, date: new Date(2023 / 10 / 10), description: "English", mark: 83 }, { id: 2, date: new Date(2023 / 9 / 9), description: "History", mark: 95 }] },
  //{ id: 2, firstName: "yaakov", lastName: "levi", address: "lando 8", phone: "0556788560", isActive: 'false', leaveDate: new Date(2023 / 10 / 10), markAvg: 82 }]
  students: Student[];//= this._studentService.getStudents();
  selectedStudent: Student | undefined;
  searchInput: Subject<string> = new Subject<string>();
  studentName: string = '';

  @Output()
  focusStudent: EventEmitter<Student> = new EventEmitter();

  onFocusStudent(s: Student) {
    this.selectedStudent = s;
    this.focusStudent.emit(this.selectedStudent);
  }
  deleteStudent(studentToDelete: number) {
    // let indexToDelete = this.students.indexOf(student);
    // this.students.splice(indexToDelete, 1);
    // console.log(this._studentService.STUDENTS);
    this._studentService.deleteStudent(studentToDelete).subscribe(() => {
      this.students = this.students.filter(s => s.id != studentToDelete);
    }, err => console.log("err", err))
  }

  showDetails(studentToShow: Student) {
    this.selectedStudent = studentToShow;
  }
  showNewStudentDetails() {
    this.selectedStudent = new Student();
  }
  SaveStudentToList(studentToSave: Student) {
    if (studentToSave.id == 0) {
      studentToSave.id = this.students.length + 1;
      this._studentService.saveNewStudent(studentToSave).subscribe(() => {
        alert("add success!");
        this.students.push(studentToSave);
      }, err => console.log("err", err));
      // this.students.push(new Student(studentToSave.id, studentToSave.firstName, studentToSave.lastName, studentToSave.address, studentToSave.phone, studentToSave.isActive, studentToSave.leaveDate));
      // alert("added succesfully  " + JSON.stringify(studentToSave));
    }
    else {
      // let studentToUpdate = this.students.filter(x => x.id == studentToSave.id)[0];
      // let index = this.students.indexOf(studentToUpdate);
      // this.students[index] = studentToSave;
      this._studentService.updateStudent(studentToSave).subscribe((data) => {
        console.log("update", data);
        this.students[this.students?.findIndex(s => studentToSave.id == s.id)] = studentToSave;
      }, err => console.log("err", err));
      
    }
    this.selectedStudent = null;
  }

  total(student: Student): number {
    if (student.id)
      return this._studentService.getSum(student.id);
    return 0;
  }
  showActivStudent(active: boolean) {
    this._studentService.getStudentFromServerByActive(active).subscribe(data => {
      this.students = data;
    });
  }

  filterStudents(): void {
    this.searchInput.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(() => this._studentService.getStudentsFromServerByName(this.studentName)),
    ).subscribe(d => this.students = d);
  }

  getStudentByName() {
    this.searchInput.next(this.studentName);
  }
  
  constructor(private _studentService: StudentService) {
    // this._studentService.getStudentsSlowly().then(studentList => {
    //   this.students = studentList;
    // })

  }


  ngOnInit(): void {
    this._studentService.getStudentFromServer().subscribe(data => {
      this.students = data;
    })
    this.filterStudents();
  }

}

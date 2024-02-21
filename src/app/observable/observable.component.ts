import { Component, OnInit } from '@angular/core';
import { Observable, filter, from, interval, map } from 'rxjs';
import { Student } from '../models/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',

})
export class ObservableComponent implements OnInit {

  students: Student[] = [];
  studentsNames2: Observable<string>


  studentsNames: Observable<Student> = new Observable(observer => {
    for (const student of this.students) {
      observer.next(student);
    }
  });

  timer: Observable<string> = new Observable(obs => {
    setInterval(() => {
      obs.next(new Date().toLocaleTimeString());
    }, 1000)
  });


  timerValue: string = "";
  timerByOperator: Observable<string> = interval(1000).pipe(map(x => { return new Date().toLocaleTimeString() }));
  timerValue2: string = "";

  mails: Observable<Student> = new Observable((observer) => {
    for (const student of this.students) {
      observer.next(student);
    }
  });

  studentMail1: string = "";
  mail() {
    this.mails.subscribe((student) => {
      //שולח מייל...
      if (student.isActive)
        this.studentMail1 += "mail sended successfully to " + student.firstName + student.lastName + "@gmail.com" + "<br>";
    })
  }


  studentMail2: string = "";
  mail2() {
    console.log("22222222222222222222")
    const email2 = from(this.students).pipe(filter(student => student.isActive),
      map(student => { return "mail sended successfully to " + student.firstName + student.lastName + "@gmail.com" + "<br>" }))
    email2.subscribe((email) => {
      this.studentMail2 += email;
    })
  }

  constructor(private _studentService: StudentService) {
    this._studentService.getStudentFromServer().subscribe(data => {
      this.students = data;
    })
    this.studentsNames.subscribe((val) => {
      console.log("student:", val.firstName + " " + val.lastName);
    })
    this.studentsNames2 = from(this.students).pipe(map(student => { return student.firstName + " " + student.lastName; }))

    this.studentsNames2.subscribe((val) => {
      console.log("student_2:", val);
    })

    this.timer.subscribe((val) => {
      this.timerValue = val;
    })
    this.timerByOperator.subscribe((val) => {
      this.timerValue2 = val;
    })
  }


  ngOnInit(): void {

  }

}

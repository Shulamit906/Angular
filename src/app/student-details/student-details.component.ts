import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit{
  
  @Input()
  student: Student;
  @Output()
  onSaveNewStudent: EventEmitter<Student> = new EventEmitter();
  saveNewStudent() {
    this.onSaveNewStudent.emit(this.student);
  }
  constructor() { }

  ngOnInit(): void {

  }
}

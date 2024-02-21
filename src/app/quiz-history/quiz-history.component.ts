import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-quiz-history',
  templateUrl: './quiz-history.component.html',
  styleUrls: ['./quiz-history.component.scss']
})
export class QuizHistoryComponent implements OnInit{

  @Input() quizes: Quiz[];
  @Input() id: number ;
  
  avg():number{
    if(this.id!= undefined)
      return this._studentService.getAverage(this.id);
    return 0;
  }
  constructor(private _studentService: StudentService){}

  ngOnInit(): void {
  }
}
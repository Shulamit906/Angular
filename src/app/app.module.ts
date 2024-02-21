import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentDetailsFromMDComponent } from './student-details-form-md/StudentDetailsFormMDComponent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizHistoryComponent } from './quiz-history/quiz-history.component'
import { StudentService } from './student.service';
import { ObservableComponent } from './observable/observable.component';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
    declarations: [AppComponent, StudentListComponent, StudentDetailsComponent, StudentDetailsFromMDComponent, QuizHistoryComponent, ObservableComponent],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
    providers: [StudentService],
    bootstrap: [AppComponent]
})

export class AppModule {

}
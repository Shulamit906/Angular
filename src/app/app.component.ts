import { Component } from "@angular/core";
import { sampleTime } from "rxjs";
import { Student } from "./models/student.model";

@Component({
    selector:"app-root",
    templateUrl:'./app.component.html'
})
export class AppComponent{
    title: string = "hello My-App!"
    student: Student | undefined;
    showQuizes(st: Student) {
        this.student = st;
    }
    func(){
        const currentTime=new Date();
        if (currentTime.getHours()>7&&currentTime.getHours()<13)
            return "good morning"
        else if (currentTime.getHours()>13&&currentTime.getHours()<20)
            return "good noon"
        return "good evening"

   
        
        
    }
}
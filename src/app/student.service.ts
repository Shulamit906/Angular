import { Injectable } from "@angular/core";
import { Student } from "./models/student.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

// export const STUDENTS: Student[] = [new Student( 1, "yosef", "cohen", "nehemya 5", "0583287909", 'true',new Date(), 92, [{ id: 1, date: new Date(2023 / 10 / 10), description: "English", mark: 83 }, { id: 2, date: new Date(2023 / 9 / 9), description: "History", mark: 95 }]),
// new Student(2, "yaakov", "levi", "lando 8", "0556788560", 'false', new Date(2023 / 10 / 10), 82)];

@Injectable()
export class StudentService {


    public STUDENTS: Student[] = [] //[new Student( 1, "Yosef", "Cohen", "nehemya 5", "0583287909", 'true',new Date(), 92, [{ id: 1, date: new Date(2023 / 10 / 10), description: "English", mark: 83 }, { id: 2, date: new Date(2023 / 9 / 9), description: "History", mark: 95 }]),
    // new Student(2, "Yaakov", "Levi", "lando 8", "0556788560", 'false', new Date(2023 / 10 / 10), 82)];

    getStudents(): Student[] {
        return this.STUDENTS;
    };

    getStudentsSlowly(): Promise<Student[]> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(this.STUDENTS);
            }, 3000);
        })
    }
    getStudentFromServer(): Observable<Student[]> {
        return this._http.get<Student[]>("/api/Students")
    }
    getStudentFromServerByActive(active: boolean): Observable<Student[]> {
        return this._http.get<Student[]>("/api/Students/active=" + active)
    }

    getStudentsFromServerByName(name: string): Observable<Student[]> {
        if (name == '')
            return this._http.get<Student[]>("/api/Students");
        return this._http.get<Student[]>("api/Students/name=" + name)
    }
    saveNewStudent(student: Student): Observable<boolean> {
        return this._http.post<boolean>("api/Students", student)
    }
    updateStudent(student: Student): Observable<boolean> {
        return this._http.put<boolean>(`api/Students/${student.id}`, student);
    }
    deleteStudent(id: number): Observable<boolean> {
        return this._http.delete<boolean>("api/Students/" + id);
    }
    getAverage(id: number) {
        return this.STUDENTS.find(x => x.id == id)?.markAvg;
    }
    getSum(id: number) {
        let student = this.STUDENTS.find(x => x.id == id);
        let sum = 0;
        if (student) {
            for (const absent of student.absenceDays)
                sum += absent.totalDays;
        }
        return sum;
    }

    constructor(private _http: HttpClient) {
    }
}
import { AbsenceDays } from "./absence.model";
import { Quiz } from "./quiz.model";

export class Student {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    isActive: boolean;
    leaveDate?: Date;
    markAvg: number;
    subId?: number;
    schoolYear?: SchoolYear;
    quizes?: Quiz[];
    public absenceDays: AbsenceDays[] = [];

    constructor(id?: number, fname?: string, lname?: string, address?: string, phone?: string, isActive?: boolean, leaveDate?: Date, avg?: number, quizes?: Quiz[]) {
        this.id = id || 0;
        this.firstName = fname || "new";
        this.lastName = lname || "student";
        this.address = address || "Israel";
        this.phone = phone || "03-5555555";
        this.isActive = isActive || false;
        this.leaveDate = new Date();
        this.markAvg = avg || 100;
        this.quizes = quizes || [new Quiz(1, new Date(2023 / 9 / 9), "test", 95)]
    }
}
export enum SchoolYear {
    First = 1,
    Second = 2,
    Third = 3
}
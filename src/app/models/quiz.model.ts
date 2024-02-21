export class Quiz {
    id: number = 0;
    date: Date =new Date();
    description: string = "";
    mark: number = 0;

    constructor(id?:number,date?:Date,description?:string,mark?:number ){
        this.id = id;
        this.date=date;
        this.description=description;
        this.mark=mark;
    }
}
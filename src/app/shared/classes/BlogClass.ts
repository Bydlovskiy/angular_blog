
export class POST {
    id : number;
    postedBy : string;
    topic : string;
    date : Date;
    message : string
    constructor(  id : number,
        postedBy : string,
        topic : string,
        date : Date,
        message : string) {
        this.id = id;
        this.postedBy = postedBy;
        this.topic = topic;
        this.date = date 
        this.message = message;
    }
}
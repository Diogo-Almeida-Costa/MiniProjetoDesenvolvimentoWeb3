export class Tarefa 
{
    constructor({id, title, date, comment, priority, notify, created})
    {
        this.id = id;
        this.title = title;
        this.date = date;
        this.comment = comment;
        this.priority = priority;
        this.notify = notify;
        this.created = created;
    }
}
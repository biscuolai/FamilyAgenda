export class Task {

    // public properties
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    assignedTo: string;
    status: number;
    createdDate: Date;
    lastModifiedDate: Date;
    priority: number;

    constructor(
        id: number,
        title: string,
        description: string,
        dueDate: Date,
        assignedTo: string,
        status: number,
        createdDate: Date,
        lastModifiedDate: Date,
        priority: number
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.assignedTo = assignedTo;
        this.status = status;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
        this.priority = priority;
    }
}

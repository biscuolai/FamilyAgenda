export class Task {

    // public properties
    Id: number;
    Title: string;
    Description: string;
    DueDate: Date;
    AssignedTo: string;
    Status: number;
    CreatedDate: Date;
    LastModifiedDate: Date;
    Priority: number;

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
        this.Id = id;
        this.Title = title;
        this.Description = description;
        this.DueDate = dueDate;
        this.AssignedTo = assignedTo;
        this.Status = status;
        this.CreatedDate = createdDate;
        this.LastModifiedDate = lastModifiedDate;
        this.Priority = priority;
    }
}

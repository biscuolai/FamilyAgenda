export class Task {

    // public properties
    Id : string;
    Title : string;
    Description : string;
    DueDate : Date;
    AssignedTo : string;
    Status : string;
    CreatedDate : Date;
    LastModifiedDate : Date;
    Priority : string;

    constructor(
        id: string, 
        title: string, 
        description : string,
        dueDate : Date,
        assignedTo : string,
        status : string,
        createdDate : Date,
        lastModifiedDate : Date,
        priority : string
    ){
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

export interface Status {
    value: string;
    viewValue: string;
}
  
export interface Priority {
    value: string;
    viewValue: string;
}
import { Status } from '../../shared/models/status';
import { Priority } from '../../shared/models/priority';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getStatus() {
    const statusUrl = 'assets/data/status.json';
    return this.http.get<Status[]>(statusUrl);
  }

  getPriority() {
    const priorityUrl = 'assets/data/priority.json';
    return this.http.get<Priority[]>(priorityUrl);
  }

  async getStatusAsync() {
    const statusUrl = 'assets/data/status.json';
    return await this.http.get<Status[]>(statusUrl).toPromise();
  }

  async getPriorityAsync() {
    const priorityUrl = 'assets/data/priority.json';
    return await this.http.get<Priority[]>(priorityUrl).toPromise();
  }
}

import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Status } from '../../shared/models/status';
import { Priority } from '../../shared/models/priority';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private readonly statusUrl = `${environment.API_URL}status`;
  private readonly priorityUrl = `${environment.API_URL}priority`;

  constructor(private http: HttpClient) { }

  getStatus() {
    return this.http.get<Status[]>(this.statusUrl)
      .pipe(
        tap(console.log)
      );
  }

  getPriority() {
    return this.http.get<Priority[]>(this.priorityUrl)
    .pipe(
      tap(console.log)
    );
  }

  async getStatusAsync() {
    return await this.http.get<Status[]>(this.statusUrl).toPromise();
  }

  async getPriorityAsync() {
    return await this.http.get<Priority[]>(this.priorityUrl).toPromise();
  }
}

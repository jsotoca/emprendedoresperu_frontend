import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  search:BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }
}

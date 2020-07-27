import { Injectable } from '@angular/core';
import { GenericService } from './generic.services';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PositionsService extends GenericService {

    /**
     * Creates a new instance of TrucksService.
     *
     * @param http The injected HttpClient request library
     */
    constructor(private http: HttpClient) {
        super();
    }
}

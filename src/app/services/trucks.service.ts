import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.services';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Truck } from '../models/truck.model';

@Injectable()
export class TrucksService extends GenericService {

    /**
     * Creates a new instance of TrucksService.
     *
     * @param http The injected HttpClient request library
     */
    constructor(private http: HttpClient) {
        super();
    }

    /**
     * Gets the list of trucks.
     *
     * The REST API endpoint is:
     *    GET /api/trucks
     *
     * @returns An Observable with the truck details list
     */
    public getTrucks(): Observable<Array<Truck>> {

        // Sets the URL for the REST API endpoint
        const url = 'api/trucks';
        // Sets the request headers
        const myHeaders = this.getHeaders();

        return this.http
            .get<Array<Truck>>(url, myHeaders)
            .pipe(catchError(this.handleError));
    }

}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class GenericService {

    constructor() { }

    /**
     * Sets the request headers.
     *
     * @returns A HttpHeaders instance with the requestion headers
     */
    protected getHeaders(): { headers: HttpHeaders } {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    /**
     * Sets the request params.
     *
     */
    protected setParams(filters: {}, myHeaders: { headers: HttpHeaders }): void {
        let myParams = new HttpParams();
        Object.keys(filters).forEach(key => {
            if (filters[key] !== undefined) {
                myParams = myParams.append(key, filters[key]);
            }
        });
        myHeaders['params'] = myParams;
    }

    /**
     * Sets the request body.
     *
     * @param body The dictionary/map with the request body
     * @returns A JSON string with the request body
     */
    protected getBody(body: {}): string {
        return JSON.stringify(body);
    }

    /**
     * Handles the errors sent by the REST API.
     *
     * @param error The response sent by the REST API
     * @returns The corresponding PredicxError
     */
    protected handleError(error: HttpErrorResponse): Observable<any> {
        console.error(`An error with status ${error.status} occurred: ${JSON.stringify(error.error)}`);
        return throwError(error);
    }
}

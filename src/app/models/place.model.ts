/**
 * Model for a google place object details.
 */
export class Place {

    /** The place latitude. */
    lat: number;
    /** The place longitude. */
    lng: number;
    /** The place type. */
    type: string;

    constructor(lat: number, lng: number, type: string) {
        this.lat = lat;
        this.lng = lng;
        this.type = type;
    }

}

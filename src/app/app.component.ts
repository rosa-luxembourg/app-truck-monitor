import { Component, OnInit } from '@angular/core';
import { TrucksService } from './services/trucks.service';
import { PlaceType } from './enum/place-type.enum';
import { Place } from './models/place.model';
import { Truck } from './models/truck.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public trucks = new Array<Truck>();
    lat = 38.738152;
    lng = -9.204899;
    poiTypes = PlaceType;
    selectedPlaceType: string;
    radiusSelect = [10000, 5000, 2500, 1000];
    selectedRadius = 5000;

    map: google.maps.Map;

    zoom = 10;

    nearbyPlaces = new Array<Place>();

    iconMap = new Map<PlaceType, any>([[PlaceType.Gas_Stations, {
        url: '../../assets/icn-gas-station.png',
        scaledSize: {
            width: 40,
            height: 40
        }
    }],
    [PlaceType.Hotels, {
        url: '../../assets/icn-hotel.png',
        scaledSize: {
            width: 40,
            height: 40
        }
    }], [PlaceType.Restaurants, {
        url: '../../assets/icn-restaurant.png',
        scaledSize: {
            width: 40,
            height: 40
        }
    }]]);

    /**
     * Creates a new instance of AppComponent.
     *
     * @param trucksService The injected TrucksService
     */
    constructor(private trucksService: TrucksService) { }

    ngOnInit() {
        this.trucksService.getTrucks().subscribe(result => {
            this.trucks = result;
        });
    }

    public mapReady(map: google.maps.Map) { this.map = map; }

    public searchNearbyType(selectedType = this.selectedPlaceType): void {
        // TODO: define a caching mechanism to prevent repeated calls to the Places API?
        if (selectedType !== undefined) {
            this.nearbyPlaces = new Array<Place>();
            selectedType === 'all' ? Object.keys(PlaceType).forEach(type => this.getNearbySearch(PlaceType[type])) :
                this.getNearbySearch(selectedType);
        }
    }

    private getNearbySearch(placeType: string) {
        const request = {
            location: { lat: this.lat, lng: this.lng },
            radius: this.selectedRadius,
            type: placeType
        };

        const service = new google.maps.places.PlacesService(this.map);
        service.nearbySearch(request, (results, status, pagination) => {
            if (status === 'OK') {
                results.forEach(placeResult =>
                    this.nearbyPlaces.push(new Place(placeResult.geometry.location.lat(), placeResult.geometry.location.lng(), placeType)))

                this.zoom = this.radiusToZoom(request.radius);
                console.log('zoom: ' + this.zoom);
                if (pagination.hasNextPage) {
                    pagination.nextPage();
                }
            }
        });
    }

    private radiusToZoom(radius: number) {
        const scale = radius / 500;
        return (16 - Math.log(scale) / Math.log(2));
    }

}

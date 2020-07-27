import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { TrucksService } from './services/trucks.service';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AgmCoreModule.forRoot({
            apiKey: environment.apiKey,
            libraries: ['places']
        }),
        BrowserAnimationsModule,
        MatSelectModule,
        MatGridListModule
    ],
    providers: [
        TrucksService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

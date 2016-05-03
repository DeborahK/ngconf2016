import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { MovieListComponent } from './movies/movie-list.component';
import { MovieDetailComponent } from './movies/movie-detail.component';
import { MovieEditComponent } from './movies/movie-edit.component';
import { MovieEditTemplateComponent } from './movies/movie-edit-template.component';
import { MovieEditModelComponent } from './movies/movie-edit-model.component';
import { MovieService } from './movies/movie.service';

@Component({
    selector: 'mh-app',
    template: `
    <div class="container">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <a class="navbar-brand">{{pageTitle}}</a>
                <ul class="nav navbar-nav">
                    <li><a [routerLink]="['/welcome']">Home</a></li>
                    <li><a [routerLink]="['/movies']">Movie List</a></li>
                    <li><a [routerLink]="['/movieEdit', 0]">Add Movie</a></li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
     </div>
     `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        MovieService
    ]
})
@Routes([
    { path: '/', component: WelcomeComponent },
    { path: '/movies', component: MovieListComponent },
    { path: '/movie/:id', component: MovieDetailComponent },
    { path: '/movieEdit/:id', component: MovieEditComponent },
    { path: '/movieEditTemplate/:id', component: MovieEditTemplateComponent },
    { path: '/movieEditModel/:id', component: MovieEditModelComponent }
])
export class AppComponent {
    pageTitle: string = 'InStep Movie Hunter';
}

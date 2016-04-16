import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

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
                    <li><a [routerLink]="['Welcome']">Home</a></li>
                    <li><a [routerLink]="['Movies']">Movie List</a></li>
                    <li><a [routerLink]="['MovieEdit', {id: 0}]">Add Movie</a></li>
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
@RouteConfig([
    { path: '/welcome', name: 'Welcome', component: WelcomeComponent, useAsDefault: true },
    { path: '/movies', name: 'Movies', component: MovieListComponent },
    { path: '/movie/:id', name: 'MovieDetail', component: MovieDetailComponent },
    { path: '/movieEdit/:id', name: 'MovieEdit', component: MovieEditComponent },
    { path: '/movieEditTemplate/:id', name: 'MovieEditTemplate', component: MovieEditTemplateComponent },
    { path: '/movieEditModel/:id', name: 'MovieEditModel', component: MovieEditModelComponent }
])
export class AppComponent {
    pageTitle: string = 'InStep Movie Hunter';
}

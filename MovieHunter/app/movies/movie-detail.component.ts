import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES, Router, RouteParams } from 'angular2/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';
import { StarComponent } from '../shared/star.component';

@Component({
    templateUrl: 'app/movies/movie-detail.component.html',
    styleUrls: ['app/movies/movie-detail.component.css'],
    directives: [StarComponent, ROUTER_DIRECTIVES]
})
export class MovieDetailComponent implements OnInit {
    pageTitle: string = 'Movie Detail';
    movie: IMovie;
    errorMessage: string;

    constructor(private _movieService: MovieService,
                private _router: Router,
                private _routeParams: RouteParams) {
    }

    ngOnInit() {
        let id = +this._routeParams.get('id');
        this.getMovie(id);
    }

    getMovie(id: number) {
        this._movieService.getMovie(id)
            .subscribe(
                movie => this.movie = movie,
                error => this.errorMessage = <any>error);
    }

    onBack() {
        this._router.navigate(['Movies']);
    }

    convertToDate(dateString: string): Date {
        return new Date(dateString);
    }
}

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate, RouteSegment } from '@angular/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';
import { StarComponent } from '../shared/star.component';

@Component({
    templateUrl: 'app/movies/movie-detail.component.html',
    styleUrls: ['app/movies/movie-detail.component.css'],
    directives: [StarComponent, ROUTER_DIRECTIVES]
})
export class MovieDetailComponent implements OnActivate {
    pageTitle: string = 'Movie Detail';
    movie: IMovie;
    errorMessage: string;

    constructor(private _movieService: MovieService,
                private _router: Router) {
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = +curr.getParam('id');
        this.getMovie(id);
    }

    getMovie(id: number) {
        this._movieService.getMovie(id)
            .subscribe(
                movie => this.movie = movie,
                error => this.errorMessage = <any>error);
    }

    onBack() {
        this._router.navigate(['/movies']);
    }

    convertToDate(dateString: string): Date {
        return new Date(dateString);
    }
}

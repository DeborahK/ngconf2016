import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES, Router, RouteParams } from 'angular2/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
    templateUrl: 'app/movies/movie-edit-template.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class MovieEditTemplateComponent implements OnInit {
    pageTitle: string = 'Edit Movie';
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
            movie => this.onGetMovie(movie),
            error => this.errorMessage = <any>error);
    }
    
    onGetMovie(movie: IMovie) {
        this.movie = movie;
        if (this.movie.movieId === 0) {
            this.pageTitle = 'Add Movie';
        }
        else {
            this.pageTitle = `Edit Movie: ${this.movie.title}`;
        }
        
    }

    saveMovie() {
        // if (this.editForm.dirty && this.editForm.valid) {
        //     this.movie = this.editForm.value;
        //     alert(`Movie: ${JSON.stringify(this.movie)}`);
        // }
    }
}

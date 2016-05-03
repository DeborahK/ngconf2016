import { Component } from '@angular/core';
import { ControlGroup } from '@angular/common';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment } from '@angular/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
    templateUrl: 'app/movies/movie-edit-template.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class MovieEditTemplateComponent implements OnActivate {
    pageTitle: string = 'Edit Movie';
    movie: IMovie;
    errorMessage: string;

    constructor(private _movieService: MovieService) {
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = +curr.getParam('id');
        this.getMovie(id);
    }

    getMovie(id: number) {
        this._movieService.getMovie(id)
            .subscribe(
            movie => this.onMovieRetrieved(movie),
            error => this.errorMessage = <any>error);
    }

    onMovieRetrieved(movie: IMovie) {
        this.movie = movie;
        if (this.movie.movieId === 0) {
            this.pageTitle = 'Add Movie (Template-driven)';
        } else {
            this.pageTitle = `Edit Movie (Template-driven): ${this.movie.title}`;
        }
    }

    saveMovie(editForm: ControlGroup) {
        if (editForm.dirty && editForm.valid) {
            this.movie = editForm.value;
            alert(`Movie: ${JSON.stringify(this.movie)}`);
        }
    }
}

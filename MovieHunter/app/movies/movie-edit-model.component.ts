import { Component } from '@angular/core';
import { FormBuilder, ControlGroup, Control, Validators } from '@angular/common';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment } from '@angular/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
    templateUrl: 'app/movies/movie-edit-model.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class MovieEditModelComponent implements OnActivate {
    pageTitle: string = 'Edit Movie';
    editForm: ControlGroup;
    titleControl: Control;
    directorControl: Control;
    movie: IMovie;
    errorMessage: string;

    constructor(private _fb: FormBuilder,
        private _movieService: MovieService) {

        this.titleControl = new Control('', Validators.compose([Validators.required,
                                                                Validators.minLength(3),
                                                                Validators.maxLength(50)]));
        this.directorControl = new Control('', Validators.compose([Validators.required,
                                                                Validators.minLength(5),
                                                                Validators.maxLength(50)]));
        this.editForm = this._fb.group({
            'title': this.titleControl,
            'director': this.directorControl
        });
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = +curr.getParam('id');
        this.getMovie(id);
    }

    getMovie(id: number) {
        this._movieService.getMovie(id)
            .subscribe(
            (movie: IMovie) => this.onGetMovie(movie),
            (error: any) => this.errorMessage = <any>error);
    }

    onGetMovie(movie: IMovie) {
        this.movie = movie;
        if (this.movie.movieId === 0) {
            this.pageTitle = 'Add Movie (Model-driven)';
        } else {
            this.pageTitle = `Edit Movie (Model-driven): ${this.movie.title}`;
        }

    }

    saveMovie() {
        if (this.editForm.dirty && this.editForm.valid) {
            this.movie = this.editForm.value;
            alert(`Movie: ${JSON.stringify(this.movie)}`);
        }
    }
}

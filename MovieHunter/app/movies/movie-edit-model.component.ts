import { Component, OnInit } from 'angular2/core';
import { FormBuilder, ControlGroup, Control, Validators } from 'angular2/common';
import { ROUTER_DIRECTIVES, Router, RouteParams } from 'angular2/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
    templateUrl: 'app/movies/movie-edit-model.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class MovieEditModelComponent implements OnInit {
    pageTitle: string = 'Edit Movie';
    editForm: ControlGroup;
    titleControl: Control;
    directorControl: Control;
    movie: IMovie;
    errorMessage: string;

    constructor(private _fb: FormBuilder,
        private _movieService: MovieService,
        private _router: Router,
        private _routeParams: RouteParams) {

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

import { Component, OnInit } from 'angular2/core';
import { FormBuilder, ControlGroup, Validators } from 'angular2/common';
import { ROUTER_DIRECTIVES, RouteParams } from 'angular2/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';
import { NumberValidator } from '../shared/number.validator';

@Component({
    templateUrl: 'app/movies/movie-edit.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class MovieEditComponent implements OnInit {
    pageTitle: string = 'Edit Movie';
    editForm: ControlGroup;
    formError: { [id: string]: string };
    private validationMessages: { [id: string]: { [id: string]: string } };
    movie: IMovie;
    errorMessage: string;

    constructor(private _fb: FormBuilder,
        private _movieService: MovieService,
        private _routeParams: RouteParams) {

        // Initialization of strings
        this.formError = {
            'title': '',
            'director': '',
            'starRating': '',
            'description': ''
        };

        this.validationMessages = {
            'title': {
                'required': 'Movie title is required',
                'minlength': 'Movie title must be at least three characters.',
                'maxlength': 'Movie title cannot exceed 50 characters.'
            },
            'director': {
                'required': 'Director is required',
                'minlength': 'Director must be at least 5 characters.',
                'maxlength': 'Director cannot exceed 50 characters.'
            },
            'starRating': {
                'range': 'Rate the movie between 1 (lowest) and 5 (highest).'
            }
        };
    }

    ngOnInit() {
        let id = +this._routeParams.get('id');
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
            this.pageTitle = 'Add Movie';
        } else {
            this.pageTitle = `Edit Movie: ${this.movie.title}`;
        }

        this.editForm = this._fb.group({
            'title': [this.movie.title,
                Validators.compose([Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50)])],
            'director': [this.movie.director,
                Validators.compose([Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50)])],
            'starRating': [this.movie.starRating,
                NumberValidator.range(1, 5)],
            'description': [this.movie.description]

        });

        this.editForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        // this.editForm.valueChanges
        //         .debounceTime(500)
        //         .subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data: any) {
        for (let field in this.formError) {
            if (this.formError.hasOwnProperty(field)) {
                let hasError = this.editForm.controls[field].dirty &&
                    !this.editForm.controls[field].valid;
                this.formError[field] = '';
                if (hasError) {
                    for (let key in this.editForm.controls[field].errors) {
                        if (this.editForm.controls[field].errors.hasOwnProperty(key)) {
                            this.formError[field] += this.validationMessages[field][key] + ' ';
                        }
                    }
                }
            }
        }
    }

    saveMovie() {
        if (this.editForm.dirty && this.editForm.valid) {
            this.movie = this.editForm.value;
            alert(`Movie: ${JSON.stringify(this.movie)}`);
        }
    }
}

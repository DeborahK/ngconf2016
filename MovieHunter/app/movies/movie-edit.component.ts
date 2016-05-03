import { Component } from '@angular/core';
import { FormBuilder, ControlGroup, Control, Validators } from '@angular/common';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment } from '@angular/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';
import { NumberValidator } from '../shared/number.validator';

@Component({
    templateUrl: 'app/movies/movie-edit.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class MovieEditComponent implements OnActivate {
    pageTitle: string = 'Edit Movie';
    editForm: ControlGroup;
    titleControl: Control;
    formError: { [id: string]: string };
    private _validationMessages: { [id: string]: { [id: string]: string } };
    movie: IMovie;
    errorMessage: string;

    constructor(private _fb: FormBuilder,
        private _movieService: MovieService) {

        // Initialization of strings
        this.formError = {
            'title': '',
            'director': '',
            'starRating': '',
            'description': ''
        };

        this._validationMessages = {
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
            this.pageTitle = 'Add Movie';
        } else {
            this.pageTitle = `Edit Movie: ${this.movie.title}`;
        }

        this.titleControl = new Control(this.movie.title, Validators.compose([Validators.required,
                                                                Validators.minLength(3),
                                                                Validators.maxLength(50)]));
        this.editForm = this._fb.group({
            'title': this.titleControl,
            'director': [this.movie.director,
                Validators.compose([Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50)])],
            'starRating': [this.movie.starRating,
                NumberValidator.range(1, 5)],
            'description': [this.movie.description]
        });

        this.editForm.valueChanges
            .map(value => {
                // Causes infinite loop
                // this.titleControl.updateValue(value.title.toUpperCase());
                value.title = value.title.toUpperCase();
                return value;
            })
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
                            this.formError[field] += this._validationMessages[field][key] + ' ';
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

import {Component, OnInit} from 'angular2/core';
import { FormBuilder, ControlGroup, Control, Validators } from 'angular2/common';
import { ROUTER_DIRECTIVES, Router, RouteParams } from 'angular2/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
    templateUrl: 'app/movies/movie-edit.component.html'
})
export class MovieEditComponent implements OnInit {
    pageTitle: string = 'Edit Movie';
    editForm: ControlGroup;
    formError: { [id: string]: string } ;
    titleMessages: { [id: string]: string };
    directorMessages: { [id: string]: string };
    movie: IMovie;
    errorMessage: string;

    constructor(private _fb: FormBuilder,
        private _movieService: MovieService,
        private _router: Router,
        private _routeParams: RouteParams) {

        // Initialization of strings
        this.formError = { 
            'title': '',
            'director': '' };
        
        this.titleMessages = {
            'required': `Movie title is required`,
            'minlength': 'Movie title must be at least three characters.',
            'maxlength': 'Movie title cannot exceed 50 characters.'
        };
        
        this.directorMessages = {
            'required': `Director is required`,
            'minlength': 'Director must be at least 5 characters.',
            'maxlength': 'Director cannot exceed 50 characters.'
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

        this.editForm = this._fb.group({
            'title': [this.movie.title,
                Validators.compose([Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50)])],
            'director': [this.movie.director,
                Validators.compose([Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50)])]

        })

        this.editForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        // this.editForm.valueChanges
        //         .debounceTime(500)
        //         .subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data: any) {
        let titleHasError = this.editForm.controls['title'].dirty && !this.editForm.controls['title'].valid;
        this.formError['title'] = '';
        if (titleHasError) {
            for (let key in this.editForm.controls['title'].errors) {
                this.formError['title'] += this.titleMessages[key] + ' ';
            }
        }
        
        let directorHasError = this.editForm.controls['director'].dirty && !this.editForm.controls['director'].valid;
        this.formError['director'] = '';
        if (directorHasError) {
            for (let key in this.editForm.controls['director'].errors) {
                this.formError['director'] += this.directorMessages[key] + ' ';
            }
        }
    }

    saveMovie() {
        if (this.editForm.dirty && this.editForm.valid) {
            alert(`Title: ${this.editForm.value.title}`);
        }
    }
}
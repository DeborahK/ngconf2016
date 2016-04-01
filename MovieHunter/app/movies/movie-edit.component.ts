import {Component, OnInit} from 'angular2/core';
import { FORM_PROVIDERS, FormBuilder, ControlGroup, Control, FORM_DIRECTIVES, Validators } from 'angular2/common';
import { ROUTER_DIRECTIVES, Router, RouteParams } from 'angular2/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
    templateUrl: 'app/movies/movie-edit.component.html',
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
    providers: [FORM_PROVIDERS]
})
export class MovieEditComponent implements OnInit {
    pageTitle: string = "Edit Movie";
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
                                                                Validators.maxLength(50)]))
        this.editForm = this._fb.group({
            'title':this.titleControl
        })
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

    saveMovie() {
        if (this.editForm.dirty && this.editForm.valid) {
            alert(`Title: ${this.editForm.value.title}`);
        }
    }
import {Component, OnInit} from 'angular2/core';
import { FormBuilder, ControlGroup, Control, Validators } from 'angular2/common';
import { ROUTER_DIRECTIVES, Router, RouteParams } from 'angular2/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
    templateUrl: 'app/movies/movie-edit.component.html'
})
export class MovieEditComponent implements OnInit {
    pageTitle: string = "Edit Movie";
    editForm: ControlGroup;
    titleHasError: boolean=false;
    movie: IMovie;
    errorMessage: string;

    constructor(private _fb: FormBuilder,
        private _movieService: MovieService,
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
            movie => this.onMovieRetrieved(movie),
            error => this.errorMessage = <any>error);
    }

    onMovieRetrieved(movie: IMovie) {
        this.movie = movie;

        this.editForm = this._fb.group({
            'title':[this.movie.title,
                      Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])]
        })
        
        this.editForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        // this.editForm.valueChanges
        //         .debounceTime(500)
        //         .subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data:any){
        this.titleHasError = this.editForm.controls['title'].dirty && !this.editForm.controls['title'].valid;
    }
    
    saveMovie() {
        if (this.editForm.dirty && this.editForm.valid) {
            alert(`Title: ${this.editForm.value.title}`);
        }
    }
}
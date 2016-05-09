import {Component} from '@angular/core';
import {FormBuilder, ControlGroup, Control} from '@angular/common';
import {ROUTER_DIRECTIVES, OnActivate, RouteSegment} from '@angular/router';
import {IMovie} from './movie';
import {MovieService} from './movie.service';
import {RangeValidator} from '../shared/number.validator.directive';

@Component({
    templateUrl: 'app/movies/movie-edit.component.html',
    directives: [ROUTER_DIRECTIVES, RangeValidator]
})
export class MovieEditComponent implements OnActivate {
    pageTitle:string = 'Edit Movie';
    editForm:ControlGroup;
    titleControl:Control;
    movie:IMovie;
    errorMessage:string;

    errors;

    constructor(private _fb:FormBuilder,
                private _movieService:MovieService) {
    }

    routerOnActivate(curr:RouteSegment):void {
        let id = +curr.getParam('id');
        this.getMovie(id);
    }

    getMovie(id:number) {
        this._movieService.getMovie(id)
            .subscribe(
                movie => this.onMovieRetrieved(movie),
                error => this.errorMessage = <any>error);
    }

    onMovieRetrieved(movie:IMovie) {
        this.movie = movie;

        if (this.movie.movieId === 0) {
            this.pageTitle = 'Add Movie';
        } else {
            this.pageTitle = `Edit Movie: ${this.movie.title}`;
        }

        this.titleControl = new Control(this.movie.title);

        this.editForm = this._fb.group({
            'title': this.titleControl,
            'director': [this.movie.director],
            'starRating': [this.movie.starRating],
            'description': [this.movie.description]
        });
    }

    saveMovie() {
        if (this.editForm.dirty && this.editForm.valid) {
            this.movie = this.editForm.value;
            alert(`Movie: ${JSON.stringify(this.movie)}`);
        }
    }
}

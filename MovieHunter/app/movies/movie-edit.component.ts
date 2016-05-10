import {Component, Input} from '@angular/core';
import {FormBuilder, ControlGroup, Control, Validators, AbstractControl} from '@angular/common';
import {ROUTER_DIRECTIVES, OnActivate, RouteSegment} from '@angular/router';
import {IMovie} from './movie';
import {MovieService} from './movie.service';
import {RangeValidator} from '../shared/number.validator.directive';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import {NumberValidator} from '../shared/number.validator';

@Component({
    selector: 'help-block',
    template: `<span class="help-block">
            {{message}}
        </span>`
})
export class HelpBlock {
    @Input() message:string;
}

@Component({
    templateUrl: 'app/movies/movie-edit.component.html',
    directives: [ROUTER_DIRECTIVES, RangeValidator, HelpBlock]
})
export class MovieEditComponent implements OnActivate {
    editForm:ControlGroup;
    movie$:Observable<IMovie>;
    pageTitle$:Observable<string>;

    titleMessage$:Observable<string>;
    directorMessage$:Observable<string>;
    starRatingMessage$:Observable<string>;
    descriptionMessage$:Observable<string>;

    constructor(private _fb:FormBuilder,
                private _movieService:MovieService) {
    }

    routerOnActivate(curr:RouteSegment):void {
        let id = +curr.getParam('id');
        this.getMovie(id);
    }

    getMovie(id:number) {
        this.movie$ = this._movieService.getMovie(id);

        this.pageTitle$ = this.movie$
            .map(({movieId, title}) => movieId
                ? `Edit Movie ${title}`
                : `Add Movie`
            );

        this.movie$
            .subscribe(
                movie => this.createForm(movie),
                console.log.bind(console));
    }

    // if 'INVALID', lookup and push out the validation message
    // otherwise, push out an empty string
    createMessageStream = (control:AbstractControl, messages:any)=>
        control
            .statusChanges
            .switchMap((status:string) =>
                status === 'INVALID'
                    ? Observable.from(
                        Object.keys(control.errors)
                            .map(key => messages[key])
                        )
                    : Observable.of('')
            );

    createForm(movie:IMovie) {
        const {title, director, starRating, description} = movie;

        const titleControl = new Control(title, Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
        ]));
        this.titleMessage$ = this.createMessageStream(titleControl, {
            'required': 'Movie title is required',
            'minlength': 'Movie title must be at least three characters.',
            'maxlength': 'Movie title cannot exceed 50 characters.'
        });

        const directorControl = new Control(director, Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
        ]));
        this.directorMessage$ = this.createMessageStream(directorControl, {
            'required': 'Director is required',
            'minlength': 'Director must be at least 5 characters.',
            'maxlength': 'Director cannot exceed 50 characters.'
        });

        const descriptionControl = new Control(description, Validators.compose([
            Validators.required,
            Validators.minLength(3)
        ]));
        this.descriptionMessage$ = this.createMessageStream(descriptionControl, {
            'required': 'Description is required',
            'minlength': 'Description must be at least 5 characters.'
        });

        const starRatingControl = new Control(starRating, Validators.compose([
            NumberValidator.range(1, 5),
        ]));
        this.starRatingMessage$ = this.createMessageStream(starRatingControl, {
            'min': 'Requires a rating greater than 0',
            'max': 'Requires a rating less than 5',
            'NaN': 'Requires a number',
        });

        this.editForm = this._fb.group({
            'title': titleControl,
            'director': directorControl,
            'starRating': starRatingControl,
            'description': descriptionControl
        });
    }

    saveMovie() {
        if (this.editForm.dirty && this.editForm.valid) {
            alert(`Movie: ${JSON.stringify(this.editForm.value)}`);
        }
    }
}

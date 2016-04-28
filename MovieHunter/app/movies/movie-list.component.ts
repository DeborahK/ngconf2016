import {Component, OnInit}  from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';
import { MovieFilterPipe } from './movieFilter.pipe';
import { StarComponent } from '../shared/star.component';

@Component({
    templateUrl: 'app/movies/movie-list.component.html',
    styleUrls: ['app/movies/movie-list.component.css'],
    directives: [ROUTER_DIRECTIVES, StarComponent],
    pipes: [MovieFilterPipe]
})
export class MovieListComponent implements OnInit {
    pageTitle: string = 'Movie List';
    listFilter: string = '';
    showImage: boolean = false;
    movies: IMovie[];
    errorMessage: string;

    constructor(private _movieService: MovieService) {
    }

    ngOnInit() { this.getMovies(); }

    getMovies() {
        this._movieService.getMovies()
            .subscribe(
            movies => this.movies = movies,
            error => this.errorMessage = <any>error);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    convertToDate(dateString: string): Date {
        return new Date(dateString);
    }
}

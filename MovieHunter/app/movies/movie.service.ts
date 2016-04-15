import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { IMovie } from './movie';

@Injectable()
export class MovieService {
    constructor(private _http: Http) { }

    private _moviesUrl = 'app/movies/movies.json';

    getMovies() {
        return this._http.get(this._moviesUrl)
            .map(res => <IMovie[]> res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    getMovie(id: number) {
        return this._http.get(this._moviesUrl)
            .map(res => this.handleMap(res, id))
            .do(data => console.log('Data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private handleMap(res: any, id: number) {
        let data = <IMovie[]> res.json();
        // Return an initialized object
        if (id === 0) {
            return {
                'approvalRating': null,
                'description': '',
                'director': '',
                'imageurl': '',
                'movieId': 0,
                'mpaa': '',
                'price': null,
                'releaseDate': '',
                'starRating': null,
                'title': ''
            };
        }
        let filtered = data.filter(m => m.movieId === id);
        return <IMovie> filtered[0];
    }
}

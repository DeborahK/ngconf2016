import { Pipe, PipeTransform } from 'angular2/core';
import { IMovie } from './movie';

@Pipe({
    name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

    transform(value: any, args: string[]): any {
        let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;
        return filter ? value.filter((movie: IMovie) =>
            movie.title.toLocaleLowerCase().search(filter) !== -1) : value;
    }
}

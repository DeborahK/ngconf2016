import { Pipe, PipeTransform } from '@angular/core';
import { IMovie } from './movie';

@Pipe({
    name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

    transform(value: IMovie[], filter: string): IMovie[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((movie: IMovie) =>
            movie.title.toLocaleLowerCase().search(filter) !== -1) : value;
    }
}

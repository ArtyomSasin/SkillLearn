import { Pipe, PipeTransform } from '@angular/core';
import { Lesson } from '../models/lesson';

@Pipe({ name: 'sortLessons' })
export class SortLessonsPipe implements PipeTransform {

    transform(lessons: Lesson[] | null | undefined): Lesson[] | null | undefined {
        if (lessons && lessons.length > 0) {
            lessons = lessons.sort((a1, a2) => {
                if (a1.order === a2.order) { return 0; }
                else if (a1.order > a2.order) { return 1; }
                else { return -1; }
            });
        }
        return lessons;
    }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CourseService } from './services/course.service';

@Injectable({
    providedIn: 'root'
})
/** Устанавливается на авторский контент и дает доступ только автору */
export class OnlyAuthorGuard implements CanActivate {

    constructor(private courseService: CourseService, private authService: AuthService, private router: Router) { }

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        console.log('OnlyAuthorGuard canActivate()');
        console.log('route: ', route.params);
        const user = await this.authService.getCurrentUser();
        // Получаем текущего пользователя
        if (!user || user?.isAnonymous) {
            await this.router.navigate(['/not-author']);
            return false;
        }
        // Из параметров извлекаем lessonId && courseId
        const lessonId = route.params.lessonId;
        const courseId = route.params.courseId;

        // Если lessonId && courseId == null, значит гуард поставили криво
        if (!(lessonId || courseId)) {
            throw new Error('error: lessonId && courseId == null');
        }

        let isAuthor = false;
        // Если передан lessonId, значит в первую очерель смотрим по нему
        if (lessonId) {
            isAuthor = await this.courseService.isAuthorLesson(user.uid, lessonId);
        } else if (courseId) {
            // потом по courseId
            isAuthor = await this.courseService.isAuthorCourse(user.uid, courseId);
        }
        if (!isAuthor) {
            await this.router.navigate(['/not-author']);
        }
        return isAuthor;
    }
}

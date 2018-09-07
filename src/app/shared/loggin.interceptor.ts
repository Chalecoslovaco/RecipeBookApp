import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

export class LogginInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        return handler.handle(request).pipe(tap(
            event => console.log(`LogginInterceptor: ${event}`)
        ));
    }
}
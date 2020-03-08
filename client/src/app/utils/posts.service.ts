import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from './post.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  apiUrl = 'http://localhost:8081';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getPosts(): Observable<PostModel> {
    return this.http.get<PostModel>(this.apiUrl + '/posts')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getPost(postId): Observable<PostModel> {
    return this.http.get<any>(this.apiUrl + '/posts/' + postId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  createPost(post): Observable<PostModel> {
    return this.http.post<PostModel>(this.apiUrl + '/posts', JSON.stringify(post), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  updatePost(postId, post): Observable<PostModel> {
    return this.http.put<PostModel>(this.apiUrl + '/posts/' + postId, JSON.stringify(post), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deletePost(postId){
    return this.http.delete<PostModel>(this.apiUrl + '/posts/' + postId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(error)
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}

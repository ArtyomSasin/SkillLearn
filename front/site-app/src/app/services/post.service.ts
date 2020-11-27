import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../shared/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'api/post';
  constructor(private http: HttpClient) { }

  getPost(postId: any): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/get`, { params: { postId } });
  }
}

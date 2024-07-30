// article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }


  deleteArticle(id:number) : Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  createArticle(article: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, article);
  }

  
  getArticle(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

 

  updateArticle(id: number, article: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, article);
  }

  // Autres méthodes CRUD (getArticle, createArticle, updateArticle, deleteArticle) peuvent être ajoutées ici
}

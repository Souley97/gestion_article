import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  // Récupérer tous les articles
  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Récupérer un article par son ID
  getArticle(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Créer un nouvel article
  createArticle(article: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, article)
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour un article existant
  updateArticle(id: number, article: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, article)
      .pipe(catchError(this.handleError));
  }

  // Supprimer un article
  deleteArticle(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur est survenue:', error);
    return throwError('Une erreur est survenue; veuillez réessayer plus tard.');
  }
}

// index.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from '../aritcle.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  articles: any[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.articleService.getArticles().subscribe(
      (response) => {
        this.articles = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles:', error);
      }
    );
  }

  deleteArticle(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.articleService.deleteArticle(id).subscribe(
        () => {
          this.articles = this.articles.filter(article => article.id !== id);
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'article:', error);
        }
      );
    }
  }
  
}

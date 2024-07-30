import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from '../aritcle.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterLink, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  articles: any[] = [];
  articleForm: FormGroup;
  articleId: number | null = null;
  showPopup!: boolean;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchArticles();

    // Check if there's an ID in the route parameters for editing
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.articleId = Number(id);
        this.loadArticleForEditing(this.articleId);
      }
    });
  }

  fetchArticles(): void {
    this.articleService.getArticles().subscribe(
      (response) => {
        this.articles = response.filter(article => article.userId === 1);
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles:', error);
      }
    );
  }

  loadArticleForEditing(id: number): void {
    this.articleService.getArticle(id).subscribe(
      (article) => {
        this.articleForm.patchValue(article);
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'article:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      if (this.articleId) {
        // Update existing article
        this.articleService.updateArticle(this.articleId, this.articleForm.value).subscribe(
          () => {
            this.router.navigate(['/']); // Redirect to the list of articles after update
            this.togglePopup();  // Fermer le popup après la soumission
            this.articleForm.reset(); // Réinitialiser le formulaire

          },
          (error) => {
            console.error('Erreur lors de la mise à jour de l\'article:', error);
          }
        );
      } else {
        // Create new article
        this.articleService.createArticle(this.articleForm.value).subscribe(
          (newArticle) => {
            this.articles.unshift(newArticle);  // Ajouter l'article nouvellement créé en haut de la liste
            this.router.navigate(['/']); // Rediriger vers la liste des articles après la création
                   this.togglePopup();  // Fermer le popup après la soumission
                   this.articleForm.reset(); // Réinitialiser le formulaire

          },
          (error) => {
            
            console.error('Erreur lors de la création de l\'article:', error);
          }
        );
      }
    }
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


  togglePopup(): void {
    this.showPopup = !this.showPopup;
    this.articleForm.reset(); // Réinitialiser le formulaire

  }
}

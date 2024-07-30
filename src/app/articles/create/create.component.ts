import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../aritcle.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  articleForm: FormGroup;
  articles: any;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      this.articleService.createArticle(this.articleForm.value).subscribe(
        (newArticle) => {
          this.articles.unshift(newArticle);  // Ajouter l'article nouvellement créé en haut de la liste
          this.router.navigate(['/']); // Rediriger vers la liste des articles après la création
        },
        (error) => {
          console.error('Erreur lors de la création de l\'article:', error);
        }
      );
    }
  }
  
}

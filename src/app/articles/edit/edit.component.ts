// edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../aritcle.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  articleForm: FormGroup;
  articleId!: number ;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Get the article ID from the route parameters
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch the article data and populate the form
    this.articleService.getArticle(this.articleId).subscribe(article => {
      this.articleForm.patchValue(article);
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      this.articleService.updateArticle(this.articleId, this.articleForm.value).subscribe(
        () => {
          this.router.navigate(['/']); // Redirect to the list of articles after update
        },
        (error) => {
          console.error('Error updating the article:', error);
        }
      );
    }
  }
}

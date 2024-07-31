import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../aritcle.service';

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'] // Correction de styleUrl en styleUrls
})
export class ShowComponent implements OnInit {
  article: any;
  errorMessage?: string;
  comments: Comment[] = [];
  postId!: number;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.articleService.getArticle(id).subscribe(
      article => this.article = article,
      error => this.errorMessage = error
    );

    this.route.params.subscribe(params => {
      this.postId = +params['id'];
      this.loadComments(this.postId);
    });
  }

  loadComments(postId: number): void {
    this.articleService.getCommentsForPost(postId).subscribe(
      (response) => {
        this.comments = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commentaires:', error);
      }
    );
  }
}

import { Component } from '@angular/core';
import { ArticleService } from '../aritcle.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent {
  article: any;
  errorMessage?: string;

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
}
}

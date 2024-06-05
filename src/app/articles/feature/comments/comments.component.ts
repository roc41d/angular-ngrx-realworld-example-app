import { Component, Input } from '@angular/core';
import { Article } from '../../../shared/interfaces/article';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  @Input({ required: true}) article!: Article;
}

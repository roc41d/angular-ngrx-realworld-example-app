import { NgClass } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UtilsService } from '../data-access/utils.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [RouterLink, NgClass],
  template: `
    <ul class="pagination">
      @for (page of pages; track $index) {
      <li class="page-item" [ngClass]="{ active: currentPage === page }">
        <a
          [routerLink]="url"
          class="page-link"
          [queryParams]="{ page: page }"
          >{{ page }}</a
        >
      </li>
      }
    </ul>
  `,
})
export class PaginationComponent implements OnInit {
  @Input() total: number = 0;
  @Input() limit: number = 20;
  @Input() currentPage: number = 1;
  @Input() url: string = '';

  pagesCount: number = 1;
  pages: number[] = [];

  private utilsService: UtilsService = inject(UtilsService);

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.pages =
      this.pagesCount > 0 ? this.utilsService.range(1, this.pagesCount) : [];
  }
}

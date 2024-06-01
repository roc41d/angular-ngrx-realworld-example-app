import { Component, Input, OnInit, input } from '@angular/core';
import { BackendErrors } from '../interfaces/backend-errors';

@Component({
  selector: 'app-backend-error-messages',
  standalone: true,
  template: `
    <ul class="error-messages">
      @for (errorMessage of errorMessages; track $index) {
      <li>{{ errorMessage }}</li>
      }
    </ul>
  `,
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input() backendErrors: BackendErrors = {};
  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(' ');
      return `${name} ${messages}`;
    });
  }
}

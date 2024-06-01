import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: ` <div class="error-message">{{ message }}</div> `,
  standalone: true,
})
export class ErrorMessageComponent {
  @Input() message: string = 'Something went wrong';
}

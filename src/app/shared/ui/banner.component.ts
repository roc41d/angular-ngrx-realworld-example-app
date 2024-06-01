import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: `
    <div class="banner">
      <div class="container">
        <h1>conduit</h1>
        <p>A place to share knowledge</p>
      </div>
    </div>
  `,
  standalone: true,
})
export class BannerComponent {}

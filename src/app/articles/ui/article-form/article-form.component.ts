import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ArticleFormData } from '../../interfaces/article-form-data';
import { BackendErrors } from '../../../shared/interfaces/backend-errors';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendErrorMessagesComponent } from '../../../shared/feature/backend-error-messages.component';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [ReactiveFormsModule, BackendErrorMessagesComponent],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss',
})
export class ArticleFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);

  @Input({ required: true }) initialValues!: ArticleFormData;
  @Input() isSubmitting: boolean = false;
  @Input() errors: BackendErrors | null = null;

  @Output() articleSubmit = new EventEmitter<ArticleFormData>();

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    body: ['', Validators.required],
    tagList: ['', Validators.required],
  });

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    });
  }

  onSubmit(): void {
    const formData = this.form.getRawValue();
    const articleFormData: ArticleFormData = {
      ...formData,
      tagList: formData.tagList.split(' '),
    };
    this.articleSubmit.emit(articleFormData);
  }
}

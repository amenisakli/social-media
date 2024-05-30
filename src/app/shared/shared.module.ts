import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { CommentsComponent } from './component/comments/comments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';
import { UsernamePipe } from './pipes/upercase.pipe';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipe,
    UsernamePipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    HighlightDirective,
    CommentsComponent,
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe,
    UsernamePipe
  ]
})

export class SharedModule { }

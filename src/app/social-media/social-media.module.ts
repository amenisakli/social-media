import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import {  PostsServies } from './services/post.service';
import { PostsResolvers } from './resolvers/post.resolver';
import { PostListComponent } from './component/post-list/post-list.component';
import { PostListItemComponent } from './component/post-list-item/post-list-item.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PostListComponent,
    PostListItemComponent
  ],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    SharedModule
  ],
  providers: [
    PostsServies,
    PostsResolvers
  ]
})
export class SocialMediaModule { }

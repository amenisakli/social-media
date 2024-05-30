import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './component/post-list/post-list.component';
import { PostsResolvers } from './resolvers/post.resolver';

const routes: Routes = [
  {path:'',component:PostListComponent, resolve: {posts: PostsResolvers}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialMediaRoutingModule { }

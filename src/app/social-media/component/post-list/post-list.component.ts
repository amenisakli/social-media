import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostsServies } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  post$!:Observable<Post[]>


  constructor(private route:ActivatedRoute,private postsService:PostsServies){}


  ngOnInit(): void {
    this.post$ = this.route.data.pipe(
      map(data=> data['posts'])
    )
  }
  onPostCommented(postCommented: { comment: string, postId: number }) {
    this.postsService.addNewComment(postCommented);
}
}

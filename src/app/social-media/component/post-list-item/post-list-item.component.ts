import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostsServies } from '../../services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent{
 @Input() post!: Post;
 @Output() postCommented = new EventEmitter<{ comment: string, postId: number }>();
 tempUser= {firstName:"ameni",lastName:"sakli"}
 constructor(private postService:PostsServies){}
 onNewComment(comment: string) {
  this.postCommented.emit({ comment, postId: this.post.id });
}
}

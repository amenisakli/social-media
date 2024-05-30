import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Post } from "../models/post.model";
import { PostsServies } from "../services/post.service";
import { Observable } from "rxjs";

@Injectable()
export  class PostsResolvers implements Resolve<Post[]> {
    constructor(private postService:PostsServies){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
        return this.postService.getPost()
    }
}
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../utils/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts: any = [];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    return this.postsService.getPosts().subscribe(
      (data: {}) => {
        this.posts = data;
      }
    )
  }
}

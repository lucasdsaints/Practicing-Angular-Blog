import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/utils/posts.service';
import { PostModel } from 'src/app/utils/post.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  posts: PostModel[];

  constructor(
    private postsService: PostsService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.getPosts();
    this.titleService.setTitle('Virtux Blog - Administrador');
  }

  getPosts() {
    this.postsService.getPosts()
      .subscribe((posts: PostModel[]) => {
        this.posts = posts;
      })
  }

  numInactivePosts() {
    const inactivePosts = this.posts.filter(p => p.status === false)
    return inactivePosts.length;
  }

  toggleStatus(post: PostModel) {
    post.status = !post.status;
    try {
      this.postsService.updatePost(post.id, post)
        .subscribe(res => {
          console.log(res);
          this.numInactivePosts();
        })
    } catch (error) {
      console.log(error);
    }
  }

}

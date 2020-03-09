import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/utils/post.model';
import { PostsService } from 'src/app/utils/posts.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-visitor',
  templateUrl: './home-visitor.component.html',
  styleUrls: ['./home-visitor.component.css']
})
export class HomeVisitorComponent implements OnInit {

  posts: PostModel[];

  constructor(
    private postsService: PostsService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.getPosts();
    this.titleService.setTitle('Virtux Blog - Visitante');
  }

  getPosts() {
    this.postsService.getPosts()
      .subscribe((posts: PostModel[]) => {
        this.posts = posts.filter(p => p.status === true);
      })
  }
}

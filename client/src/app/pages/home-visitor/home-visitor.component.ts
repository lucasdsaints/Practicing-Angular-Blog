import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/utils/post.model';
import { PostsService } from 'src/app/utils/posts.service';
import { Title } from '@angular/platform-browser';
import { PerspectiveService } from 'src/app/utils/perspective.service';

@Component({
  selector: 'app-home-visitor',
  templateUrl: './home-visitor.component.html',
  styleUrls: ['./home-visitor.component.css']
})
export class HomeVisitorComponent implements OnInit {

  posts: PostModel[];
  isEmpty: boolean = false;

  constructor(
    private postsService: PostsService,
    private perspectiveService: PerspectiveService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.getPosts();
    this.titleService.setTitle('Virtux Blog - Visitante');
    this.perspectiveService.changePerspective('visitante');
  }

  getPosts() {
    this.postsService.getPosts()
      .subscribe((posts: PostModel[]) => {
        this.posts = posts.filter(p => p.status === true);
        if (this.posts.length === 0) {
          this.isEmpty = true;
        }
      })
  }
}

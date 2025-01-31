import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from 'src/app/utils/post.model';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/utils/posts.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  post: PostModel = null;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private titleService: Title,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const postId = params.postId;
      this.postsService.getPost(postId)
        .subscribe((post: PostModel) => {
          this.post = post;
          this.titleService.setTitle(`${this.post.title}`)
        }, (error) => {
          console.log(error);
          this.toastr.error('Erro ao tentar buscar o post!');
        });
    });
  }

}

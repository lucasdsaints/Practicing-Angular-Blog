import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/utils/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/utils/posts.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  post: PostModel = null;
  isANewPost: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private titleService: Title,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.post = new PostModel();
      const postId = params.postId
      if(postId) {
        this.isANewPost = false;
        this.postsService.getPost(postId)
          .subscribe((post: PostModel) => {
            this.post = post;
            this.titleService.setTitle(`Edit - ${post.title}`);
          });
      }
    });
  }

  publish() {
    try {
      this.postsService.createPost(this.post)
        .subscribe(post => {
          this.toastr.success('Post publicado com sucesso!');
          this.router.navigateByUrl(`/post-view/${post.id}`);
        })
    } catch (error) {
      this.toastr.error('Erro ao tentar publicar post!');
      console.log(error);
    }
  }

  update() {
    try {
      this.postsService.updatePost(this.post.id, this.post)
        .subscribe(() => {
          this.toastr.success('Post atualizado com sucesso!');
          this.router.navigateByUrl(`/post-view/${this.post.id}`);
        })
    } catch (error) {
      console.log(error);
    }
  }

}

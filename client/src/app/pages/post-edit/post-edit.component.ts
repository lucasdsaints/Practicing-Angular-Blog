import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/utils/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/utils/posts.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { PerspectiveService } from 'src/app/utils/perspective.service';

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
    private toastr: ToastrService,
    private perspectiveService: PerspectiveService
  ) { }

  ngOnInit() {
    if(this.perspectiveService.getCurrentPerspective() !== 'administrador') {
      this.router.navigateByUrl('/home-visitor');
    }
    this.route.params.subscribe(params => {
      this.post = new PostModel();
      const postId = params.postId
      if(postId) {
        this.isANewPost = false;
        this.postsService.getPost(postId)
          .subscribe((post: PostModel) => {
            this.post = post;
            this.titleService.setTitle(`Editar - ${post.title}`);
          }, (error) => {
            console.log(error);
            this.toastr.error('Erro ao tentar buscar o post!');
          });
      } else {
        this.titleService.setTitle('Cadastro de Novo Post');
      }
    });
  }

  publish() {
    if(!this.allFilled()) {
      this.toastr.warning('Todos os campos devem ser preenchidos!', '',{
        timeOut: 4000
      });
      return;
    }
    this.postsService.createPost(this.post)
      .subscribe(post => {
        this.toastr.success('Post publicado com sucesso!');
        this.router.navigateByUrl(`/post-view/${post.id}`);
      }, (error) => {
        console.log(error)
        this.toastr.error('Erro ao tentar publicar post!');
      });
  }

  update() {
    if(!this.allFilled()) {
      this.toastr.warning('Todos os campos devem ser preenchidos!', '',{
        timeOut: 4000
      });
      return;
    }
    this.postsService.updatePost(this.post.id, this.post)
      .subscribe(() => {
        this.toastr.success('Post atualizado com sucesso!');
        this.router.navigateByUrl(`/post-view/${this.post.id}`);
      }, (error) => {
        console.log(error)
        this.toastr.error('Erro ao tentar atualizar o post!');
      });
  }

  allFilled(): boolean {
    return !!this.post.title && !!this.post.author && !!this.post.content;
  }

}

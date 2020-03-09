import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/utils/posts.service';
import { PostModel } from 'src/app/utils/post.model';
import { Title } from '@angular/platform-browser';
import { PerspectiveService } from 'src/app/utils/perspective.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  posts: PostModel[];
  isEmpty: boolean = false;

  constructor(
    private postsService: PostsService,
    private perspectiveService: PerspectiveService,
    private titleService: Title,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getPosts();
    this.titleService.setTitle('Virtux Blog - Administrador');
    this.perspectiveService.changePerspective('administrador');
  }

  getPosts() {
    this.postsService.getPosts()
      .subscribe((posts: PostModel[]) => {
        this.posts = posts;
        if (this.posts.length === 0) {
          this.isEmpty = true;
        }
      }, (error) => {
        console.log(error);
        this.toastr.error('Erro ao tentar buscar os posts!');
      });
  }

  numInactivePosts() {
    const inactivePosts = this.posts.filter(p => p.status === false);
    return inactivePosts.length;
  }

  toggleStatus(post: PostModel) {
    post.status = !post.status;
    this.postsService.updatePost(post.id, post)
      .subscribe(() => {
        this.toastr.success('Post atualizado com sucesso!');
        this.numInactivePosts();
      }, (error) => {
        this.toastr.error('Erro ao atualizar o post!');
        console.log(error);
      });
  }

  deletePost(postId: number) {
    this.postsService.deletePost(postId)
      .subscribe(() => {
        this.toastr.success('Post deletado com sucesso!');
        window.location.reload();
      }, (error) => {
        this.toastr.error('Erro ao tentar deletar o post!');
        console.log(error);
      });
  }

}

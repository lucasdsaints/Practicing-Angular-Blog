import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from 'src/app/utils/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post: PostModel;

  constructor() { }

  ngOnInit() {
  }

}

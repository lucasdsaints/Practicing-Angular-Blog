import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-posts-info',
  templateUrl: './posts-info.component.html',
  styleUrls: ['./posts-info.component.css']
})
export class PostsInfoComponent implements OnInit {

  @Input() numPosts: number;
  @Input() numInactivePosts: number;

  constructor() { }

  ngOnInit() {
    
  }

}

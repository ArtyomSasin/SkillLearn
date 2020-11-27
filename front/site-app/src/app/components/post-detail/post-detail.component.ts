import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/shared/models/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post?: Post;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      const postId = params.id;
      console.log(postId);
      this.postService.getPost(postId).subscribe(post => {
        this.post = post;
      });
    });
  }
}

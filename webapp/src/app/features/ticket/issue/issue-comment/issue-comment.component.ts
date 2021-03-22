import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map, mergeMap } from 'rxjs/operators';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { getUser } from 'src/app/store/selectors/user.selectors';
import { Comment } from 'src/app/_models/comment/comment';
import { CreateComment } from 'src/app/_models/comment/create-comment';
import { User } from 'src/app/_models/user/User';
import { CommentService } from 'src/app/_services/api/comment.service';

@Component({
  selector: 'app-issue-comment',
  templateUrl: './issue-comment.component.html',
  styleUrls: ['./issue-comment.component.scss']
})
export class IssueCommentComponent implements OnInit {

  @Input() ticketId: number;
  comment: string;
  user: User;
  comments: Comment[] = [];

  constructor(
    private commentService: CommentService,
    private toastr: ToastrService,
    private store: Store<UserState>
  ) {
    this.store.pipe(select(getUser)).pipe(
      map(user => this.user = user)
    ).subscribe();
  }

  ngOnInit(): void {
    this.commentService.getAllComments(this.ticketId).subscribe(res => this.comments = res);
  }

  onComment() {
    const createCommnet: CreateComment = {
      comment: this.comment,
      ticketId: this.ticketId,
      userId: this.user.id
    }


    this.commentService.createComment(createCommnet).pipe(
      mergeMap(res => {
        this.comment = '';
        this.toastr.success('Comment Added');
        return this.commentService.getAllComments(this.ticketId);
      })
    ).subscribe(res => {
      this.comments = res;
    });
  }

}

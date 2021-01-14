import {Component, OnInit} from '@angular/core';
import {ArticleModel} from '../model/article-model';
import {ResultConsumer} from '../model/result-consumer';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../services/article.service';
import {ErrorResponseModel} from '../model/error-response-model';
import {FileTypes} from '../constants/file-types';
import {CommentCreateModel} from '../model/comment-create-model';
import {CommentService} from '../services/comment.service';
import HttpStatusCode from '../constants/http-status-code';
import {Messages} from '../constants/messages';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {

  result: ResultConsumer<ArticleModel> = new ResultConsumer<ArticleModel>();
  model: CommentCreateModel = new CommentCreateModel();
  createCommentError: ErrorResponseModel = new ErrorResponseModel();

  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private articleService: ArticleService,
              private commentService: CommentService) {
    this.result.error = new ErrorResponseModel();
    const snapshot = this.activateRoute.snapshot;
    const uuid = snapshot.paramMap.get('uuid');
    if (!uuid) {
      this.router.navigate(['articles']);
    } else {
      this.articleService.getArticleByUuid(uuid, this.result);
    }
  }

  ngOnInit(): void {
  }

  getImagePath(): string {
    if (this.result && this.result.value && this.result.value.files.length > 0) {
      const imageUuid = this.result.value.files.find(file => file.fileType === FileTypes.IMAGE_PNG ||
        file.fileType === FileTypes.IMAGE_JPG || file.fileType === FileTypes.IMAGE_GIF).uuid;
      return imageUuid
        ? this.articleService.getArticlePhotoPathByUuid(this.result.value.uuid, imageUuid)
        : null;
    }
  }

  createComment(): void {
    this.commentService.createComment(this.result.value.uuid, this.model, this.createCommentError);
  }

  processErrorMessage(): void {
    if (this.createCommentError.code === HttpStatusCode.FORBIDDEN) {
      this.createCommentError.message = Messages.MESSAGE_YOU_ALREADY_COMMENTED_ARTICLE;
    } else if (this.createCommentError.code === HttpStatusCode.BAD_REQUEST) {
      this.createCommentError.message = Messages.MESSAGE_WRONG_COMMENT;
    } else {
      this.createCommentError.message = Messages.MESSAGE_SOMETHING_WENT_WRONG;
    }
  }
}

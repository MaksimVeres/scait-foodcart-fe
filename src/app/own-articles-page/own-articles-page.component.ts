import {Component, OnInit} from '@angular/core';
import {ResultConsumer} from '../model/result-consumer';
import {ArticleModel} from '../model/article-model';
import {ErrorResponseModel} from '../model/error-response-model';
import {ArticleService} from '../services/article.service';
import HttpStatusCode from '../constants/http-status-code';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Messages} from '../constants/messages';

@Component({
  selector: 'app-own-articles-page',
  templateUrl: './own-articles-page.component.html',
  styleUrls: ['./own-articles-page.component.css']
})
export class OwnArticlesPageComponent implements OnInit {

  result: ResultConsumer<ArticleModel[]> = new ResultConsumer<ArticleModel[]>();

  constructor(private articleService: ArticleService,
              private authService: AuthService,
              private router: Router) {
    articleService.getMyArticles(this.result);
  }

  ngOnInit(): void {
    this.result.error = new ErrorResponseModel();
  }

  processError(): void {
    if (this.result.error.code === HttpStatusCode.UNAUTHORIZED || this.result.error.code === HttpStatusCode.FORBIDDEN) {
      this.authService.logOut();
      this.router.navigate(['auth/sign-in']);
    } else {
      this.result.error.message = Messages.MESSAGE_SOMETHING_WENT_WRONG;
    }
  }

  sortResult(): void {
    this.result.value.sort((firstArticle, secondArticle): number => {
      return -firstArticle.status.localeCompare(secondArticle.status);
    });
  }

  archiveArticle(uuid: string): void {
    if (confirm(Messages.MESSAGE_ARE_YOU_SURE_TO_ARCHIVE_ARTICLE)) {
      this.articleService.archiveArticle(uuid, this.result.error);
    }
  }

  republishArticle(uuid: string): void {
    if (confirm(Messages.MESSAGE_ARE_YOU_SURE_TO_REPUBLISH_ARTICLE)) {
      this.articleService.republishArticle(uuid, this.result.error);
    }
  }
}

import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';
import {ArticleModel} from '../model/article-model';
import {ResultConsumer} from '../model/result-consumer';
import {ErrorResponseModel} from '../model/error-response-model';
import {Router} from '@angular/router';
import {ArticleCuModel} from '../model/article-cu-model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private static ENDPOINT = environment.api_url + '/articles';
  private static SEPARATOR = ';~;';

  constructor(private httpService: HttpService,
              private router: Router) {
  }

  getArticleByUuid(uuid: string, resultConsumer: ResultConsumer<ArticleModel>): void {
    const api = ArticleService.ENDPOINT + '/' + uuid;
    this.httpService.doGet(api, null, this.articleGetCallback(resultConsumer), this.articleGetErrorCallback(resultConsumer));
  }

  getArticleWithModelByUUid(uuid: string, resultConsumer: ResultConsumer<ArticleModel>,
                            cuModelConsumer: ResultConsumer<ArticleCuModel>,
                            prosesConsumer: ResultConsumer<string[]>,
                            consesConsumer: ResultConsumer<string[]>): void {
    const api = ArticleService.ENDPOINT + '/' + uuid;
    this.httpService.doGet(api, null, (response) => {
      resultConsumer.value = response;
      cuModelConsumer.value = new ArticleCuModel();
      cuModelConsumer.value.title = resultConsumer.value.title;
      cuModelConsumer.value.productName = resultConsumer.value.productName;
      cuModelConsumer.value.productRate = resultConsumer.value.productRate;
      cuModelConsumer.value.text = resultConsumer.value.text;
      prosesConsumer.value = resultConsumer.value.proses.split(ArticleService.SEPARATOR);
      consesConsumer.value = resultConsumer.value.conses.split(ArticleService.SEPARATOR);
    }, this.articleGetErrorCallback(resultConsumer));
  }

  getArticlePhotoPathByUuid(articleUuid: string, imageUuid: string): string {
    return ArticleService.ENDPOINT + '/' + articleUuid + '/images/' + imageUuid;
  }

  getMyArticles(resultConsumer: ResultConsumer<ArticleModel[]>): void {
    const api = ArticleService.ENDPOINT + '/my';
    this.httpService.doGet(api, null, this.articleGetCallback(resultConsumer), this.articleGetErrorCallback(resultConsumer));
  }

  publishArticle(formData: FormData, errorResponseModel: ErrorResponseModel): void {
    const api = ArticleService.ENDPOINT;
    this.httpService.doPost(api, formData, (response) => {
      console.log('Article is created');
      this.router.navigate(['articles/my']);
    }, errorResponseModel);
  }

  updateArticle(uuid: string, formData: FormData, errorResponseModel: ErrorResponseModel): void {
    const api = ArticleService.ENDPOINT + '/' + uuid;
    this.httpService.doPut(api, formData, (response) => {
      console.log('Article is updated');
      this.router.navigate(['articles/my']);
    }, errorResponseModel);
  }

  archiveArticle(uuid: string, errorResponseModel: ErrorResponseModel): void {
    const api = ArticleService.ENDPOINT + '/' + uuid + '/archive';
    this.httpService.doPatch(api, null, (response) => {
        console.log('Article archived');
        window.location.reload();
      },
      errorResponseModel);
  }

  republishArticle(uuid: string, errorResponseModel: ErrorResponseModel): void {
    const api = ArticleService.ENDPOINT + '/' + uuid + '/publish';
    this.httpService.doPatch(api, null, (response) => {
        console.log('Article republished');
        window.location.reload();
      },
      errorResponseModel);
  }

  articleGetCallback(resultConsumer: ResultConsumer<any>): any {
    return (response) => {
      resultConsumer.value = response;
    };
  }

  articleGetErrorCallback(resultConsumer: ResultConsumer<any>): any {
    return (error) => {
      resultConsumer.error.code = error.status;
    };
  }
}

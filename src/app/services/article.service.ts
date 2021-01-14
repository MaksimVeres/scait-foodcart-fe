import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';
import {ArticleModel} from '../model/article-model';
import {ResultConsumer} from '../model/result-consumer';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private static ENDPOINT = environment.api_url + '/articles';

  constructor(private httpService: HttpService) {
  }

  getArticleByUuid(uuid: string, resultConsumer: ResultConsumer<ArticleModel>): void {
    const api = ArticleService.ENDPOINT + '/' + uuid;
    this.httpService.doGet(api, null, this.articleGetCallback(resultConsumer), this.articleGetErrorCallback(resultConsumer));
  }

  getArticlePhotoPathByUuid(articleUuid: string, imageUuid: string): string {
    return ArticleService.ENDPOINT + '/' + articleUuid + '/images/' + imageUuid;
  }

  articleGetCallback(resultConsumer: ResultConsumer<ArticleModel>): any {
    return (response) => {
      resultConsumer.value = response;
    };
  }

  articleGetErrorCallback(resultConsumer: ResultConsumer<ArticleModel>): any {
    return (error) => {
      resultConsumer.error.code = error.status;
    };
  }
}

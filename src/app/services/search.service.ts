import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {TextSearchModel} from '../model/text-search-model';
import {SearchResponseModel} from '../model/search-response-model';
import {ErrorResponseModel} from '../model/error-response-model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private static SEARCH_ENDPOINT = environment.api_url + '/search';

  constructor(private httpService: HttpService) {
  }

  searchArticles(model: TextSearchModel, responseModel: SearchResponseModel, errorResponse: ErrorResponseModel): void {
    const articlesSearchUrl = SearchService.SEARCH_ENDPOINT + '/articles';
    this.httpService.doGet(articlesSearchUrl, model,
      (response) => {
        responseModel.result = response.result;
        responseModel.pageNumber = response.pageInfo.number;
        responseModel.totalPages = response.pageInfo.totalPages;
        responseModel.totalElements = response.pageInfo.totalElements;
      },
      errorResponse);
  }
}

import {Component, OnInit} from '@angular/core';
import {ErrorResponseModel} from '../model/error-response-model';
import {TextSearchModel} from '../model/text-search-model';
import {SearchResponseModel} from '../model/search-response-model';
import {SearchService} from '../services/search.service';
import {Messages} from '../constants/messages';
import HttpStatusCode from '../constants/http-status-code';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  response: SearchResponseModel = new SearchResponseModel();
  model: TextSearchModel = new TextSearchModel();
  error: ErrorResponseModel = new ErrorResponseModel();

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
  }

  searchArticles(): void {
    if (!this.model.page) {
      this.model.page = 0;
      this.model.limit = 50;
      this.response = new SearchResponseModel();
    }
    this.error = new ErrorResponseModel();
    this.searchService.searchArticles(this.model, this.response, this.error);
  }

  processError(): void {
    if (this.error.code === HttpStatusCode.BAD_REQUEST) {
      this.error.message = Messages.MESSAGE_WRONG_SEARCH_REQUEST;
    } else {
      this.error.message = Messages.MESSAGE_INTERNAL_SERVER_ERROR;
    }
  }
}

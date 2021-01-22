import {Component, OnInit} from '@angular/core';
import {ArticleCuModel} from '../model/article-cu-model';
import {ErrorResponseModel} from '../model/error-response-model';
import {ArticleService} from '../services/article.service';
import {Messages} from '../constants/messages';
import {FormBuilder} from '@angular/forms';
import HttpStatusCode from '../constants/http-status-code';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-create-page',
  templateUrl: './article-create-page.component.html',
  styleUrls: ['./article-create-page.component.css']
})
export class ArticleCreatePageComponent implements OnInit {

  private static SEPARATOR = ';~;';
  private static PARAMETER_IMAGES = 'images';
  model: ArticleCuModel = new ArticleCuModel();
  error: ErrorResponseModel = new ErrorResponseModel();
  proses = [];
  conses = [];
  chosenFiles = [];

  constructor(private articleService: ArticleService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onFileSelect(event): void {
    this.chosenFiles = [];
    if (event.target.files.length > 0) {
      this.chosenFiles = event.target.files;
    }
  }

  addPros(): void {
    this.proses.length += 1;
  }

  deletePros(id): void {
    if (this.proses.length === 1) {
      this.proses = [];
      return;
    }
    this.proses.splice(this.proses.indexOf(this.proses[id]), 1);
    delete this.proses[id];
  }

  prosValue(id, value): void {
    this.proses[id] = value.toString();
  }

  addCons(): void {
    this.conses.length += 1;
  }

  deleteCons(id): void {
    if (this.conses.length === 1) {
      this.conses = [];
      return;
    }
    this.conses.splice(this.conses.indexOf(this.conses[id]), 1);
    delete this.conses[id];
  }

  consValue(id, value): void {
    this.conses[id] = value.toString();
  }

  publishArticle(): void {
    if (confirm(Messages.MESSAGE_ARE_YOU_SURE_TO_PUBLISH_ARTICLE)) {
      this.error = new ErrorResponseModel();
      const prosesString = Object.values(this.proses).join(ArticleCreatePageComponent.SEPARATOR).toString();
      const consesString = Object.values(this.conses).join(ArticleCreatePageComponent.SEPARATOR).toString();
      this.model.proses = prosesString;
      this.model.conses = consesString;
      const formData = new FormData();
      for (const file of this.chosenFiles) {
        formData.append(ArticleCreatePageComponent.PARAMETER_IMAGES, file);
      }
      formData.append('title', this.model.title);
      formData.append('productName', this.model.productName);
      formData.append('productRate', this.model.productRate + '');
      formData.append('text', this.model.text);
      formData.append('proses', this.model.proses);
      formData.append('conses', this.model.conses);
      this.articleService.publishArticle(formData, this.error);
    }
  }

  processError(): void {
    if (this.error.code === HttpStatusCode.UNAUTHORIZED || this.error.code === HttpStatusCode.FORBIDDEN) {
      this.router.navigate(['auth/sign-in']);
    } else if (this.error.code === HttpStatusCode.BAD_REQUEST) {
      this.error.message = Messages.MESSAGE_PLEASE_FILL_ALL_THE_FIELDS;
    } else {
      this.error.message = Messages.MESSAGE_SOMETHING_WENT_WRONG;
    }
  }
}

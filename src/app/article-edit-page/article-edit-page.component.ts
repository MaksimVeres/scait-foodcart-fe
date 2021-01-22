import {Component, OnInit} from '@angular/core';
import {ArticleCuModel} from '../model/article-cu-model';
import {ErrorResponseModel} from '../model/error-response-model';
import {FormBuilder} from '@angular/forms';
import HttpStatusCode from '../constants/http-status-code';
import {Messages} from '../constants/messages';
import {ArticleService} from '../services/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ResultConsumer} from '../model/result-consumer';
import {ArticleModel} from '../model/article-model';

@Component({
  selector: 'app-article-edit-page',
  templateUrl: './article-edit-page.component.html',
  styleUrls: ['./article-edit-page.component.css']
})
export class ArticleEditPageComponent implements OnInit {

  private static PARAMETER_IMAGES = 'images';
  private static SEPARATOR = ';~;';
  model: ResultConsumer<ArticleCuModel> = new ResultConsumer<ArticleCuModel>();
  proses: ResultConsumer<string[]> = new ResultConsumer<string[]>();
  conses: ResultConsumer<string[]> = new ResultConsumer<string[]>();
  articleGetResult: ResultConsumer<ArticleModel> = new ResultConsumer<ArticleModel>();
  error: ErrorResponseModel = new ErrorResponseModel();
  chosenFiles = [];

  constructor(private activatedRoute: ActivatedRoute,
              private articleService: ArticleService,
              private formBuilder: FormBuilder,
              private router: Router) {
    const snapshot = this.activatedRoute.snapshot;
    const uuid = snapshot.paramMap.get('uuid');
    if (!uuid) {
      this.router.navigate(['articles']);
    } else {
      this.proses.value = [];
      this.conses.value = [];
      this.articleService.getArticleWithModelByUUid(uuid, this.articleGetResult, this.model, this.proses, this.conses);
    }
  }

  ngOnInit(): void {
    this.articleGetResult.error = new ErrorResponseModel();
  }

  onFileSelect(event): void {
    this.chosenFiles = [];
    if (event.target.files.length > 0) {
      this.chosenFiles = event.target.files;
    }
  }

  addPros(): void {
    this.proses.value.length += 1;
  }

  deletePros(id): void {
    if (this.proses.value.length === 1) {
      this.proses.value = [];
      return;
    }
    this.proses.value.splice(this.proses.value.indexOf(this.proses[id]), 1);
    delete this.proses.value[id];
  }

  prosValue(id, value): void {
    this.proses.value[id] = value.toString();
  }

  getProsValue(id): string {
    return this.proses.value[id]
      ? this.proses.value[id]
      : '';
  }

  getConsValue(id): string {
    return this.conses.value[id]
      ? this.conses.value[id]
      : '';
  }

  addCons(): void {
    this.conses.value.length += 1;
  }

  deleteCons(id): void {
    if (this.conses.value.length === 1) {
      this.conses.value = [];
      return;
    }
    this.conses.value.splice(this.conses.value.indexOf(this.conses[id]), 1);
    delete this.conses.value[id];
  }

  consValue(id, value): void {
    this.conses.value[id] = value.toString();
  }

  setModelValue(field, event): void {
    this.model.value[field] = event.target.value;
  }

  updateArticle(): void {
    if (confirm(Messages.MESSAGE_ARE_YOU_SURE_TO_UPDATE_ARTICLE)) {
      this.error = new ErrorResponseModel();
      const prosesString = Object.values(this.proses.value).join(ArticleEditPageComponent.SEPARATOR).toString();
      const consesString = Object.values(this.conses.value).join(ArticleEditPageComponent.SEPARATOR).toString();
      this.model.value.proses = prosesString;
      this.model.value.conses = consesString;
      const formData = new FormData();
      for (const file of this.chosenFiles) {
        formData.append(ArticleEditPageComponent.PARAMETER_IMAGES, file);
      }
      formData.append('title', this.model.value.title);
      formData.append('productName', this.model.value.productName);
      formData.append('productRate', this.model.value.productRate + '');
      formData.append('text', this.model.value.text);
      formData.append('proses', this.model.value.proses);
      formData.append('conses', this.model.value.conses);
      this.articleService.updateArticle(this.articleGetResult.value.uuid, formData, this.error);
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

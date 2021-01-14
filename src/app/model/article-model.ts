import {FileModel} from './file-model';
import {CommentModel} from './comment-model';

export class ArticleModel {

  uuid: string;
  title: string;
  productName: string;
  text: string;
  proses: string;
  conses: string;
  productRate: number;
  articleRate: number;
  pubDateTime: string;
  status: string;
  authorUuid: string;
  authorLogin: string;
  comments: CommentModel[];
  files: FileModel[];
}

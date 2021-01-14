import {ArticleModel} from './article-model';
import {CommentModel} from './comment-model';
import {FileModel} from './file-model';

export class UserModel {
  uuid: string;
  email: string;
  login: string;
  status: string;
  articles: ArticleModel[];
  comments: CommentModel[];
  image: FileModel;
}

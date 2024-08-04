import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { BlogComponent } from './components/blog/blog.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateArticleComponent } from './components/update-article/update-article.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "blog", component: BlogComponent},
  {path: "blog/:search", component: BlogComponent},
  {path: "blog/article/:id", component: ArticleDetailComponent},
  {path: "create/article", component: CreateArticleComponent},
  {path: "update/article/:id", component: UpdateArticleComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

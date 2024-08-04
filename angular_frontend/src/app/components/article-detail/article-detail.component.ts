import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { global } from 'src/app/global';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  public article!: Article;
  public status!: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleservice: ArticleService
  ) {
    this.url = global.url;
    this.article = new Article(1, "", "", "", "");
   }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(){
    this._route.params.subscribe(
      params=>{
        let articleId = params.id;
        console.log(articleId);
        this._articleservice.getOne(articleId).subscribe(
          response=>{
            if(response.status == "success"){
              this.article = response.article;
              this.status = "success";
              console.log(this.article);
            }else{
              this.status = "error";
            }
          },
          error=>{
            console.log(error);
            this.status = "error";
          }
        );
      }
    );
  }

  delete(){
    this._articleservice.delete(this.article._id).subscribe(
      response=>{
        if(response.status == "success"){
          this._router.navigate(["/home"]);
        }
      },
      error=>{
        console.log(error);
      }
    );

  }

}

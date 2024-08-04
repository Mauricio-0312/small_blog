import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { global } from 'src/app/global';

@Component({
  selector: 'app-update-article',
  templateUrl: '../create-article/create-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {

  public article: Article;
  public formdata: FormData;
  public status!: string;
  public url!: string;
  public articleId!: string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { 
    this.article = new Article(1, "", "", "", "");
    this.formdata = new FormData();
    this.url = global.url;
  }

  ngOnInit(): void {
    //Get article if it's gonna be updated
    this.getArticle();
  }
  
  getArticle(){
    this._route.params.subscribe(
      params=>{
        if(params.id){
          this.articleId = params.id
          this._articleService.getOne(this.articleId).subscribe(
            response=>{
              this.article = response.article;
            },
            error=>{
              console.log(error);
            }
          );
        }
      }
    );
  }

  onSubmit(form: any){
      //update article
      this.formdata.append("title", this.article.title);
      this.formdata.append("content", this.article.content);

      this._articleService.update(this.articleId, this.article, this.formdata).subscribe(
        response => {
          if(response.status == "success"){
            this.status = "success";
            this._router.navigate(["/blog/article", this.articleId]);
            console.log(this.article);
          }else{
            this.status = "error";
          }
        },
        error =>{
          this.status == "error";
          console.log(error);
        }
      );
  }

  getImage(event: any){
    console.log(event.target.files);
    let file = event.target.files[0];
    this.formdata.append("image", file);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { global } from 'src/app/global';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  public article!: Article;
  public formdata: FormData;
  public status!: string;
  public url: string;
  constructor(
    private _articleService: ArticleService,
    private _router: Router
  ) { 
    this.article = new Article(1, "", "", "", "");
    this.formdata = new FormData();
    this.url = global.url;
  }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    //Save article
    this._articleService.save(this.article).subscribe(
      response => {
        if(response.status == "success"){

          //Save image
          this._articleService.uploadImage(response.article._id, this.formdata).subscribe(
            response =>{
              if(response.status == "success"){
                this.status = "success";
                form.reset();
                this._router.navigate(["/home"]);
              }else{
                this.status == "error";
              }
            },
            error =>{
              this.status == "error";
              console.log(error);
            }
          );
        }else{
          this.status == "error";
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

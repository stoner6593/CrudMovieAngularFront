import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  validatingForm: FormGroup;
  @Input()  id: number;	
  @Input() tipo: number;
  constructor(private movieService : MoviesService,private modalService: NgbModal,/*private toastr: ToastrService*/) { }

  ngOnInit(): void {

    console.log(this.tipo);
    this.validatingForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    if(this.tipo !=1){
      this.searchMovie();
    }
    


  }

  searchMovie(){
    this.movieService.searchMovie(this.id).subscribe((data:any)=>{
      
      const movie: any= data.message;           
          this.validatingForm.reset();
          this.validatingForm.setValue({
            id : movie.id,
            title : movie.title,         
            description : movie.description
           

          })   
    
    });
  }

  submit(){

    if (this.tipo ==1 ){
      const movie :any = {
        title : this.validatingForm.value.title,
        description : this.validatingForm.value.description
      };

      if (this.validatingForm.valid) {

        this.movieService.insert(movie).subscribe((data:any)=>{
          //this.toastr.success('Hello world!', 'Toastr fun!');
          this.modalService.dismissAll();
        
        });
        
      }
      else{
        alert("FILL ALL FIELDS")
      }
    }else{
      const movie :any = {
        id  : this.validatingForm.value.id,
        title : this.validatingForm.value.title,
        description : this.validatingForm.value.description
      };

      this.movieService.update(movie.id,movie).subscribe(
        (result: any) => {
          console.log(result);
          if (result.success) {

            this.validatingForm.reset();          
           
            this.modalService.dismissAll();
            
          } 
        }
      )

    }

  }


}

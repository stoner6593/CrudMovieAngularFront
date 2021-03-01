import { FormComponent } from './form/form/form.component';
import { ModalComponent } from './modal/modal/modal.component';
import { MoviesService } from './services/movies.service';
import { Component, HostListener, ViewChild  } from '@angular/core';
import { NavbarModule, WavesModule, ButtonsModule, MDBModalRef } from 'angular-bootstrap-md'
import { MdbTableDirective, MDBModalService } from 'angular-bootstrap-md';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'usqayfront';
    @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
    modalRef: MDBModalRef;


    elements: any = [];
    headElements = ['ID', 'Titulo', 'Descripción', 'Acción'];
    searchText: string = '';
    previous: string;
    show: any = 0 // 1 Registrar - 2 Modificar
    closeResult: string;
    id: number =0 ;
      


  constructor(
    private movieService : MoviesService,
    private modalService: NgbModal
  ){

  }

  @HostListener('input') oninput() {
      this.searchItems();
  }

  ngOnInit() {
    this.listaPeliculas();
  }
  
  listaPeliculas(){
    
    this.movieService.getAll().subscribe(
      (data: any) => {
        this.elements = data.data;
        this.mdbTable.setDataSource(this.elements);
        this.previous = this.mdbTable.getDataSource();

      }
    )      
  }

  searchItems() {
      const prev = this.mdbTable.getDataSource();
      if (!this.searchText) {
          this.mdbTable.setDataSource(this.previous);
          this.elements = this.mdbTable.getDataSource();
      }
      if (this.searchText) {
          this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
          this.mdbTable.setDataSource(prev);
      }
  }

  eliminar(movie : any){
      
      this.movieService.delete(movie.id).subscribe(
        (data: any) => {
          console.log(data);
          if (data.success) {
            
            this.listaPeliculas();
          } else {
           
           
          }
        },
        error => {          
         // this.toastr.error('ERROR DEL SISTEMA', error);
        },
      )
   
  }

 
  openModal(formModal:any,accion:any,show:any,data:any) {
    this.show=show;
    this.id=data.id;
    if(accion===1){
      
      this.modalService.open(formModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {        
      this.closeResult = `Closed with: ${result}`;
        
      }, (reason) => {
        this.closeResult = `${this.getDismissReason(reason)}`;      
        
        if(this.closeResult==='undefined'){console.log(this.closeResult);  
          this.listaPeliculas();
        }
       
      });

    }else if(accion===2){
      //Ir a otra pagina
      
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `${reason}` ;
    }
  }
  

}

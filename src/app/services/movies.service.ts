import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl = environment.url ;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(this.baseUrl+ 'movie');
  }
  insert(movie){
    return this.http.post(this.baseUrl + 'movie', movie);
  }
  update(id: number, movie: any) {
    return this.http.put(this.baseUrl + 'movie/' + id, movie);
  }

  searchMovie(id :number){
    return this.http.get<any>(this.baseUrl + 'movie/' + id);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'movie/' + id);
  }

  
}

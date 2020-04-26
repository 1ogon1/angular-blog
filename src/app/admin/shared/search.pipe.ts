import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "../../shared/interfaces";

@Pipe({
  name: 'searchPosts'
})
export class SearchPipe implements PipeTransform{
  transform(posts: Post[], search: string): Post[] {
    if (!search || !search.trim()){
      return posts
    }

    return posts.filter(p => {
      return p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    })
  }

}

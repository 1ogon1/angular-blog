import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Post} from "../../shared/interfaces";
import {PostService} from "../../shared/post.service";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  dSub: Subscription
  pSub: Subscription
  search: string = null

  constructor(private post: PostService, private alert: AlertService) {
  }

  ngOnInit(): void {
    this.dSub = this.post.getAll().subscribe(posts => {
        this.posts = posts
      }
    )
  }

  ngOnDestroy(): void {
    if (this.dSub) {
      this.dSub.unsubscribe()
    }

    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }

  remove(id: string) {
    this.pSub = this.post.remove(id).subscribe(() => {
      this.posts = this.posts.filter(p => p.id != id)
      this.alert.success('Deleted')
    })
  }
}

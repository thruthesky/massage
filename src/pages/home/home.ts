import { Component, NgZone } from '@angular/core';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { NoticeModalContent } from '../../components/modals/notice/notice';


import { Post,
    PAGE,
    POSTS, 
    POST, 
    PAGE_OPTION, 
    ADS
} from "./../../api/philgo-api/v2/post";


import { PageScroll } from './../../providers/page-scroll';
import { cut } from './../../etc/function';

const POST_ID: string = 'massage';
const LIMIT: number = 18;

@Component( {
    selector: 'home-page',
    templateUrl: 'home.html'
})
export class HomePage {

  chunks = [];

    noMorePosts: boolean = false;
    posts: POSTS = <POSTS> [];

    ads: ADS;


    constructor( 
        //private ngbModal: NgbModal
        private ngZone: NgZone,
        private pageScroll: PageScroll,
        public post: Post
    ) {
        



        this.loadPage();
        
        
    }


    watch = null;
    inLoading: boolean = false;
    pageNo: number = 0;
    ngOnInit() {
      this.watch = this.pageScroll.watch( 'section.content', 350 ).subscribe( e => this.loadPage() );
    }

    ngOnDestroy() {
      this.watch.subscribe();
    }


    renderPage() {
        this.ngZone.run( () => {} );
    }



    loadPage() {
      if ( this.inLoading ) {
        //console.info("in page loading");
        return;
      }
      this.inLoading = true;
      this.pageNo++;

      let option: PAGE_OPTION = {
        post_id: POST_ID,
        page_no: this.pageNo,
        limit: LIMIT,
        fields: 'idx, idx_member, gid, subject, content_stripped, no_of_view, varchar_1, varchar_2, varchar_8'
      };

      this.post.page( option, (page: PAGE) => { 
          this.inLoading = false;
          this.ads = page.ads;
          //console.log(this.ads);
          if ( page.posts.length == 0 || page.posts.length < LIMIT ) {
            this.noMorePosts = true;
          }
          this.delayPush( page );
      },
      error => {
        this.inLoading = false;
      },
      () => {} );
  }



  delayPush( page:PAGE ) {

    let posts = page.posts;
    //console.log('page: ', page);
    for( let i = 0; i < posts.length; i = i + 3 ) {
      setTimeout( () => { this.chunks.push( this.pres( posts.slice( i, i + 3  ) ) ); }, i * 100 );
    }
  }



  /**
   * 
   * @param posts 
   */
  pres( posts: POSTS ) {
    return posts.map( e => this.pre(e) );
  }

  /**
   * @return POST DATA or null if the post is wrong/malformed.
   */
  pre( post: POST ) : POST {

    if ( post === void 0 ) return null; // this error really happened.
    if ( post.idx === void 0 || ! post.idx ) return null;


    if ( post.idx_parent !== void 0 ) {
      post['url'] = this.post.getPermalink( post );
    }


    let s = post.subject;
    s = s.replace('&amp;', '' );
    let pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9| ,\-\.)]/gi;
    post.subject = s.replace( pattern, '' );

    post['active'] = false;

    post['subject_short'] = cut( post.subject, 35, '...' );
    post['content_stripped_short'] = cut( post['content_stripped'], 128, '...' );


    if ( post['varchar_8'] == 'Manila' ) post['varchar_8'] = '마닐라 / ';
    else if ( post['varchar_8'] == 'Cebu' ) post['varchar_8'] = '세부 / ';
    else if ( post['varchar_8'] == 'Pampanga' ) post['varchar_8'] = '팜팡가 앙헬레스 클락 / ';
    

    return post;
  }




}
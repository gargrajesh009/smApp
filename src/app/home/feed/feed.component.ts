import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Service/login.service';
import { TrackerService } from '../../Service/tracker.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  userName: any;
  user: any
  curName:any;
  curId:any;
  follower:any;
  followerCount:any;
  following:any;
  followingCount:any;
  post:any;
  postCount:any;
  photo:any;
  caption:any;  
  userList:any;
 
  
  constructor(private ser: LoginService, private tracker: TrackerService,private router:Router) {
    this.tracker.dataName.subscribe(name => 
      {
        this.userName = name;
        this.ser.getUser(this.userName).subscribe(e =>
          {
            this.user = e;
            this.curName=this.user.name;
            this.curId=this.user.userName;
            this.ser.getFollower(this.userName).subscribe(e =>
              {
                this.follower=e;
                this.followerCount=this.follower.length;                                    
                
              })
            this.ser.getFollowing(this.userName).subscribe(e=>
              {
                this.following=e;
                this.followingCount=this.following.length;      
              }) 
            this.ser.getPosts(this.userName).subscribe(e=>
              {
                this.post=e;
                this.postCount=this.post.length;
              })   
              this.ser.getUsers().subscribe(e=>
                {
                  this.userList=e;     
                  console.log(this.userList);    
                          
                  
                })

            
          });
        
      });  
  }

  ngOnInit(): void {
  }
  saveCode(data:any){
    alert("hey")
  }
  
  logOut(){
    this.tracker.dataName.subscribe(e=>{
      this.tracker.dataName.next('');
      this.router.navigate(['/login']);

    })   
  }

  view(){
    this.router.navigate(['/myProfile']);
  }
  edit(){
    this.router.navigate(['/editProfile']);
  }
  addPhoto(){
    this.router.navigate(['/addPic']);
  }
 



}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { POST } from '../shared/classes/BlogClass';
import { USER } from '../shared/classes/UserClass';
import { IBlog, IUser } from '../shared/interfaces/blog.interface';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public upName !: string;
  public upEmail !: string;
  public upPassword !: string;
  public inEmail !: string;
  public inPassword !: string;
  public ifSignIn = false;
  public Posts: Array<IBlog> = this.back.getBlogs();
  public postTitle !: string;
  public postMessage !: string;
  public userWhoEntered: IUser = {
    id: 0,
    userName: '',
    email: '',
    password: ''
  };
  public isEdit = false;
  public editIndex !: number;
  public emailRegExp = /^\w+@[a-zA-Z]+\.[a-zA-Z]+$/
  constructor(private back: BlogService,
              private toastr: ToastrService ) { }

  ngOnInit(): void {
  }

  createUser() {
    let email = this.emailRegExp.test(this.upEmail)
    let unique = this.back.inUniqueUser(this.upEmail, this.upName);
    if (this.upName && this.upPassword && !unique) {
      let user = new USER(Math.round(Math.random() * 1000), this.upName, this.upEmail, this.upPassword);
      this.back.setUser(user);
      this.toastr.success('successfully!')
      this.resetUpForm()
    } else {
      this.toastr.error('wrong email or password !')
      this.resetUpForm()
    }

  }

  signIn() {
    let usercheck = this.back.signIn(this.inEmail, this.inPassword);
    if (usercheck.length > 0) {
      this.ifSignIn = true;
      this.enteredUser(usercheck[0]);
      this.toastr.success(`Welcome ${this.userWhoEntered.userName}`)
      this.resetInForm()
    } else {
      this.toastr.error('wrong email or password !')
      this.resetInForm()

    };
  }

  signOut() {
    this.ifSignIn = false;
    this.userWhoEntered.id = 0;
    this.userWhoEntered.email = '';
    this.userWhoEntered.userName = '';
    this.userWhoEntered.password = '';
  }

  enteredUser(user: IUser) {
    this.userWhoEntered.id = user.id;
    this.userWhoEntered.email = user.email;
    this.userWhoEntered.userName = user.userName
    this.userWhoEntered.password = user.password;
  }

  addPost() {
    if (this.postTitle && this.postMessage) {
      let date = new Date()
      let post = new POST(Math.round(Math.random() * 1000), this.userWhoEntered.userName, this.postTitle, date, this.postMessage);
      this.back.setPost(post);
      this.toastr.success('Post is published')
      this.resetPostForm();
    } else {
      this.toastr.error('write anything')
      this.resetPostForm();
    }
  }

  deletePost(i: number) {
    this.back.deletePost(i);
    this.toastr.success('Post is deleted')

  }

  editPost(post: IBlog, i: number) {
    this.isEdit = true;
    this.postTitle = post.topic;
    this.postMessage = post.message;
    this.editIndex = i;
  }

  savePost() {
    if (this.postTitle && this.postMessage) {
      this.back.savePost(this.editIndex, this.postTitle, this.postMessage);
      this.isEdit = false;
      this.resetPostForm();
      this.toastr.success('Post is updated')
    } else {
      this.toastr.error('write anything')
    }

  }

  youOpportunities(whoPosted: string): boolean {
    if (whoPosted == this.userWhoEntered.userName || this.userWhoEntered.userName == 'admin') {
      return true
    } else {
      return false
    }
  }

  resetUpForm() {
    this.upEmail = '';
    this.upName = '';
    this.upPassword = '';
  }

  resetInForm() {
    this.inEmail = '';
    this.inPassword = '';
  }

  resetPostForm() {
    this.postMessage = '';
    this.postTitle = '';
  }
}




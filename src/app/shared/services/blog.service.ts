import { Injectable } from '@angular/core';
import { IBlog, IUser } from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogs: Array<IBlog> = [];
  private users: Array<IUser> = [
    {
      id: 1,
      userName: 'admin',
      email: 'admin',
      password: 'admin'
    },
    {
      id: 2,
      userName: 'qwe',
      email: 'qwe',
      password: 'qwe'
    }
  ];

  constructor() { }

  public getBlogs(): Array<IBlog> {
    return this.blogs
  }

  inUniqueUser(email: string, name: string) {
    return this.users.some(user => user.email == email && user.userName == name)
  }

  public setUser(user: IUser): void {
    this.users.push(user);
    console.log(this.users);
  }

  public signIn(email: string, password: string) {
    return this.users.filter(user => user.email == email && user.password == password)
  }

  savePost(i: number, title: string, mesage: string) {
    this.blogs[i].topic = title;
    this.blogs[i].message = mesage;
  }

  public setPost(post: IBlog) {
    this.blogs.push(post);
    console.log(this.blogs);
  }

  public deletePost(i: number) {
    this.blogs.splice(i, 1);
  }
}

import PostRepo from "./post.repo.js";

export default class PostController {
  constructor() {
    this.repo = new PostRepo();
  }
}

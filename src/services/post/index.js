import service from "..";
import utils from "../../utils";
import api from "../api";

const fetchAll = async (limit, skip, detailBaseURL) => {
  const res = await api.get(`/posts?limit=${limit}&skip=${skip}`);
  const posts = utils.post.constructPosts(res.posts, detailBaseURL);
  return { posts, total: res.total };
}

const fetchById = async id => {
  const post = await api.get(`/posts/${id}`);
  const prevPost = await api.get(`/posts/${id - 1}?select=id`);
  const nextPost = await api.get(`/posts/${id + 1}?select=id`);
  const author = await service.user.fetchAuthor(post.userId);
  delete post.userId;

  return { post, prevPost, nextPost, author };
}

const fetchPostComments = async id => {
  return await api.get(`/comments/post/${id}`);
}

export default { fetchAll, fetchById, fetchPostComments };
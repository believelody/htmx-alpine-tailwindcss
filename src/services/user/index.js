import utils from "../../utils";
import api from "../api";
import meService from './me';

const fetchById = async (id, fields = []) => {
  let path = `/users/${id}`;
  if (fields.length) {
    path.concat(`?select=${fields.join(',')}`)
  }
  const res = await api.get(path);
  return res;
}

const fetchAuthor = async id => await fetchById(id, ['username', 'id']);

const fetchPosts = async (id, limit, skip) => {
  const res = await api.get(`/users/${id}/posts?limit=${limit}&skip=${skip}`);
  const posts = utils.user.constructPosts(res.posts, id);
  return { posts, total: res.total };
}

const fetchPostById = async (id, postId) => {
  const { posts } = await api.get(`/users/${id}/posts`);
  const post = posts.find((post) => post.id === postId);
  const postIndex = posts.findIndex((post) => post.id === post?.id);
  const prevPost = posts[postIndex - 1];
  const nextPost = posts[postIndex + 1];
  const author = await fetchAuthor(id);
  delete post.userId;

  return { post, prevPost, nextPost, author };
}

export default { fetchById, fetchPosts, fetchPostById, fetchAuthor, me: meService };
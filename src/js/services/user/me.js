import service from "..";
import utils from "../../utils";
import api from "../api";

const fetchPosts = async (id, limit, skip, isMe = false) => {
  const res = await api.auth.get(`/users/${id}/posts?limit=${limit}&skip=${skip}`);
  const posts = utils.user.constructPosts(res.posts)
  return { posts, total: json.total };
}

const fetchPostById = async (id, postId) => {
  const { posts } = await api.auth.get(`/users/${id}/posts`);
  const post = posts.find((post) => post.id === postId);
  const postIndex = posts.findIndex((post) => post.id === post?.id);
  const prevPost = posts[postIndex - 1];
  const nextPost = posts[postIndex + 1];
  const author = await service.user.fetchAuthor(id);
  delete post.userId;

  return { post, prevPost, nextPost, author };
}

const reactToPost = async (id, reactions) => {
  return await api.auth.put(`/posts/${id}`, {
    body: reactions
  });
}

const commentPost = async body => {
  return await api.auth.post(`/comments/add`, { body });
}

export default { fetchPosts, fetchPostById, reactToPost, commentPost };
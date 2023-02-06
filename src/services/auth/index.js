import api from "../api";

const login = async body => {
  return await api.post('/auth/login', {
    // body,
    body: {
      username: 'kminchelle',
      password: '0lelplR',
      // expiresInMins: 60, // optional
    }
  });
}

export default { login };
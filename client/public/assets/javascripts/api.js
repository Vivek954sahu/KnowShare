// connecting frontend to backend using fetch apis

const BASE_URL = 'https://knowshare-api.onrender.com/api';

// =========================
// AUTH
// =========================

export async function registerUser(data) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
}

export async function loginUser(data) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  }


// =========================
// POSTS
// =========================

export async function fetchPosts () {
    const res = await fetch(`${BASE_URL}/posts`);
    return await res.json();
}

export async function fetchSinglePost (postId) {
    const res = await fetch(`${BASE_URL}/posts/${postId}`);
    return await res.json();
}

export async function createPost (data, token) {
   const res = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    return await res.json();
}


// =========================
// Comments
// =========================

export async function fetchComments (postId) {
    const res = await fetch(`${BASE_URL}/comments/${postId}`);
    return await res.json();
}

export async function addComment (data, token) {
    const res = await fetch(`${BASE_URL}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return await res.json();
}

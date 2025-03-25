import { fetchPosts, fetchSinglePost, createPost } from "./api.js";

export async function displayPosts () {
  const  postsContainer = document.getElementById("posts-feed");
  postsContainer.innerHTML = `<p>Loading posts...</p>`;

  try{
    const posts = await fetchPosts();

    if(!posts || posts.length === 0 ){
      postsContainer.innerHTML = `<p>No posts available. Be the first to create one!</p>`;
      return;
    }

    postsContainer.innerHTML = '';

    posts.forEach((post) => {
      const content = String(post.content || '');
      const excerpt = content.length > 100 
      ? content.slice(0, 100) + '...' 
      : content;
      const card = document.createElement('div');
      card.className = 'post-card';
      card.innerHTML = `
        <h3>${post.title}</h3>
        <p>${ excerpt }...</p>
        <p class="meta">Posted by ${post.author?.username || 'Anonymous'} | ${new Date(post.createdAt).toLocaleString()}</p>
        <button class="view-btn" data-id="${post._id}">View</button>
      `;
      postsContainer.appendChild(card);
    });

    // Attach event listeners to view buttons
    document.querySelectorAll('.view-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const postId = e.target.dataset.id;
        console.log(postId)
        window.location.href = `/KnowledgeSharingPlatform/client/pages/post.html?id=${postId}`;
      });
    });

  } catch(err) {
    console.error('Failed to fetch posts:', err);
    postsContainer.innerHTML = `<p>Error loading posts. Please try again later.</p>`;
  }
} 

export async function displaySinglePost (postId) {
  const postSection = document.getElementById("single-post");

  try{
    const post = await fetchSinglePost (postId);

    postSection.innerHTML = `
    <h2>${post.title}</h2>
      <p class="meta">By ${post.author?.username || 'Unknown'} on ${new Date(post.createdAt).toLocaleDateString()}</p>
      <p>${post.content}</p>
    `;
  } catch (err) {
    postSection.innerHTML = '<p>Failed to load post.</p>';
    console.error('Error fetching single post:', err);
  }
}

export async function setupDashboard () {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/KnowledgeSharingPlatform/client/pages/login.html';
    return;
  }

  loadUserPosts();

  const postForm = document.getElementById('create-post-form');
  const postTitle = document.getElementById('post-title');
  const postContent = document.getElementById('post-content');
  const userPostsContainer = document.getElementById('user-posts');

  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const postData = {
      title: postTitle.value,
      content: postContent.value,
    };

    const result = await createPost(postData, token);
    if (result) {
      postTitle.value = '';
      postContent.value = '';
      loadUserPosts();
    } else {
      alert('Failed to create post.');
    }
  });

  async function loadUserPosts() {
    const res = await fetchPosts();
    const userId = JSON.parse(atob(token.split('.')[1])).userId;
    const userPosts = res.filter(post => post.author && post.author._id === userId);

    userPostsContainer.innerHTML = '';

    userPosts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.className = 'post-card';
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
      `;
      userPostsContainer.appendChild(postDiv);
    });

}
}
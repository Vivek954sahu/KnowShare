import { fetchComments, addComment } from './api.js';

export async function loadComments(postId) {
  const commentsContainer = document.getElementById('comments-container');
  try {
    const comments = await fetchComments(postId);

    if (comments.length === 0) {
      commentsContainer.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
      return;
    }

    commentsContainer.innerHTML = comments.map(comment => `
      <div class="comment">
        <p><strong>${comment.username || 'Anonymous'}</strong>:</p>
        <p>${comment.content}</p>
        <small>${new Date(comment.createdAt).toLocaleString()}</small>
      </div>
    `).join('');
  } catch (err) {
    commentsContainer.innerHTML = '<p>Error loading comments.</p>';
    console.error('Failed to fetch comments:', err);
  }
}

export async function handleNewComment(postId) {
  const commentForm = document.getElementById('comment-form-wrapper');
  const commentInput = document.getElementById('comment-input');

  commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const content = commentInput.value.trim();

    if (!token) {
      alert('You must be logged in to comment.');
      return;
    }

    if (!content) {
      alert('Comment cannot be empty!');
      return;
    }

    try {
      await addComment({ content, postId }, token);
      commentInput.value = '';
      await loadComments(postId);
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  });
}

import { displayPosts } from "./posts.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();

  const path = window.location.pathname;

  if (path.endsWith('home.html')) {
    displayPosts();                         // 👈 Load posts only on the home page
  }

});

// function to load header dynamically
function loadHeader() {
  fetch("/components/header.html")
  .then((res) => res.text())
  .then((data) => {
    document.body.insertAdjacentHTML("afterbegin", data);
    updateNavLinks();
  })
  .catch((err) => console.error('Error loading header:', err));
}

// function to load footer dynamically
function loadFooter () {
  fetch("/components/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.body.insertAdjacentHTML("beforeend", data);
    })
    .catch((err) => console.error('Error loading footer:', err));
}

// Update Navigation Links
function updateNavLinks () {
  const nav = document.getElementById("nav-links");
  const token = localStorage.getItem("token");

  if(token){
    nav.innerHTML = `
      <a href="/pages/dashboard.html">Dashboard</a>
      <a href="#" id="logout">Logout</a>
    `;
    document.getElementById("logout").addEventListener("click", () => logout());

  }else{
    nav.innerHTML = `
      <a href="/pages/login.html">Login</a>
      <a href="/pages/register.html">Register</a>
    `;
  }
}

// Logout function
function logout () {
  localStorage.removeItem('token');
  window.location.href = '/pages/login.html';
}

// Utility: Get Auth Token
function getAuthToken () {
  return localStorage.getItem("token");
}

// Utility: redirect if not authenticated
function requireAuth () {
  const token = getAuthToken();
  if (!token) {
    window.location.href = '/client/pages/login.html';
  }
}
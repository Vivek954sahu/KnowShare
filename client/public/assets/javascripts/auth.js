import { registerUser, loginUser } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // Handle Login
  if(loginForm){
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;

      const res = await loginUser({ email, password });

      if(res.token){
        localStorage.setItem("token", res.token);
        window.location.href = '/pages/home.html';
      }else{
        alert ( res.message || "Login failed!");
      }
    });
  }

  // Handle Register
  if(registerForm){
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = registerForm.username.value.trim();
      const email = registerForm.email.value.trim();
      const password = registerForm.password.value;

      const res = await registerUser({ username, email, password });

      if(res.message === 'User created successfully'){
        alert('Registration successful! Please log in.');
        window.location.href = '/pages/login.html';
      } else {
        alert(res.message || 'Registration failed.');
      }
    });
  }
});
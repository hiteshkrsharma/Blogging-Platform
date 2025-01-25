// DOM Elements
const usernameInput = document.getElementById('username');
const loginBtn = document.getElementById('login-btn');
const authSection = document.getElementById('auth-section');
const mainSection = document.getElementById('main-section');
const userDisplay = document.getElementById('user-display');
const blogInput = document.getElementById('blog-input');
const postBtn = document.getElementById('post-btn');
const blogList = document.getElementById('blog-list');

// Initialize User
let currentUser = localStorage.getItem('currentUser') || null;

// Load Blogs from localStorage
function loadBlogs() {
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  blogList.innerHTML = '';
  blogs.forEach((blog, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span><strong>${blog.user}:</strong> ${blog.content}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    blogList.appendChild(li);
  });
}

// Login Functionality
loginBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (!username) {
    alert('Please enter a username.');
    return;
  }
  currentUser = username;
  localStorage.setItem('currentUser', username);
  userDisplay.textContent = username;
  authSection.style.display = 'none';
  mainSection.style.display = 'block';
  loadBlogs();
});

// Post Blog Functionality
postBtn.addEventListener('click', () => {
  const content = blogInput.value.trim();
  if (!content) {
    alert('Please write something before posting.');
    return;
  }
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  blogs.push({ user: currentUser, content });
  localStorage.setItem('blogs', JSON.stringify(blogs));
  blogInput.value = '';
  loadBlogs();
});

// Delete Blog Functionality
blogList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.getAttribute('data-index');
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.splice(index, 1);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    loadBlogs();
  }
});

// Check if User is Logged In
if (currentUser) {
  userDisplay.textContent = currentUser;
  authSection.style.display = 'none';
  mainSection.style.display = 'block';
  loadBlogs();
}

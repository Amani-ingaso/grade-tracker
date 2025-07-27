const users = [{ username: 'admin', password: 'pass123' }];
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const u = username.value, p = password.value;
  if (users.some(x => x.username === u && x.password === p)) {
    localStorage.setItem('loggedInUser', u);
    window.location.href = 'index.html';
  } else {
    alert('Invalid login');
  }
});

const STORAGE_KEY = 'fancyGrades';
let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

const ctx = document.getElementById('gradeChart');
const chart = new Chart(ctx, {
  type: 'bar',
  data: { labels: [], datasets: [{ label: 'Avg Grade', data: [], backgroundColor: 'teal' }] },
  options: { scales: { y: { beginAtZero: true, max: 100 } } }
});

function updateUI() {
  const table = document.createElement('table');
  table.className = 'table mt-4';
  const grouped = {};
  data.forEach(g => {
    const key = `${g.student} (${g.subject})`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(g.grade);
  });
  const rows = [];
  for (const key in grouped) {
    const avg = (grouped[key].reduce((a,b)=>a+b,0) / grouped[key].length).toFixed(1);
    rows.push({ key, avg });
  }
  chart.data.labels = rows.map(r => r.key);
  chart.data.datasets[0].data = rows.map(r => r.avg);
  chart.update();

  table.innerHTML = '<thead><tr><th>Subject</th><th>Average</th></tr></thead>';
  const tbody = document.createElement('tbody');
  rows.forEach(r => {
    tbody.innerHTML += `<tr><td>${r.key}</td><td>${r.avg}</td></tr>`;
  });
  table.appendChild(tbody);
  document.getElementById('tableContainer').innerHTML = '';
  document.getElementById('tableContainer').appendChild(table);
}

document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const s = e.target.student.value, subj = e.target.subject.value, g = +e.target.grade.value;
  data.push({ student: s, subject: subj, grade: g });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  updateUI();
  e.target.reset();
});

updateUI();



const toggle = document.getElementById("theme-toggle");
const htmlEl = document.documentElement;

const stored = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const current = stored || (prefersDark ? "dark" : "light");
htmlEl.setAttribute("data-theme", current);
toggle.textContent = current === "dark" ? "☀️" : "🌙";

toggle.addEventListener("click", () => {
  const theme = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
  htmlEl.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  toggle.textContent = theme === "dark" ? "☀️" : "🌙";
});

window.matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", e => {
    const systemTheme = e.matches ? "dark" : "light";
  if (!localStorage.getItem("theme")) {
      htmlEl.setAttribute("data-theme", systemTheme);
      toggle.textContent = systemTheme === "dark" ? "☀️" : "🌙";
    }
  });

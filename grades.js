if (!localStorage.getItem('loggedInUser')) {
  window.location.href = 'login.html';
}

// Grade tracking logic
const students = new Set();
const gradesMap = new Map();

function addStudent(name) {
  if (!students.has(name)) {
    students.add(name);
    gradesMap.set(name, new Map());
  }
}

function recordGrade(name, subj, grade, weight) {
  const m = gradesMap.get(name);
  if (!m.has(subj)) m.set(subj, []);
  m.get(subj).push({ grade, weight });
}

function calculateAvg(arr) {
  const totalWeight = arr.reduce((s, x) => s + x.weight, 0);
  const weightedSum = arr.reduce((s, x) => s + x.grade * x.weight, 0);
  return totalWeight ? (weightedSum / totalWeight).toFixed(2) : '–';
}

function updateUI() {
  const container = document.getElementById("performanceContainer");
  container.innerHTML = "";
  students.forEach(name => {
    const m = gradesMap.get(name);
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${name}</h3>`;
    m.forEach((entries, subj) => {
      div.innerHTML += `<p>${subj}: Avg ${calculateAvg(entries)}</p>`;
    });
    div.innerHTML += `<button onclick="exportCSV('${name}')" class="btn-wolf">Download ${name} Report</button>`;
    container.append(div);
  });
}

document.getElementById("add-btn").onclick = () => {
  const s = student.value.trim(), subj = subject.value.trim();
  const g = parseFloat(grade.value), w = parseFloat(weight.value);
  if (!s || !subj || isNaN(g) || isNaN(w)) return;
  addStudent(s);
  recordGrade(s, subj, g, w);
  student.value = subject.value = grade.value = weight.value = '';
  updateUI();
};

function exportCSV(name) {
  const m = gradesMap.get(name);
  let csv = 'Subject,Grade,Weight\n';
  m.forEach((entries, subj) => {
    entries.forEach(e => csv += `${subj},${e.grade},${e.weight}\n`);
  });
  downloadCSV(csv, `${name}_report.csv`);
}

document.getElementById('export-all').onclick = () => {
  let csv = 'Student,Subject,Grade,Weight\n';
  gradesMap.forEach((m, name) => {
    m.forEach((entries, subj) => {
      entries.forEach(e => csv += `${name},${subj},${e.grade},${e.weight}\n`);
    });
  });
  downloadCSV(csv, 'all_students.csv');
};

function downloadCSV(text, filename) {
  const blob = new Blob([text], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

document.getElementById('logout-btn').onclick = () => {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'login.html';
};

// Render UI initially
updateUI();


document.getElementById('view-chart').addEventListener('click', () => {
  // Save current grades data
  const dataToSave = {};
  gradesMap.forEach((subjects, name) => {
    dataToSave[name] = {};
    subjects.forEach((entries, subj) => {
      // Calculate average per subject
      const totalWeight = entries.reduce((s, e) => s + e.weight, 0);
      const weightedSum = entries.reduce((s, e) => s + e.grade * e.weight, 0);
      dataToSave[name][subj] = totalWeight 
        ? (weightedSum / totalWeight).toFixed(2)
        : 0;
    });
  });
  localStorage.setItem('gradesData', JSON.stringify(dataToSave));
  // Redirect to visualization page
  window.location.href = 'visualization.html';
});


document.getElementById('view-chart').addEventListener('click', () => {
  const dataToSave = {};
  gradesMap.forEach((subjects, name) => {
    dataToSave[name] = {};
    subjects.forEach((entries, subj) => {
      const totalW = entries.reduce((s, e) => s + e.weight, 0);
      const sumW = entries.reduce((s, e) => s + e.grade * e.weight, 0);
      dataToSave[name][subj] = totalW ? (sumW / totalW).toFixed(2) : 0;
    });
  });
  localStorage.setItem('gradesData', JSON.stringify(dataToSave));
  window.location.href = 'visualization.html';
});
document.getElementById('view-chart').addEventListener('click', () => {
  const dataToSave = {};
  gradesMap.forEach((subjects, name) => {
    dataToSave[name] = {};
    subjects.forEach((entries, subj) => {
      const totalW = entries.reduce((s, e) => s + e.weight, 0);
      const sumW = entries.reduce((s, e) => s + e.grade * e.weight, 0);
      dataToSave[name][subj] = totalW ? +(sumW / totalW).toFixed(2) : 0;
    });
  });
  });
  console.log(dataToSave , 'saving;');  // ✨ Check this in console
  localStorage.setItem('gradesData', JSON.stringify(dataToSave));
  window.location.href = 'visualization.html';


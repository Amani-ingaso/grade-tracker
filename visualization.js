document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('loggedInUser')) {
    return window.location.href = 'login.html';
  }

  const stored = localStorage.getItem('gradesData');
  if (!stored) {
    alert('No grades found – please add them first.');
    return window.location.href = 'index.html';
  }

  const gradesData = JSON.parse(stored);
  const names    = Object.keys(gradesData);
  const subjects = [...new Set(names.flatMap(n => Object.keys(gradesData[n])))];

  const datasets = names.map((name, i) => ({
    label: name,
    data: subjects.map(subj => gradesData[name][subj] || 0),
    backgroundColor: `hsl(${(i*60)%360},70%,50%)`
  }));

  const ctx = document.getElementById('gradesChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: { labels: subjects, datasets },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, max: 100 } },
      plugins: { title: { display: true, text: 'Grades by Subject' } }
    }
  });

  const averages = names.map(n =>
    subjects.reduce((sum, subj) => sum + (gradesData[n][subj] || 0), 0) / subjects.length
  );
  const overallAvg = (averages.reduce((a,b) => a + b, 0) / averages.length).toFixed(2);
  document.getElementById('average').textContent = `Overall Avg: ${overallAvg}`;

  document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('gradesData');
  console.log('Loaded:', stored);  // ✨ Also verify this

  if (!stored) return window.location.href = 'grades.html';
  const gradesData = JSON.parse(stored);

  const names = Object.keys(gradesData);
  const subjects = [...new Set(names.flatMap(n => Object.keys(gradesData[n])))];
  console.log('Names:', names, 'Subjects:', subjects);  // ✨ And this

  const datasets = names.map((name, i) => ({
    label: name,
    data: subjects.map(subj => gradesData[name][subj] || 0),
    backgroundColor: `hsl(${(i * 60) % 360}, 70%, 50%)`
  }));

  const ctx = document.getElementById('gradesChart')?.getContext('2d');
  if (!ctx) return console.error('Canvas context not found');

  new Chart(ctx, {
    type: 'bar',
    data: { labels: subjects, datasets },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, max: 100 } },
      plugins: { title: { display: true, text: 'Grades by Subject' } }
    }
  });

  const averages = names.map(n =>
    subjects.reduce((sum, subj) => sum + (gradesData[n][subj] || 0), 0) / subjects.length
  );
  document.getElementById('average').textContent = `Overall Avg: ${ (averages.reduce((a,b)=>a+b,0)/averages.length).toFixed(2) }`;

  document.getElementById('back-btn').onclick = () => window.location.href = 'index.html';
});
// Assuming gradesData is an object where keys are student names
// and values are objects of subjects with their corresponding grades
const gradesData = {
  'John Doe': {
    Math: 85,
    Science: 90,
  },
  // Add more students and their grades here
};

// Function to calculate weighted average for a student
function calculateWeightedAverage(studentName) {
  const studentGrades = gradesData[studentName];
  if (!studentGrades) return null;

  let totalWeightedGrade = 0;
  let totalWeight = 0;

  for (const [subject, grade] of Object.entries(studentGrades)) {
    const weight = getSubjectWeight(subject); // Implement this function to retrieve the weight for each subject
    totalWeightedGrade += grade * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? totalWeightedGrade / totalWeight : 0;
}

// Example usage
const average = calculateWeightedAverage('John Doe');
console.log(`Weighted Average for John Doe: ${average.toFixed(2)}%`);

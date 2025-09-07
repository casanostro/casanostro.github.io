document.addEventListener('DOMContentLoaded', () => {
  const achievementsList = document.getElementById('achievements-list');
  const journalList = document.getElementById('journal-list');
  const achievementForm = document.getElementById('achievement-form');
  const journalForm = document.getElementById('journal-form');
  const gridArt = document.getElementById('grid-art');

  const colors = ['#ff0054', '#00bbf9', '#00f5d4', '#f15bb5', '#fee440'];
  for (let i = 0; i < 60; i++) {
    const cell = document.createElement('div');
    cell.className = 'module';
    cell.style.background = colors[Math.floor(Math.random() * colors.length)];
    gridArt.appendChild(cell);
  }

  function loadEntries(key, list) {
    const items = JSON.parse(localStorage.getItem(key) || '[]');
    list.innerHTML = '';
    items.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      list.appendChild(li);
    });
  }

  function addEntry(key, list, input) {
    const items = JSON.parse(localStorage.getItem(key) || '[]');
    items.push(input.value.trim());
    localStorage.setItem(key, JSON.stringify(items));
    loadEntries(key, list);
    input.value = '';
  }

  achievementForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('achievement-input');
    if (input.value.trim()) addEntry('achievements', achievementsList, input);
  });

  journalForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('journal-input');
    if (input.value.trim()) addEntry('journal', journalList, input);
  });

  loadEntries('achievements', achievementsList);
  loadEntries('journal', journalList);
});

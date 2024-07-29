const notationCanvas = document.getElementById('notation-canvas');
const ctx = notationCanvas.getContext('2d');

// Рисую линии нотного стана
for (let i = 0; i < 5; i++) {
  ctx.beginPath();
  ctx.moveTo(0, 20 + i * 40);
  ctx.lineTo(800, 20 + i * 40);
  ctx.stroke();
}

const keyButton = document.getElementById('key-button');
const tonalityButton = document.getElementById('tonality-button');
const sizeButton = document.getElementById('size-button');

keyButton.addEventListener('click', () => {
  console.log('Ключ');
});

tonalityButton.addEventListener('click', () => {
  console.log('Тональность');
});

sizeButton.addEventListener('click', () => {
  console.log('Размер');
});

// Функция рисования ноты
function drawNote(x, y, width, height) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = 'black';
  ctx.fill();
}

// Функция редактирования ноты
function editNote(x, y, width, height) {
  ctx.clearRect(x, y, width, height);
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = 'ed';
  ctx.fill();
}

// Функция удаления ноты
function deleteNote(x, y, width, height) {
  ctx.clearRect(x, y, width, height);
}

// Функция получения ноты по позиции
function getNoteAtPosition(x, y) {
  const notes = [];
  for (let i = 0; i < 5; i++) {
    const note = {
      x: 20 + i * 40,
      y: 20,
      width: 20,
      height: 20
    };
    notes.push(note);
  }
  for (const note of notes) {
    if (x >= note.x && x <= note.x + note.width && y >= note.y && y <= note.y + note.height) {
      return note;
    }
  }
  return null;
}

let audioContext;

notationCanvas.addEventListener('click', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  const note = getNoteAtPosition(x, y);
  if (note) {
    editNote(note.x, note.y, note.width, note.height);
  } else {
    drawNote(x, y, 20, 20);
    playNote(440);
  }
});

notationCanvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const x = e.clientX;
  const y = e.clientY;
  const note = getNoteAtPosition(x, y);
  if (note) {
    deleteNote(note.x, note.y, note.width, note.height);
  }
});

// Функция воспроизведения ноты
function playNote(frequency) {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'ine';
  oscillator.frequency.value = frequency;
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1); // Останавливаем осциллятор через 1 секунду
}

// Функция сохранения нот
function saveNotes() {
  const notes = [];
  for (let i = 0; i < 5; i++) {
    const note = {
      x: 20 + i * 40,
      y: 20,
      width: 20,
      height: 20
    };
    notes.push(note);
  }
  // Update this function to save the actual notes drawn on the canvas
  localStorage.setItem('notes', JSON.stringify(notes));
}

const saveButton = document.getElementById('save-button');
if (saveButton) {
  saveButton.addEventListener('click', () => {
    saveNotes();
  });
}
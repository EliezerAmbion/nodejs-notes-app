const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);

  if (duplicateNote) {
    console.log('Note title taken!');
    return;
  }

  notes.push({
    title: title,
    body: body,
  });

  saveNotes(notes);
  console.log('New note added!');
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.underline.green('Note Removed'));
  } else {
    console.log(chalk.underline.red('No Note Found'));
  }

  saveNotes(notesToKeep);
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.underline.green('Your Notes:'));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();

  const note = notes.find((note) => note.title === title);

  if (!note) {
    console.log(chalk.underline.red('Note not found!'));
    return;
  }

  console.log(chalk.bgGreen(note.title));
  console.log(note.body);
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};

import { notesData } from "../data/notes.js";

class NoteList extends HTMLElement {
  constructor() {
    super();
    this._notes = [...notesData];
  }

  connectedCallback() {
    this.render();

    this.addEventListener("add-note", (event) => {
      this.addNote(event.detail);
    });

    this.addEventListener("toggle-archive", (event) => {
      this.toggleArchive(event.detail);
    });
  }

  addNote(note) {
    this._notes = [note, ...this._notes];
    this.render();
  }

  render() {
    this.innerHTML = `
    <section class="notes-container"></section>
  `;

    const container = this.querySelector(".notes-container");

    const activeNotes = this._notes.filter((note) => !note.archived);
    const archivedNotes = this._notes.filter((note) => note.archived);

    container.appendChild(this.createSection("Active Notes", activeNotes));
    container.appendChild(this.createSection("Archived Notes", archivedNotes));
  }

  createSection(title, notes) {
    const section = document.createElement("section");

    const heading = document.createElement("h2");
    heading.textContent = title;

    const grid = document.createElement("div");
    grid.classList.add("notes-container");

    notes.forEach((note) => {
      const item = document.createElement("note-item");
      item.note = note;
      grid.appendChild(item);
    });

    section.appendChild(heading);
    section.appendChild(grid);

    return section;
  }

  toggleArchive(id) {
    this._notes = this._notes.map((note) => (note.id === id ? { ...note, archived: !note.archived } : note));

    this.render();
  }
}
customElements.define("note-list", NoteList);

import { validateNote } from "../utils/validation.js";

class NoteForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupEvent();
  }

  render() {
    this.innerHTML = `
  <section class="form-container">
      <h2>Tambah Catatan</h2>
      <form id="noteForm">
        <div class="form-group">
          <label for="title">Judul</label>
          <input type="text" id="title" />
          <small class="error" id="titleError"></small>
        </div>

        <div class="form-group">
          <label for="body">Isi Catatan</label>
          <textarea id="body" rows="5"></textarea>
          <small class="error" id="bodyError"></small>
        </div>

        <button type="submit" disabled>Tambah</button>
      </form>
    </section>
  `;
  }

  setupEvent() {
    const form = this.querySelector("#noteForm");
    const titleInput = this.querySelector("#title");
    const bodyInput = this.querySelector("#body");
    const submitButton = this.querySelector("button");
    const titleError = this.querySelector("#titleError");
    const bodyError = this.querySelector("#bodyError");

    const runvalidattion = () => {
      const errors = validateNote(titleInput.value, bodyInput.value);

      titleError.textContent = errors.title || "";
      bodyError.textContent = errors.body || "";

      const isValid = Object.keys(errors).length === 0;
      submitButton.disabled = !isValid;
    };

    titleInput.addEventListener("input", runvalidattion);
    bodyInput.addEventListener("input", runvalidattion);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = this.querySelector("#title").value;
      const body = this.querySelector("#body").value;

      const newNote = {
        id: `notes-` + Date.now(),
        title,
        body,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      this.dispatchEvent(
        new CustomEvent("add-note", {
          detail: newNote,
          bubbles: true,
        }),
      );

      form.reset();
      submitButton.disabled = true;
    });
  }
}

customElements.define("note-form", NoteForm);

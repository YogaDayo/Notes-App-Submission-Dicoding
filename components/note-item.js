class NoteItem extends HTMLElement {
  set note(data) {
    this._note = data;
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="note-card">
      <h3>${this._note.title}</h3>
      <p>${this._note.body}</p>
      <button class="archive-btn">
        ${this._note.archived ? "Unarchive" : "Archive"}
      </button>
    </div>
  `;

    this.querySelector(".archive-btn").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("toggle-archive", {
          detail: this._note.id,
          bubbles: true,
        }),
      );
    });
  }
}

customElements.define("note-item", NoteItem);

export function validateNote(title, body, archived) {
  const errors = {};

  if (title.trim().length < 3) {
    errors.title = "Judul minimal 3 karakter";
  }

  if (body.trim().length < 5) {
    errors.body = "Isi minimal 5 karakter";
  }

  if (archived === true) {
    errors.archived = "Catatan sudah diarsipkan";
  }

  return errors;
}

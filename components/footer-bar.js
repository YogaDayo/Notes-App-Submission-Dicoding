class FootBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer class="footer-bar">
            <p> Copyright &copy; 2026 yoga dayo</p>
        </footer>
        `;
  }
}

customElements.define("foot-bar", FootBar);

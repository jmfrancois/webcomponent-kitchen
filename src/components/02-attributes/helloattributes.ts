
export class HelloAttributes extends HTMLElement {
    public static register() {
        if (!customElements.get('hello-attributes')) {
            customElements.define('hello-attributes', HelloAttributes);
        }
    }
    // https://github.com/w3c/webcomponents/issues/565
    static get observedAttributes() {
        return ['name'];
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    get name() {
        return this.getAttribute('name') || 'world';
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log('hello-attributes.attributeChangedCallback', name, oldValue, newValue);
        switch (name) {
            case 'name':
                this.render();
                break;
            default:
                break;
        }
    }
    render() {
        this.shadowRoot.innerHTML = '';
        const p = document.createElement('p');
        const text = document.createTextNode(`Hello ${this.name}`)
        p.appendChild(text);
        this.shadowRoot.appendChild(p);
    }
    public static demo(container: HTMLElement) {
        const div = document.createElement('div');
        div.setAttribute('class', 'demo hello-attributes');
        container.appendChild(div);
        const title = document.createElement('h2');
        title.appendChild(document.createTextNode('Component which listen attribute changed'));
        div.appendChild(title);
        const hello = document.createElement('hello-attributes');
        const input = document.createElement('input');
        input.setAttribute('placeholder', 'set the name of this component');
        input.addEventListener('input', (e: InputEvent) => {
            if (input.value) {
                hello.setAttribute('name', input.value);
            } else {
                hello.removeAttribute('name');
            }
        });
        div.appendChild(input);
        div.appendChild(hello);
        const note = document.createElement('p');
        note.appendChild(document.createTextNode('Note you can\'t set the any attribute on the host during the constructor phase.'));
        div.appendChild(note);
    }

}

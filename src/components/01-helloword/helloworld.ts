
export class HelloWorld extends HTMLElement {
    public static register() {
        if (!customElements.get('hello-world')) {
            // you can t reuse the same class :(
            customElements.define('hello-world', HelloWorld);
        }
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    render() {
        // this.shadowRoot // I have it because of attachShadow call
        this.shadowRoot.innerHTML = '<p>Hello world</p>';
    }
    public static demo(container: HTMLElement) {
        const div = document.createElement('div');
        div.setAttribute('class', 'demo hello-world');
        const title = document.createElement('h2');
        title.appendChild(document.createTextNode('Basic component'))
        div.appendChild(title);
        const source = document.createElement('a');
        source.setAttribute('href', 'https://github.com/jmfrancois/webcomponent-kitchen/blob/master/src/components/01-helloword/helloworld.ts');
        source.setAttribute('class', 'source');
        div.appendChild(source);
        const hello = document.createElement('hello-world');
        div.appendChild(hello);
        container.appendChild(div);
    }
}

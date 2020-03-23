
export class HelloCallback extends HTMLElement {
    public static register() {
        if (!customElements.get('hello-cb')) {
            customElements.define('hello-cb', HelloCallback);
        }
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    connectedCallback() {
        console.log('hello-cb.connectedCallback() // Node.isConnected ? ', this.isConnected);
        this.dispatchEvent(new CustomEvent('didMount', { detail: 'hello-cb'}));
        this.render();
    }
    disconnectedCallback() {
        console.log('hello-cb.disconnectedCallback() // Node.isConnected ? ', this.isConnected);
        this.dispatchEvent(new CustomEvent('WillUnmount', { detail: 'hello-cb'}));
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = '';
        const text = document.createTextNode(`Hello connected CB. Node.isConnected ${this.isConnected}`);
        this.shadowRoot.appendChild(text);
    }
    public static demo(container: HTMLElement) {
        const div = document.createElement('div');
        div.setAttribute('class', 'demo hello-cb');
        const title = document.createElement('h2');
        title.appendChild(document.createTextNode('Component [dis]connectedCallback'));
        div.appendChild(title);
        const p = document.createElement('p');
        p.appendChild(document.createTextNode('This demo add a green border using setTimeout inside connectedCallback'));
        p.appendChild(document.createTextNode('And set the border to red on disconnectedCallback'));
        div.appendChild(p)
        const btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.appendChild(document.createTextNode('click me to toggle the webcomponent into the dom'));
        const hello = document.createElement('hello-cb');
        const addBorder = () => {
            setTimeout(() => {
                hello.setAttribute('style', 'border: 1px solid green');
            }, 500);
        };
        const removeBorder = () => {
            hello.setAttribute('style', 'border: 1px solid red');
        }
        hello.addEventListener('didMount', addBorder);
        hello.addEventListener('WillUnmount', removeBorder);
        btn.addEventListener('click', () => {
            if (div.querySelector('hello-cb')) {
                div.removeChild(hello);
            } else {
                div.appendChild(hello);
                
            }
        });
        div.appendChild(btn);
        container.appendChild(div);
    }
}

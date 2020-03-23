
export class HelloEvents extends HTMLElement {
    public static register() {
        if (!customElements.get('hello-events')) {
            customElements.define('hello-events', HelloEvents);
        }
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <h3>Click event</h3>
            <button type="button">click me</button>
            <h3>Input event</h3>
            <input type="text" />
        `;
        // const btn = this.shadowRoot.querySelector('button');
        // const input = this.shadowRoot.querySelector('input');
    }
    public static demo(container: HTMLElement) {
        const div = document.createElement('div');
        div.setAttribute('class', 'demo hello-attributes');
        container.appendChild(div);

        const title = document.createElement('h2');
        title.appendChild(document.createTextNode('Component dispatching events'));
        div.appendChild(title);
        const source = document.createElement('a');
        source.setAttribute('href', 'https://github.com/jmfrancois/webcomponent-kitchen/blob/master/src/components/01-helloevents/helloevents.ts');
        source.setAttribute('class', 'source');
        div.appendChild(source);

        const p = document.createElement('p');
        p.appendChild(document.createTextNode('This demo show a component with a button and an input inside a shadowRoot'));
        div.appendChild(p)
        const hello = document.createElement('hello-events');
        let count = 0;
        const onClick = (e: Event) => {
            console.log(e);
            if ((e.target as HTMLElement).tagName.toLowerCase() === 'hello-events') {
                count += 1;
                p.innerHTML = `I have been clicked ${count}`;
            } 
        };
        const onInput = () => {
            console.log('###');
        }
        div.addEventListener('click', onClick);
        div.addEventListener('input', onInput);
        const link = document.createElement('a')
        link.setAttribute('href', 'https://javascript.info/shadow-dom-events');
        link.innerHTML = 'ShadowDOM and Events';
        div.appendChild(link);
        div.appendChild(hello);
    }
}

import { HelloWorld } from "./components/01-helloword/helloworld";
import { HelloAttributes } from "./components/02-attributes/helloattributes";
import { HelloCallback } from "./components/03-connectecb/hellocb";
import { HelloEvents } from "./components/04-helloevents/helloevents";

const css = require('./var.css').default;
const style = document.createElement('style');
style.innerHTML = css;
const root = document.querySelector('body');
root.appendChild(style);

HelloWorld.register();
HelloWorld.demo(root);
HelloAttributes.register();
HelloAttributes.demo(root);
HelloCallback.register();
HelloCallback.demo(root);
HelloEvents.register();
HelloEvents.demo(root);
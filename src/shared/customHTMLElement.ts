class CustomHTMLElement extends HTMLElement {
  constructor() {
    super();
  }

  handleEvent(event: Event) {
    const methodName = `handle${this.capitalize(event.type)}`;

    if (typeof (this as any)[methodName] === "function") {
      ((this as any)[methodName] as Function).call(this, event);
    }
  }

  private capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

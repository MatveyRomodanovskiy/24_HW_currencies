export function createInfoElement(content, tag, type, id) {
    const element = document.createElement(tag);
    const text = document.createTextNode(content);
    element.type = type;
    element.id = id;
    element.appendChild(text);
    return element;
}
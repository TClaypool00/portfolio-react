import values from '../values.json';

export function setTitle(index) {
    document.title = `${values.pages[index].text} - ${values.title}`;
}
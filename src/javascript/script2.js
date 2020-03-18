document.write('execute script2 ')
document.write('test script2')
export var firstName = 'Michael'
export var lastName = 'Jackson'
export var year = 1958

let myName = 'Tom'
let myAge = 20
let myfn = function () {
  return 'My name is' + myName + "! I'm '" + myAge + 'years old.'
}
let myClass = class myClass {
  static a = 'yeah!'
}
export {
  myName,
  myAge,
  myfn,
  myClass
}
export default 'testxxxxxxxx'

export let counter = 3;
export function incCounter() {
    counter++;
}
export function setCounter(value) {
  counter = value;
}


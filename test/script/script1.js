const p = new Promise(function (resolve, reject) {
  resolve('success');
});

p.then(function (value) {
  console.log(value);
});

console.log('first');
sleep(2000);
console.log('second');

function sleep(delay) {
  var start = (new Date()).getTime()
  while ((new Date()).getTime() - start < delay) {
    continue
  }
}

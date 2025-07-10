import * as rx from 'rxjs';

console.log('Start!');
const urlStream = rx.of('https://api.github.com/users').pipe(
    rx.startWith('1'),
    rx.startWith('2'),
    rx.startWith('3'),
    rx.startWith(null),
)
urlStream.subscribe(console.log);
// const combineStream = urlStream.pipe(
//     rx.combineLatestWith(rx.timer(1000).pipe(rx.map(() => 'hello'))),
// ).subscribe(console.log);




// async function pull() {
//     const url = 'https://api.github.com/users';
//     const res = await fetch(url);
//     const json = await res.json();
//     console.log(json);
// }

// pull();
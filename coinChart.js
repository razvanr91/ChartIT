// let options = {
//     "method": "GET",
//     "hostname": "rest.coinapi.io",
//     "path": "/v1/assets",
//     "headers": { 'X-CoinAPI-Key': 'B33C5A0B-A3F4-4DFB-8D5F-8C1955B6FFA8' }
// };
// const coinsApi = fetch(('https://rest.coinapi.io/v1/assets'), options);



// getCoins();

// async function getCoins() {
//     await coinsApi.then(response => {
//         return response.json();
//     }).then(promise => {
//         for (let coin of promise) {
//             if (coin.type_is_crypto === 1) {
//                 coins.push(coin);
//             }
//         }

//     }).finally(promise => {
//         return promise;
//     });
// }

// async function getBitcoin() {
//     await coinsApi.then(response => {
//         return response.json();
//     }).then(promise => {
//         for(let i = 0; i < 10; i++) {
//             console.log(promise[i]);
//         }
//     })
// };

// getBitcoin();

// console.log(bitcoin);

// console.log(coins);
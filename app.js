// const { default: axios } = require("axios");

let numberOfDays = 60;
let count = 0;

const ctx = document.getElementById('chart').getContext('2d');
let data;
let countryCode = 'RO';
let options = {
    method: 'GET',
    url: `https://corona-api.com/countries/${countryCode}`
}

async function getData() {
    try {
        let response = await axios.request(options);
        return response;
    } catch (error) {
        console.error(error);
    }
}

data = await axios.request(options).then(response => {
    return response.data.data;
})

console.log(data);
let days = [];
let cases = [];
let deaths = [];
let timeline = data.timeline;

// timeline.forEach(day => {
//     days.push(day.date);
//     cases.push(day.new_confirmed);
//     deaths.push(day.new_deaths)
//     count++;
//     if (count === 30) {
//         return;
//     }
// })

for(let day of timeline) {
    days.push(day.date);
    cases.push(day.new_confirmed);
    deaths.push(day.new_deaths)
    count++;
    if (count === numberOfDays) {
        break;
    }
}


let updatedAt = new Date(data.updated_at).toDateString();
console.log(updatedAt);

days.reverse();
cases.reverse();
deaths.reverse();
console.log(deaths)

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            label: [`# of new confirmed cases as of ${updatedAt}`],
            data: cases,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }, {
            label: `# of deaths as of ${updatedAt}`,
            data: deaths,
            fill: true,
            backgroundColor: 'rgba(0,0,0)',
            borderColor: 'rgb(255, 0, 55)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
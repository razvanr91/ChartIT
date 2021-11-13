// const { default: axios } = require("axios");

let numberOfDays = 60;
let count = 0;

let dateSpan = document.getElementById('date');

const ctx = document.getElementById('chart').getContext('2d');
let countryCode = 'RO';
let options = {
    method: 'GET',
    url: `https://corona-api.com/countries?include=timeline`
}

let data = await getData();

async function getData() {
    try {
        return await axios.request(options).then(response => {
            return response.data.data;
        });
    } catch (error) {
        console.error(error);
    }
}

console.log(data);

let ROMANIA_DATA = await data.find(country => {
    return country.name === "Romania";
})

console.log(ROMANIA_DATA)
let days = [];
let cases = [];
let deaths = [];
let timeline = ROMANIA_DATA.timeline;
let updatedAt;
let targetIds = []


console.log(ROMANIA_DATA.timeline)

async function getDailyData(timeline) {
    for (let day of timeline) {
        days.push(day.date);
        cases.push(day.new_confirmed);
        deaths.push(day.new_deaths)
        count++;
        if (count === numberOfDays) {
            break;
        }
    }
    days.reverse();
    cases.reverse();
    deaths.reverse();
    updatedAt = new Date(ROMANIA_DATA.updated_at).toLocaleDateString();
    dateSpan.innerHTML = updatedAt;
}

async function setData(countryData) {
    countryData;
    getDailyData(timeline);


}

setData(ROMANIA_DATA);

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            label: [`# of new confirmed cases`],
            data: cases,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }, {
            label: `# of deaths`,
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
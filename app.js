// const { default: axios } = require("axios");

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

let timeline = data.timeline;

timeline.forEach(day => {
    days.push(day.date);
    cases.push(day.new_confirmed);
})

days.reverse();
cases.reverse();
console.log(days)

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            label: '# of Votes',
            data: cases,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
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
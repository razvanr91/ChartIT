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


let ROMANIA_DATA = await data.find(country => {
    return country.name === "Romania";
})

let targetObject = createObject();

let days = [];
let cases = [];
let deaths = [];
let timeline = ROMANIA_DATA.timeline;
let updatedAt;
let updatedHour;

async function getDailyData(timeline) {
    for (let day of timeline) {
        days.push(day.date);
        cases.push(day.new_confirmed);
        deaths.push(day.new_deaths)
        ++count;
        if (count === numberOfDays) {
            break;
        }
    }
    days.reverse();
    cases.reverse();
    deaths.reverse();
    updatedAt = new Date(ROMANIA_DATA.updated_at).toLocaleDateString();
    updatedHour = new Date(ROMANIA_DATA.updated_at).toLocaleTimeString();
    updatedAt += `-${updatedHour}`;
    dateSpan.innerHTML = updatedAt;
}

function createObject() {
    return {
        'population': numberWithSeparator(ROMANIA_DATA.population),
        'casesPerMil': numberWithSeparator(ROMANIA_DATA.latest_data.calculated.cases_per_million_population),
        'recoveryRate': ROMANIA_DATA.latest_data.calculated.recovery_rate,
        'deathRate': ROMANIA_DATA.latest_data.calculated.death_rate,
        'recovered': numberWithSeparator(ROMANIA_DATA.latest_data.recovered),
        'totalDeaths': numberWithSeparator(ROMANIA_DATA.latest_data.deaths),
        'activeCases': numberWithSeparator(ROMANIA_DATA.latest_data.critical)
    };
}

function numberWithSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function setTableData(targetObject) {
    for (let key in targetObject) {
        if (targetObject.hasOwnProperty(key)) {
            document.getElementById(key).innerHTML = targetObject[key];
        }
    }
}

async function setData(countryData) {
    countryData;
    getDailyData(timeline);
    setTableData(targetObject);
}

setData(ROMANIA_DATA);

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            label: [`cazuri noi confirmate`],
            data: cases,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }, {
            label: `decese noi`,
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
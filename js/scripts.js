const url = "https://api.thedogapi.com/v1/breeds/";
const apiKey = "live_anHbEgCLTK9xBPpYclvf2LFsSq8T8WkTrFxIXeJAzlv6pfsGzCZlR6PhJFKndxwY";

const sendValues = {
    method: 'GET',
    headers: {
        'Content-type': 'application/json',
        'x-api-key': `${apiKey}`
    },
}

const getAllBreeds = async() => {    
    const response = await fetch(url, sendValues);
    const data = await response.json();
}

getAllBreeds();
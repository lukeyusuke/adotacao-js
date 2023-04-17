const url = "https://api.thedogapi.com/v1/breeds/53";
const apiKey = "live_anHbEgCLTK9xBPpYclvf2LFsSq8T8WkTrFxIXeJAzlv6pfsGzCZlR6PhJFKndxwY";

const requestValues = {
    method: 'GET',
    headers: {
        'Content-type': 'application/json',
        'x-api-key': `${apiKey}`
    },
}
const apiIntegration = () => {
    const apiData = () => {
        const apiKey = "live_anHbEgCLTK9xBPpYclvf2LFsSq8T8WkTrFxIXeJAzlv6pfsGzCZlR6PhJFKndxwY";
    
        const sendValues = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': `${apiKey}`
            },
        }

        getAllBreeds(sendValues);
    }
    
    const getAllBreeds = async(sendValues) => {    
        const response = await fetch("https://api.thedogapi.com/v1/breeds/", sendValues);
        const data = await response.json();
    
        showBreeds(data);
    }
    
    showBreeds = (data) => {
        const dogData = data.map((dog) => {
            console.log(dog.name);
            console.log(dog.image.url);
        })
    }

    getAllBreeds();
}

apiIntegration();


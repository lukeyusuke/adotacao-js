const searchContent = document.querySelector('.search-content__dogs');
const dogsBox = document.querySelector('.search-content__dogs__box');

const apiIntegration = () => {
    const apiData = () => {
        const apiKey = 'live_anHbEgCLTK9xBPpYclvf2LFsSq8T8WkTrFxIXeJAzlv6pfsGzCZlR6PhJFKndxwY';
        
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
        try {
            const response = await fetch('https://api.thedogapi.com/v1/breeds/', sendValues);
            const data = await response.json();
            showBreeds(data);
            
        } catch(error) {
            console.error(`Falha na requisição: ${error}`);
        } 
        
    }
    
    showBreeds = (data) => {
        let dogs = [];
        try {
            dogs = data.map((dog) => {
                const dogBox = dogsBox.cloneNode(true);
                const dogImg = dogBox.querySelector('[data-image]');
                const dogName = dogBox.querySelector('[data-name]');
                const dogLifeSpan = dogBox.querySelector('[data-life]');
                const dogTemperament = dogBox.querySelector('[data-temperament]');

                dogImg.src = dog.image.url;
                dogName.innerText = dog.name;
                dogLifeSpan.innerText = dog.life_span;
                dogTemperament.innerText = dog.temperament;
                searchContent.appendChild(dogBox);

            });    
        } catch (error){
            console.error(`Algo deu errado: ${error}`);
        }
    }
    
    apiData();
}

apiIntegration();
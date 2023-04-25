const searchContent = document.querySelector('.search-content__dogs');
const dogsBox = document.querySelector('.search-content__dogs__box');
const searchInput = document.querySelector('.search-content__quest__input');

const apiIntegration = () => {
    let dogs = [];

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
    
    const showBreeds = data => {
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
                return {name: dog.name, box: dogBox};
            });
        } catch (error){
            console.error(`Algo deu errado: ${error}`);
        }
    }

    searchInput.addEventListener('input', e => {
        const value = e.target.value.toLowerCase()
        dogs.forEach(dog => {
            const isVisible = dog.name.toLowerCase().includes(value);
            dog.box.classList.toggle("hide", !isVisible);
        })
    })

    apiData();
}

apiIntegration();
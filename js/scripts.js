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
            console.log(data);
        } catch(error) {
            console.error(`Falha na requisição: ${error}`);
        } 
    
    }
    
    showBreeds = (data) => {
        const searchContent = document.querySelector('.search-content__dogs');

        try {
            const dogData = data.map((dog) => {
                const dogBox = document.createElement('div');
                dogBox.setAttribute('class', 'search-content__dogs__box');
    
                const dogImage = document.createElement('img');
                dogImage.setAttribute('class', 'search-content__dogs__img');
                dogImage.setAttribute('src', dog.image.url);
    
                const dogName = document.createElement('h3');
                dogName.setAttribute('class', 'search-content__dogs__h3');
    
                const dogTemperament = document.createElement('p');
                dogTemperament.setAttribute('class', 'search-content__dogs__p');
    
                const dogLifeSpan = document.createElement('span');
                dogLifeSpan.setAttribute('class', 'search-content__dogs__span');

                const dogBtn = document.createElement('button');
                dogBtn.setAttribute('class', 'search-content__dogs__btn');
    
                searchContent.appendChild(dogBox);
                dogBox.appendChild(dogImage);
                dogBox.appendChild(dogName);
                dogBox.appendChild(dogLifeSpan);
                dogBox.appendChild(dogTemperament);
                dogBox.appendChild(dogBtn);
    
                dogName.innerText = dog.name;
                dogLifeSpan.innerText = dog.life_span;

                if(dog.temperament == undefined){
                    dogTemperament.innerHTML = 'Características não encontradas';
                }else{
                    dogTemperament.innerText = dog.temperament;
                }
                dogBtn.innerText = 'Adotar';

            });    
        } catch (error){
            console.error(`Algo deu errado: ${error}`);
        }
    }
    
    apiData();
}

apiIntegration();


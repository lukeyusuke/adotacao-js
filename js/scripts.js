const searchContent = document.querySelector('.search-content__dogs');
const dogsBox = document.querySelector('.search-content__dogs__box');
const searchInput = document.querySelector('.search-content__quest__input');
const showBtn = document.querySelector('.search-content__btn');

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
                
                if(dog.id > 8){
                    dogBox.classList.add('hide');
                }

                dogImg.src = dog.image.url;
                dogName.textContent = dog.name;
                dogLifeSpan.textContent = dog.life_span;
                dogTemperament.textContent = dog.temperament;
                searchContent.appendChild(dogBox);

                return {id: dog.id, name: dog.name, box: dogBox};
            });
        } catch (error){
            console.error(`Algo deu errado: ${error}`);
        }
    }

    searchInput.addEventListener('input', e => {
        const value = e.target.value.toLowerCase()
        dogs.forEach(dog => {
            const isVisible = dog.name.toLowerCase().includes(value);
            dog.box.classList.toggle('hide', !isVisible);

            if(value == '' && dog.id > 8){
                dog.box.classList.add('hide');
            };
        })
    })
    
    showBtn.addEventListener('click', (e) => {
        dogs.forEach(dog => {
            dog.box.classList.toggle('hide');
            
            if(!dog.box.classList.contains('hide')){
                return showBtn.textContent = "Ver menos";
            }

            showBtn.textContent = "Ver mais";
        })
    })

    apiData();
}

apiIntegration();
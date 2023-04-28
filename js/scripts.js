const apiIntegration = () => {

    const searchContent = document.querySelector('.search-content__dogs');
    const dogsBox = document.querySelector('.search-content__dogs__box');
    const searchInput = document.querySelector('.search-content__quest__input');
    const cleanInput = document.querySelector('.search-content__quest__image');
    const showBtn = document.querySelector('.search-content__btn');

    let dogs = [];

    const apiData = () => {
        const url = 'https://api.thedogapi.com/v1/breeds/';
        const apiKey = 'live_anHbEgCLTK9xBPpYclvf2LFsSq8T8WkTrFxIXeJAzlv6pfsGzCZlR6PhJFKndxwY';
        
        const sendValues = {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': `${apiKey}`
            },
        }
        
        getAllBreeds(url, sendValues);
    }
    
    const getAllBreeds = async(url, sendValues) => {
        try {
            const response = await axios.get(url, sendValues);
            showBreeds(response.data);
            
        } catch(error) {
            console.error(`Falha na requisição: ${error}`);
        } 
        
    }
    
    const showBreeds = data => {
        try {
            dogs = data.map((dog) => {
                console.log(data);
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

                if(dog.temperament == null){
                    dogTemperament.textContent = 'Não possui informações adicionais';
                }

                dogTemperament.textContent = dog.temperament;
                searchContent.appendChild(dogBox);

                return {id: dog.id, name: dog.name, box: dogBox};
            });
        } catch (error){
            console.error(`Algo deu errado: ${error}`);
        }
    }

    searchInput.addEventListener('input', e => {
        let value = e.target.value.toLowerCase();
        cleanInput.classList.add('active');

        if(value !== ''){
            cleanInput.classList.remove('active');
        }

        dogs.forEach(dog => {
            const isVisible = dog.name.toLowerCase().includes(value);
            dog.box.classList.toggle('hide', !isVisible);

            if(value == '' && dog.id > 8){
                dog.box.classList.add('hide');
            };
        })

        cleanInput.addEventListener('click', () => {
            searchInput.value = '';
            cleanInput.classList.add('active');

            dogs.forEach(dog => {
                dog.box.classList.add('hide');
                if(dog.id <= 8){
                    dog.box.classList.remove('hide');
                }
            })
        })
    })
    
    showBtn.addEventListener('click', () => {
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
const contentEl = document.querySelector("#content");

const clearContentEl = () => {
    if(contentEl.childElementCount > 0)
        contentEl.firstElementChild.remove();
}

const setImage = (src) => {
    const imageEl = document.createElement('img');
    imageEl.src = src;
    clearContentEl();
    contentEl.appendChild(imageEl);
}

const setBreedList = (breeds, getAll) => {
    const olEl = document.createElement('ol');
    console.log(breeds);
    if(!getAll) {
        if(breeds.length > 0) {
            breeds.forEach((breed) => {
                const liEl = document.createElement('li');
                liEl.innerText = breed;
                olEl.appendChild(liEl);
            });

            clearContentEl();
            contentEl.appendChild(olEl);
        } else {
            setError("No sub-breeds found!")
        }
    } else if(getAll) {
        Object.keys(breeds).forEach((breed) => {
            const ulEl = document.createElement('ul');
            const liEl = document.createElement('li');
            liEl.innerText = breed;
            if(breeds[breed].length > 0) {
                const subLiEl = document.createElement('li');
                subLiEl.innerText = breeds[breed];
                ulEl.appendChild(subLiEl);
                liEl.appendChild(ulEl);
            }
            olEl.appendChild(liEl);
        });
        clearContentEl();
        contentEl.appendChild(olEl);
    }
}

const setError = (message) => {
    const errorEl = document.createElement("p");
    errorEl.innerText = message;
    clearContentEl();
    contentEl.appendChild(errorEl);
}

const getRandomImage = async () => {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const jsonData = await response.json();
        if(jsonData.status !== "success")
            throw Error("Image not found")
        setImage(jsonData.message);
    } catch (error) {
        console.log(error);
        setError(error.message);
    }
}

const getBreedImage = async (breed) => {
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        const jsonData = await response.json();
        clearContentEl();
        setImage(jsonData.message);
        if(jsonData.status !== "success")
            throw Error("Breed not found!");
    } catch (error) {
        setError(error.message);
        console.log(error);
    }
}

const getSubBreeds = async (breed) => {
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/list`);
        const jsonData = await response.json();
        if(jsonData.status !== "success") {
            throw Error("Breed not found!")
        }
        setBreedList(jsonData.message, false);
    } catch (error) {
        setError(error.message);
        console.log(error);
    }
}

const getAllBreeds = async () => {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const jsonData = await response.json();
        if(jsonData.status !== "success")
            throw Error("Unknown error occurred.");
        setBreedList(jsonData.message, true);
    } catch (error) {
        setError(error.message);
        console.log(error);
    }
}

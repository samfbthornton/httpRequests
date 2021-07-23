"use strict";

const baseURL = "http://localhost:8080";
const idOfBeer = document.querySelector("#idOfBeer");
const nameOfBeer = document.querySelector("#nameOfBeer");
const brewery = document.querySelector("#brewery");
const beerName = document.querySelector("#beerName");
const abv = document.querySelector("#abv");
const nice = document.querySelector("#nice");
const get = document.getElementById("#get");
const output = document.querySelector("#history");
const getAllBeers = document.querySelector("#getAllBeers");
const getBeerByName = document.querySelector("#getBeerByName");

axios.get(`${baseURL}/getAllBeers`)
    .then(res => {//handle response with callback. waits for responds before working
        const beers = res.data;

        beers.forEach(beer => renderCraftBeer(beer));

        console.log("ALL BEERS DATA: ", res.data);
    }).catch(err => console.log(err));//handle error


const renderCraftBeer = (beer) => {
    const newCraftBeer = document.createElement("p");

    newCraftBeer.textContent = JSON.stringify(beer);

    getAllBeers.appendChild(newCraftBeer);
}


const idField = () => {

    axios.get(`${baseURL}/getBeerByID/${idOfBeer.value}`)
        .then(res => {
            const beer = res.data;

            brewery.value = beer.brewery;
            beerName.value = beer.name;
            abv.value = beer.abv;
            nice.value = beer.nice;

            console.log("BEER DATA: ", beer);
            writeHistory(brewery.value, beerName.value, abv.value, nice.value);
        }).catch(err => console.log(err));
}

document.querySelector("section#getBeerById > button").addEventListener("click", idField);

const nameField = () => {

    axios.get(`${baseURL}/getBeerByName/${nameOfBeer.value}`)
        .then(res => {
            const beers = res.data;

            beers.forEach(beer => renderCraftBeerByName(beer));

            // brewery.value = beer.brewery;
            // beerName.value = beer.name;
            // abv.value = beer.abv;
            // nice.value = beer.nice;

            console.log("BEER DATA: ", beer);
            writeHistory(JSON.stringify(beer));
        }).catch(err => console.log(err));
}

document.querySelector("section#getBeerByName > button").addEventListener("click", nameField);

const renderCraftBeerByName = (beer) => {
    const newCraftBeerByName = document.createElement("p");

    newCraftBeerByName.textContent = JSON.stringify(beer);

    getBeerByName.appendChild(newCraftBeerByName);
}


const writeHistory = (brewery, beerName, abv, nice) => {
    const newHistory = document.createElement('p');
    newHistory.textContent = `Brewery: ${brewery}, Name: ${beerName}, ABV: ${abv}, IT'S NICE? ${nice}`;

    output.appendChild(newHistory);
}
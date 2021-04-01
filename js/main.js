function displayTimeResult(bestTime, time) {
    const format = (ms) => moment("2015-01-01").startOf('day').milliseconds(ms).format('mm:ss.S');

    if (bestTime === time) {
        return format(time);
    }
    return `+${format(time - bestTime)}`;
}


function showResults(data) {
        
    const container = document.querySelector('#person-container');
    container.innerHTML = '';

    data.athletes.forEach( function(person, i) {   

        const trElement = document.createElement('tr');
        trElement.id = "person-container";


        createElementTh(trElement, person.rank);
        createElementTh(trElement, person.firstname);
        createElementTh(trElement, person.lastname);
        createElementTh(trElement, person.nat);
        createElementTh(trElement, person.shooting);
        createElementTh(trElement, person.hit);
        createElementTh(trElement, displayTimeResult(data.bestTime, person.time));
        // createElementTh(trElement, person.time);
        
        container.appendChild(trElement)
        trElement.className = "active";
    });  
}


function ready(callbackFunction){
    if(document.readyState != 'loading')
       callbackFunction()
    else
       document.addEventListener("DOMContentLoaded", callbackFunction)
}

ready(() => {

    const input = document.querySelector('.input__search');
    const formElement = document.querySelector('#form');
    const sortColmns = document.querySelectorAll('.sort');

    const state = {
        searchRegExp: new RegExp(input.value, 'giu'),
        sorting: {
            column: 'time',
            isAscending: true,
        },
        data: generatePeopleArray(getRandomNumber(10, 100)),
    }

    const render = () => {
        return showResults({
            ...state.data, 
            athletes: state.data.athletes
                .filter(({firstname, lastname}) => (`${firstname} ${lastname}`.search(state.searchRegExp) !== -1))
                .sort((prev, next) => {
                    let valueA = prev[state.sorting.column];
                    let valueB = next[state.sorting.column];
                    if (valueA < valueB) {
                      return state.sorting.isAscending? -1: 1;
                    }
                    if (valueA > valueB) {
                      return state.sorting.isAscending? 1: -1;
                    }
                  
                    return 0;
                }),
        });
    }


    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        state.searchRegExp = new RegExp(input.value, 'giu');
        render();
    });

    const handleSort = (event) => {
        event.preventDefault();
        if (state.sorting.column !== event.target.dataset.sortKey) {
            state.sorting.column = event.target.dataset.sortKey;
            state.sorting.isAscending = true;
        } else {
            state.sorting.isAscending = !state.sorting.isAscending;
        }
        render();
    }
    sortColmns.forEach((element) => {
        element.addEventListener('click', handleSort);
    })

    render();
});

function createElementTh(trElement, value) {
    var nameElement = document.createElement('td');
    nameElement.textContent = value;
    trElement.appendChild(nameElement)
}
























// function showResults(event) {
//     event.preventDefault();

//     let n = getRandomNumber(100);
//     if (n !=0) {
//         let arr = generatePeopleArray(n);

        
//         const container = document.querySelector('#person-container');
//         container.innerHTML = '';

//         arr.forEach ( function(person, i) {   

//             const trElement = document.createElement('tr');
//             trElement.id = "person-container";


//             createElementTh(trElement, person.rank);
//             createElementTh(trElement, person.firstname);
//             createElementTh(trElement, person.lastname);
//             createElementTh(trElement, person.nat);
//             createElementTh(trElement, person.shooting);
//             createElementTh(trElement, person.hit);
//             createElementTh(trElement, moment("2015-01-01").startOf('day').seconds(person.time).format('HH:mm:ss'));
//             // createElementTh(trElement, person.time);
            
//             container.appendChild(trElement)
//             trElement.className = "active";
//         });  
//     }
    

// }


// function ready(callbackFunction){
//     if(document.readyState != 'loading')
//        callbackFunction()
//     else
//        document.addEventListener("DOMContentLoaded", callbackFunction)
// }

// ready(() => {
//     // const form = document.getElementById('form');
//     // form.addEventListener('submit', showResults);
//     window.onload = showResults;
// });

// function createElementTh(trElement, value) {
//     var nameElement = document.createElement('td');
//     nameElement.textContent = value;
//     trElement.appendChild(nameElement)
// }

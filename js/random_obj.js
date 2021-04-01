const FIRST_NAME = ['Dima', 'Lera', 'Sasha', 'Jama', 'Jon', 'Bob'];
const LAST_NAME = ['Ivanov', 'Serov', 'Pupkin', 'Gele', 'Syrotkin', 'Revun'];
const NAT = ['BLR', 'USA', 'NOR', "ITA", "UKR", 'GER', 'CAN']; 


function getRandomItem(array) {
    return array[getRandomNumber(0, array.length)]; 
}
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomShooting() {
    let result = [];
    for (let i = 0; i<4; i++) {
        result.push(getRandomNumber(0, 4));
    };
    return result;
};

function hit(arr) {
    let result = 0;
    for (i = 0; i<arr.length; i++) {
        if (arr[i] != 0) {
            result+= arr[i];
        }
    }
    return result;
};

function randomTime() {
    const minTime = 15 * 60 * 1000;  // 15 minutes
    const maxTime = 50 * 60 * 1000;  // 50 minutes
    return getRandomNumber(minTime, maxTime);
};


function generatePeopleArray(n) {   
    let athletes = [];
    for (let i = 0; i<n ; i++) {
        let shooting = getRandomShooting();
        let person = {
            lastname: getRandomItem(LAST_NAME),
            firstname: getRandomItem(FIRST_NAME),
            nat: getRandomItem(NAT), 
            shooting: shooting,
            hit: hit(shooting),
            time: randomTime(), 

        };
        
        athletes.push(person); 
    }
    athletes.sort((prev, next) => prev.time - next.time);
    athletes.map((person, index) => {
        person.rank = index + 1;
        return person;
    });
    return { athletes, bestTime: athletes[0].time};
    
}

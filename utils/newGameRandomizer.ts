

export const newGameRandomizer = () => {
    let numbersToDrawFrom = [1,2,3,4,5,6,7,8];

    let numbersForGame = '';

    for (let i = 8; i > 3; i--) {
        const index = Math.floor(Math.random() * i);
        numbersForGame += numbersToDrawFrom[index];
        numbersToDrawFrom.splice(index,1);
    }

    return numbersForGame;
}


class Dice {

    constructor(numDice, sides) {
        this.numDice = numDice;
        this.sides = sides;
    }

    *roll() {

        if (this.numDice === 0) {
            return;
        }
        
        const counter = new Array(this.numDice).fill(0);
        while (true) {
            
            // save to outcomes
            yield counter.reduce((array, idx) => {
                array.push(this.sides[idx]);
                return array;
            }, []);

            // find next result
            for (let i = 0; i < this.numDice; i++) {
                // is last side
                if (counter[i] === this.sides.length - 1) {
                    // stop on last dice
                    if (i === this.numDice - 1) {
                        return;
                    } 
                    // continue to next dice
                    else {
                        counter[i] = 0;
                    }
                } 
                // increment one and continue
                else {
                    counter[i]++;
                    break;
                }
            }
        }
    }
}

class XWingDice extends Dice {
    avg(testFn) {
        return this.outcomes.reduce(testFn, 0) / this.outcomes.length;
    }
}

class RedDice extends XWingDice {
    constructor(numDice) {
        super(numDice, ['C','H','H','H','F','F','B','B']);
        // super(numDice, ['H','H','F','B']);
    }

    static normal(numDice, {
        availableFocuses=0,
        availableRerolls=0,
    } = {}) {
        
        const results = [{
            hits: 0,
            rolls: 0,
        }];
        
        for (const roll of new RedDice(numDice).roll()) {
            
            let focuses = availableFocuses;
            let misses = 0;
            results[0].rolls++;
            
            for (const dice of roll) {
                if (dice === 'C' || dice === 'H') {
                    results[0].hits++;
                }

                else if (focuses >= 1 && dice === 'F') {
                    results[0].hits++;
                    focuses--;
                }

                else {
                    misses++;
                }
            }
            
            let rerollDice = availableRerolls > misses ? misses : availableRerolls;

            for (let i = 1; i <= rerollDice; i++) {

                if (results[i] === undefined) {
                    results[i] = {
                        hits: 0,
                        total: 0,
                        rolls: 0,
                    };
                }
            
                results[i].rolls++;

                for (const roll of new RedDice(1).roll()) {

                    results[i].total++;

                    for (const dice of roll) {;
    
                        if (dice === 'C' || dice === 'H') {
                            results[i].hits++;
                        }

                        else if (focuses >= 1 && dice === 'F') {
                            results[i].hits++;
                            focuses--;
                        }
                    }
                }
            }
        }

        // console.log(results);

        return results.reduce((acc, val, idx) => {
            let avg;
            if (idx === 0) {
                avg = val.hits / val.rolls;
            } else {
                avg = (val.rolls / results[0].rolls) * (val.hits / val.total)
            }
            console.log(avg);
            return acc + avg;
        }, 0); 
    } 
}

class GreenDice extends XWingDice {
    constructor() {
        super(['E','E','E','F','F','B','B','B']);
    }

    isEvade(result, hasFocus=false) {
        return result === 'E' || hasFocus === true && result === 'F';
    }
}


const avg = RedDice.normal(3, {
    availableFocuses: 1,
    availableRerolls: 1,
});
console.log('');
console.log(avg);

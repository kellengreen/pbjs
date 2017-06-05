class Dice {

    constructor(numDice, sides) {
        this.numDice = numDice;
        this.sides = sides;
    }

    *roll() {
        const counter = new Array(this.numDice).fill(0);
        
        let run = this.numDice === 0 ? false : true;
        while (run) {
            
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
                        run = false;
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
    }

    static normal(numDice, {
        spendableFocuses=0,
        availableRerolls=0,
    } = {}) {
        
        let rollHits = 0;
        let rollCount = 0;
        
        let rerollHits = 0;
        let rerollCount = 0;
        
        for (const roll of new RedDice(numDice).roll()) {
            
            let rollFocuses = spendableFocuses;
            let misses = 0;
            rollCount++;
            
            for (const dice of roll) {
                if (dice === 'C' || dice === 'H') {
                    rollHits++;
                }

                else if (rollFocuses >= 1 && dice === 'F') {
                    rollHits++;
                    rollFocuses--;
                }

                else {
                    misses++;
                }
            }
            

            if (misses > availableRerolls) {
                // misses = availableRerolls;
            }

            for (const reroll of new RedDice(misses).roll()) {
                rerollCount++;
                for (const dice of reroll) {
                    if (dice === 'C' || dice === 'H') {
                        rerollHits++;
                    }

                    else if (rollFocuses >= 1 && dice === 'F') {
                        rerollHits++;
                        rollFocuses--;
                    }
                }
            }
        }

        const rollAvg = rollHits / rollCount;
        const rerollAvg = rerollHits / rerollCount || 0;
        const totalAvg = rollAvg + (rerollAvg * (1 - rollAvg));

        console.log(rollHits); 
        console.log(rollCount);
        console.log(rollAvg);
        console.log('');
        console.log(rerollHits); 
        console.log(rerollCount);
        console.log(rerollAvg);
        console.log('');
        console.log(totalAvg);
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


RedDice.normal(2, {
    spendableFocuses: 0,
    availableRerolls: Infinity,
});


// let c = 0;
// let i = 0;
// while (true) {
//     if (Math.random() < .5) {
//         i++
//     } else {
//         if (Math.random() >= .5) {
//             i++
//         } 
//     }
//     c++; 
//     console.log(i / c)
// }
// console.log(red.avg(red.normal({tl:true})));
// console.log(red.avg(red.normal({focus:true})));
// console.log(red.avg(red.normal({focus:true, tl:true})));
// console.log(red.avg(red.poe()));

// console.log(new RedDice(1).outcomes)
// console.log(new RedDice(0).outcomes)

// for (const result of results) {
//     console.log(result);
// }
// console.log(`Total Results: ${results.length}`);
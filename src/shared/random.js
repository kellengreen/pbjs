function pRandIntBetween(min, max) {
    /**
     * @param {int} min
     * @param {int} max
     * @return {int} 
     */
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

exports = {
    pRandIntBetween,
}
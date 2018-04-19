'use strict';

/**
 * Возвращает true если слово попадается в заданной головоломке.
 * Каждое слово может быть построено при помощи прохода "змейкой" по таблице вверх, влево, вправо, вниз.
 * Каждый символ может быть использован только один раз ("змейка" не может пересекать себя).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (первая строка)
 *   'REACT'     => true   (начиная с верхней правой R и дальше ↓ ← ← ↓)
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (первая колонка)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    function rec(exclude) {
        if (searchStr.length === exclude.length)
            return true;
        let pos = exclude[exclude.length - 1];
        for (let val of [[0, 1], [1, 0], [0, -1], [-1, 0]])
            if (
                pos[0] + val[0] >= 0 && pos[0] + val[0] < puzzle.length &&
                pos[1] + val[1] >= 0 && pos[1] + val[1] < puzzle[pos[0] + val[0]].length &&
                !exclude.some(v => v[0] === pos[0] + val[0] && v[1] === pos[1] + val[1]) &&
                puzzle[pos[0] + val[0]][pos[1] + val[1]] === searchStr[exclude.length]
            )
                if (rec(exclude.concat([[pos[0] + val[0], pos[1] + val[1]]])))
                    return true;
    }
    
    for (let i = 0; i < puzzle.length; i++)
        for (let j = 0; j < puzzle[i].length; j++)
            if (puzzle[i][j] === searchStr[0] && rec([[i, j]]))
                return true;
    return false;
}


/**
 * Возвращает все перестановки заданной строки.
 * Принимаем, что все символы в заданной строке уникальные.
 * Порядок перестановок не имеет значения.
 *
 * @param {string} chars
 * @return {Iterable.<string>} все возможные строки, построенные из символов заданной строки
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
    function* rec(str) {
        if (str.length === chars.length)
            yield str;
        else
            for (let i = 0; i < chars.length; i++)
                if (str.indexOf(chars[i]) < 0)
                    yield *rec(str + chars[i]);
    }
    
    yield *rec('');
}


/**
 * Возвращает наибольшую прибыль от игры на котировках акций.
 * Цены на акции храняться в массиве в порядке увеличения даты.
 * Прибыль -- это разница между покупкой и продажей.
 * Каждый день вы можете либо купить одну акцию, либо продать любое количество акций, купленных до этого, либо ничего не делать.
 * Таким образом, максимальная прибыль -- это максимальная разница всех пар в последовательности цен на акции.
 *
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (купить по 1,2,3,4,5 и затем продать все по 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (ничего не покупать)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (купить по 1,6,5 и затем продать все по 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    let result = 0,
        quotesSorted = quotes.slice(0).sort((a, b) => b - a);
    while (quotes.length) {
        while (quotes.indexOf(quotesSorted[0]) < 0)
            quotesSorted.shift();
        let inx = quotes.indexOf(quotesSorted[0]);
        result += quotesSorted[0] * inx;
        for (let i = 0; i < inx; i++)
            result -= quotes[i];
        quotes.splice(0, inx + 1);
    }
    return result;
}


/**
 * Класс, предосатвляющий метод по сокращению url.
 * Реализуйте любой алгоритм, но не храните ссылки в хранилище пар ключ\значение.
 * Укороченные ссылки должны быть как минимум в 1.5 раза короче исходных.
 *
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: function(url) {
        let result = '',
            char = 0;
        for (let i = 0; i < url.length; i++) {
            char = char << this.BYTES | (this.urlAllowedChars.indexOf(url[i]) + 1);
            if (i % 2 || i === url.length - 1) {
                result += String.fromCharCode(char);
                char = 0;
            }
        }
        return result;
    },
    
    decode: function(code) {
        const _AND = ~(~0 << this.BYTES);
        let result = '';
        for (let i = 0; i < code.length; i++) {
            let char = code.charCodeAt(i);
            let c = char >> this.BYTES & _AND;
            if (c)
                result += this.urlAllowedChars[c - 1];
            c = char & _AND;
            result += this.urlAllowedChars[c - 1];
        }
        return result;
    },
    
    BYTES: 7
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};

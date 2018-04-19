'use strict';

/**
 * Возвращает массив из 32 делений катушки компаса с названиями.
 * Смотрите детали здесь:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Пример возвращаемого значения :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
    const sides = ['N','E','S','W'];  // use array of cardinal directions only!
    let res = [], i, abbr;
    for (i = 0; i < 32; i++)
    {
        if (i % 8 === 0)
            abbr =  sides[i / 8];
        else if (i % 4 === 0)
            abbr = sides[(Math.floor((i + 8) / 16) % 2) * 2] + 
                   sides[(Math.floor(i / 16) * 2) + 1];
        else if (i % 2 === 0)
            abbr = sides[Math.floor((i+2) / 8) % 4] +
                               sides[(Math.floor((i + 6) / 16) % 2) * 2] + 
                               sides[(Math.floor((i - 2) / 16) * 2) + 1];
        else
        {
            if (((i % 16) - 1) % 14 === 0)
                abbr = sides[(Math.floor((i + 1) / 16) % 2) * 2] + "b" + 
                       sides[(((i % 4) % 3) + Math.floor(i / 8)) % 4];
            else 
            {
                if (((i % 8) - 1) % 6 === 0)
                    abbr = sides[(i % 2) + Math.floor(i / 16) * 2] + "b" + 
                           sides[(((i % 4) % 3) + Math.floor(i / 8)) % 4];
                else 
                    if (Math.floor(i / 8) % 3 === 0)
                        abbr = sides[0] + sides[(i % 2) + Math.floor(i / 16) * 2] + "b" + 
                                          sides[(((i % 4) % 3) + Math.floor(i / 8)) % 4];
                    else
                        abbr = sides[2] + sides[(i % 2) + Math.floor(i / 16) * 2] + "b" + 
                                          sides[(((i % 4) % 3) + Math.floor(i / 8)) % 4];
            }
        }
        res.push({
                abbreviation : abbr
            });
        res[i].azimuth = i * 11.25;
    }
    return res;
}


/**
 * Раскройте фигурные скобки указанной строки.
 * Смотрите https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * Во входной строке пары фигурных скобок, содержащие разделенные запятыми подстроки,
 * представляют наборы подстрок, которые могут появиться в этой позиции на выходе.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * К СВЕДЕНИЮ: Порядок выходных строк не имеет значения.
 *
 * Пример:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
    const stack = [str], exist = [];
    while (stack.length > 0) {
        str = stack.shift();
        let match = str.match(/\{([^{}]+)\}/);
        if (match) {
            for (let value of match[1].split(',')) {
                stack.push(str.replace(match[0], value));
            }
        } else if (exist.indexOf(str) < 0) {
            exist.push(str);
            yield str;
        }
    }
}


/**
 * Возвращает ZigZag матрицу
 *
 * Основная идея в алгоритме сжатия JPEG -- отсортировать коэффициенты заданного изображения зигзагом и закодировать их.
 * В этом задании вам нужно реализовать простой метод для создания квадратной ZigZag матрицы.
 * Детали смотрите здесь: https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * https://ru.wikipedia.org/wiki/JPEG
 * Отсортированные зигзагом элементы расположаться так: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - размер матрицы
 * @return {array}  массив размером n x n с зигзагообразным путем
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
 
    let matrix = [];
    for (var i = 0; i < n; i++) 
        matrix[i] = [];

    let j=1; i=1;
    for (let e = 0; e < n*n; e++) {
        matrix[i-1][j-1] = e;
        if ((i + j) % 2 == 0) {
            if (j < n) {
                j ++;
            } else {
                i += 2;
            }
            if (i > 1) {
                i --;
            }
        } else {
            if (i < n) {
                i ++;
            } else {
                j += 2;
            }
            if (j > 1) {
                j --;
            }
        }
    }
    return matrix;
}


/**
 * Возвращает true если заданный набор костяшек домино может быть расположен в ряд по правилам игры.
 * Детали игры домино смотрите тут: https://en.wikipedia.org/wiki/Dominoes
 * https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BC%D0%B8%D0%BD%D0%BE
 * Каждая костяшка представлена как массив [x,y] из значений на ней.
 * Например, набор [1, 1], [2, 2], [1, 2] может быть расположен в ряд ([1, 1] -> [1, 2] -> [2, 2]),
 * тогда как набор [1, 1], [0, 3], [1, 4] не может.
 * К СВЕДЕНИЮ: в домино любая пара [i, j] может быть перевернута и представлена как [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    let num = new Array(10).fill(0);

    dominoes.map( function(data) {
        num[data[0]]++;
        if (data[0] !== data[1]) {
            num[data[1]]++;
        }
    });

    let sum = 0;
    num.map( (data) => sum += Math.floor(data/2) );

    return sum >= dominoes.length - 1;
}


/**
 * Возвращает строковое представление заданного упорядоченного списка целых чисел.
 *
 * Строковое представление списка целых чисел будет состоять из элементов, разделенных запятыми. Элементами могут быть:
 *   - отдельное целое число
 *   - или диапазон целых чисел, заданный начальным числом, отделенным от конечного числа черточкой('-').
 *     (Диапазон включает все целые числа в интервале, включая начальное и конечное число)
 *     Синтаксис диапазона должен быть использован для любого диапазона, где больше двух чисел.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    let len = nums.length,
        min = 0, max = 1, size;
    let arr = [];
    let str = "";

    if (len === 1)
        return `${nums[0]}`;
    if (len === 2)
        return `${nums[0]},${nums[1]}`;

    for (; max <= len; max++)
    {
        if ((nums[max] !== (nums[max - 1] + 1)) || (max === len))
        {            
            size = max - min;
            if (size === 1)
                str = "" + nums[min];
            else if (size === 2)
                str = "" + nums[min] + "," + nums[max - 1];
            else
                str = "" + nums[min] + "-" + nums[max - 1];
            min = max;
            arr.push(str);
        }
    }
    return arr.join(",");
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};

'use strict';

/********************************************************************************************
 *                                                                                          *
 * Перед началом работы с таском, пожалуйста ознакомьтесь с туториалом:                     *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String  *
 *                                                                                          *
 ********************************************************************************************/



/**
 * Возвращает результат конкатенации двух строк
 *
 * @param {string} value1
 * @param {string} value2
 * @return {string}
 *
 * @example
 *   'aa', 'bb' => 'aabb'
 *   'aa',''    => 'aa'
 *   '',  'bb'  => 'bb'
 */
function concatenateStrings(value1, value2) {
    return value1+value2;
}


/**
 * Возвращает длинну строки
 *
 * @param {string} value
 * @return {number}
 *
 * @example
 *   'aaaaa' => 5
 *   'b'     => 1
 *   ''      => 0
 */
function getStringLength(value) {
    return value.length;
}

/**
 * Возвращает строку образованную на основе шаблона и входных параметров firstName и lastName.
 * Важно! Вместо использования конкатенации, используйте шаблоны :
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings
 *
 * @param {string} firstName
 * @param {string} lastName
 * @return {string}
 *
 * @example
 *   'John','Doe'      => 'Hello, John Doe!'
 *   'Chuck','Norris'  => 'Hello, Chuck Norris!'
 */
function getStringFromTemplate(firstName, lastName) {
    return `Hello, ${firstName} ${lastName}!`;
}

/**
 * Возвращает имя(First_Name) и фамилию(Last_Name) из шаблона 'Hello, First_Name Last_Name!'.
 *
 * @param {string} value
 * @return {string}
 *
 * @example
 *   'Hello, John Doe!' => 'John Doe'
 *   'Hello, Chuck Norris!' => 'Chuck Norris'
 */
function extractNameFromTemplate(value) {
    var arr = value.split(",");
    return arr[1].slice(1,-1);
}


/**
 * Возвращает первый символ полученной строки
 *
 * @param {string} value
 * @return {string}
 *
 * @example
 *   'John Doe'  => 'J'
 *   'cat'       => 'c'
 */
function getFirstChar(value) {
    return value.charAt(0);
}

/**
 * Удаляет крайние левые и правые символы пробела или табуляции из строки.
 *
 * @param {string} value
 * @return {string}
 *
 * @example
 *   '  Abracadabra'    => 'Abracadabra'
 *   'cat'              => 'cat'
 *   '\tHello, World! ' => 'Hello, World!'
 */
function removeLeadingAndTrailingWhitespaces(value) {  
    return value.trim();  
}

/**
 * Возвращает заданную строку, повторяющуюся заданное число раз
 *
 * @param {string} value
 * @param {string} count
 * @return {string}
 *
 * @example
 *   'A', 5  => 'AAAAA'
 *   'cat', 3 => 'catcatcat'
 */
function repeatString(value, count) {
    return value.repeat(count);
}

/**
 * Удаляет первую встретившуюся последовательность симвоов из строки
 * 
 * @param {string} str
 * @param {string} value
 * @return {string}
 *
 * @example
 *   'To be or not to be', 'not'  => 'To be or to be'
 *   'I like legends', 'end' => 'I like legs',
 *   'ABABAB','BA' => 'ABAB'
 */
function removeFirstOccurrences(str, value) {
    return str.replace(value,'');
}

/**
 * Удаляет первую и последнюю угловую скобку в строке (тэге)
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *   '<div>' => 'div'
 *   '<span>' => 'span'
 *   '<a>' => 'a'
 */
function unbracketTag(str) {
    return str.substr(1).slice(0,-1);
    
}


/**
 * Переводит все символы в строке в верхний регистр
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *   'Thunderstruck' => 'THUNDERSTRUCK'
 *  'abcdefghijklmnopqrstuvwxyz' => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
 */
function convertToUpperCase(str) {
    return str.toUpperCase();

}

/**
 * Из строки адресов электронной почты разделенных точкой с запятой, образует массив этих адресов
 *
 * @param {string} str
 * @return {array}
 *
 * @example
 *   'angus.young@gmail.com;brian.johnson@hotmail.com;bon.scott@yahoo.com' => ['angus.young@gmail.com', 'brian.johnson@hotmail.com', 'bon.scott@yahoo.com']
 *   'info@gmail.com' => ['info@gmail.com']
 */
function extractEmails(str) {
    return str.split(";");
}

/**
 * Возвращает строковое предстваление фигуры с заданной шириной и высотой
 * используя псевдографические символы: '┌', '─', '┐', '│', '└', '┘'.
 *
 * @param {number} width
 * @param {number} height
 * @return {string}
 *
 * @example
 *
 *            '┌────┐\n'+
 *  (6,4) =>  '│    │\n'+
 *            '│    │\n'+
 *            '└────┘\n'
 *
 *  (2,2) =>  '┌┐\n'+
 *            '└┘\n'
 *
 *             '┌──────────┐\n'+
 *  (12,3) =>  '│          │\n'+
 *             '└──────────┘\n'
 *
 */
function getRectangleString(width, height) {
    var line = "";
    var n=0; 

    function drawSenterLine(width,symb) {
        var line="";
        if (width-2!=0) {
            for (var n=0;n<width-2;n++) {
                line+=symb;
            }
        }
        return line;
    }

    line+= '┌';
    line+=drawSenterLine(width,'─');
    line+='┐\n';
    if (height-2!=0) {
        for (n=0;n<height-2;n++) {
            line+='│';
            line+=drawSenterLine(width,' ');
            line+='│\n';
        }
    }
    line+= '└';
    line+=drawSenterLine(width,'─');
    line+='┘\n';

    return line;
}


/**
 * Закодировать указанную строку при помощи ROT13 шифрования (*)
 * See details:  https://en.wikipedia.org/wiki/ROT13
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *
 *   'hello' => 'uryyb'
 *   'Why did the chicken cross the road?' => 'Jul qvq gur puvpxra pebff gur ebnq?'
 *   'Gb trg gb gur bgure fvqr!' => 'To get to the other side!'
 *   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' => 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'
 *
 */
function encodeToRot13(str) {
    
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz .,?!:',
        enocdedAlphabet = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm .,?!:';
    var arr = str.split('').map(function(char) {return enocdedAlphabet[alphabet.indexOf(char)]},str.split(''));
    return arr.join('');    
}

/**
 * Возвращает булевое значение, является ли входной параметр строкой
 * @param {string} value
 * @return {boolean}
 *
 * @example
 *   isString() => false
 *   isString(null) => false
 *   isString([]) => false
 *   isString({}) => false
 *   isString('test') => true
 *   isString(new String('test')) => true
 */
function isString(value) {
    if (typeof value == 'string' || value instanceof String) {
        return true;
    } else {
        return false;
    }
}


/**
 * Возвращает id игровой карты
 * 
 * Исходная доска игровых карт представлена следующим порядком строк:
 * 
 *  'A♣','2♣','3♣','4♣','5♣','6♣','7♣','8♣','9♣','10♣','J♣','Q♣','K♣',
 *  'A♦','2♦','3♦','4♦','5♦','6♦','7♦','8♦','9♦','10♦','J♦','Q♦','K♦',
 *  'A♥','2♥','3♥','4♥','5♥','6♥','7♥','8♥','9♥','10♥','J♥','Q♥','K♥',
 *  'A♠','2♠','3♠','4♠','5♠','6♠','7♠','8♠','9♠','10♠','J♠','Q♠','K♠'
 * 
 * (see https://en.wikipedia.org/wiki/Standard_52-card_deck)
 * Function returns the zero-based index of specified card in the initial deck above.
 * 
 * @param {string} value
 * @return {number}
 *
 * @example
 *   'A♣' => 0
 *   '2♣' => 1 
 *   '3♣' => 2
 *     ...
 *   'Q♠' => 50
 *   'K♠' => 51
 */
function getCardId(value) {
    var arr = '♣,♦,♥,♠'.split(","); 
    var arrNumber = 'A,2,3,4,5,6,7,8,9,10,J,Q,K'.split(",");
    var number = arrNumber.indexOf(value.substr(0,value.length-1));
    switch(value.substr(-1,1)) {
        case arr[0]:
            return number;
        case arr[1]:
            return number+13;
        case arr[2]:
            return number+26;
        case arr[3]:
            return number+39;
    }
}


module.exports = {
    concatenateStrings: concatenateStrings,
    getStringLength: getStringLength,
    getStringFromTemplate: getStringFromTemplate,
    extractNameFromTemplate: extractNameFromTemplate,
    getFirstChar: getFirstChar,
    removeLeadingAndTrailingWhitespaces: removeLeadingAndTrailingWhitespaces,
    repeatString: repeatString,
    removeFirstOccurrences: removeFirstOccurrences,
    unbracketTag: unbracketTag,
    convertToUpperCase: convertToUpperCase,
    extractEmails: extractEmails,
    getRectangleString: getRectangleString,
    encodeToRot13: encodeToRot13,
    isString: isString,
    getCardId: getCardId
};

'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Перед началом работы с заданием, пожалуйста ознакомьтесь с туториалом:                         *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Возвращает объект Прямоугольник (rectangle) с параметрами высота (height) и ширина (width)
 * и методом getArea(), который возвращает площадь
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
    this.width = width;
    this.height = height; 
    Rectangle.prototype.getArea = function(){
        return this.height * this.width;
    }   
}



/**
 * Возвращает JSON представление объекта
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
    return JSON.stringify(obj);
}


/**
 * Возвращает объект указанного типа из представления JSON
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
    return Object.setPrototypeOf(JSON.parse(json), proto);
}


/**
 * Создатель css селекторов
 *
 * Каждый комплексый селектор может состоять из эелемента, id, класса, атрибута, псевдо-класса и
 * псевдо-элемента
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Может быть несколько вхождений
 *
 * Любые варианты селекторов могут быть скомбинированы с помощью ' ','+','~','>' .
 *
 * Задача состоит в том, чтобы создать отдельный класс, независимые классы или
 * иерархию классов и реализовать функциональность
 * для создания селекторов css с использованием предоставленного cssSelectorBuilder.
 * Каждый селектор должен иметь метод stringify ()
 * для вывода строкового представления в соответствии с спецификацией css.
 *
 * Созданный cssSelectorBuilder должен использоваться как фасад
 * только для создания ваших собственных классов,
 * например, первый метод cssSelectorBuilder может быть таким:
 *
 * Дизайн класса(ов) полностью зависит от вас,
 * но постарайтесь сделать его максимально простым, понятным и читаемым насколько это возможно.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()  => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()  => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()        =>    'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  Если нужно больше примеров - можете посмотреть юнит тесты.
 */

const CSS_SELECTOR_ERRORS = [
    'Element, id and pseudo-element should not occur more then one time inside the selector',
    'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
];

function cssSelector(fromCombine) {
    
    fromCombine = fromCombine || '';
    
    const values = {
        element: '',
        id: '',
        class: '',
        attr: '',
        pseudoClass: '',
        pseudoElement: ''
    };
    
    function checkOrder(currentPart) {
        let b = false;
        for (let i in values) {
            if (values.hasOwnProperty(i)) {
                if (b && values[i]) {
                    throw new Error(CSS_SELECTOR_ERRORS[1]);
                } else if (!b && i === currentPart) {
                    b = true;
                }
            }
        }
    } 
    
    this.element = function(value) {
        if (values.element) {
            throw new Error(CSS_SELECTOR_ERRORS[0]);
        }
        checkOrder('element');
        values.element = value;
        return this;
    };
    
    this.id = function(value) {
        if (values.id) {
            throw new Error(CSS_SELECTOR_ERRORS[0]);
        }
        checkOrder('id');
        values.id = '#' + value;
        return this;
    };
    
    this.class = function(value) {
        checkOrder('class');
        values.class += '.' + value;
        return this;
    };
    
    this.attr = function(value) {
        checkOrder('attr');
        values.attr += '[' + value + ']';
        return this;
    };
    
    this.pseudoClass = function(value) {
        checkOrder('pseudoClass');
        values.pseudoClass += ':' + value;
        return this;
    };
    
    this.pseudoElement = function(value) {
        if (values.pseudoElement) {
            throw new Error(CSS_SELECTOR_ERRORS[0]);
        }
        checkOrder('pseudoElement');
        values.pseudoElement = '::' + value;
        return this;
    };
    
    this.stringify = function() {
        let result = '';
        for (let i in values) {
            if (values.hasOwnProperty(i)) {
                result += values[i];
            }
        }
        return fromCombine + result;
    };
    
}
const cssSelectorBuilder = {

    element: function(value) {
        return new cssSelector().element(value);
    },

    id: function(value) {
        return new cssSelector().id(value);
    },

    class: function(value) {
        return new cssSelector().class(value);
    },

    attr: function(value) {
        return new cssSelector().attr(value);
    },

    pseudoClass: function(value) {
        return new cssSelector().pseudoClass(value);
    },

    pseudoElement: function(value) {
        return new cssSelector().pseudoElement(value);
    },

    combine: function(selector1, combinator, selector2) {
        return new cssSelector(selector1.stringify() + ` ${combinator} ` + selector2.stringify());
    },
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};

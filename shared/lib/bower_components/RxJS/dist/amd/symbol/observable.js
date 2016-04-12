define(["require", "exports", '../util/root'], function (require, exports, root_1) {
    "use strict";
    var Symbol = root_1.root.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            exports.$$observable = Symbol.observable;
        }
        else {
            if (typeof Symbol.for === 'function') {
                exports.$$observable = Symbol.for('observable');
            }
            else {
                exports.$$observable = Symbol('observable');
            }
            Symbol.observable = exports.$$observable;
        }
    }
    else {
        exports.$$observable = '@@observable';
    }
});
//# sourceMappingURL=observable.js.map
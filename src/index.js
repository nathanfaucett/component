var has = require("has"),
    isObject = require("is_object"),
    isFunction = require("is_function");


module.exports = createComponentFunction;


function createComponentFunction(options, fn) {
    var displayName, propTypes;

    options = options || {};

    displayName = options.name || options.displayName;
    propTypes = options.propTypes || options.params;

    if (!isFunction(fn)) {
        throw new TypeError(
            "createComponentFunction(options: Object, fn: Funciton) fn must be a function"
        );
    }

    if (isObject(propTypes)) {
        return function componentFunction(props, locale, callback) {
            var errors = checkPropTypes(propTypes, props, displayName, locale);

            if (errors) {
                callback(errors);
            } else {
                fn(props, callback);
            }
        };
    } else {
        return fn;
    }
}

function checkPropTypes(propTypes, props, displayName, locale) {
    var localHas = has,
        propName, errors, error;

    if (propTypes) {
        for (propName in propTypes) {
            if (localHas(propTypes, propName)) {
                error = propTypes[propName](props, propName, displayName, locale);

                if (error) {
                    errors = errors || [];
                    errors[errors.length] = error;
                }
            }
        }
    }

    return errors;
}

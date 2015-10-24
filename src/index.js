var has = require("has"),
    isObject = require("is_object"),
    isFunction = require("is_function");


module.exports = createComponentFunction;


function createComponentFunction(options, func) {
    var displayName, propTypes;

    options = options || {};

    displayName = options.name || options.displayName || "<<anonymous>>";
    propTypes = options.propTypes || options.params;

    if (!isFunction(func)) {
        throw new TypeError("createComponentFunction(options: Object) func must be a function");
    }

    if (isObject(propTypes)) {
        return function componentFunction(props, callback) {
            var errors = checkPropTypes(propTypes, props, displayName);

            if (errors) {
                callback(errors);
            } else {
                func(props, callback);
            }
        };
    } else {
        return func;
    }
}

function checkPropTypes(propTypes, props, displayName) {
    var localHas = has,
        propName, errors, error;

    if (propTypes) {
        for (propName in propTypes) {
            if (localHas(propTypes, propName)) {
                error = propTypes[propName](props, propName, displayName);

                if (error) {
                    errors = errors || [];
                    errors[errors.length] = error;
                }
            }
        }
    }

    return errors;
}

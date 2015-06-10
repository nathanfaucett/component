var has = require("has"),
    isObject = require("is_object"),
    isFunction = require("is_function");


module.exports = component;


function component(options) {
    var displayName, propTypes, call;

    options = options || {};

    displayName = options.name || options.displayName || "<<anonymous>>";
    propTypes = options.propTypes || options.params;
    call = options.call;

    if (!isFunction(call)) {
        throw new TypeError("component(options: Object) call must be a function");
    }

    if (isObject(propTypes)) {
        return function componentCall(props, callback) {
            var errors = checkPropTypes(propTypes, props, displayName);

            if (errors) {
                callback(errors);
            } else {
                call(props, callback);
            }
        };
    } else {
        return call;
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

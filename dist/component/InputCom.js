var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useEffect, useRef } from "react";
import { customEvent } from "./CustomEvent";
var ReusableFormComponent = function (_a) {
    var formId = _a.formId, fields = _a.fields, onFormChange = _a.onFormChange;
    // Maintain state for all field values
    var _b = useState({}), formValues = _b[0], setFormValues = _b[1];
    var uniqueEventId = useRef("form-".concat(formId)).current; // Unique event ID for this form
    useEffect(function () {
        // Listen for events tied to this unique form ID
        var unsubscribe = customEvent.on(uniqueEventId, function (data) {
            setFormValues(function (prev) { return (__assign(__assign({}, prev), data)); });
            if (onFormChange) {
                onFormChange(__assign(__assign({}, formValues), data));
            }
        });
        return unsubscribe; // Cleanup listener on unmount
    }, [uniqueEventId, formValues, onFormChange]);
    var handleInputChange = function (id, value) {
        var _a;
        var updatedValues = (_a = {}, _a[id] = value, _a);
        setFormValues(function (prev) { return (__assign(__assign({}, prev), updatedValues)); });
        // Emit an event with the updated values
        customEvent.emit(uniqueEventId, updatedValues);
        // Trigger the callback if provided
        if (onFormChange) {
            onFormChange(__assign(__assign({}, formValues), updatedValues));
        }
    };
    return (React.createElement("div", null, fields === null || fields === void 0 ? void 0 : fields.map(function (field) {
        var scopedId = "".concat(formId, "-").concat(field.id); // Scoped unique ID
        return (React.createElement("div", { className: field.inputContainer, key: scopedId },
            React.createElement("label", { className: field.labelClass, htmlFor: scopedId }, field.label),
            React.createElement("input", { id: scopedId, type: field.inputType || "text", value: formValues[scopedId] || "", placeholder: field.placeholder || "", onChange: function (e) { return handleInputChange(scopedId, e.target.value); }, onBlur: function () { var _a; return (_a = field.onBlur) === null || _a === void 0 ? void 0 : _a.call(field, formValues[scopedId] || ""); }, onFocus: field.onFocus, className: field.className, style: field.style })));
    })));
};
export default ReusableFormComponent;

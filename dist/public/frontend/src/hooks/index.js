"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStorage = void 0;
const react_1 = require("react");
const useStorage = (key, initialValue) => {
    // Retrieve data from sessionStorage on initial render
    const storedValue = sessionStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;
    // State to manage the current value
    const [value, setValue] = (0, react_1.useState)(initial);
    // Save the value to sessionStorage whenever it changes
    const setStoredValue = (newValue) => {
        setValue(newValue);
        sessionStorage.setItem(key, JSON.stringify(newValue));
    };
    // Clear the value from sessionStorage
    const clearStoredValue = () => {
        setValue(initialValue);
        sessionStorage.removeItem(key);
    };
    return [value, setStoredValue, clearStoredValue];
};
exports.useStorage = useStorage;

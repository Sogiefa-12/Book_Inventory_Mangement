const Validator = require('validatorjs');
// const validator = (body, rules, customMessages, callback) => {
//   const validation = new Validator(body, rules, customMessages);
//    // Add a custom validation rule for checking if a value is numeric
//    const isNumericRule = (value, options, callback) => {
//     if (!/^-?[0-9]*(\.[0-9]+)?$/.test(value)) {
//       return callback('Must be a numeric value');
//     }
//     callback();
//   };
//   validation.register('isNumeric', isNumericRule);
//   validation.passes(() => callback(null, true));
//   validation.fails(() => callback(validation.errors, false));
// };


// Create a custom validator function to check if a value is numeric
const isNumericRule = (value, options, callback) => {
    if (!/^-?[0-9]*(\.[0-9]+)?$/.test(value)) {
      if (typeof callback === 'function') {
        callback('Must be a numeric value');
      }
    } else if (typeof callback === 'function') {
      callback();
    }
  };
  
  // Register the custom validator
  Validator.register('isNumeric', isNumericRule);
  
  const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
  
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
  };

  
module.exports = validator;

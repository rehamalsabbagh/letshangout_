class FormUtil {
  static onChange(obj, value) {
    obj.error = undefined;
    obj.value = value.replace(/\s/g, '');
  }

  static addErrorMessage(errorMessages, message) {
    errorMessages = [...errorMessages, ...[message]];
  }

  static clearErrorMessages(messages, obj) {
    messages = [];
    for (var key in obj) obj[key].error = undefined;
  }

  static isMinimunLength(minimunLength, value) {
    return value.length >= minimunLength;
  }

  static isAllFilled(obj) {
    let _isAllFilled = true;
    for (var key in obj) {
      if (obj[key].value === '') obj[key].error = 1;
      _isAllFilled = _isAllFilled && obj[key].value !== '';
    }
    return _isAllFilled;
  }

  static allTrue(obj) {
    let _allTrue = true;
    for (var key in obj) _allTrue = _allTrue && obj[key];
    return _allTrue;
  }
}

export default FormUtil;

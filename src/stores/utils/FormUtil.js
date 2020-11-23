class FormUtil {
  static removeSpaces(value) {
    return value.replace(/\s/g, '');
  }
  static isAllFilled(obj) {
    let _isAllFilled = true;
    for (var key in obj) {
      _isAllFilled = _isAllFilled && obj[key] !== '';
    }
    return _isAllFilled;
  }
}

export default FormUtil;

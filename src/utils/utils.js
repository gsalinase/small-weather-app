export default {
  toCurrencyFormat(value, locale = 'en-US') {
    const formatter = new Intl.NumberFormat(locale);
    return formatter.format(value);
  },
  convertCurrency(amount, valueToConvert){
    if (valueToConvert !== undefined && valueToConvert !== null) {
      return parseFloat(amount) * valueToConvert
    }
  }
};

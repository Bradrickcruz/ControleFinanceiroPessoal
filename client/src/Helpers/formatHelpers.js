const realFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatToRealCurrency(value) {
  return realFormatter.format(value);
}

function formatDateToYearMonth(date) {
  return `${date.getFullYear()}-${addSymbolLeft(date.getMonth() + 1, '0', 2)}`;
}

function addSymbolLeft(value, symbol, length) {
  value = String(value);
  while (value.length < length) {
    value = symbol + value;
  }
  return value;
}

export { formatToRealCurrency, formatDateToYearMonth, addSymbolLeft };

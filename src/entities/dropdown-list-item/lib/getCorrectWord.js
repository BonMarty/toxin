// Function that generate correct word that depends on quantity
export default function getCorrectWord(quantity, word) {
  if (word === 'guest') {
    if (quantity === 1 || (quantity > 20 && quantity % 10 === 1)) {
      return 'гость';
    }

    if (quantity < 5 || (quantity > 20 && quantity % 10 < 5)) {
      return 'гостя';
    }

    return 'гостей';
  }

  if (word === 'bedroom') {
    if (quantity === 1 || (quantity > 20 && quantity % 10 === 1)) {
      return 'спальня';
    }

    if (quantity < 5 || (quantity > 20 && quantity % 10 < 5)) {
      return 'спальни';
    }

    return 'спален';
  }

  if (word === 'bed') {
    if (quantity === 1 || (quantity > 20 && quantity % 10 === 1)) {
      return 'кровать';
    }

    if (quantity < 5 || (quantity > 20 && quantity % 10 < 5)) {
      return 'кровати';
    }

    return 'кроватей';
  }

  if (word === 'bathroom') {
    if (quantity === 1 || (quantity > 20 && quantity % 10 === 1)) {
      return 'ванная комната';
    }

    if (quantity < 5 || (quantity > 20 && quantity % 10 < 5)) {
      return 'ванныe комнаты';
    }

    return 'ванных комнат';
  }
}

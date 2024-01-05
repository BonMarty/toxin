// Function that generate correct word that depends on quantity
export default function getCorrectWord(quantity) {
  if (quantity === 1 || (quantity > 20 && quantity % 10 === 1)) {
    return 'гость';
  }

  if (quantity < 5 || (quantity > 20 && quantity % 10 < 5)) {
    return 'гостя';
  }

  return 'гостей';
}

const { calculateDiscount } = require('./helper');

test('should return discounted value', () => {
  const basePrice = 50000;
  const percentage = 5;
  const discountedPrice = calculateDiscount(basePrice, percentage);
  expect(discountedPrice).toBe(47500);
});

function areOrdersServedInOrder(takeOutOrders, dineInOrders, servedOrders) {
  let takeOutIndex = 0;
  let dineInIndex = 0;

  for (let i = 0; i < servedOrders.length; i++) {
    const currentOrder = servedOrders[i];

    if (takeOutIndex < takeOutOrders.length && currentOrder === takeOutOrders[takeOutIndex]) {
      takeOutIndex++;
    } else if (dineInIndex < dineInOrders.length && currentOrder === dineInOrders[dineInIndex]) {
      dineInIndex++;
    } else {
      return false;
    }
  }

  return true;
}

// Case 1: Invalid order sequence
const takeOutOrders1 = [1, 3, 5];
const dineInOrders1 = [2, 4, 6];
const servedOrders1 = [1, 2, 4, 6, 5, 3];
console.log(areOrdersServedInOrder(takeOutOrders1, dineInOrders1, servedOrders1));

// Case 2: Valid order sequence
const takeOutOrders2 = [17, 8, 24];
const dineInOrders2 = [12, 19, 2];
const servedOrders2 = [17, 8, 12, 19, 24, 2];
console.log(areOrdersServedInOrder(takeOutOrders2, dineInOrders2, servedOrders2));

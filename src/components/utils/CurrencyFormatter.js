// Uitlity fuction used to format numbers
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default formatter;

let valueArr = JSON.parse(localStorage.getItem("cart")) || [];

const userData = JSON.parse(localStorage.getItem("users"));
const useCart = () => ({
  addItemToCart: (value) => {
    const checkArr = valueArr.some((item) => item.id == value.id);

    if (!checkArr) {
      valueArr.push(value);
    } else {
      throw Error("already exists in cart");
    }

    localStorage.setItem("cart", JSON.stringify(valueArr));

    return JSON.parse(localStorage.getItem("cart"));
  },

  getCartItems: () => {
    const checkUser = valueArr.some((item) => item.uid == userData?.uid);
    if (checkUser) {
      return valueArr;
    }
  },

  removeItemFromCart: (id) => {
    valueArr = valueArr.filter((item) => item.id != id);
    localStorage.setItem("cart", JSON.stringify(valueArr));
  },
});

export { useCart };

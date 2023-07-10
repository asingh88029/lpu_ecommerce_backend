const Cart = require("../models/cart.model");

async function addCartService(cartData) {
  const isCart = await Cart.findOne({ uid: cartData.uid });

  console.log(isCart);

  if (isCart) {
    const cart = await Cart.findByIdAndUpdate(isCart._id, {
      $push: { pid: cartData.pid, quantity: cartData.quantity },
    });
    if (cart) {
      return {
        success: true,
        message: "Product is added to cart",
        data: cart,
      };
    } else {
      return {
        success: false,
        message: "Product is not added to cart",
      };
    }
  } else {
    const newCartData = {
      uid: cartData.uid,
      products: [
        {
          pid: cartData.pid,
          qty: cartData.qty,
        },
      ],
    };

    const cart = await Cart.create(newCartData);

    if (cart) {
      return {
        success: true,
        message: "Product is added to cart",
        data: cart,
      };
    } else {
      return {
        success: false,
        message: "Product is not added to cart",
      };
    }
  }
}

async function getAllCartService() {
  const carts = await Cart.find()
    .populate("uid", "name email mobile")
    .populate("pid", "name price rating");
  if (carts) {
    return {
      success: true,
      message: "Carts are sent",
      data: carts,
    };
  } else {
    return {
      success: false,
      message: "Carts are not available",
    };
  }
}

// async function getUserCartService(uid){
//     const carts = await
// }

async function updateCartService(cid, updatedCart) {
  const cart = await Cart.findByIdAndUpdate(cid, updatedCart, { new: true });
  if (cart) {
    return {
      success: true,
      message: "Cart is updated",
      data: cart,
    };
  } else {
    return {
      success: false,
      message: "Cart is not updated",
    };
  }
}

module.exports = {
  addCartService,
  getAllCartService,
  updateCartService,
};

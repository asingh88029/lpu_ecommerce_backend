const Cart = require("../models/cart.model");

async function addCartService(cartData) {
  const isCart = await Cart.findOne({ uid: cartData.uid });

  if (isCart) {
    const cart = await Cart.findByIdAndUpdate(
      { _id: isCart._id },
      {
        $push: {
          products: {
            pid: cartData.pid,
            qty: cartData.qty,
          },
        },
      },
      { new: true }
    );

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
    .populate("products.pid", "name price rating");
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

async function getUserCartService(uid) {
  const cart = await Cart.findOne({ uid })
    .populate("uid", "name email mobile")
    .populate("products.pid", "name price rating");

  if (cart) {
    return {
      success: true,
      message: "Cart is sent",
      data: cart,
    };
  } else {
    return {
      success: false,
      message: "Cart is not available",
    };
  }
}

async function updateCartService(uid, updatedCart) {
  const cart = await Cart.findOne({
    uid,
    products: {
      $elemMatch: {
        pid: updatedCart.pid,
      },
    },
  });

  let productId = updatedCart.pid;
  let qty = updatedCart.qty;

  if (cart) {
    let products = cart.products;

    if (qty == 0) {

      products = products.filter((elem) => {
        if (elem.pid != productId) {
          return true;
        }
      });

      cart.products = products;

      const updatedCart = await cart.save();

      return {
        success: true,
        message: "Cart is updated",
        data: updatedCart,
      };

    }

    products = products.map((elem) => {
      if (elem.pid == productId) {
        return {
          ...elem,
          qty: qty,
        };
      } else {
        return elem;
      }
    });

    cart.products = products;

    const updatedCart = await cart.save();

    return {
      success: true,
      message: "Cart is updated",
      data: updatedCart,
    };
  } else {
    return {
      success: false,
      message: "No any such product available in cart",
    };
  }
}

module.exports = {
  addCartService,
  getAllCartService,
  getUserCartService,
  updateCartService,
};

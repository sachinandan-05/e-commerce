const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const getCart = async(userId, guestId) => {
    if(userId){
        return await Cart.find({user: userId});
    }
    else if(guestId){
        return await Cart.findOne({guest: guestId});
    }
    else{
        return null;
    }
}

router.post("/", async(req, res) => {
    const {
        productId, 
        quantity, 
        size, 
        color, 
        guestId, 
        userId 
    } = req.body;

    try {
        const product = await Product.findById(productId);
        if(!product) {
            res.status(404).json({message: "Product not found."});

        let cart = await getCart(userId, guestId);

        if(cart){
            const productIndex = cart.products.findByIndex(
                (p) => 
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if(productIndex > -1){
                cart.products[productIndex].quantity += quantity;
            }
            else{
                cart.products.push({
                    productId,
                    name: product.name,
                    image : product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }
        }

         cart.totalPrice = cart.products.reduce(
            (acc, item) => acc + item.price * quantity, 
            0
        );
          
        await cart.save();

        return res.status(200).json(cart);
        }

        else{
            const newCart = await Cart.create({
                 user: userId ? userId : undefined,
                 guestId : guestId ? guestId : "guest_" + new Date().getTime(),
                 products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity,
                    },
                 ],
                totalPrice: product.price*quantity,
            });
            return res.status(201).json(newCart);
        }
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error."});
    }
});

router.put("/", async(req, res) => {
   const {
    productId,
    quantity,
    size,
    color,
    guestId, userId
   } = req.body;

   try {
    let cart = await getCart(userId, guestId);
    if(!cart){
        res.status(404).json({message: "Cart not found."});
    }

    const productIndex = cart.products.findIndex(
        p => p.productId.toString() === productId &&
               p.size === size && 
               p.color === color 
        );

    if(productIndex > -1){
        if(quantity > 0) {
            cart.products[productIndex].quantity = quantity;
        }
        else{
            cart.products.splice(productIndex, 1);
        }

        cart.totalPrice = cart.products.reduce(
            (acc, item) => acc + item.price * item.quantity, 
            0
        );

        await cart.save();
        return res.status(200).json(cart);
    } 
    else{
        return res.status(404).json({message: "Product not found in cart."})
    }

   } 
   catch (error) {
      console.error(error);
      return res.status(500).json({message: "Server error."});
   }
});

router.delete("/", async(req, res) => {
    const {
        productId,
        size,
        color,
        guestId,
        userId,
    } = req.body;

     try {
        let cart = await Cart.getAll(userId, guestId);

        if(!cart) return res.status(404).json({message : "Cart not found."});

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId && 
            p.size === size && 
            p.color === color);

            if(productIndex > -1){
                cart.products.splice(productIndex, 1);

                cart.totalPrice = cart.products.reduce(
                    (acc, item) => acc + item.price * item.quantity, 
                    0
                );

                await cart.save();
                return res.status(200).json(cart);
            }
            else{
                return res.status(404).json({message : "Product not found in the cart."});
            }
     } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server error."});
     }
});

router.get("/", async(req, res) => {
    const { 
        userId,
        guestId,
     } = req.query;

    try {
        const cart = await getCart(userId|| guestId);
        console.log("cart",cart)

        if(cart){
            return res.json(cart);
        }
        else{
            return res.status(404).json({message: "Cart not found."});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message : "Server error."});
    }
});

router.post("/merge", protect, async(req, res) => {
    const { guestId } = req.body; 
    try {
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user : req.user._id });

        if(guestCart){
            if(guestCart.products.length === 0){
                return res.status(400).json({message : "Guest cart is empty."});
            }

            if(userCart){
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex(
                        (item) => item.productId.toString() === guestItem.productId.toString() && 
                                  item.size === guestItem.size &&
                                  item.color === guestItem.color
                    );

                if(productIndex > -1){
                     userCart.products[productIndex].quantity += guestItem.quantity;
                }
                else{
                    userCart.products.push(guestItem);
                }
                });

                userCart.totalPrice = userCart.products.reduceRight(
                    (acc, item) => acc + item.price * item.quantity,
                    0
            );

            await userCart.save();

            try {
                await Cart.findOneAndDelete(guestId);
            } catch (error) {
                console.error("Error deleting guest cart:", error);
            }

            res.status(200).json(userCart);
            }
            else{
            guestCart.user = req.user._id;

            guestCart.guestId = undefined;

            await guestCart.save();

            res.status(200).json(guestCart);
        }
        }
        else{
            if(userCart) {
                return res.status(200).json(userCart);
            }
            else{
                res.status(404).json({message: "Guest cart not found."});
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error."});
    }
});

module.exports = router;
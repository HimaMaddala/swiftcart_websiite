import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import UserModel from './models/User.js'
import ProductModel from './models/Products.js'
import CategoryModel from './models/categories.js'
import ShirtsModel from './models/shirts.js'
import PantsModel from './models/pants.js'
import TshirtsModel from './models/tshirts.js'
import CartModel from './models/cart.js'
import ShoesModel from './models/shoes.js'
import WatchesModel from './models/watches.js'
import OrdersModel from './models/orders.js'
import DealsModel from './models/hotdeals.js'
import ReviewsModel from './models/customer_reviews.js'
import OrdersModelMerchant from './models/orders.js'
import ReviewsModelMerchant from './models/customer_reviews_merchant.js';

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
mongoose.connect('mongodb://127.0.0.1:27017/myntra')

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email})
    .then(user => {
        if(user ) {
            if(user.password === password) {
                const accessToken = jwt.sign({email: email}, 
                    "jwt-access-token-secret-key", {expiresIn: '1m'})
                const refreshToken = jwt.sign({email: email}, 
                    "jwt-refresh-token-secret-key", {expiresIn: '5m'})

                res.cookie('accessToken', accessToken, {maxAge: 60000})

                res.cookie('refreshToken', refreshToken, 
                    {maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict'})
                return res.json({Login: true})
            }
        } else {
            res.json({Login: false, Message: "no record"})
        }
    }).catch(err => res.json(err))
})
const varifyUser = (req, res, next) => {
    const accesstoken = req.cookies.accessToken;
    if(!accesstoken) {
        if(renewToken(req, res)) {
            next()
        }
    } else {
        jwt.verify(accesstoken, 'jwt-access-token-secret-key', (err ,decoded) => {
            if(err) {
                return res.json({valid: false, message: "Invalid Token"})
            } else {
                req.email = decoded.email
                next()
            }
        })
    }
}

const renewToken = (req, res) => {
    const refreshtoken = req.cookies.refreshToken;
    let exist = false;
    if(!refreshtoken) {
        return res.json({valid: false, message: "No Refresh token"})
    } else {
        jwt.verify(refreshtoken, 'jwt-refresh-token-secret-key', (err ,decoded) => {
            if(err) {
                return res.json({valid: false, message: "Invalid Refresh Token"})
            } else {
                const accessToken = jwt.sign({email: decoded.email}, 
                    "jwt-access-token-secret-key", {expiresIn: '1m'})
                res.cookie('accessToken', accessToken, {maxAge: 60000})
                exist = true;
            }
        })
    }
    return exist;
}
//placeorder ----inserting into orderstable
// app.post('/placeorder', (req, res) => {
//   const {name,img_url,size,quantity,price,total_price} = req.body;
//   OrdersModel.create({name,img_url,size,quantity,price,total_price})
//     .then(order => res.status(201).json(order)) // Return 201 (Created) status code
//     .catch(err => res.status(500).json({ error: err.message })); // Send error response
// });

// app.post('/placeorder', (req, res) => {
//   const orders = req.body;

//   // Assuming you have an OrdersModel for storing orders
//   OrdersModel.insertMany(orders)
//     .then((orders) => res.status(201).json(orders)) // Return 201 (Created) status code
//     .catch((err) => res.status(500).json({ error: err.message })); // Send error response
// });

app.get('/orders', async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await OrdersModelMerchant.find();
    // Log fetched orders
   // console.log("Fetched orders:", orders); 
    res.json(orders); // Send the orders as JSON response
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// Route to fetch reviews for a specific shirt
app.get('/reviews/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const reviews = await ReviewsModelMerchant.find({ shirt_id: id }); // Assuming shirt_id is the field that corresponds to the shirt ID
      
      if (reviews.length === 0) {
          return res.status(404).json({ message: "No reviews found for this shirt" });
      }
      
      res.json(reviews);
  } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});


app.post('/placeorder', (req, res) => {
  const orders1 = req.body;

  // Assuming you have an OrdersModel for storing orders
  OrdersModel.insertMany(orders1)
    .then((orders) => res.status(201).json(orders)) // Return 201 (Created) status code
    .catch((err) => res.status(500).json({ error: err.message })); // Send error response
});



app.post('/createproduct', (req, res) => {
    const {name, category, img_url,price,merchant} = req.body;
    ProductModel.create({name, category, img_url,price,merchant})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})
//createreview
// app.post('/createreview/:id', async (req, res) => {
//   const { id } = req.params; // Extract product ID from URL params
//   const { review_text, rating } = req.body; // Extract review text and rating from request body

//   try {
//     // Check if a review with the given shirt_id already exists
//     const existingReview = await ReviewsModelMerchant.findOne({ product_id: id });

//     if (existingReview) {
//       // If a review exists, update it with the new review text and rating
//       existingReview.review_text.push(review_text);
//       existingReview.rating = rating;
//       await existingReview.save();
//       res.status(200).json(existingReview); // Send the updated review as JSON response
//     } else {
//       // If no review exists, create a new review
//       const newReview = await ReviewsModelMerchant.create({
//         product_id: id, // Associate the review with the specific product (shirt_id)
//         review_text: [review_text], // Store review text as an array
//         rating: [rating]
//       });
//       res.status(201).json(newReview); // Send the newly created review as JSON response
//     }
//   } catch (error) {
//     console.error('Error creating/updating review:', error);
//     res.status(500).json({ error: 'Internal server error' }); // Send an error response if something goes wrong
//   }
// });
app.post('/createreview/:id', async (req, res) => {
  const { id } = req.params; // Extract product ID from URL params
  const { review_text, rating } = req.body; // Extract review text and rating from request body

  try {
    // Check if a review with the given shirt_id already exists
    const existingReview = await ReviewsModelMerchant.findOne({ product_id: id });

    if (existingReview) {
      // If a review exists, update it with the new review text and rating
      existingReview.review_text.push(review_text);
      existingReview.ratings.push(rating); // Push the new rating into the existing array
      await existingReview.save();
      res.status(200).json(existingReview); // Send the updated review as JSON response
    } else {
      // If no review exists, create a new review
      const newReview = await ReviewsModelMerchant.create({
        product_id: id, // Associate the review with the specific product (shirt_id)
        review_text: [review_text], // Store review text as an array
        rating: [rating] // Store the rating as an array
      });
      res.status(201).json(newReview); // Send the newly created review as JSON response
    }
  } catch (error) {
    console.error('Error creating/updating review:', error);
    res.status(500).json({ error: 'Internal server error' }); // Send an error response if something goes wrong
  }
});

app.get('/fetchproducts', async (req, res) => {
    try {
      // Fetch all products from the database
      const products = await ProductModel.find();
      res.json(products); // Send the products as JSON response
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get('/fetchcategories', async (req, res) => {
    try {
      // Fetch all categories from the database
      const categories = await CategoryModel.find();
      res.json(categories); // Send the categories as JSON response
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });  
  app.get('/fetchdeals', async (req, res) => {
    try {
      const deals = await DealsModel.find();
      res.json(deals); // Send the deals as JSON response
    } catch (error) {
      console.error("Error fetching deals:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });  


  app.get('/mensshirts', async (req, res) => {
    try {
      // Fetch all products from the database
      const shirts = await ShirtsModel.find();
      res.json(shirts); // Send the products as JSON response
    } catch (error) {
      console.error("Error fetching shirts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.get('/tshirts', async (req, res) => {
    try {
      // Fetch all products from the database
      const t_shirts = await TshirtsModel.find();
      res.json(t_shirts); // Send the products as JSON response
    } catch (error) {
      console.error("Error fetching shirts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.get('/shoes', async (req, res) => {
    try {
      // Fetch all products from the database
      const shoes = await ShoesModel.find();
      res.json(shoes); // Send the products as JSON response
    } catch (error) {
      console.error("Error fetching shoes:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get('/shirts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const shirt = await ShirtsModel.findById(id);
      
      if (!shirt) {
        return res.status(404).json({ message: "Shirt not found" });
      }
  
      res.json(shirt);
    } catch (error) {
      console.error("Error fetching shirt:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

//   app.get('/reviews/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const reviews = await ReviewsModel.find({ shirt_id: id }); // Assuming shirt_id is the field that corresponds to the shirt ID
        
//         if (reviews.length === 0) {
//             return res.status(404).json({ message: "No reviews found for this shirt" });
//         }
        
//         res.json(reviews);
//     } catch (error) {
//         console.error("Error fetching reviews:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });


  app.get('/pants/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const pant = await PantsModel.findById(id);
      
      if (!pant) {
        return res.status(404).json({ message: "Pants not found" });
      }
  
      res.json(pant);
    } catch (error) {
      console.error("Error fetching pant:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get('/shoes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const shoe = await ShoesModel.findById(id);
      
      if (!shoe) {
        return res.status(404).json({ message: "Shoes not found" });
      }
  
      res.json(shoe);
    } catch (error) {
      console.error("Error fetching shoe:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.get('/watches/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const watch = await WatchesModel.findById(id);
      
      if (!watch) {
        return res.status(404).json({ message: "watches not found" });
      }
      res.json(watch);
    } catch (error) {
      console.error("Error fetching watches:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post('/cart', (req, res) => {
    console.log('Received POST request to /cart');
    console.log('Request body:', req.body);
  
    const {product_id,name,img_url,brand,price,color,quantity,merchant,size,amount} = req.body;
    CartModel.create({product_id,name,img_url,brand,price,color,quantity,merchant,size,amount})
      .then(user => {
        console.log('Item added to cart:', user);
        res.json(user);
      })
      .catch(err => {
        console.error('Error adding item to cart:', err);
        res.status(500).json(err);
      });
  })

  app.get('/fetchorders', async (req, res) => {
    try {
      const merchantitems = await OrdersModel.find();
      res.json(merchantitems); // Send the cart items as JSON response
    } catch (error) {
      console.error("Error fetching merchant items:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.get('/orders-merchant', async (req, res) => {
    try {
      // Fetch all cart items from the database
      const merchantitems = await OrdersModel.find();
      res.json(merchantitems); // Send the cart items as JSON response
    } catch (error) {
      console.error("Error fetching merchant items:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get('/fetchcart', async (req, res) => {
    try {
      // Fetch all cart items from the database
      const cartItems = await CartModel.find();
      res.json(cartItems); // Send the cart items as JSON response
    } catch (error) {
      console.error("Error fetching cart items:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  // Route to remove an item from the cart by its ID
app.delete('/removefromcart/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    // Find the item in the cart by its ID and remove it
    await CartModel.findByIdAndDelete(_id);
    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});
  app.get('/pants', async (req, res) => {
    try {
      // Fetch all products from the database
      const pants = await PantsModel.find();
      res.json(pants); // Send the products as JSON response
    } catch (error) {
      console.error("Error fetching shirts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.get('/shoes', async (req, res) => {
    try {
      // Fetch all products from the database
      const shoes = await ShoesModel.find();
      res.json(shoes); // Send the products as JSON response
    } catch (error) {
      console.error("Error fetching shirts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.get('/watches', async (req, res) => {
    try {
      // Fetch all products from the database
      const watches = await WatchesModel.find();
      res.json(watches); // Send the products as JSON response
    } catch (error) {
      console.error("Error fetching shirts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.get('/tshirts', async (req, res) => {
    try {
      // Fetch all products from the database
      const tshirts = await TshirtsModel.find();
      res.json(tshirts); // Send the products as JSON response
    } catch (error) {
      console.error("Error fetching shirts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.get('/backpacks', async (req, res) => {
    try {
      // Fetch all products from the database
      const backpacks = await BackpacksModel.find();
      res.json(backpacks); // Send the products as JSON response
    } catch (error) {
      console.error("Error fetching shirts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
//merchant pages and endpoints
app.post('/createshirts', (req, res) => {
  const {name, img_url: imgUrls, brand, price, color, quantity, merchant, fabric, fit, sleeves, collar} = req.body;
  ShirtsModel.create({name, img_url: imgUrls, brand, price, color, quantity, merchant, fabric, fit, sleeves, collar})
  .then(user => res.json(user))
  .catch(err => res.json(err))
})


app.get('/userpage',varifyUser, (req, res) => {
    return res.json({valid: true, message: "authorized"})
})
app.get('/adminpage',varifyUser, (req, res) => {
    return res.json({valid: true, message: "authorized"})
})

app.listen(3001, () => { 
    console.log("Server is Running")
})
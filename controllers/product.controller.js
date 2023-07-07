const { json } = require("express");
const {
  addProductService,
  getAllProductService,
  getOneProductService,
  updateProductService,
} = require("../services/product.service");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "ddbryywjd",
  api_key: "783413234336681",
  api_secret: "2BS7DfxpFuhcJ3j0DFy3owRRnVA",
});

async function addProductController(req, res) {

  const { name, price, rating, description, quantity} = req.body;

  let {tags,category } = req.body;

  tags = JSON.parse(tags);
  category = JSON.parse(category);

  const images = req.files;


  //Code to upload all the images to cloudinary server.

  const cloudinaryResult = await Promise.all(
    images.map(async (image)=>{
        const result = await cloudinary.v2.uploader.upload(image.path);
        return result.secure_url
    })
  )

  const newProduct = {
    name,
    price,
    rating,
    description,
    imagesURL:cloudinaryResult,
    tags,
    quantity,
    category
  };

  const serviceData = await addProductService(newProduct);

  if (serviceData.success) {
    res.status(200).send({
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    res.status(500).send({
      message: serviceData.message,
    });
  }
}

async function getAllProductController(req, res) {
  const serviceData = await getAllProductService();

  if (serviceData.success) {
    res.status(200).send({
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    res.status(500).send({
      message: serviceData.message,
    });
  }
}

async function getOneProductController(req, res) {
  const id = req.params.id;

  const serviceData = await getOneProductService(id);

  if (serviceData.success) {
    res.status(200).send({
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    res.status(500).send({
      message: serviceData.message,
    });
  }
}

async function updateProductController(req, res) {

  const id = req.params.id;

  const {name,price,rating,description} = req.body;

  let {tags,category} = req.body;


  const updatedProductData = {}


  if(tags!==undefined){
    tags = JSON.parse(tags);
    if(tags.length){
      updatedProductData.tags = tags
    }
  }


  if(category!==undefined){
    category = JSON.parse(category);
    if(category.length){
      updatedProductData.category = category
    }
  }


  

  if(name){
    updatedProductData.name=name
  }

  if(price){
    updatedProductData.price = price
  }

  if(rating){
    updatedProductData.rating = rating
  }

  if(description){
    updatedProductData.description = description
  }
  

  const images = req.files;


  //Code to upload all the images to cloudinary server.

  const cloudinaryResult = await Promise.all(
    images.map(async (image)=>{
        const result = await cloudinary.v2.uploader.upload(image.path);
        return result.secure_url
    })
  )

  if(cloudinaryResult.length){
    updatedProductData.imagesURL = cloudinaryResult
  }

  const serviceData = await updateProductService(id, updatedProductData);

  if (serviceData.success) {
    res.status(200).send({
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    res.status(500).send({
      message: serviceData.message,
    });
  }
}

module.exports = {
  addProductController,
  getAllProductController,
  updateProductController,
  getOneProductController,
};

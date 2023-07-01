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

  const { name, price, rating, description } = req.body;

  const images = req.files;


  //Code to upload all the images to cloudinary server.

  const cloudinaryResult = await Promise.all(
    images.map(async (image)=>{
        const result = await cloudinary.v2.uploader.upload(image.path);
        return result.secure_url
    })
  )

  console.log(cloudinaryResult)

  const newProduct = {
    name,
    price,
    rating,
    description,
    imagesURL:cloudinaryResult
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

  const updatedProductData = req.body;

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

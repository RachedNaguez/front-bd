import axios from "axios";
import React, { useState } from "react";
import "./App.css";

function PhotoUpload() {
  const [photo, setPhoto] = useState(null);
  //const [photoPreview, setPhotoPreview] = useState([]);
  const [product, setProduct] = useState([]);

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);

    axios
      .post("http://127.0.0.1:8000/api/upload-photo/", formData)
      .then((response) => {
        console.log(response);
        //setPhotoPreview(response.data.imgs);
        setProduct(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="file btn btn-lg btn btn-outline-success div">
          <i className="bi bi-upload"></i>
          <input type="file" className="infile" onChange={handlePhotoChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
      <div>
        {product.map((product) => (
          <div>
            <h3>{product.brand}</h3>
            <img
              src={process.env.PUBLIC_URL + `data/${product.image}`}
              alt="preview"
              height="300px"
            />
            <p>{product.description}</p>
            <p>{product.price} DT</p>
            <p>{product.quantity} pieces</p>
            {product.isFeatured ? <p>En stock</p> : <p>En repture de stock</p>}
          </div>
        ))}
      </div>
    </>
  );
}

export default PhotoUpload;

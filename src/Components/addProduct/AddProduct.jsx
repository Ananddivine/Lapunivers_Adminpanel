import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [images, setImages] = useState([null, null, null, null]);
    const [productDetails, setProductDetails] = useState({
        name: "",
        images: [],
        category: "laptop",
        new_price: "",
        old_price: "",
        description: ""
    });

    const imageHandler = (e, index) => {
        const file = e.target.files[0];
        const updatedImages = [...images];
        updatedImages[index] = file;
        setImages(updatedImages);
        const updatedFileNames = updatedImages.map(img => img ? img.name : '');
        setProductDetails({ ...productDetails, images: updatedFileNames });
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;

        let formData = new FormData();
        images.forEach((image) => {
            if (image) formData.append('product_images', image);
        });

        formData.append('name', productDetails.name);
        formData.append('category', productDetails.category);
        formData.append('new_price', productDetails.new_price);
        formData.append('old_price', productDetails.old_price);
        formData.append('description', productDetails.description);

        try {
            const response = await fetch('https://lapuniversbackend-production.up.railway.app/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            responseData = await response.json();

            if (responseData.success) {
                console.log(responseData);
                const updatedProductDetails = {
                    ...productDetails,
                    images: responseData.image_urls,
                };

                const productResponse = await fetch('https://lapuniversbackend-production.up.railway.app/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedProductDetails),
                });

                const productData = await productResponse.json();

                if (productData.success) {
                    alert("Product Added");
                } else {
                    alert("Failed to Add Product");
                }
            } else {
                console.error('Failed to upload images:', responseData.message);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    return (
        <div className='AddProduct'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type Here ' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type Here ' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name='category' className='addproduct-selector'>
                    <option value='laptop'>Laptop</option>
                    <option value='battery'>Battery</option>
                    <option value='screen'>Screen</option>
                    <option value='charger'>Charger</option>
                    <option value='keyboard'>Keyboard</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <p>Description</p>
                <textarea value={productDetails.description} onChange={changeHandler} name='description' placeholder='Type Here' />
            </div>

            {/* Add fields for each image in a grid layout */}
            <div className="addproduct-images-container">
                {images.map((image, index) => (
                    <div key={index} className="addproduct-itemfield">
                        <label htmlFor={`file-input-${index}`}>
                            <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
                        </label>
                        <input type="file" onChange={(e) => imageHandler(e, index)} id={`file-input-${index}`} hidden />
                    </div>
                ))}
            </div>

            <div className='addproduct-btn-container'>
                <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
            </div>
        </div>
    );
};

export default AddProduct;

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Image } from 'cloudinary-react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
}));

const AddPermemnentShopForm = () => {
    const classes = useStyles();
    const [shopData, setShopData] = useState({
        shopName: "",
        floor: "",
        ownerID: "",
        imageUrl: null, // Store image URL instead of the file
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShopData({ ...shopData, [name]: value });
    };

    const handleImageUpload = (file) => {
        // Use Cloudinary's API to upload the image and get the URL
        // You need to configure Cloudinary settings and get your cloud name, API key, and API secret
        // Here's a basic example, replace "your_cloud_name", "your_upload_preset" with your actual cloud name and upload preset
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_upload_preset");
        formData.append("cloud_name", "your_cloud_name");

        fetch(`https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // Set the image URL in the state
                setShopData({ ...shopData, imageUrl: data.url });
            })
            .catch((error) => {
                console.error("Error uploading image:", error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send only the image URL to the backend
            const { imageUrl, ...formData } = shopData;
            // Send formData to the backend API
            console.log(formData);
            alert("Shop added successfully!");
        } catch (error) {
            console.error("Error adding shop:", error);
        }
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                name="shopName"
                label="Shop Name"
                value={shopData.shopName}
                onChange={handleInputChange}
            />
            <TextField
                name="floor"
                label="Floor"
                value={shopData.floor}
                onChange={handleInputChange}
            />
            <TextField
                name="ownerID"
                label="Owner ID"
                value={shopData.ownerID}
                onChange={handleInputChange}
            />
            <div>
                <Button
                    variant="contained"
                    component="label"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                >
                    Upload Image
                    <input type="file" hidden />
                </Button>
                {shopData.imageUrl && <Image cloudName="your_cloud_name" publicId={shopData.imageUrl} />}
            </div>
            <Button type="submit" variant="contained" color="primary">
                Add Shop
            </Button>
        </form>
    );
};

export default AddPermemnentShopForm;

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Button, TextField, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton, Modal } from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import axios from "axios";
import { Image } from 'cloudinary-react'; // Import Image component from Cloudinary React SDK
import { API_URL, CLOUD_NAME } from "../../../constants/constants";
import useStyles from "./style";
import AdminNav from "../../../components/admin-Nav";
import ImageUpload from "../../../components/ImageUpload";
import geanaratePDF from "../../../components/PDFGenarator";

const PermanentShopDashboard = () => {
    const classes = useStyles();
    const [dataList, setDataList] = useState([]);
    const [id, setId] = useState("");
    const [imageUrl, setImageUrl] = useState('');
    const [url, setUrl] = useState('');
    const [formData, setFormData] = useState({
        shopID: "",
        shopName: "",
        floor: "",
        ownerID: "",
        imageUrl: "" // Updated to store Cloudinary image URL
    });
    const [errors, setErrors] = useState({
        shopID: "",
        shopName: "",
        floor: "",
        ownerID: "",
        imageUrl: ""
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(API_URL + "/permanentShop/get");
            const data = await response.data;
            setDataList(data.permanentShops);
        };
        getData();
    }, [dataList]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        validateField(name, value);
    };

    const validateField = (fieldName, value) => {
        let errorMessage = "";
        switch (fieldName) {
            case "shopID":
                errorMessage = value.trim() === "" ? "Shop ID is required" : "";
                break;
            case "shopName":
                errorMessage = value.trim() === "" ? "Shop Name is required" : "";
                break;
            case "floor":
                errorMessage = value.trim() === "" ? "Floor is required" : "";
                break;
            case "ownerID":
                errorMessage = value.trim() === "" ? "Owner ID is required" : "";
                break;
            case "imageUrl":
                errorMessage = value.trim() === "" ? "Image URL is required" : "";
                break;
            default:
                break;
        }
        setErrors((prevState) => ({
            ...prevState,
            [fieldName]: errorMessage
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(errors).every((x) => x === "")) {
            let formDataCopy = { ...formData, imageUrl: imageUrl };
            axios.post(API_URL + "/permanentShop/add", formDataCopy)
                .then((res) => {
                    setDataList([...dataList, res.data.permanentShop]);
                    setOpen(false);
                    clearForm();
                    setUrl('');
                }).catch((err) => {
                    console.log(err);
                });
        }
    };

    const clearForm = () => {
        setFormData({
            shopID: "",
            shopName: "",
            floor: "",
            ownerID: "",
            imageUrl: ""
        });
        setErrors({
            shopID: "",
            shopName: "",
            floor: "",
            ownerID: "",
            imageUrl: ""
        });
    };

    const handleDelete = (id) => {
        axios.delete(API_URL + "/permanentShop/delete/" + id)
            .then((res) => {
                setDataList(dataList.filter((item) => item._id !== id));
            }).catch((err) => {
                console.log(err);
            });
    };

    const handleEdit = (id) => {
        axios.get(API_URL + "/permanentShop/get/" + id)
            .then((res) => {
                setFormData(res.data.permanentShop);
                setId(id);
                setUrl(res.data.permanentShop.imageUrl);
                setOpen(true);
            }).catch((err) => {
                console.log(err);
            });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        let formDataCopy = {...formData, imageUrl: url };
        axios.put(API_URL + "/permanentShop/update/" + id, formDataCopy).then((res) => {
            setOpen(false);
            clearForm();
            setId("");
            setUrl('');
        }).catch((err) => {
            console.log(err);
        });
    };

    const handleClose = () => {
        setOpen(false);
        setId("");
        setUrl('');
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'shopping'); // Replace 'your_upload_preset' with your Cloudinary upload preset
        formData.append('cloud_name', CLOUD_NAME); // Replace 'your_cloud_name' with your Cloudinary cloud name        try {
        const response = await fetch('https://api.cloudinary.com/v1_1/' + CLOUD_NAME + '/image/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        setImageUrl(data.secure_url);
    };

    const getReport = () => {
        let dataListCopy = dataList.map(item => {
            return {
                shopID: item.shopID,
                shopName: item.shopName,
                floor: item.floor,
                ownerID: item.ownerID, 
            }
        });
        let columns = ['Shop ID', 'Shop Name', 'Floor', 'Owner ID'];
        geanaratePDF(dataListCopy, columns, 'Permanent Shop Report');
    };
 
    return (
        <Card className={classes.root}>
            <AdminNav />
            <Typography variant="h3">Permanent Shop Dashboard</Typography>

            <div className={classes.row}>
                <Button variant="contained" color="primary" onClick={() => setOpen(!open)}> {open ? 'X' : 'Add new'} </Button>
                <Button variant="contained" color="secondary" onClick={() => getReport()}> Genarate Report </Button>
            </div>

            {open &&
                <div className={classes.form}>
                    <Typography variant="h5" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{id ? "Update Shop" : "Add New Shop"}</Typography>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            style={{ width: "90%" }}
                            name="shopID"
                            label="Shop ID"
                            value={formData.shopID}
                            onChange={handleChange}
                        />
                        {errors.shopID && <p style={{ color: "red" }}>{errors.shopID}</p>}
                        <TextField
                            style={{ width: "90%" }}
                            name="shopName"
                            label="Shop Name"
                            value={formData.shopName}
                            onChange={handleChange}
                        />
                        {errors.shopName && <p style={{ color: "red" }}>{errors.shopName}</p>}
                        <TextField
                            style={{ width: "90%" }}
                            name="floor"
                            label="Floor"
                            value={formData.floor}
                            onChange={handleChange}
                        />
                        {errors.floor && <p style={{ color: "red" }}>{errors.floor}</p>}
                        <TextField
                            style={{ width: "90%" }}
                            name="ownerID"
                            label="Owner ID"
                            value={formData.ownerID}
                            onChange={handleChange}
                        />
                        {errors.ownerID && <p style={{ color: "red" }}>{errors.ownerID}</p>}
                         
                        <ImageUpload handleUpload={handleUpload} url={url} setUrl={setUrl}/>
                        {errors.imageUrl && <p style={{ color: "red" }}>{errors.imageUrl}</p>}
                        <Button style={{ width: "70%" }} type="submit" variant="contained" color="primary" onClick={id ? handleUpdate : handleSubmit}>
                            Submit
                        </Button>
                        <Button style={{ width: "70%" }} type="button" onClick={handleClose} variant="contained" color="secondary">
                            Cancel
                        </Button>
                    </form>
                </div>
            }

            {
                !open && (
                    <TableContainer>
                        <Table className={classes.table} aria-label="permanent-shop-table">
                            <TableHead className={classes.TableHeader}>
                                <TableRow>
                                    <TableCell>Shop ID</TableCell>
                                    <TableCell align="right">Shop Name</TableCell>
                                    <TableCell align="right">Floor</TableCell>
                                    <TableCell align="right">Owner ID</TableCell>
                                    <TableCell align="right">Image</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataList.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell>{item.shopID}</TableCell>
                                        <TableCell align="right">{item.shopName}</TableCell>
                                        <TableCell align="right">{item.floor}</TableCell>
                                        <TableCell align="right">{item.ownerID}</TableCell>
                                        <TableCell align="right">
                                            <Image cloudName={CLOUD_NAME} publicId={item.imageUrl} width="80" height="80" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="edit" onClick={() => handleEdit(item._id)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" color="warning" onClick={() => handleDelete(item._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
        </Card>
    );
};

export default PermanentShopDashboard;

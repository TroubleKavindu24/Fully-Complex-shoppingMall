import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Button, TextField, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton, Modal } from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import useStyles from "./style";
import AdminNav from "../../components/admin-Nav";
import geanaratePDF from "../../components/PDFGenarator";

const StallSeekerDashboard = () => {
    const classes = useStyles();
    const [dataList, setDataList] = useState([]);
    const [id, setId] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        registrationID: "",
        registrationStatus: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        registrationID: "",
        registrationStatus: ""
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(API_URL + "/stallSeeker/get");
            const data = await response.data;
            setDataList(data.stallSeekers);
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
            case "name":
                errorMessage = value.trim() === "" ? "Name is required" : "";
                break;
            case "email":
                errorMessage = !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? "Invalid email address" : "";
                break;
            case "phoneNumber":
                errorMessage = !value.match(/^\d{10}$/) ? "Invalid phone number" : "";
                break;
            case "registrationID":
                errorMessage = value.trim() === "" ? "Registration ID is required" : "";
                break;
            case "registrationStatus":
                errorMessage = value.trim() === "" ? "Registration Status is required" : "";
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
            axios.post(API_URL + "/stallSeeker/add", formData)
                .then((res) => {
                    setDataList([...dataList, res.data.stallSeeker]);
                    setOpen(false);
                    clearForm();
                }).catch((err) => {
                    console.log(err);
                });
        }
    };

    const clearForm = () => {
        setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            registrationID: "",
            registrationStatus: ""
        });
        setErrors({
            name: "",
            email: "",
            phoneNumber: "",
            registrationID: "",
            registrationStatus: ""
        });
    };

    const handleDelete = (id) => {
        axios.delete(API_URL + "/stallSeeker/delete/" + id)
            .then((res) => {
                setDataList(dataList.filter((item) => item._id !== id));
            }).catch((err) => {
                console.log(err);
            });
    };

    const handleEdit = (id) => {
        axios.get(API_URL + "/stallSeeker/get/" + id)
            .then((res) => {
                setFormData(res.data.stallSeeker);
                setId(id);
                setOpen(true);
            }).catch((err) => {
                console.log(err);
            });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(API_URL + "/stallSeeker/update/" + id, formData).then((res) => {
            setOpen(false);
            clearForm();
            setId("");
        }).catch((err) => {
            console.log(err);
        });
    };

    const handleClose = () => {
        setOpen(false);
        setId("");
    };

    const getReport = () => {
        let dataListCopy = dataList.map(item => {
            return {
                ID: item._id,
                Name: item.name,
                Email: item.email,
                'Phone Number': item.phoneNumber,
                'Registration ID': item.registrationID,
                'Registration Status': item.registrationStatus
            }
        });
        let columns = ['ID', 'Name', 'Email', 'Phone Number', 'Registration ID', 'Registration Status'];
        geanaratePDF(dataListCopy, columns, 'Stall seeker Report');
    };

    return (
        <Card className={classes.root}>

            <AdminNav />
            <Typography variant="h3">Stall Seeker Dashboard</Typography>

            <div className={classes.row}>
                <Button variant="contained" color="primary" onClick={() => setOpen(!open)}> {open ? 'X' : 'Add new'} </Button>
                <Button variant="contained" color="secondary" onClick={() => getReport()}> Genarate Report </Button>
            </div>

            {open &&
                <div className={classes.form}>
                    <Typography variant="h5" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{id ? "Update Stall Seeker" : "Add New Stall Seeker"}</Typography>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            style={{ width: "90%" }}
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                        <TextField
                            style={{ width: "90%" }}
                            name="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                        <TextField
                            style={{ width: "90%" }}
                            name="phoneNumber"
                            label="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
                        <TextField
                            style={{ width: "90%" }}
                            name="registrationID"
                            label="Registration ID"
                            value={formData.registrationID}
                            onChange={handleChange}
                        />
                        {errors.registrationID && <p style={{ color: "red" }}>{errors.registrationID}</p>}
                        <TextField
                            style={{ width: "90%" }}
                            name="registrationStatus"
                            label="Registration Status"
                            value={formData.registrationStatus}
                            onChange={handleChange}
                        />
                        {errors.registrationStatus && <p style={{ color: "red" }}>{errors.registrationStatus}</p>}
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
                        <Table className={classes.table} aria-label="stall-seeker-table">
                            <TableHead className={classes.TableHeader}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Phone Number</TableCell>
                                    <TableCell align="right">Registration ID</TableCell>
                                    <TableCell align="right">Registration Status</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataList.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell align="right">{item.email}</TableCell>
                                        <TableCell align="right">{item.phoneNumber}</TableCell>
                                        <TableCell align="right">{item.registrationID}</TableCell>
                                        <TableCell align="right">{item.registrationStatus}</TableCell>
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

export default StallSeekerDashboard;

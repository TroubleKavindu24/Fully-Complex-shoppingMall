import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Button, TextField, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton, Modal } from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import useStyles from "./style";
import AdminNav from "../../components/admin-Nav";
import geanaratePDF from "../../components/PDFGenarator";

const InteractiveMallEventDashboard = () => {
    const classes = useStyles();
    const [dataList, setDataList] = useState([]);
    const [id, setId] = useState("");
    const [formData, setFormData] = useState({
        eventName: "",
        description: "",
        dateTime: "",
        location: "",
        category: "",
        capacity: "",
        registrationLink: ""
    });
    const [errors, setErrors] = useState({
        eventName: "",
        description: "",
        dateTime: "",
        location: "",
        category: "",
        capacity: "",
        registrationLink: ""
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(API_URL + "/event/get");
            const data = await response.data;
            setDataList(data.eventList);
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
            case "eventName":
                errorMessage = value.trim() === "" ? "Event Name is required" : "";
                break;
            case "description":
                errorMessage = value.trim() === "" ? "Description is required" : "";
                break;
            case "dateTime":
                errorMessage = value.trim() === "" ? "Date Time is required" : "";
                break;
            case "location":
                errorMessage = value.trim() === "" ? "Location is required" : "";
                break;
            case "category":
                errorMessage = value.trim() === "" ? "Category is required" : "";
                break;
            case "capacity":
                errorMessage = value.trim() === "" ? "Capacity is required" : "";
                break;
            case "registrationLink":
                errorMessage = value.trim() === "" ? "Registration Link is required" : "";
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
            axios.post(API_URL + "/event/add", formData)
                .then((res) => {
                    setDataList([...dataList, res.data.eventList]);
                    setOpen(false);
                    clearForm();
                }).catch((err) => {
                    console.log(err);
                });
        }
    };

    const clearForm = () => {
        setFormData({
            eventName: "",
            description: "",
            dateTime: "",
            location: "",
            category: "",
            capacity: "",
            registrationLink: ""
        });
        setErrors({
            eventName: "",
            description: "",
            dateTime: "",
            location: "",
            category: "",
            capacity: "",
            registrationLink: ""
        });
    };

    const handleDelete = (id) => {
        axios.delete(API_URL + "/event/delete/" + id)
            .then((res) => {
                setDataList(dataList.filter((item) => item._id !== id));
            }).catch((err) => {
                console.log(err);
            });
    };

    const handleEdit = (id) => {
        axios.get(API_URL + "/event/get/" + id)
            .then((res) => {
                setFormData(res.data.eventList);
                setId(id);
                setOpen(true);
            }).catch((err) => {
                console.log(err);
            });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(API_URL + "/event/update/" + id, formData).then((res) => {
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
                eventId: item._id,
                eventName: item.eventName,
                description: item.description,
                dateTime: item.dateTime,
                location: item.location,
                category: item.category,
                capacity: item.capacity,
                registrationLink: item.registrationLink
            }
        });
        let columns = ['Event Id', 'Event Name', 'Description', 'Date Time', 'Location', 'Category', 'Capacity', 'Registration Link'];
        geanaratePDF(dataListCopy, columns, 'Event Report');
    };

    return (
        <Card className={classes.root}>
            <AdminNav />
            <Typography variant="h3">Interactive Mall Event Dashboard</Typography>

            <div className={classes.row}>
                <Button variant="contained" color="primary" onClick={() => setOpen(!open)}> {open ? 'X' : 'Add new'} </Button>
                <Button variant="contained" color="secondary" onClick={() => getReport()}> Genarate Report </Button>
            </div>

            {open &&
                <div className={classes.form}>
                    <Typography variant="h5">{id ? "Update Mall Event" : "Add New Mall Event"}</Typography>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            name="eventName"
                            label="Event Name"
                            value={formData?.eventName}
                            onChange={handleChange}
                        />
                        {errors.eventName && <p style={{ color: "red" }}>{errors.eventName}</p>}
                        <TextField
                            name="description"
                            label="Description"
                            value={formData?.description}
                            onChange={handleChange}
                        />
                        {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
                        <TextField
                            name="dateTime"
                            label="Date Time"
                            type="date"
                            value={formData?.dateTime}
                            onChange={handleChange}
                        />
                        {errors.dateTime && <p style={{ color: "red" }}>{errors.dateTime}</p>}
                        <TextField
                            name="location"
                            label="Location"
                            value={formData?.location}
                            onChange={handleChange}
                        />
                        {errors.location && <p style={{ color: "red" }}>{errors.location}</p>}
                        <TextField
                            name="category"
                            label="Category"
                            value={formData?.category}
                            onChange={handleChange}
                        />
                        {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}
                        <TextField
                            name="capacity"
                            label="Capacity"
                            value={formData?.capacity}
                            onChange={handleChange}
                        />
                        {errors.capacity && <p style={{ color: "red" }}>{errors.capacity}</p>}
                        <TextField
                            name="registrationLink"
                            label="Registration Link"
                            value={formData?.registrationLink}
                            onChange={handleChange}
                        />
                        {errors.registrationLink && <p style={{ color: "red" }}>{errors.registrationLink}</p>}
                        <Button type="submit" variant="contained" color="primary" onClick={id ? handleUpdate : handleSubmit}>
                            Submit
                        </Button>
                        <Button type="button" onClick={handleClose} variant="contained" color="secondary">
                            Cancel
                        </Button>
                    </form>
                </div>
            }

            <TableContainer>
                <Table className={classes.table} aria-label="mall-event-table">
                    <TableHead className={classes.TableHeader}>
                        <TableRow>
                            <TableCell align="right">Event Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Date Time</TableCell>
                            <TableCell align="right">Location</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Capacity</TableCell>
                            <TableCell align="right">Registration Link</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataList.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell align="right">{item?.eventName}</TableCell>
                                <TableCell align="right">{item?.description}</TableCell>
                                <TableCell align="right">{item?.dateTime}</TableCell>
                                <TableCell align="right">{item?.location}</TableCell>
                                <TableCell align="right">{item?.category}</TableCell>
                                <TableCell align="right">{item?.capacity}</TableCell>
                                <TableCell align="right">{item?.registrationLink}</TableCell>
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
        </Card>
    );
};

export default InteractiveMallEventDashboard;

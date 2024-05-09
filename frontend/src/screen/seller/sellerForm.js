import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: theme.spacing(2),
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "400px",
        padding: theme.spacing(2),
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
    },
    textField: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    button: {
        width: "100%",
        maxWidth: "200px",
    },
}));

const SellerForm = () => {
    const classes = useStyles();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        shopId: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform form submission logic here
        console.log("Form submitted:", formData);
    };

    return (
        <div className={classes.root}>
            <Typography variant="h4">Seller Form</Typography>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    className={classes.textField}
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    className={classes.textField}
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    className={classes.textField}
                    name="phoneNumber"
                    label="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                <TextField
                    className={classes.textField}
                    name="password"
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <TextField
                    className={classes.textField}
                    name="shopId"
                    label="Shop ID"
                    value={formData.shopId}
                    onChange={handleChange}
                />
                <Button className={classes.button} type="submit" variant="contained" color="primary">
                    Submit
                </Button>
                <Button className={classes.button} type="button" variant="contained" color="secondary">
                    Cancel
                </Button>
            </form>
        </div>
    );
};

export default SellerForm;

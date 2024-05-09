import { Image } from "cloudinary-react";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Typography,
    Button,
    CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: "auto",
        maxWidth: 800,
        padding: theme.spacing(2),
    },
    hidden: {
        display: "none",
    },
    header: {
        border: `2px dashed ${theme.palette.grey[400]}`,
        padding: theme.spacing(4),
        textAlign: "center",
        marginBottom: theme.spacing(2),
    },
    uploadButton: {
        marginTop: theme.spacing(2),
    },
    previewImage: {
        marginTop: theme.spacing(2),
        maxWidth: "100%",
        borderRadius: theme.shape.borderRadius,
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: theme.spacing(2),
    },
    button: {
        marginLeft: theme.spacing(1),
    },
    loading: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing(2),
    },
}));

const ImageUpload = (props) => {
    const classes = useStyles();
    const { url, setUrl } = props;
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(url);

    const uploadImage = async () => {

        setLoading(true);
        const data = new FormData();
        data.append("file", image);
        data.append(
            "upload_preset",
            'shopping'
        );
        data.append("cloud_name", 'sgcreation');
        data.append("folder", "Cloudinary-React");

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${'sgcreation'}/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );
            const res = await response.json();
            setUrl(res.url);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleImageChange = (event) => {

        const file = event.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            setPreview(reader.result);
        };
    };

    const handleResetClick = () => {
        setPreview(null);
        setImage(null);
    }; 

    return (
        <Container className={classes.container}>
            <header className={classes.header}>
                {
                    !preview && (
                        <>
                            <Typography variant="h5" gutterBottom>
                                Click on Upload a File
                            </Typography>
                            <input
                                id="hidden-input"
                                type="file"
                                className={classes.hidden}
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            <label htmlFor="hidden-input">
                                <Button
                                    className={classes.uploadButton}
                                    variant="contained"
                                    color="primary"
                                    component="div"
                                >
                                    Upload a file
                                </Button>
                            </label>
                        </>
                    )
                }
                <div className={classes.preview}>
                    {preview && (
                        <img src={preview || url} alt="preview" className={classes.previewImage} width={'150px'} height={'150px'} />
                    )}
                </div>
            </header>
            <div className={classes.buttons}>
                <Button
                    onClick={uploadImage}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={!image}
                >
                    Upload now
                </Button>
                <Button
                    onClick={handleResetClick}
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                >
                    Reset
                </Button>
            </div>
            {loading && (
                <div className={classes.loading}>
                    <CircularProgress />
                    <Typography variant="body1">Processing...</Typography>
                </div>
            )} 
        </Container>
    );
};

export default ImageUpload;

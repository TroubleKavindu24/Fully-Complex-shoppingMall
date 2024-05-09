import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  Button,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Grid,
  CardActionArea,
  CardContent,
} from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import QrCodeIcon from '@mui/icons-material/QrCode';
import axios from "axios";
import { Image } from "cloudinary-react"; 
import { API_URL, CLOUD_NAME } from "../../../constants/constants";
import useStyles from "./style";
import AdminNav from "../../../components/admin-Nav";
import ImageUpload from "../../../components/ImageUpload";
import geanaratePDF from "../../../components/PDFGenarator";
import QRModal from "../../../components/QRModal";

const TemporaryShopDashboard = () => {
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);
  const [id, setId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");
  const [stallId, setStallId] = useState("");
  const [qrValue, setQrValue] = useState('');
  const [shops, setShops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const shopIdList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const [formData, setFormData] = useState({
    stallID: "",
    stallName: "",
    stallDescription: "",
    stallImage: "",
    ownerID: "",
  });
  const [errors, setErrors] = useState({
    stallID: "",
    stallName: "",
    stallDescription: "",
    stallImage: "",
    ownerID: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(API_URL + "/temporaryShop/get");
      const data = await response.data;
      setDataList(data.temporaryShops);
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
      case "stallID":
        errorMessage = value.trim() === "" ? "Stall ID is required" : "";
        break;
      case "stallName":
        errorMessage = value.trim() === "" ? "Stall Name is required" : "";
        break;
      case "stallDescription":
        errorMessage =
          value.trim() === "" ? "Stall Description is required" : "";
        break;
      case "stallImage":
        errorMessage = value.trim() === "" ? "Stall Image is required" : "";
        break;
      case "ownerID":
        errorMessage = value.trim() === "" ? "Owner ID is required" : "";
        break;
      default:
        break;
    }
    setErrors((prevState) => ({
      ...prevState,
      [fieldName]: errorMessage,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).every((x) => x === "")) {
      let formDataCopy = { ...formData, stallImage: url, stallID: stallId };

      axios
        .post(API_URL + "/temporaryShop/add", formDataCopy)
        .then((res) => {
          setDataList([...dataList, res.data.temporaryShop]);
          setOpen(false);
          clearForm();
          setStallId("");
          setUrl("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const clearForm = () => {
    setFormData({
      stallID: "",
      stallName: "",
      stallDescription: "",
      stallImage: "",
      ownerID: "",
    });
    setErrors({
      stallID: "",
      stallName: "",
      stallDescription: "",
      stallImage: "",
      ownerID: "",
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(API_URL + "/temporaryShop/delete/" + id)
      .then((res) => {
        setDataList(dataList.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    axios
      .get(API_URL + "/temporaryShop/get/" + id)
      .then((res) => {
        setFormData(res.data.temporaryShop);
        setId(id);
        setStallId(res.data.temporaryShop.stallID);
        setUrl(res.data.temporaryShop.stallImage || "");
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let formDataCopy = { ...formData, stallImage: url, stallID: stallId };

    axios
      .put(API_URL + "/temporaryShop/update/" + id, formDataCopy)
      .then((res) => {
        setOpen(false);
        clearForm();
        setId("");
        setUrl("");
        setStallId("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setId("");
    setUrl("");
    setStallId("");
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(API_URL + "/temporaryShop/get");
      const data = await response.data;
      setShops(data.temporaryShops);
    };
    getData();
  }, [shops]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "shopping"); // Replace 'your_upload_preset' with your Cloudinary upload preset
    formData.append("cloud_name", CLOUD_NAME); // Replace 'your_cloud_name' with your Cloudinary cloud name
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/" + CLOUD_NAME + "/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const getReport = () => {
    let dataListCopy = dataList.map((item) => {
      return {
        shopID: item.stallID,
        shopName: item.stallName,
        description: item.stallDescription,
        ownerID: item.ownerID,
      };
    });
    let columns = ["Stall ID", "Stall Name", "Stall Description", "Owner ID"];
    geanaratePDF(dataListCopy, columns, "Temporary Shop Report");
  };

  const hadleShopIdSelect = (e) => {
    if (shops.find((shop) => shop.stallID == e) ? true : false) {
      alert("This Stall occupied");
      return;
    }

    if (stallId == e) {
      setStallId("");
      return;
    } else {
      setStallId(e);
    }
  };

  return (
    <Card className={classes.root}>
      <AdminNav />
      <Typography variant="h3">Temporary Shop Dashboard</Typography>

      <div className={classes.row}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(!open)}
        >
          {" "}
          {open ? "X" : "Add new"}{" "}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => getReport()}
        >
          {" "}
          Genarate Report{" "}
        </Button>
      </div>

      <QRModal open={showModal} onClose={setShowModal} value={qrValue? qrValue : 'no data'} />
      {open && (
        <div className={classes.form}>
          <Typography variant="h5">
            {id ? "Update Shop" : "Add New Shop"}
          </Typography>
          <form className={classes.form} noValidate autoComplete="off">
            <Typography variant="label">Select stall Id</Typography>
            <div classsName={classes.stallIdContainer}>
              {
                <Grid container spacing={3} className={classes.gridContainer}>
                  {shopIdList.map((shopId) => (
                    <Grid item xs={12} sm={6} md={4} key={shopId}>
                      <Card
                        className={
                          shopId == stallId
                            ? classes.selectedCard
                            : shops.find((shop) => shop.stallID == shopId)
                            ? classes.ownedCard
                            : classes.card
                        }
                      >
                        <CardActionArea
                          onClick={() => hadleShopIdSelect(shopId)}
                        >
                          <CardContent className={classes.cardContent}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            ></Typography>
                            Stall ID : {shopId}
                            {shops.find((shop) => shop.stallID == shopId) ? (
                              <Typography variant="label">
                                Shop Name :{" "}
                                {
                                  shops.find((shop) => shop.stallID == shopId)
                                    .stallName
                                }
                              </Typography>
                            ) : (
                              <Typography variant="label">Avaliable</Typography>
                            )}
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              }
            </div>
            <Typography variant="label">
              {stallId ? "Selected stall Id : " + stallId : "Sellect a stall"}
            </Typography>

            <TextField
              style={{ width: "90%" }}
              name="stallID"
              type="hidden"
              value={stallId}
              onChange={handleChange}
            />
            {errors.stallID && <p style={{ color: "red" }}>{errors.stallID}</p>}
            <TextField
              style={{ width: "90%" }}
              name="stallName"
              label="Stall Name"
              value={formData.stallName}
              onChange={handleChange}
            />
            {errors.stallName && (
              <p style={{ color: "red" }}>{errors.stallName}</p>
            )}
            <TextField
              style={{ width: "90%" }}
              name="stallDescription"
              label="Stall Description"
              value={formData.stallDescription}
              onChange={handleChange}
            />
            {errors.stallDescription && (
              <p style={{ color: "red" }}>{errors.stallDescription}</p>
            )}

            <TextField
              style={{ width: "90%" }}
              name="ownerID"
              label="Owner ID"
              value={formData.ownerID}
              type="number"
              onChange={handleChange}
            />
            {errors.ownerID && <p style={{ color: "red" }}>{errors.ownerID}</p>}
            <ImageUpload
              handleUpload={handleUpload}
              url={url}
              setUrl={setUrl}
            />
            {errors.stallImage && (
              <p style={{ color: "red" }}>{errors.stallImage}</p>
            )}
            <Button
              style={{ width: "70%" }}
              type="submit"
              variant="contained"
              color="primary"
              onClick={id ? handleUpdate : handleSubmit}
            >
              Submit
            </Button>
            <Button
              style={{ width: "70%" }}
              type="button"
              onClick={handleClose}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </form>
        </div>
      )}

      {!open && (
        <TableContainer>
          <Table className={classes.table} aria-label="temporary-shop-table">
            <TableHead className={classes.TableHeader}>
              <TableRow>
                <TableCell>Stall ID</TableCell>
                <TableCell align="right">Stall Name</TableCell>
                <TableCell align="right">Stall Description</TableCell>
                <TableCell align="right">QR Code</TableCell>
                <TableCell align="right">Stall Image</TableCell>
                <TableCell align="right">Owner ID</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.stallID}</TableCell>
                  <TableCell align="right">{item.stallName}</TableCell>
                  <TableCell align="right">{item.stallDescription}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <IconButton
                      aria-label="delete"
                      color="warning"
                      onClick={() =>{setQrValue(item);setShowModal(true)}}
                    >
                      <QrCodeIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <Image
                      cloudName={CLOUD_NAME}
                      publicId={item.stallImage}
                      width="50"
                      height="50"
                    />
                  </TableCell>
                  <TableCell align="right">{item.ownerID}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(item._id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="warning"
                      onClick={() => handleDelete(item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
};

export default TemporaryShopDashboard;

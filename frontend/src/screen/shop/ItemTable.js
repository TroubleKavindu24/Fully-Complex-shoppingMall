import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Button,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Card,
} from "@material-ui/core";
import {
  Close,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@material-ui/icons";
import axios from "axios";
import ResponsiveAppBar from "../../components/Seller-Nav";
import { API_URL, CLOUD_NAME } from "../../constants/constants";
import { Image } from "cloudinary-react";
import LoginImage from "../../images/login.webp";
import ImageUpload from "../../components/ImageUpload";
import geanaratePDF from "../../components/PDFGenarator";
import AdminNav from "../../components/admin-Nav";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  itemCard: {
    height: "100%",
    width: "80%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  table: {
    width: "95%",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    "& > *": {
      borderBottom: "unset",
      backgroundColor: "#f5f5f5",
    },
    "& > thead > tr > th": {
      borderBottom: "1px solid #e0e0e0",
      backgroundColor: "#f5f5f5",
    },
    "& > tbody > tr > td": {
      borderBottom: "unset",
      backgroundColor: "#f5f5f5",
    },
  },
  TableHeader: {
    backgroundColor: "#f5f5f5",
    color: "#000000",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px",
  },
  row: {
    display: "flex",
    width: "95%",
    height: "80px",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
    "& > *": {
      margin: theme.spacing(2),
      height: "40px",
    },
  },
  itemButton: {
    display: "flex",
    flexDirection: "row",
    width: "20%",
    height: "80px",
    justifyContent: "space-between",
    "& > *": {
      margin: theme.spacing(1),
      width: "80vw",
    },
  },
  form: {
    display: "flex",
    width: "80vw",
    border: "1px solid #e0e0e0",
    backgroundColor: "#f5f5f5",
    borderRadius: "5px",
    marginBottom: "20px",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
    alignItems: "center",
    padding: "20px",
    marginTop: "20px",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
    "& > *": {
      margin: theme.spacing(1),
      width: "60vw",
    },
  },
  appTitle: {
    color: "#000000",
    fontSize: "30px",
    fontWeight: "bold",
    padding: "10px",
    marginTop: "10px",
  },
  container: {
    display: "flex",
    backgroundColor: "rgba(255,255,255,0.8)",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "92vh",
    overflowX: "hidden",
    position: "absolute",
    backdropFilter: "blur(10px)",
    top: "70px",
    zIndex: 1,
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "10px",
    width: "80%",
    height: "80%",
    overflow: "hidden",
    position: "absolute",
    top: "70px",
  },
  illustration: {
    zIndex: 0,
    width: "100%",
    height: "92vh",
  },
}));

const ItemHome = () => {
  const classes = useStyles();
  const [shopData, setShopData] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [id, setId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");
  const [formData, setFormData] = useState({
    itemID: "",
    itemName: "",
    itemDescription: "",
    itemPrice: "",
    itemImage: "",
    shopId: "",
  });
  const [errors, setErrors] = useState({
    itemID: "",
    itemName: "",
    itemDescription: "",
    itemPrice: "",
    itemImage: "",
    shopId: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getData();
  }, [dataList]);

  const getData = async () => {
    try {
      const response = await axios.get(API_URL + "/item/get");
      setDataList(response.data.items);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateField(name, value);
  };
  useEffect(() => {
    fetchShopData(); // Fetch shop data on component mount
  }, []);

  const fetchShopData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8070/api/v0/permanentShop/get"
      );
      setShopData(response.data.permanentShops); // Store the shop data
    } catch (error) {
      console.error("Error fetching shop data:", error);
    }
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";
    switch (fieldName) {
      case "itemID":
        errorMessage = value.trim() === "" ? "Item ID is required" : "";
        break;
      case "itemName":
        errorMessage = value.trim() === "" ? "Item Name is required" : "";
        break;
      case "itemDescription":
        errorMessage =
          value.trim() === "" ? "Item Description is required" : "";
        break;
      case "itemPrice":
        errorMessage = value.trim() === "" ? "Item Price is required" : "";
        break;
      case "itemImage":
        errorMessage = value.trim() === "" ? "Item Image is required" : "";
        break;
      case "shopId":
        errorMessage = value.trim() === "" ? "Shop ID is required" : "";
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
      let formDataCopy = { ...formData, itemImage: url };
      axios
        .post(API_URL + "/item/add", formDataCopy)
        .then((res) => {
          setDataList([...dataList, res.data.item]);
          setOpen(false);
          clearForm();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const clearForm = () => {
    setFormData({
      itemID: "",
      itemName: "",
      itemDescription: "",
      itemPrice: "",
      itemImage: "",
      shopId: "",
    });
    setErrors({
      itemID: "",
      itemName: "",
      itemDescription: "",
      itemPrice: "",
      itemImage: "",
      shopId: "",
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(API_URL + "/item/delete/" + id)
      .then((res) => {
        setDataList(dataList.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    axios
      .get(API_URL + "/item/get/" + id)
      .then((res) => {
        setFormData(res.data.item);
        setUrl(res.data.itemImage);
        setId(id);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let formDataCopy = { ...formData, itemImage: url };
    axios
      .put(API_URL + "/item/update/" + id, formDataCopy)
      .then((res) => {
        setOpen(false);
        clearForm();
        setId("");
        setUrl("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setId("");
    setUrl("");
  };

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
        itemID: item.itemID,
        itemName: item.itemName,
        itemDescription: item.itemDescription,
        itemPrice: item.itemPrice,
      };
    });
    let columns = ["Item ID", "Item Name", "Item Description", "Item Price"];
    geanaratePDF(dataListCopy, columns, "Shop Item Report");
  };

  return (
    <div className={classes.root} style={{ marginLeft: "40px" }}>
      <AdminNav />
      {/* <ResponsiveAppBar /> */}

      <Grid container justify="center">
        <Grid item>
          <img
            src={LoginImage}
            alt="login illustration"
            className={classes.illustration}
          />
        </Grid>
      </Grid>
      <div className={classes.container}>
        <div className={classes.row}>
          <Typography
            style={{
              marginLeft: "15%",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
            className={classes.appTitle}
            variant="h2"
          >
            Shop Item List
          </Typography>
          <div className={classes.itemButton}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(!open)}
            >
              {" "}
              {open ? "X" : "Add new Item"}
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
        </div>
        {open && (
          <div
            style={{ width: "80%", marginLeft: "15%" }}
            className={classes.paper}
          >
            <form className={classes.form} noValidate autoComplete="off">
              <Typography variant="h5">
                {id ? "Update Item" : "Add New Item"}
              </Typography>
              <TextField
                style={{ width: "60%" }}
                name="itemID"
                label="Item ID"
                value={formData.itemID}
                onChange={handleChange}
              />
              {errors.itemID && <p style={{ color: "red" }}>{errors.itemID}</p>}
              <TextField
                style={{ width: "60%" }}
                name="itemName"
                label="Item Name"
                value={formData.itemName}
                onChange={handleChange}
              />
              {errors.itemName && (
                <p style={{ color: "red" }}>{errors.itemName}</p>
              )}
              <TextField
                style={{ width: "60%" }}
                name="itemDescription"
                label="Item Description"
                value={formData.itemDescription}
                onChange={handleChange}
              />
              {errors.itemDescription && (
                <p style={{ color: "red" }}>{errors.itemDescription}</p>
              )}
              <TextField
                style={{ width: "60%" }}
                name="itemPrice"
                label="Item Price"
                value={formData.itemPrice}
                onChange={handleChange}
              />
              {errors.itemPrice && (
                <p style={{ color: "red" }}>{errors.itemPrice}</p>
              )}

              <div>
                <select
                  className="form-control"
                  name="shopId"
                  style={{ width: "78%", marginLeft: "100px" }}
                  value={formData.shopId} // Current value
                  onChange={handleChange} // Handle change
                >
                  {/* Default empty option */}
                  <option value="">Select Shop ID</option>
                  {shopData.map((shop) => (
                    <option key={shop._id} value={shop.shopID}>
                      {shop.shopID} - {shop.shopName}
                    </option>
                  ))}
                </select>
                {errors.shopId && (
                  <p style={{ color: "red" }}>{errors.shopId}</p>
                )}
              </div>
              <ImageUpload
                handleUpload={handleUpload}
                url={url}
                setUrl={setUrl}
              />
              {errors.itemImage && (
                <p style={{ color: "red" }}>{errors.itemImage}</p>
              )}
              <Button
                style={{ width: "50%" }}
                type="submit"
                variant="contained"
                color="primary"
                onClick={id ? handleUpdate : handleSubmit}
              >
                Submit
              </Button>
              <Button
                style={{ width: "50%" }}
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
            <Table
              style={{ width: "80%", marginLeft: "15%" }}
              className={classes.table}
              aria-label="shop-item-table"
            >
              <TableHead className={classes.TableHeader}>
                <TableRow>
                  <TableCell>Item ID</TableCell>
                  <TableCell align="right">Item Name</TableCell>
                  <TableCell align="right">Item Description</TableCell>
                  <TableCell align="right">Item Price</TableCell>
                  <TableCell align="right">Shop ID</TableCell>
                  <TableCell align="right">Item Image</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataList.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.itemID}</TableCell>
                    <TableCell align="right">{item.itemName}</TableCell>
                    <TableCell align="right">{item.itemDescription}</TableCell>
                    <TableCell align="right">{item.itemPrice}</TableCell>
                    <TableCell align="right">{item.shopId}</TableCell>
                    <TableCell align="right">
                      <Image
                        cloudName={CLOUD_NAME}
                        publicId={item.itemImage}
                        width="50"
                        height="50"
                      />
                    </TableCell>
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
      </div>
    </div>
  );
};

export default ItemHome;

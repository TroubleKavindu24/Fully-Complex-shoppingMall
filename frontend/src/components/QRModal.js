import { Modal, Button, makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import QRCode from "react-qr-code";
import jsPDF from "jspdf";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: "auto",
        width:'450px',
        height:'450px',
        padding: theme.spacing(2),
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff',
        position:'relative'
    },
    cloaseButton:{
        position:'absolute',
        top :'10px',
        right:'10px'
    }
}));

const QRModal = (props) => {
  const qrRef = useRef(null);
  const classes = useStyles();

  const downloadQRCode = () => {
    if (qrRef.current !== null) {
      const canvas = qrRef.current.querySelector("canvas");
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("QRCode.pdf");
    }
  };

  return (
    <Modal open={props.open} onClose={props.onClose} className={classes.container}>
      <div className={classes.container}>
        <Button  className={classes.cloaseButton} onClick={() => props.onClose(!props.open)}>X</Button>
        <QRCode
          ref={qrRef}
          value={props.value}
          size={200}
          style={{ margin: "auto" }}
          viewBox={`0 0 200 200`}
        />
        <Button
          onClick={downloadQRCode}
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Download QR Code
        </Button>
      </div>
    </Modal>
  );
};

export default QRModal;

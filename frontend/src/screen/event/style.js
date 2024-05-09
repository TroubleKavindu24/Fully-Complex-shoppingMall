
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        height: "100vh",
        width: "85.5vw",
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: '5vh',
        marginLeft: '12.5vw', 
        backgroundColor: '#f5f5f5',
        padding: '10px',
    },

    table: {
        minWidth: 650,
        maxWidth: "82.5vw",
    },
    TableHeader: {
        backgroundColor: '#f5f5f5',
        color: '#000000',
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '10px',
    },
    page: {
        margin: '20px',
    },
    row: {
        display: "flex",
        width: "97%",
        justifyContent: "flex-end",
        marginBottom: theme.spacing(2),
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    form: {
        display: "flex",
        width: "80vw",
        border: "1px solid #e0e0e0",
        borderRadius: "5px",
        marginBottom: "20px",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "left",
        alignItems: "center",
        padding: "20px",
        marginTop: "20px",
        '& > *': {
            margin: theme.spacing(1),
            width: '60vw',
        },
    }
}));

export default useStyles;
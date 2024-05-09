import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, TextField, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton, Modal } from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import axios from "axios";
import ResponsiveAppBar from '../../../components/Seller-Nav';
import { API_URL, CLOUD_NAME } from '../../../constants/constants';
import LoginImage from '../../../images/login.webp';
import { People as PeopleIcon, Store as StoreIcon, Storefront as StorefrontIcon, BusinessCenter as BusinessCenterIcon, Event as EventIcon } from '@material-ui/icons';
import DashboardCard from '../../../components/DashboardCard';


const useStyles = makeStyles((theme) => ({

    itemCard: {
        height: '100%',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    row: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: theme.spacing(2),
        '& > *': {
            margin: theme.spacing(2),
            height: '180px',
        },
    },
    appTitle: {
        color: '#000000',
        fontSize: '30px',
        fontWeight: 'bold',
        padding: '10px',
        marginTop: '10px',
    },
    card: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        backgroundColor: 'rgba(255,255,255,0.8)',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '92vh',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backdropFilter: 'blur(10px)',
        top: '70px',
        zIndex: 1,
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '80%',
        height: '80%',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '70px',
    },
    illustration: {
        zIndex: 0,
        width: '100%',
        height: '92vh',

    }
}));

const PermenentShopHome = () => {
    const classes = useStyles();


    return (
        <Card className={classes.root}>
            <ResponsiveAppBar />
            <Grid container justify="center">
                <Grid item>
                    <img src={LoginImage} alt="login illustration" className={classes.illustration} />
                </Grid>
            </Grid>
            <div className={classes.container}>
                <Typography variant="h5"> Seller Dashboard</Typography>
                <div className={classes.subContainer}>
                    <div className={classes.row}>
                        <DashboardCard icon="people" title="Customers" value="100+" />
                        <DashboardCard icon="store" title="Permanent Stalls" value="100+" />
                        <DashboardCard icon="storefront" title="Temporary Stalls" value="100+" />
                        <DashboardCard icon="business" title="Sellers" value="100+" />
                        <DashboardCard icon="event" title="Events" value="100+" /> 
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default PermenentShopHome;

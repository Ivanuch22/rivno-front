import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
  Chip,
  Card,
  CardContent,
  CardActions,
  Avatar
} from "@mui/material";
import { localStorageManager } from "@/services";
import routes from "@/routes/index";
import styles from "./MainPage.module.css";

const authAPI = axios.create({
  baseURL: routes.baseURL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorageManager.getItem("access")}`,
  },
});

const MainPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await authAPI.get("/api/orders/all");
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section>
      <div className="container">
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {orders.map((order:any) => (
            <Card key={order.id} style={{ margin: 10, width: 250 }}>
              <CardContent>
                <Avatar alt={order.firstName} src={order.photo1} style={{ width: 60, height: 60, margin: 'auto' }} />
                <Typography variant="h6" component="div">
                  {order.firstName} {order.lastName}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {order.middleName}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>ID:</strong> {order.id}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>Age:</strong> {order.age}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>Gender:</strong> {order.gender}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>Treatment:</strong> {order.treatment}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>Status:</strong> {order.status_id}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Chat</Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </div>
    </section>
  );
};

export default MainPage;
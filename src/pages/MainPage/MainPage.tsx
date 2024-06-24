import React, { useEffect, useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/Auth";
import authAPI from "@/http";
import style from "./MainPage.module.css"




const MainPage = () => {
  const queryClient = useQueryClient()
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { handleAuth, logout } = useAuth();



  const getOrders = async () => {
    try {
      const response = await authAPI.get(`${routes.allOrders}?sortOrder=desc`);
      console.log("fetching is success")
      return response.data.orders || []
    } catch (error: any) {
      console.log(error)
      logout();
      navigate(routes.auth)
      return error
    }

  }
  const { isPending, error, data }: any = useQuery({ queryKey: ['orders'], queryFn: getOrders })



  useEffect(() => {
    if (!isPending && data.length > 0) {
      setOrders(data);
      console.log(data)
    }
  }, [data]);


  if (isPending) return <CircularProgress />

  if (error) return 'An error has occurred: ' + error.message
  return (
    <section>
      <div className="container">
        <Box className={style.box} >
          {orders.map((order: any) => (
            <Link key={order.id + order.firstName} to={`/order/${order.id}`}>
              <Card className={style.cart} >
                <CardContent>
                  <Avatar alt={order.firstName} src={order.photo1} style={{ width: 60, height: 60, margin: 'auto' }} />
                  <Typography variant="h6" component="div">
                    {order.firstName} {order.lastName}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {order.middleName}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <strong>Ід:</strong> {order.id}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <strong>Вік:</strong> {order.age}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <strong>Стать:</strong> {order.gender}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <strong>Статус:</strong> {order.status}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <strong>Дата створення:</strong> {new Date(order.created_at).toLocaleDateString('uk-UA', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit'
                    })}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Відкрити</Button>
                </CardActions>
              </Card>
            </Link>
          ))}
        </Box>
      </div>
    </section>
  );
};

export default MainPage;
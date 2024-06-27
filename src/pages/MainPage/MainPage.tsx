import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardActions,
  Avatar
} from "@mui/material";
import routes from "@/routes/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/Auth";
import authAPI from "@/http";
import style from "./MainPage.module.css"
import { ILessOrder } from "@/interfaces/order.interfaces";

const MainPage = () => {
  const queryClient = useQueryClient()
  const [orders, setOrders] = useState<ILessOrder[]>([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const getOrders = useCallback(async () => {
    try {
      const response = await authAPI.get(`${routes.allOrders}?sortOrder=desc`);
      console.log("fetching is success")
      return response.data.orders || []
    } catch (error: any) {
      logout();
      navigate(routes.auth)
      return error
    }

  }, [logout, navigate])

  const { isPending, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders
  })


  const extractUrl = (photo:string) => {
    if (!photo) return '';
    try {
      const parsedPhoto = JSON.parse(photo);
      return parsedPhoto.Location || '';
    } catch (e) {
      return photo;
    }
  };

  useEffect(() => {
    if (!isPending && data.length > 0) {
      setOrders(data);
    }
  }, [data]);


  if (isPending) return <CircularProgress />

  if (error) return <Typography> 'An error has occurred: ' {error.message}</Typography>


  return (
    <section>
      <div className="container">
        <Box className={style.box} >
          {orders.map((order: any) => {
            const photoUrl = extractUrl(order.photo1);
            return (
              <Link key={order.id + order.firstName} to={`/order/${order.id}`}>
                <Card className={style.cart} >
                  <CardContent>
                    <Avatar alt={order.firstName} src={photoUrl} />
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
            )
          })}
        </Box>
      </div>
    </section>
  );
};

export default MainPage;
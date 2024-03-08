import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import ListGroup from "react-bootstrap/ListGroup";
import PhonePausedIcon from "@mui/icons-material/PhonePaused";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckIcon from "@mui/icons-material/Check";
import Pagination from "../../Components/Pagination/Pagination";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { useMediaQuery } from "@mui/material";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [orders, setOrders] = useState([]);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    if (!userInfo) {
      return navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/orders/mine?page=${page}`, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        setOrders(data.orders);
        setPages(data.pages);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchData();
  }, [page, userInfo]);

  return (
    <Row className="mt-3">
      <Col className="text-center">
        <h5>Историја на нарачки</h5>
        <Row>
          <ListGroup
            style={{ width: "95%", margin: "auto", marginTop: "20px" }}
          >
            <ListGroup.Item>
              <Row className="fw-bold">
                {!isSmallScreen && <Col>ID</Col>}
                <Col>Дата</Col>
                <Col>Статус</Col>
                <Col>Акции</Col>
              </Row>
            </ListGroup.Item>
            {orders &&
              orders.map((o) => (
                <ListGroup.Item key={o._id}>
                  <Row>
                    {!isSmallScreen && <Col>{o._id}</Col>}
                    <Col>
                      {new Date(o.createdAt).toLocaleString("en-GB", {
                        timeZone: "CET",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Col>
                    <Col>
                      {o.status == "confirmation" ? (
                        <PhonePausedIcon />
                      ) : o.status == "shipping" ? (
                        <HourglassTopIcon />
                      ) : o.status == "delivery" ? (
                        <LocalShippingIcon />
                      ) : (
                        <CheckIcon />
                      )}
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => {
                          navigate(`/order/${o._id}`);
                        }}
                      >
                        Детали
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Row>
        <Pagination page={page} pages={pages} onClick={(p) => setPage(p)} />
      </Col>
    </Row>
  );
};

export default OrderHistory;

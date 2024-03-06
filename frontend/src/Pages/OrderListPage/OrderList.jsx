import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import Form from "react-bootstrap/Form";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ListGroup from "react-bootstrap/ListGroup";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import Pagination from "../../Components/Pagination/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { getError } from "../../utils";
import PhonePausedIcon from "@mui/icons-material/PhonePaused";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckIcon from "@mui/icons-material/Check";

const OrderList = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!userInfo || !userInfo.role === "admin") {
      return navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/orders?page=${page}&search=${search}&status=${status}`
        );
        console.log(data);
        setOrders(data.orders);
        setPages(data.pages);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchData();
  }, [page, search, status]);

  return (
    <Row style={{ width: "100vw" }}>
      <Col xs={2}>
        <DashboardMenu />
      </Col>
      <Col>
        <Row className="mt-3">
          <Col style={{ textAlign: "center" }}>
            <h5>Категории</h5>

            <Row className="mt-4">
              <Form
                id="fff"
                className="d-flex align-items-center justify-content-start ms-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <Form.Group>
                  <span className="flexSpan">
                    <SearchSharpIcon
                      style={{ marginRight: "-30px", zIndex: 2 }}
                    />
                    <Form.Control
                      type="search"
                      placeholder="Барај..."
                      className="me-2"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      aria-label="Search"
                      id="searchBar"
                    />
                  </span>
                </Form.Group>
                <Form.Group>
                  <Form.Select
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <option value="all">Статус</option>
                    <option value="confirmation">За потврда</option>
                    <option value="shipping">За испорака</option>
                    <option value="delivery">Пристигнати</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Row>
            <Row>
              <ListGroup
                style={{ width: "95%", margin: "auto", marginTop: "20px" }}
              >
                <ListGroup.Item>
                  <Row className="fw-bold">
                    <Col>ID</Col>
                    <Col>Дата</Col>
                    <Col>Статус</Col>
                    <Col>Акции</Col>
                  </Row>
                </ListGroup.Item>
                {orders &&
                  orders.map((o) => (
                    <ListGroup.Item key={o._id}>
                      <Row>
                        <Col>{o._id}</Col>
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
                              navigate(`/admin/order/${o._id}`);
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
      </Col>
    </Row>
  );
};

export default OrderList;

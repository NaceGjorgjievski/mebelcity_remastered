import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ListProducts = () => {
  return (
    <Row style={{ width: "100vw" }}>
      <Col xs={3} style={{ height: "80vh" }}>
        <DashboardMenu />
      </Col>
      <Col>
        <Row className="mt-3">
          <Col style={{ textAlign: "center" }}>
            <h5>Производи</h5>
            <Form>
              <Row className="mt-4">
                <div className="filterContainer" style={{ width: "100%" }}>
                  <Form
                    id="fff"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    {/*
              <Form.Group>
                <Form.Control
                  id="filterName"
                  placeholder="Име"
                  onSubmit={submitHandler}
                  required
                ></Form.Control>
            </Form.Group>*/}
                    <Form.Group>
                      <Form.Select
                        value={category}
                        onChange={(e) => {
                          if (e.target.value === "all") {
                            navigate(
                              getFilterUrl({
                                page: 1,
                                category: e.target.value,
                                subCategory: "all",
                              })
                            );
                          } else {
                            navigate(
                              getFilterUrl({
                                category: e.target.value,
                                page: 1,
                              })
                            );
                          }
                        }}
                      >
                        <option value="all">Категорија</option>
                        <option value={"dnevna"}>Дневна</option>
                        <option value={"spalna"}>Спална</option>
                        <option value={"kancelarija"}>Канцеларија</option>
                        <option value={"hodnik"}>Ходник</option>
                        <option value={"gradina"}>Градина</option>
                        <option value={"trpezarija"}>Трпезарија</option>
                        <option value={"kujna"}>Кујна</option>
                        <option value={"detska"}>Детска</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group>
                      <Form.Select
                        value={subCategory}
                        onChange={(e) => {
                          navigate(
                            getFilterUrl({
                              subCategory: e.target.value,
                              page: 1,
                            })
                          );
                        }}
                      >
                        <option value="all">Подкатегорија</option>

                        {category === "dnevna" && (
                          <option value="agolni-garnituri">
                            Аголни Гарнитури
                          </option>
                        )}
                        {category === "dnevna" && (
                          <option value="sofi">Софи</option>
                        )}
                        {category === "dnevna" && (
                          <option value="fotelji">Фотелји</option>
                        )}
                        {category === "dnevna" && (
                          <option value="taburetki">Табуретки</option>
                        )}
                        {category === "dnevna" && (
                          <option value="klub-masi">Клуб маси</option>
                        )}
                        {category === "dnevna" && (
                          <option value="tv-komodi">ТВ комоди</option>
                        )}
                        {category === "dnevna" && (
                          <option value="komodi">Комоди</option>
                        )}
                        {category === "spalna" && (
                          <option value="spalni-kompleti">
                            Спални Комплети
                          </option>
                        )}
                        {category === "spalna" && (
                          <option value="lezai">Лежаи</option>
                        )}
                        {category === "spalna" && (
                          <option value="kreveti">Кревети</option>
                        )}
                        {category === "spalna" && (
                          <option value="plakari">Плакари</option>
                        )}
                        {category === "spalna" && (
                          <option value="nokni-skafcinja">
                            Ноќни шкафчиња
                          </option>
                        )}
                        {category === "spalna" && (
                          <option value="toaletni-masi">Тоалетни маси</option>
                        )}
                        {category === "kancelarija" && (
                          <option value="biroa">Бироа</option>
                        )}
                        {category === "kancelarija" && (
                          <option value="kancelariski-stolovi">
                            Канцелариски столови
                          </option>
                        )}
                        {category === "kancelarija" && (
                          <option value="gejmerski-stolovi">
                            Гејмерски столови
                          </option>
                        )}
                        {category === "kancelarija" && (
                          <option value="kancelariski-skafovi">
                            Канцелариски шкафови
                          </option>
                        )}
                        {category === "hodnik" && (
                          <option value="skafovi-za-cevli">
                            Шкафови за чевли
                          </option>
                        )}
                        {category === "hodnik" && (
                          <option value="zakacalki-i-ogledala">
                            Закачалки и огледала
                          </option>
                        )}
                        {category === "hodnik" && (
                          <option value="kolekcii-za-hodnik">
                            Колекции за ходник
                          </option>
                        )}
                        {category === "gradina" && (
                          <option value="gradinarski-kompleti">
                            Градинарски комплети
                          </option>
                        )}
                        {category === "gradina" && (
                          <option value="gradinarski-lulki">
                            Градинарски лулки
                          </option>
                        )}
                        {category === "gradina" && (
                          <option value="gradinarski-cadori">
                            Градинарски чадори
                          </option>
                        )}
                        {category === "gradina" && (
                          <option value="gradinarski-masi">
                            Градинарски маси
                          </option>
                        )}
                        {category === "gradina" && (
                          <option value="gradinarski-stolovi">
                            Градинарски столови
                          </option>
                        )}
                        {category === "gradina" && (
                          <option value="gradinarsko-osvetluvanje">
                            Градинарско осветлување
                          </option>
                        )}
                        {category === "trpezarija" && (
                          <option value="trpezariski-masi">
                            Трпезариски маси
                          </option>
                        )}
                        {category === "trpezarija" && (
                          <option value="trpezariski-stolovi">
                            Трпезариски столови
                          </option>
                        )}
                        {category === "trpezarija" && (
                          <option value="kujnski-garnituri">
                            Кујнски гарнитури
                          </option>
                        )}
                        {category === "trpezarija" && (
                          <option value="bar-stolovi-i-masi">
                            Бар столови и маси
                          </option>
                        )}
                        {category === "kujna" && (
                          <option value="kujnski-agolni-garnituri">
                            Кујнски аголни гарнитури
                          </option>
                        )}
                        {category === "kujna" && (
                          <option value="standardni-kujni">
                            Стандардни кујни
                          </option>
                        )}
                        {category === "detska" && (
                          <option value="kolekcii-za-detska-soba">
                            Колекции за детска соба
                          </option>
                        )}
                        {category === "detska" && (
                          <option value="detski-biroa">Детски бироа</option>
                        )}
                        {category === "detska" && (
                          <option value="detski-lezai">Детски лежаи</option>
                        )}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group>
                      <Form.Select
                        id="sortOrder"
                        onChange={(e) => {
                          navigate(getFilterUrl({ order: e.target.value }));
                        }}
                      >
                        <option value={"newest"}>Сортирај по цена</option>
                        <option value={"lowFirst"}>Од ниска кон висока</option>
                        <option value={"highFirst"}>Од висока кон ниска</option>
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </div>
              </Row>
            </Form>
          </Col>
        </Row>
      </Col>
      <ToastContainer />
    </Row>
  );
};

export default ListProducts;

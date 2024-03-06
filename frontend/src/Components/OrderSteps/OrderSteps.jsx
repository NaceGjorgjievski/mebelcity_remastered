import "./OrderSteps.css";

const OrderSteps = ({ step }) => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div
        className="div-orb"
        style={{ backgroundColor: step >= 1 ? "#ce0505" : "gray" }}
      >
        1
      </div>
      <hr
        className="hr-line"
        style={{ color: step >= 2 ? "#ce0505" : "gray" }}
      />
      <div
        className="div-orb"
        style={{ backgroundColor: step >= 2 ? "#ce0505" : "gray" }}
      >
        2
      </div>
      <hr
        className="hr-line"
        style={{ color: step >= 3 ? "#ce0505" : "gray" }}
      />
      <div
        className="div-orb"
        style={{ backgroundColor: step >= 3 ? "#ce0505" : "gray" }}
      >
        3
      </div>
    </div>
  );
};

export default OrderSteps;

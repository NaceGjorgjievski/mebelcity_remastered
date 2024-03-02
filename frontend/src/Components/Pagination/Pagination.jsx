import Button from "react-bootstrap/Button";

const Pagination = ({ page, pages, onClick }) => {
  return (
    <div className="mt-5 mb-5 d-flex justify-content-center gap-2">
      {[...Array(pages).keys()].map((p) => (
        <Button
          key={p}
          className={Number(page) === p + 1 ? "text-bold" : ""}
          variant={Number(page) === p + 1 ? "danger" : "light"}
          onClick={() => onClick(p + 1)}
        >
          {p + 1}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;

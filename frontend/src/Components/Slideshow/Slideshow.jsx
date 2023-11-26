import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import img1 from "./Images/slideshow1.png";
import img2 from "./Images/slideshow2.png";
import img3 from "./Images/demo.png";

const Slideshow = () => {
  return (
    <div className="container">
      <Carousel>
        <Carousel.Item interval={4000}>
          <Image src={img1} fluid />
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <Image src={img2} fluid />
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <Image src={img3} fluid />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slideshow;

import "./CategoryCarousel.scss";
import Slider from "react-slick";

function CategoryCarousel(): JSX.Element {
  const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "none",
          color: "white",
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="CategoryCarousel">
      <h1>Discover New Events</h1>
      <Slider {...settings}>
        <div className="carousel-category-option">
          <h3>Category 1</h3>
        </div>
        <div className="carousel-category-option">
          <h3>Category 2</h3>
        </div>
        <div className="carousel-category-option">
          <h3>Category 3</h3>
        </div>
        <div className="carousel-category-option">
          <h3>Category 4</h3>
        </div>
      </Slider>
    </div>
  );
}

export default CategoryCarousel;

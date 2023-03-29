import "./CategoryCarousel.scss";
import Slider from "react-slick";
import { Category } from "../../models/Category";
import { categoryBgImages as images } from "../../utils/file-import";

interface props {
  categories: Category[];
}

function CategoryCarousel(props: props): JSX.Element {
  const Arrow = (props: any) => {
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
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };

  return (
    <div className="CategoryCarousel">
      <h1>Discover New Events</h1>
      <Slider {...settings}>
        {props.categories &&
          props.categories.map((c) => (
            <div className="carousel-category-option" key={c._id}>
              <img src={images[c.name.replace(" ", "_")]} alt="" />
              <h3>{c.name}</h3>
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default CategoryCarousel;

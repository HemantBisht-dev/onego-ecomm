import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ProductItem from "./ProductItem";

function ProductSlider({ data }) {
  let options = {
    loop: true,
    margin: 10,
    autoplay: 400,
    smartspedd: 250,
    dots: false,
    navText: [
      `<button style='border:none; background-color:blue; color:white; border-radius:50%; width:50px; height:50px'>
        <i class="fa fa-arrow-left" />
      </button>`,
      `<button style='border:none; background-color:blue; color:white; border-radius:50%; width:50px; height:50px'>
        <i class="fa fa-arrow-right" />
      </button>`,
    ],
    responsiveRefreshRate: 1000,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
      1920: {
        items: 4,
      },
    },
  };
  return (
    <>
      <OwlCarousel className="owl-theme" {...options} nav>
        {data.map((item, index) => {
          return (
            <div key={index}>
              <ProductItem item={item} />
            </div>
          );
        })}
      </OwlCarousel>
    </>
  );
}

export default ProductSlider;

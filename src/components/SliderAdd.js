import React, { memo } from 'react';
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

const SliderAdd = memo(() => {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: "",
        prevArrow: ""
      };


    return (
        <div>
        <h2>Custom Arrows</h2>
        <Slider {...settings}>
          <div style={ { background: 'red', height : '300px' } } >
            <h3>1</h3>
          </div>
          <div style={ { background: 'red', height : '300px' } } >
            <h3>2</h3>
          </div>
          <div style={ { background: 'red', height : '300px' } } >
            <h3>3</h3>
          </div>
        </Slider>
      </div>
    );
});

export default React.memo(SliderAdd);
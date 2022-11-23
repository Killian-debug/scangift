import React, { memo, useEffect } from 'react';
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

const SliderAdd = memo(( {list} ) => {

  useEffect(() => {
   console.log('slider')
   console.log(list)
  }, [list]);
 
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: "",
        prevArrow: ""
      };

      const style = { background: 'red',
         height : '300px',
         }

          var elList = list.map((el, i) => {
      return <div style={ style } key={i} className='carrousel' >
              <img src={el.url_med} alt="annonce" className="img-fluid" />
            </div>
    } )
    

    return (
        <div>
          <Slider {...settings}>
          {elList}
        </Slider>
      </div>
    );
});

export default React.memo(SliderAdd);
import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import './Slider.styles.scss';
import CloseIcon from '@mui/icons-material/Close';

export const Slider: React.FC<{screens:string[]}> = (props) => {
    const images = props.screens.map((screen: string) => {
        const item = {url: screen};
        return item;
    });
    // console.log(images);
    return (
      <div className='slider_container'>
          <div className="icon_close icon_close_container">
            <CloseIcon color='secondary' className='icon_close'/>
          </div>
          <SimpleImageSlider
            width={`80vw`}
            height={'85vh'}
            images={images}
            showBullets={true}
            showNavs={true}
          />
        </div>
      );
};
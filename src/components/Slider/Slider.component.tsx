import React from "react";
import SimpleImageSlider from "react-simple-image-slider";

export const Slider: React.FC<{screens:string[]}> = (screensArr) => {
    const images = screensArr.screens.map((screen: string) => {
        const item = {url: screen};
        return item;
    });
    console.log(images);
    return (
        <div>
          <SimpleImageSlider
            width={896}
            height={504}
            images={images}
            showBullets={true}
            showNavs={true}
          />
        </div>
      );
};
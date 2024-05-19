import { Carousel } from "@material-tailwind/react";

import { manyshirts, customizing, green } from "../../Assets";
function HeroSection() {
  return (
    <div className="z-0 h-96 w-full">
      <Carousel>
        <img
          src={customizing}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src={manyshirts}
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img src={green} alt="image 3" className="h-full w-full object-cover" />
      </Carousel>
    </div>
  );
}

export default HeroSection;

import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ArrowProps {
  onClick?: () => void;
  direction: "left" | "right";
}

const Arrow: React.FC<ArrowProps> = ({ onClick, direction }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full bg-transparent absolute top-1/2 z-10 ${direction === "left" ? "left-2" : "right-2"}`}
    title={direction === "left" ? "previous" : "next"}
  >
    <div className={`h-6 w-6 border-b border-r ${direction === "left" ? "rotate-135" : "-rotate-45"}`}></div>
  </button>
);

export interface CustomSliderRef {
  goTo: (index: number) => void;
}

interface CustomSliderProps {
  children: React.ReactNode;
  currentSlide?: number;
}

const CustomSlider = forwardRef<CustomSliderRef, CustomSliderProps>(
  ({ children, currentSlide = 0 }, ref) => {
    const sliderRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      goTo: (index: number) => {
        sliderRef.current?.slickGoTo(index);
      },
    }));

    React.useEffect(() => {
      if (
        typeof currentSlide === "number" &&
        sliderRef.current &&
        sliderRef.current.innerSlider?.state.currentSlide !== currentSlide
      ) {
        sliderRef.current.slickGoTo(currentSlide);
      }
    }, [currentSlide]);

    return (
      <div className="relative">
        <Slider ref={sliderRef} {...{
          nextArrow: <Arrow direction="right" />,
          prevArrow: <Arrow direction="left" />,
        }}>
          {children}
        </Slider>
      </div>
    );
  }
);

CustomSlider.displayName = "CustomSlider";

export default CustomSlider;

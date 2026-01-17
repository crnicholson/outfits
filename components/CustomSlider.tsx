import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface CustomSliderRef {
  goTo: (index: number) => void;
}

interface CustomSliderProps {
  children: React.ReactNode;
  currentSlide?: number;
  onSlideChange?: (index: number) => void;
}

const CustomSlider = forwardRef<CustomSliderRef, CustomSliderProps>(
  ({ children, currentSlide = 0, onSlideChange }, ref) => {
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
        <Slider
          ref={sliderRef}
          arrows={false}
          afterChange={(index) => {
            if (onSlideChange) {
              onSlideChange(index);
            }
          }}
        >
          {children}
        </Slider>
      </div>
    );
  }
);

CustomSlider.displayName = "CustomSlider";

export default CustomSlider;

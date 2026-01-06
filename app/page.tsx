"use client";

import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

// @ts-ignore
const SliderComponent = !!Slider.default ? Slider.default : Slider

export default function Clothes() {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // centerMode: true,
  };

  return (
    <div className="p-10">
      {/* <div className="h-fit w-full flex flex-col justify-center items-center p-10 gap-10 mb-10">
        <div className="w-3/4">
          <h1 className="font-tiempos text-4xl mb-5">clothes</h1>
          <p>i kinda like clothes... maybe someday i'll release my designs</p>
        </div>

        <div className="w-3/4">
          <h1 className="font-tiempos text-2xl mb-5">mess around with my wardrobe</h1>
          <p>not all items pictured ofc. hold and slide on the images to change the clothes.</p>
        </div>
      </div> */}

      <SliderComponent {...settings}>
        {[
          { id: 1, src: '/clothes/tops/stussy-surfboard.png', alt: 'clothes 1' },
          { id: 2, src: '/clothes/tops/maralboro.png', alt: 'clothes 1' },
          { id: 3, src: '/clothes/tops/stussy-pitstop.png', alt: 'clothes 1' },
          { id: 4, src: '/clothes/tops/aime.png', alt: 'clothes 1' },
          { id: 5, src: '/clothes/tops/zipup.png', alt: 'clothes 1' },
          // { id: 6, src: '/clothes/tops/ems.png', alt: 'clothes 1' },
          // { id: 7, src: '/clothes/tops/stussy-ls.png', alt: 'clothes 1' },
          { id: 6, src: '/clothes/tops/flannel.png', alt: 'clothes 1' },
          { id: 7, src: '/clothes/tops/purple-yellow.png', alt: 'clothes 1' },
        ].map((slide) => (
          <div key={slide.id} className="px-3">
            <div className="flex justify-center items-center w-full">
              <Image src={slide.src!} width={270} height={270} alt={slide.alt!} className="h-68" />
            </div>
          </div>
        ))}
      </SliderComponent>

      <SliderComponent {...settings}>
        {[
          { id: 1, src: '/clothes/bottoms/dickies-jeans.png', alt: 'clothes 1' },
          { id: 2, src: '/clothes/bottoms/hollister.png', alt: 'clothes 1' },
          // { id: 3, src: '/clothes/bottoms/llbean-jeans.png', alt: 'clothes 1' },
        ].map((slide) => (
          <div key={slide.id} className="px-3">
            <div className="-mt-2 flex justify-center items-center w-full h-fit">
              <Image src={slide.src!} width={200} height={200} alt={slide.alt!} className="h-100" />
            </div>
          </div>
        ))}
      </SliderComponent>

      <SliderComponent {...settings}>
        {[
          { id: 1, src: '/clothes/shoes/walesbonner.png', alt: 'clothes 1' },
          { id: 2, src: '/clothes/shoes/birkenstocks.png', alt: 'clothes 1' },
          { id: 3, src: '/clothes/shoes/timbs.avif', alt: 'clothes 1' },
          { id: 4, src: '/clothes/shoes/ggdb.png', alt: 'clothes 1' },
        ].map((slide) => (
          <div key={slide.id} className="px-3">
            <div className="flex justify-center items-center w-full h-full">
              <Image src={slide.src!} width={200} height={200} alt={slide.alt!} />
            </div>
          </div>
        ))}
      </SliderComponent>

      {/* <div className="h-fit w-full flex flex-col justify-center items-center p-10 gap-10 mb-10">
        <div className="w-3/4">
          <h1 className="font-tiempos text-2xl mb-5">official list of best clothing brands</h1>

          <ul className="pl-5 space-y-1 mb-3 list-decimal">
            <li>stussy</li>
            <li>vtg oakley</li>
            <li>carharrt/wip</li>
            <li>vtg nike / acg</li>
            <li>supreme</li>
            <li>butter goods</li>
            <li>aime leon dore</li>
            <li>vtg billabong/quiksilver/ripcurl</li>
            <li>grammicci</li>
            <li>dickies</li>
          </ul>

          <p>hm: braindead, mertra, vtg adidas, palace, rcos, wuwear, vtg umbro, jnco, vtg patagonia</p>
        </div>

        <div className="w-3/4">
          <h1 className="font-tiempos text-2xl mb-5">philosophy on expensive brands</h1>

          <p>i think expensive stuff is useless. gucci, lv, etc. if you would buy the same thing without branding, then i guess it's okay. but i would never wear a gucci shirt even if someone payed me to do it. i think modern clothing needs to focus on silhouettes, material, texture, graphics, etc., not just the logo. i see a lot of more modern streetwear brands, like off-white, which just look absolutely hideous. they are going way too deep into the world of branding. i think clothes should be brand agnostic. but i guess it doesn't really matter. just wear what makes you happy.</p>
        </div>
      </div> */}
    </div>
  )
}
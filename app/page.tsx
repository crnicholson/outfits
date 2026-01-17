"use client";

import React, { useState, useRef } from "react";
import CustomSlider, { CustomSliderRef } from "@/components/CustomSlider";
import Arrow from "@/components/Arrow";
import Image from "next/image";

export default function Clothes() {
  type SlideType = {
    id: number;
    src: string;
    alt: string;
    title: string;
    body: string;
  };

  const [hoveredSlide, setHoveredSlide] = useState<SlideType | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [showArrows, setShowArrows] = useState(false);

  const [hatsSlide, setHatsSlide] = useState(0);
  const [topsSlide, setTopsSlide] = useState(0);
  const [beltsSlide, setBeltsSlide] = useState(0);
  const [bottomsSlide, setBottomsSlide] = useState(0);
  const [shoesSlide, setShoesSlide] = useState(0);

  const [selectedAccessories, setSelectedAccessories] = useState<number[]>([]);

  const hatsSliderRef = useRef<CustomSliderRef>(null);
  const topsSliderRef = useRef<CustomSliderRef>(null);
  const beltsSliderRef = useRef<CustomSliderRef>(null);
  const bottomsSliderRef = useRef<CustomSliderRef>(null);
  const shoesSliderRef = useRef<CustomSliderRef>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (slide: SlideType) => (e: React.MouseEvent<HTMLImageElement>) => {
    setHoveredSlide(slide);
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredSlide(null);
  };

  const toggleAccessory = (id: number) => {
    setSelectedAccessories(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-10 relative font-ibm min-h-screen flex justify-center items-center">
      <div className="h-fit w-full">
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
        <div className="relative">
          <Arrow className={`${showArrows ? 'block' : 'hidden'}`} left={true} onClick={() => hatsSliderRef.current?.prev()} />
          <Arrow className={`${showArrows ? 'block' : 'hidden'}`} left={false} onClick={() => hatsSliderRef.current?.next()} />
          <CustomSlider ref={hatsSliderRef} currentSlide={hatsSlide} onSlideChange={setHatsSlide}>
            {[
              { id: 1, src: '/clothes/hats/arc.avif', alt: 'clothing', title: 'Arcteryx', body: 'Black bird toque' },
              { id: 2, src: '/clothes/hats/stussy.avif', alt: 'clothing', title: 'Stussy', body: 'Brushed out beanie' },
              { id: 3, src: '/clothes/hats/palace.avif', alt: 'clothing', title: 'Oakely ', body: 'Palace x Oakley colab' },
            ].map((slide) => (
              <div key={slide.id} className="px-3 mb-7">
                <div className="flex justify-center items-center w-full">
                  <Image
                    src={slide.src!}
                    width={150}
                    height={150}
                    alt={slide.alt!}
                    className="h-[7vh] w-fit" // h-22
                    onMouseEnter={handleMouseEnter(slide)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            ))}
          </CustomSlider>
        </div>

        <div className="relative">
          <Arrow className={`${showArrows ? 'block' : 'hidden'}`} left={true} onClick={() => topsSliderRef.current?.prev()} />
          <Arrow className={`${showArrows ? 'block' : 'hidden'}`} left={false} onClick={() => topsSliderRef.current?.next()} />
          <CustomSlider ref={topsSliderRef} currentSlide={topsSlide} onSlideChange={setTopsSlide}>
            {[
              { id: 1, src: '/clothes/tops/stussy-surfboard.png', alt: 'clothing', title: 'Stussy', body: 'Surfboard tee' },
              { id: 2, src: '/clothes/tops/maralboro.png', alt: 'clothing', title: 'Marlboro', body: 'Vintage Marlboro fleece' },
              { id: 3, src: '/clothes/tops/stussy-pitstop.png', alt: 'clothing', title: 'Stussy', body: 'Pitstop tee' },
              { id: 4, src: '/clothes/tops/aime.png', alt: 'clothing', title: 'Aime Leon Dore', body: 'Tee' },
              // { id: 5, src: '/clothes/tops/zipup.png', alt: 'clothing', title: '', body: '' },
              // { id: 6, src: '/clothes/tops/ems.png', alt: 'clothing', title: '', body: '' },
              // { id: 7, src: '/clothes/tops/stussy-ls.png', alt: 'clothing', title: '', body: '' },
              { id: 6, src: '/clothes/tops/flannel.png', alt: 'clothing', title: 'Neovision', body: 'Flannel' },
              { id: 7, src: '/clothes/tops/purple-yellow.png', alt: 'clothing', title: 'Vintage', body: 'Purple and yellow fleece' },
            ].map((slide) => (
              <div key={slide.id} className="px-3">
                <div className="flex justify-center items-center w-full">
                  <Image
                    src={slide.src!}
                    width={270}
                    height={270}
                    alt={slide.alt!}
                    className="h-[22vh] w-fit" // h-68
                    onMouseEnter={handleMouseEnter(slide)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            ))}
          </CustomSlider>
        </div>

        <div className="relative">
          <Arrow className={`${showArrows ? 'block' : 'hidden'}`} left={true} onClick={() => beltsSliderRef.current?.prev()} />
          <Arrow className={`${showArrows ? 'block' : 'hidden'}`} left={false} onClick={() => beltsSliderRef.current?.next()} />
          <CustomSlider ref={beltsSliderRef} currentSlide={beltsSlide} onSlideChange={setBeltsSlide}>
            {[
              { id: 1, src: '/clothes/belt/diesel.png', alt: 'clothing', title: 'Diesel', body: 'Belt' },
              { id: 2, src: '/clothes/belt/stussy.avif', alt: 'clothing', title: 'Stussy ', body: 'Cowboy belt' },
            ].map((slide) => (
              <div key={slide.id} className="px-3">
                <div className="flex justify-center items-center w-full">
                  <Image
                    src={slide.src!}
                    width={150}
                    height={150}
                    alt={slide.alt!}
                    className="h-[4vh] w-fit" // h-10
                    onMouseEnter={handleMouseEnter(slide)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            ))}
          </CustomSlider>
        </div>

        <div className="relative">
          <Arrow className={`${showArrows ? 'block' : 'hidden'}`} left={true} onClick={() => bottomsSliderRef.current?.prev()} />
          <Arrow className={`${showArrows ? 'block' : 'hidden'}`} left={false} onClick={() => bottomsSliderRef.current?.next()} />
          <CustomSlider ref={bottomsSliderRef} currentSlide={bottomsSlide} onSlideChange={setBottomsSlide}>
            {[
              { id: 1, src: '/clothes/bottoms/dickies-jeans.png', alt: 'clothing', title: 'Dickies', body: 'Double knee' },
              { id: 2, src: '/clothes/bottoms/wranglers.png', alt: 'clothing', title: 'Wrangler', body: 'Wide leg' },
              // { id: 2, src: '/clothes/bottoms/hollister.png', alt: 'clothing', title: 'Hollister', body: 'Sweatpants' },
              // { id: 3, src: '/clothes/bottoms/llbean-jeans.png', alt: 'clothing', title: '', body: '' },
            ].map((slide) => (
              <div key={slide.id} className="px-3">
                <div className="-mt-2 flex justify-center items-center w-full h-fit">
                  <Image
                    src={slide.src!}
                    width={600}
                    height={600}
                    alt={slide.alt!}
                    className="h-[37vh] w-auto" // h-100
                    onMouseEnter={handleMouseEnter(slide)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            ))}
          </CustomSlider>
        </div>

        <div className="relative">
          <Arrow className={`${showArrows ? 'block' : 'hidden'}`} left={true} onClick={() => shoesSliderRef.current?.prev()} />
          <Arrow className={`${showArrows ? 'block' : 'hidden'}`} left={false} onClick={() => shoesSliderRef.current?.next()} />
          <CustomSlider ref={shoesSliderRef} currentSlide={shoesSlide} onSlideChange={setShoesSlide}>
            {[
              { id: 1, src: '/clothes/shoes/walesbonner.png', alt: 'clothing', title: 'Wales Bonner', body: 'Wales Bonner x Adidas Sambas' },
              { id: 2, src: '/clothes/shoes/birkenstocks.png', alt: 'clothing', title: 'Birkenstocks', body: 'Bostons' },
              { id: 3, src: '/clothes/shoes/timbs.avif', alt: 'clothing', title: 'Timberlands', body: '6 inch boots' },
              { id: 4, src: '/clothes/shoes/ggdb.png', alt: 'clothing', title: 'Golden Goose', body: 'Ballstars' },
            ].map((slide) => (
              <div key={slide.id} className="px-3">
                <div className="flex justify-center items-center w-full h-full">
                  <Image
                    src={slide.src!}
                    width={200}
                    height={200}
                    alt={slide.alt!}
                    className="h-[14vh] w-auto" // h-50
                    onMouseEnter={handleMouseEnter(slide)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            ))}
          </CustomSlider>
        </div>

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
        {hoveredSlide && (
          <div
            style={{
              position: 'fixed',
              left: mousePos.x + 20,
              top: mousePos.y + 20,
              pointerEvents: 'none',
            }}
            className="border p-2 bg-white min-w-40 max-w-64 z-50"
          >
            <h1 className="font-bold text-[12px]">{hoveredSlide.title.toUpperCase()}</h1>
            <p className="text-[11px] mt-2">{hoveredSlide.body.toUpperCase()}</p>
          </div>
        )}

        <div className="fixed bottom-5 right-5 z-40">
          <div className="border p-3">
            <h3 className="text-xs font-bold mb-2 text-center">ACCESSORIES</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 1, src: '/clothes/accessories/bape.png', alt: 'bape tote' },
                { id: 2, src: '/clothes/accessories/oakley-carabiner.png', alt: 'oakley carabiner' },
                { id: 3, src: '/clothes/accessories/sup.png', alt: 'supreme boxing gloves' },
                { id: 4, src: '/clothes/accessories/vivi.png', alt: 'vivienne westwood necklace' },
              ].map((accessory) => (
                <div
                  key={accessory.id}
                  onClick={() => toggleAccessory(accessory.id)}
                  className={`relative w-16 h-16 border cursor-pointer hover:z-50 transform hover:scale-213 transition-transform duration-100 ${(() => {
                    const idx = accessory.id - 1;
                    if (idx % 2 === 0 && idx < 2) return 'origin-top-left';
                    if (idx % 2 === 1 && idx < 2) return 'origin-top-right';
                    if (idx % 2 === 0 && idx >= 2) return 'origin-bottom-left';
                    return 'origin-bottom-right';
                  })()} ${selectedAccessories.includes(accessory.id)
                    ? 'bg-gray-100'
                    : 'bg-white'
                    }`}
                >
                  <Image
                    src={accessory.src}
                    alt={accessory.alt}
                    width={400}
                    height={400}
                    className={`w-full h-full object-contain p-1`}
                  />
                  {selectedAccessories.includes(accessory.id) && (
                    <div className="absolute top-0 right-0 w-4 h-4 rounded-full flex items-center justify-center -mt-1 -mr-1 bg-black">
                      <span className="text-white text-[10px]">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
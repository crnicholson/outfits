"use client";

import React, { useState, useRef } from "react";
import CustomSlider, { CustomSliderRef } from "@/components/CustomSlider";
import Arrow from "@/components/Arrow";
import Image from "next/image";
import ImageModal from "@/components/ImageModal";
import Link from "next/link";

export default function Clothes() {
  type SlideType = {
    id: number;
    src: string;
    alt: string;
    title: string;
    body: string;
    tags: string;
  };

  const hatsData = [
    { id: 1, src: '/clothes/hats/arc.avif', alt: 'clothing', title: 'Arcteryx', body: 'Black bird toque', tags: '' },
    { id: 2, src: '/clothes/hats/stussy.avif', alt: 'clothing', title: 'Stussy', body: 'Brushed out beanie', tags: '' },
    { id: 3, src: '/clothes/hats/palace.avif', alt: 'clothing', title: 'Oakely ', body: 'Palace x Oakley colab', tags: '' },
  ];

  const topsData = [
    { id: 1, src: '/clothes/tops/maralboro.png', alt: 'clothing', title: 'Marlboro', body: 'Vintage Marlboro fleece', tags: 'Thrifted, Vintage' },
    { id: 2, src: '/clothes/tops/stussy-surfboard.png', alt: 'clothing', title: 'Stussy', body: 'Surfboard tee', tags: '' },
    { id: 3, src: '/clothes/tops/stussy-pitstop.png', alt: 'clothing', title: 'Stussy', body: 'Pitstop tee', tags: '' },
    { id: 4, src: '/clothes/tops/aime.png', alt: 'clothing', title: 'Aime Leon Dore', body: 'Tee', tags: '' },
    { id: 6, src: '/clothes/tops/flannel.png', alt: 'clothing', title: 'Neovision', body: 'Flannel', tags: 'Thrifted' },
    { id: 7, src: '/clothes/tops/purple-yellow.png', alt: 'clothing', title: 'Vintage', body: 'Purple and yellow fleece', tags: 'Thrifted, Vintage' },
    { id: 8, src: '/clothes/tops/chaps.png', alt: 'clothing', title: 'Chaps', body: 'Sweater', tags: 'Thrifted, Vintage' },
  ];

  const beltsData = [
    { id: 1, src: '/clothes/belt/diesel.png', alt: 'clothing', title: 'Diesel', body: 'Belt', tags: '' },
    // { id: 2, src: '/clothes/belt/stussy.avif', alt: 'clothing', title: 'Stussy ', body: 'Cowboy belt', tags: '' },
  ];

  const bottomsData = [
    { id: 1, src: '/clothes/bottoms/dickies-jeans.png', alt: 'clothing', title: 'Dickies', body: 'Double knee', tags: 'Thrifted, Vintage' },
    { id: 2, src: '/clothes/bottoms/real-wranglers.png', alt: 'clothing', title: 'Wrangler', body: 'Wide leg', tags: 'Thrifted, Vintage' },
  ];

  const shoesData = [
    { id: 1, src: '/clothes/shoes/walesbonner.png', alt: 'clothing', title: 'Wales Bonner', body: 'Wales Bonner x Adidas Sambas', tags: '' },
    { id: 2, src: '/clothes/shoes/birkenstocks.png', alt: 'clothing', title: 'Birkenstocks', body: 'Bostons', tags: '' },
    { id: 3, src: '/clothes/shoes/timbs.avif', alt: 'clothing', title: 'Timberlands', body: '6 inch boots', tags: 'Thrifted' },
    // { id: 4, src: '/clothes/shoes/ggdb.png', alt: 'clothing', title: 'Golden Goose', body: 'Ballstars', tags: '' },
  ];

  const [hoveredSlide, setHoveredSlide] = useState<SlideType | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [showArrows, setShowArrows] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const allTags = Array.from(
    new Set(
      [
        ...hatsData,
        ...topsData,
        ...beltsData,
        ...bottomsData,
        ...shoesData,
      ]
        .flatMap((item) => item.tags.split(',').map((tag) => tag.trim()))
        .filter((tag) => tag !== '')
    )
  );

  const [selectedImage, setSelectedImage] = useState<SlideType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDoubleClick = (slide: SlideType) => () => {
    setSelectedImage(slide);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const toggleAccessory = (id: number) => {
    setSelectedAccessories(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filterByTags = (items: SlideType[]) => {
    if (selectedTags.length === 0) return items;
    return items.filter((item) =>
      selectedTags.some((tag) =>
        item.tags.toLowerCase().includes(tag.toLowerCase())
      )
    );
  };

  const randomizeOutfit = () => {
    const filteredHats = filterByTags(hatsData);
    const filteredTops = filterByTags(topsData);
    const filteredBelts = filterByTags(beltsData);
    const filteredBottoms = filterByTags(bottomsData);
    const filteredShoes = filterByTags(shoesData);

    const randomHat = Math.floor(Math.random() * filteredHats.length);
    const randomTop = Math.floor(Math.random() * filteredTops.length);
    const randomBelt = Math.floor(Math.random() * filteredBelts.length);
    const randomBottom = Math.floor(Math.random() * filteredBottoms.length);
    const randomShoe = Math.floor(Math.random() * filteredShoes.length);

    hatsSliderRef.current?.goTo(randomHat);
    topsSliderRef.current?.goTo(randomTop);
    beltsSliderRef.current?.goTo(randomBelt);
    bottomsSliderRef.current?.goTo(randomBottom);
    shoesSliderRef.current?.goTo(randomShoe);
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
            {filterByTags(hatsData).map((slide) => (
              <div key={slide.id} className="px-3 mb-7">
                <div className="flex justify-center items-center w-full">
                  <Image
                    src={slide.src!}
                    width={600}
                    height={600}
                    alt={slide.alt!}
                    className="h-[7vh] w-fit" // h-22
                    onMouseEnter={handleMouseEnter(slide)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onDoubleClick={handleDoubleClick(slide)}
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
            {filterByTags(topsData).map((slide) => (
              <div key={slide.id} className="px-3">
                <div className="flex justify-center items-center w-full">
                  <Image
                    src={slide.src!}
                    width={600}
                    height={600}
                    alt={slide.alt!}
                    className="h-[22vh] w-fit" // h-68
                    onMouseEnter={handleMouseEnter(slide)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onDoubleClick={handleDoubleClick(slide)}
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
            {filterByTags(beltsData).map((slide) => (
              <div key={slide.id} className="px-3">
                <div className="-mb-4 flex justify-center items-center w-full">
                  <Image
                    src={slide.src!}
                    width={600}
                    height={600}
                    alt={slide.alt!}
                    className="h-[4vh] w-fit" // h-10
                    onMouseEnter={handleMouseEnter(slide)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onDoubleClick={handleDoubleClick(slide)}
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
            {filterByTags(bottomsData).map((slide) => (
              <div key={slide.id} className="px-3">
                <div className="-mt-1 flex justify-center items-center w-full h-fit">
                  <Image
                    src={slide.src!}
                    width={600}
                    height={600}
                    alt={slide.alt!}
                    className="h-[37vh] w-fit" // h-100
                    onMouseEnter={handleMouseEnter(slide)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onDoubleClick={handleDoubleClick(slide)}
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
            {filterByTags(shoesData).map((slide) => (
              <div key={slide.id} className="px-3">
                <div className="flex justify-center items-center w-full h-full">
                  <Image
                    src={slide.src!}
                    width={600}
                    height={600}
                    alt={slide.alt!}
                    className="h-[14vh] w-auto" // h-50
                    onMouseEnter={handleMouseEnter(slide)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onDoubleClick={handleDoubleClick(slide)}
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
            {hoveredSlide.tags && (hoveredSlide.tags.split(',').map((tag) => (
              <span
                key={tag}
                className="text-[9px] mt-3 inline-block mr-2 px-2 py-1 border bg-black text-white"
              >
                {tag.toUpperCase()}
              </span>
            )))}
          </div>
        )}

        <div className="fixed bottom-5 left-5 z-40 md:visible invisible">
          <div className="border p-3 bg-white max-w-xs">
            <h1 className="text-xs font-bold mb-2">SETTINGS</h1>

            <div className="mb-3 pb-3 border-b">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showArrows}
                  onChange={(e) => setShowArrows(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-[11px]">SHOW ARROWS</span>
              </label>
            </div>

            <div>
              <h1 className="text-[11px] font-bold mb-2">FILTER BY TAGS</h1>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-[10px] px-2 py-1 border transition-colors ${selectedTags.includes(tag)
                      ? 'bg-black text-white'
                      : 'bg-white'
                      }`}
                  >
                    {tag.toUpperCase()}
                  </button>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-[10px] mt-2 underline hover:no-underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            <button
              onClick={randomizeOutfit}
              className="mt-2 w-full text-[11px] border font-bold py-2 bg-black text-white"
            >
              RANDOMIZE OUTFIT
            </button>

            <button
              onClick={() => setShowHelp(true)}
              className="mt-2 w-full text-[11px] border font-bold py-2"
            >
              ???
            </button>

            <button
              onClick={() => setShowAbout(true)}
              className="mt-2 w-full text-[11px] border font-bold py-2"
            >
              ABOUT
            </button>
          </div>
        </div>

        {showHelp && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowHelp(false)}
          >
            <div
              className="relative bg-white p-6 max-w-md border"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowHelp(false)}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center border bg-black text-white text-xl"
              >
                ×
              </button>

              <h1 className="font-bold text-lg mb-4">HOW TO USE</h1>

              <div className="flex flex-col gap-3 text-sm">
                <div>
                  <h1 className="font-bold mb-1">NAVIGATE CLOTHES</h1>
                  <p className="text-sm">• HOVER OVER ITEMS TO SEE DETAILS</p>
                  <p className="text-sm">• DOUBLE-CLICK TO VIEW LARGER IMAGE</p>
                  <p className="text-sm">• HOLD AND SLIDE ON IMAGES TO BROWSE</p>
                </div>

                <div>
                  <h1 className="font-bold mb-1">ARROWS</h1>
                  <p className="text-sm">• TOGGLE "SHOW ARROWS" IN SETTINGS TO ENABLE NAVIGATION ARROWS</p>
                  <p className="text-sm">• CLICK ARROWS TO MOVE BETWEEN ITEMS</p>
                </div>

                <div>
                  <h1 className="font-bold mb-1">TAG FILTERING</h1>
                  <p className="text-sm">• SELECT TAGS IN SETTINGS TO FILTER ITEMS</p>
                  <p className="text-sm">• MULTIPLE TAGS CAN BE SELECTED</p>
                  <p className="text-sm">• CLICK "CLEAR FILTERS" TO SHOW ALL ITEMS</p>
                </div>

                <div>
                  <h1 className="font-bold mb-1">ACCESSORIES</h1>
                  <p className="text-sm">• CLICK ACCESSORIES IN THE BOTTOM-RIGHT PANEL TO SELECT THEM</p>
                  <p className="text-sm">• SELECTED ITEMS ARE MARKED WITH A CHECKMARK</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAbout && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowAbout(false)}
          >
            <div
              className="relative bg-white p-6 max-w-md border text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowAbout(false)}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center border bg-black text-white text-xl"
              >
                ×
              </button>

              <h1 className="font-bold text-lg mb-4">MY CLOSET</h1>

              <p className="mb-5">YOU HAVE STUMBLED UPON CHARLIE NICHOLSON'S PERSONAL CLOSET. THESE ARE A COLLECTION OF PIECES FROM MY CLOSET. NOT EVERYTHING IS PICTURED, OF COURSE.</p>

              <p className="mb-5">FEEL FREE TO MESS AROUND WITH MY CLOHTES. IF YOU NEED HELP, PLEASE PRESS THE HELP BUTTON IN THE BOTTOM LEFT CORNER.</p>

              <p className="mb-5">IF YOU WANT TO GIVE ME A JOB, PLEASE. I'M BORED.</p>

              <p className="mb-5">IF YOU WANT TO SEE MY CLOTHING DESIGNS, YOU ARE OUT OF LUCK. I'M GOING TO GATEKEEP THEM FOR A WHILE.</p>

              <p>IF YOU WANT TO SEE MORE COOL SHIT, VISIT MY MAIN <Link className="underline" href="https://v3.crnicholson.com">WEBSITE</Link>.</p>

              {/* <div className="flex flex-col gap-3 text-sm">
                <div>
                  <h1 className="font-bold mb-1">NAVIGATE CLOTHES</h1>
                  <p className="text-sm">• HOVER OVER ITEMS TO SEE DETAILS</p>
                  <p className="text-sm">• DOUBLE-CLICK TO VIEW LARGER IMAGE</p>
                  <p className="text-sm">• HOLD AND SLIDE ON IMAGES TO BROWSE</p>
                </div>
              </div> */}
            </div>
          </div>
        )}

        <div className="fixed bottom-5 right-5 z-40 md:visible invisible">
          <div className="border p-3 bg-white">
            <h1 className="text-xs font-bold mb-2 text-center">ACCESSORIES</h1>
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

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc={selectedImage?.src || ""}
        title={selectedImage?.title || ""}
        body={selectedImage?.body || ""}
        alt={selectedImage?.alt || ""}
        tags={selectedImage?.tags || ""}
      />
    </div >
  )
}
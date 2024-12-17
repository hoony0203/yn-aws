export const aboutSwiperProperty = {
  asBreakpoint: {
    374: {
      slidesPerView: 1,
      spaceBetween: 50,
      centeredSlides: false,
      autoplay: false,
    },
    1081: {
      slidesPerView: 1,
      centeredSlides: false,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};

export const aboutSwiper = [
  {
    id: 1,
    label: "The Value",
    script:
      "Our chief designer strictly oversees and entire process, from design to production. The International Organization for Standardization approves of it. The product offers a great value for jewelry since it is made with distinctive, quality-guaranteed designs and delicate handiwork by artisans.",
    ImgUrl: `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/img/about/swiper/aboutSwiperImg1.webp`,
  },
  {
    id: 2,
    label: "Design",
    script:
      "Yeowoon’s design features a striking and unique design line that has never been seen before. Numerous clients have expressed their love for products manufactured with distinctive designs and vibrant colors. We also offer feminine products as well as a line of neutral designs, catering to a variety of customer groups.",
    ImgUrl: `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/img/about/swiper/aboutSwiperImg2.webp`,
  },
  {
    id: 3,
    label: "Craftmanship",
    script:
      "Each and every piece of jewelry produced by Yeowoon is the result of the intricate and delicate work of artists. In contrast to machine manufacture, it offers a flawless and perfect fit of the product thanks to the hands of all artisans who work together to create a single item.",
    ImgUrl: `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/img/about/swiper/aboutSwiperImg3.webp`,
  },
];

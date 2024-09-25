import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
// Importación de módulos adicionales (opcional)

export const HomeCarousel: React.FC = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      loop={true}
      className="mySwiper h-96 rounded-xl"
    >
      <SwiperSlide>
        <img
          src="/logotipo-MSM-03.jpg"
          alt="image 1"
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/manuel1carousel.jpg"
          alt="image 2"
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/manuel2carousel.jpg"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/manuel3carousel.jpg"
          alt="image 4"
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default HomeCarousel;


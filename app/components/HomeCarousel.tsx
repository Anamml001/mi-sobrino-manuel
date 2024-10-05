import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export const HomeCarousel: React.FC = () => {
  return (
    <div className="carousel-container mb-6" style={{ minHeight: '50vh' }}> {/* Reducido el margen inferior */}
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
        className="mySwiper h-[50vh] md:h-[70vh] lg:h-[80vh] xl:h-[80vh]"  // Altura ajustada
      >
        <SwiperSlide>
          <img
            src="/logotipo-MSM-03.jpg"
            alt="image 1"
            className="h-full w-full object-contain"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/manuel1carousel.jpg"
            alt="image 2"
            className="h-full w-full object-contain"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/manuel2carousel.jpg"
            alt="image 3"
            className="h-full w-full object-contain"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/manuel3carousel.jpg"
            alt="image 4"
            className="h-full w-full object-contain"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeCarousel;

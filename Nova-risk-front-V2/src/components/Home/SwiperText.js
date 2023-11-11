import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Keyboard } from 'swiper/modules';
import { curiousData } from '../../Services/Services';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

export default function SwiperText() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    curiousData()
      .then(response => {
        if (response) {
          setData(response);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar los datos curiosos:', error);
        setLoading(false);
      });
  }, []);

  console.log("Datos en el componente:", data);

  if (loading) {

    return <p>Cargando datos...</p>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <p>No se pudieron cargar los datos.</p>;
  }

  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        keyboard={{enabled:true,}}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{clickable: true,}}
        modules={[EffectCoverflow, Pagination, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>
          <p>The number of stars in our database is:</p>
          <p className='purple'>{data.quantityStars}</p>
        </SwiperSlide>
        <SwiperSlide>
          <p>The average probability of a star going Supernova in our database is:</p>
          <p className='purple'>{data.averagepSupernova} %</p>
        </SwiperSlide>
        <SwiperSlide>
          <p>The average distance from the earth to the stars in our database is:</p>
          <p className='purple'>{data.averageDistance} parsecs</p>
        </SwiperSlide>
        <SwiperSlide>
          <p>The average luminosity of the stars in our database is:</p>
          <p className='purple'>{data.averageLuminosity} lums</p>
        </SwiperSlide>
        <SwiperSlide>
          <p>The average radial velocity of the stars in our database is:</p>
          <p className='purple'>{data.averageRadialVelocity} km/sec</p>
        </SwiperSlide>
        <SwiperSlide>
          <p>The average magnitude of the stars in our database is:</p>
          <p className='purple'>{data.averageMagnitude}</p>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

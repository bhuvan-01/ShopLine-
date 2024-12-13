import { Carousel } from 'flowbite-react';

const Hero = () => {
  return (
    <div className='h-56 sm:h-64 xl:h-80 2xl:h-[90vh]'>
      <Carousel>
        {Array.from({ length: 3 }).map((_, i) => (
          <img src={`./images/slider-${i + 1}.png`} alt='...' key={i} />
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;

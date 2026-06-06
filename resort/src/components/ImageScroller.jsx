import React, { useState, useEffect, useRef, useId } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

// Register the MotionPathPlugin with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(MotionPathPlugin);
}

const Image = ({ url, title, open, inPlace, id, onInPlace, total, instanceId }) => {
  const firstLoad = useRef(true);
  const clip = useRef(null);

  const gap = 10;
  const circle = 7;
  const defaults = { transformOrigin: 'center center' };
  const duration = 0.4;
  const width = 400;
  const height = 400;
  const scale = 700;

  let bigSize = circle * scale;
  let overlap = 0;

  const getPosSmall = () => ({
    x: width / 2 - (total * (circle * 2 + gap) - gap) / 2 + id * (circle * 2 + gap),
    y: height - 30,
    scale: 1,
  });
  const getPosSmallAbove = () => ({
    x: width / 2 - (total * (circle * 2 + gap) - gap) / 2 + id * (circle * 2 + gap),
    y: height / 2,
    scale: 1,
  });
  const getPosCenter = () => ({ x: width / 2, y: height / 2, scale: 7 });
  const getPosEnd = () => ({ x: width / 2 - bigSize + overlap, y: height / 2, scale: scale });
  const getPosStart = () => ({ x: width / 2 + bigSize - overlap, y: height / 2, scale: scale });

  useGSAP(() => {
    if (clip.current) {
      let isFirst = firstLoad.current;
      firstLoad.current = false;

      let flipDuration = isFirst ? 0 : duration;
      let upDuration = isFirst ? 0 : 0.2;
      let bounceDuration = isFirst ? 0.01 : 1;
      let delay = isFirst ? 0 : flipDuration + upDuration;

      if (open) {
        gsap.timeline()
          .set(clip.current, { ...defaults, ...getPosSmall() })
          .to(clip.current, { ...defaults, ...getPosCenter(), duration: upDuration, ease: 'power3.inOut' })
          .to(clip.current, { ...defaults, ...getPosEnd(), duration: flipDuration, ease: 'power4.in', onComplete: () => onInPlace(id) });
      } else {
        gsap.timeline({ overwrite: true })
          .set(clip.current, { ...defaults, ...getPosStart() })
          .to(clip.current, { ...defaults, ...getPosCenter(), delay: delay, duration: flipDuration, ease: 'power4.out' })
          .to(clip.current, { ...defaults, motionPath: [getPosSmallAbove(), getPosSmall()], duration: bounceDuration, ease: 'bounce.out' });
      }
    }
  }, { dependencies: [open], revertOnUpdate: true });

  const clipPathId = `${instanceId}_img_${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full"
    >
      <defs>
        <clipPath id={clipPathId + '_circleClip'}>
          <circle className="clip" cx="0" cy="0" r={circle} ref={clip}></circle>
        </clipPath>
        <clipPath id={clipPathId + '_squareClip'}>
          <rect className="clip" width={width} height={height}></rect>
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipPathId + (inPlace ? '_squareClip' : '_circleClip')})`}>
        <image 
          width={width} 
          height={height} 
          href={url} 
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none"
        ></image>
      </g>
    </svg>
  );
};

const Tabs = ({ images, onSelect }) => {
  const gap = 10;
  const circle = 7;
  const width = 400;
  const height = 400;

  const getPosX = (i) => width / 2 - (images.length * (circle * 2 + gap) - gap) / 2 + i * (circle * 2 + gap);
  const getPosY = (i) => height - 30;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full pointer-events-none"
    >
      {(!images ? [] : images).map((image, i) => (
        <circle
          key={i}
          onClick={() => onSelect(i)}
          className="fill-transparent stroke-white/70 stroke-2 cursor-pointer hover:stroke-white pointer-events-auto transition-all duration-200"
          cx={getPosX(i)}
          cy={getPosY(i)}
          r={circle + 2}
        ></circle>
      ))}
    </svg>
  );
};

const ImageScroller = ({ 
  images: customImages, 
  containerClassName = "w-[80vmin] h-[80vmin] max-h-[600px] max-w-[600px]" 
}) => {
  const instanceId = useId().replace(/:/g, '_');
  
  const defaultImages = [
    { title: 'Mini canine', url: 'https://images.unsplash.com/photo-1583551536442-0fc55ac443f6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=min&ixid=eyJhcHBfaWQiOjE0NTg5fQ'},
    { title: 'Wheely tent', url: 'https://images.unsplash.com/photo-1583797227225-4233106c5a2a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=min&ixid=eyJhcHBfaWQiOjE0NTg5fQ'},
    { title: 'Red food things', url: 'https://images.unsplash.com/photo-1561626450-730502dba332?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=min&ixid=eyJhcHBfaWQiOjE0NTg5fQ'},
    { title: 'Sand boat', url: 'https://images.unsplash.com/photo-1585221454166-ce690e60465f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=min&ixid=eyJhcHBfaWQiOjE0NTg5fQ'},
    { title: 'Screen thing', url: 'https://images.unsplash.com/photo-1585427795543-33cf23ea2853?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=min&ixid=eyJhcHBfaWQiOjE0NTg5fQ'},
    { title: 'Horse tornado', url: 'https://images.unsplash.com/photo-1507160874687-6fe86a78b22e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=min&ixid=eyJhcHBfaWQiOjE0NTg5fQ'},
  ];

  const images = customImages || defaultImages;

  const [opened, setOpened] = useState(0);
  const [inPlace, setInPlace] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const onClick = (index) => {
    if (!disabled) setOpened(index);
  };
  const onInPlace = (index) => setInPlace(index);

  const next = () => {
    let nextIndex = opened + 1;
    if (nextIndex >= images.length) nextIndex = 0;
    onClick(nextIndex);
  };

  useEffect(() => {
    setDisabled(true);
  }, [opened]);

  useEffect(() => {
    setDisabled(false);
  }, [inPlace]);

  return (
    <div className="relative flex items-center justify-center w-full h-full font-mono">
      <div className={`relative ${containerClassName} overflow-hidden rounded-[20px] shadow-[0_2.8px_2.2px_rgba(0,0,0,0.02),0_6.7px_5.3px_rgba(0,0,0,0.028),0_12.5px_10px_rgba(0,0,0,0.035),0_22.3px_17.9px_rgba(0,0,0,0.042),0_41.8px_33.4px_rgba(0,0,0,0.05),0_100px_80px_rgba(0,0,0,0.07)]`}>
        {images.map((image, i) => (
          <div
            key={image.url}
            className="absolute top-0 left-0 w-full h-full"
            style={{ zIndex: inPlace === i ? i : images.length + 1 }}
          >
            <Image
              instanceId={instanceId}
              total={images.length}
              id={i}
              url={image.url}
              title={image.title}
              open={opened === i}
              inPlace={inPlace === i}
              onInPlace={onInPlace}
            />
          </div>
        ))}
        <div className="absolute top-0 left-0 w-full h-full z-[100] pointer-events-none">
          <Tabs images={images} onSelect={onClick} />
        </div>
      </div>

      <button
        className="z-[101] absolute right-3 md:right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-none rounded-full cursor-pointer outline-none flex justify-center items-center transition-transform duration-200 ease-in-out hover:translate-x-[52%] hover:-translate-y-[48%] bg-white text-gray-800 hover:text-black shadow-[0_2.8px_2.2px_rgba(0,0,0,0.02),0_6.7px_5.3px_rgba(0,0,0,0.028),0_12.5px_10px_rgba(0,0,0,0.035),0_22.3px_17.9px_rgba(0,0,0,0.042),0_41.8px_33.4px_rgba(0,0,0,0.05),0_100px_80px_rgba(0,0,0,0.07)]"
        onClick={next}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
          <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
        </svg>
      </button>
    </div>
  );
};

export default ImageScroller;

import React from 'react';

const MODEL_IMAGES = [
  {
    id: 'model-1',
    src: '/assets/images/creator-priya.jpg',
    alt: 'Arika Collabs Editorial Creator',
    cls: 'hero-collage__card--1'
  },
  {
    id: 'model-2',
    src: '/assets/images/creator-siya.jpg',
    alt: 'Arika Collabs Fashion Creator',
    cls: 'hero-collage__card--2'
  },
  {
    id: 'model-3',
    src: '/assets/images/creator-diya.jpg',
    alt: 'Arika Collabs Lifestyle Creator',
    cls: 'hero-collage__card--3'
  },
  {
    id: 'model-4',
    src: '/assets/images/creator-riya.jpg',
    alt: 'Arika Collabs Beauty Creator',
    cls: 'hero-collage__card--4'
  }
];

export default function CreatorCollage() {
  return (
    <div className="hero__collage" aria-label="Arika Collabs model showcase">
      {MODEL_IMAGES.map((item) => (
        <div key={item.id} className={`hero-collage__card ${item.cls}`}>
          <img
            src={item.src}
            alt={item.alt}
            className="hero-collage__img"
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
}


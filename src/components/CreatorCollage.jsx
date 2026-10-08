import React, { useState, useEffect } from 'react';

const CREATOR_ROSTER = [
  {
    id: 'priya',
    name: 'Priya Sharma',
    category: 'Fashion',
    avatar: '/assets/images/creator-priya.jpg',
    followers: '128K',
    location: 'Mumbai, IN',
    bio: 'Fashion & styling creator known for editorial-style Reels and street-style lookbooks.'
  },
  {
    id: 'siya',
    name: 'Siya Patel',
    category: 'Fashion',
    avatar: '/assets/images/creator-siya.jpg',
    followers: '128K',
    location: 'Mumbai, IN',
    bio: 'Fashion & styling creator known for editorial-style Reels and street-style lookbooks.'
  },
  {
    id: 'diya',
    name: 'Diya Gupta',
    category: 'Fashion',
    avatar: '/assets/images/creator-diya.jpg',
    followers: '120K',
    location: 'Pune, IN',
    bio: 'Fashion & styling creator known for editorial-style Reels and street-style lookbooks.'
  },
  {
    id: 'riya',
    name: 'Riya Mehta',
    category: 'Beauty',
    avatar: '/assets/images/creator-riya.jpg',
    followers: '94K',
    location: 'Delhi, IN',
    bio: 'Beauty creator specializing in skincare routines and makeup tutorials for everyday looks.'
  },
  {
    id: 'aman',
    name: 'Aman Verma',
    category: 'Fitness',
    avatar: '/assets/images/creator-aman.jpg',
    followers: '76K',
    location: 'Bengaluru, IN',
    bio: 'Fitness coach and creator sharing workout breakdowns and healthy lifestyle content.'
  },
  {
    id: 'rahul',
    name: 'Rahul Singh',
    category: 'Fitness',
    avatar: '/assets/images/creator-rahul.jpg',
    followers: '82K',
    location: 'Delhi, IN',
    bio: 'Fitness coach and athlete creating workout routines and nutrition tips.'
  },
  {
    id: 'neha',
    name: 'Neha Roy',
    category: 'Lifestyle',
    avatar: '/assets/images/creator-neha.jpg',
    followers: '110K',
    location: 'Kolkata, IN',
    bio: 'Lifestyle storyteller sharing cafe reviews, travel moments and home decor inspiration.'
  }
];

export default function CreatorCollage({ onSelectCreator }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((prev) => (prev + 1) % CREATOR_ROSTER.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const getCreator = (idx) => {
    return CREATOR_ROSTER[(offset + idx) % CREATOR_ROSTER.length];
  };

  const slots = [
    { key: 'main', cls: 'hero-card--main', creator: getCreator(0) },
    { key: 'beauty', cls: 'hero-card--beauty', creator: getCreator(1) },
    { key: 'lifestyle', cls: 'hero-card--lifestyle', creator: getCreator(2) },
    { key: 'fashion', cls: 'hero-card--fashion', creator: getCreator(3) }
  ];

  return (
    <div className="hero__collage">
      {slots.map((s) => (
        <div
          key={s.key}
          className={`creator-card hero-card ${s.cls} cursor-pointer`}
          onClick={() => onSelectCreator(s.creator)}
        >
          <div
            className="creator-card__media"
            style={{
              backgroundImage: `url('${s.creator.avatar}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="creator-card__badge">
            <span className="creator-card__name">{s.creator.name}</span>
            <span className="creator-card__category">{s.creator.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

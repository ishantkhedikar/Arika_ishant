import React from 'react';
import { Link } from 'react-router-dom';

export default function CreatorModal({ creator, onClose }) {
  if (!creator) return null;

  return (
    <div
      className="creator-modal-overlay active"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="creator-modal"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <button
          type="button"
          className="creator-modal__close cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <div className="creator-modal__avatar">
          <img src={creator.avatar} alt={creator.name} />
        </div>

        <h3 className="creator-modal__name">{creator.name}</h3>
        <span className="creator-modal__category">{creator.category}</span>

        <div className="creator-modal__stats">
          <div>
            <strong className="creator-modal__followers">{creator.followers}</strong>
            <span>Followers</span>
          </div>
          <div>
            <strong className="creator-modal__location">{creator.location}</strong>
            <span>Location</span>
          </div>
        </div>

        <p className="creator-modal__bio">{creator.bio}</p>

        <div className="creator-modal__actions">
          <Link
            to="/contact"
            className="btn btn-primary creator-modal__view-profile"
            onClick={onClose}
          >
            Collaborate With This Creator &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

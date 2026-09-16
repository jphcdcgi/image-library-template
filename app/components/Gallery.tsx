'use client';

import React from 'react';
import type { GalleryProps } from '../types';
import Icon from './Icon';

export function Gallery({ filtered, faves, setFaves, setToast }: GalleryProps) {
  const onLikeClick = (event: React.MouseEvent, assetId: string) => {
    event.stopPropagation();
    const match = faves.includes(assetId)
      ? faves.filter((id) => id !== assetId)
      : [...faves, assetId];
    setFaves(match);
  };

  const onDownloadClick = (event: React.MouseEvent, assetTitle: string) => {
    event.stopPropagation();
    setToast(`Preparing ${assetTitle} for download`);
  };

  return (
    <div className="gallery">
      {filtered.map((asset) => (
        <article
          className="asset-card"
          key={asset.id}
          tabIndex={0}
          onClick={() => setToast(`Opened ${asset.title}`)}
        >
          <img
            className="asset-image"
            src={asset.src}
            alt={asset.alt}
            loading="lazy"
          />
          <div className="asset-overlay">
            <div className="asset-top">
              <span className="type-badge">
                <Icon name={asset.type} />
                {asset.type}
              </span>
              <div className="asset-actions">
                <button
                  className={`asset-action ${faves.includes(asset.id) ? 'liked' : ''}`}
                  onClick={(event) => onLikeClick(event, asset.id)}
                  aria-label={`Like ${asset.title}`}
                >
                  <Icon name="heart" />
                </button>
                <button
                  className="asset-action"
                  onClick={(event) => onDownloadClick(event, asset.title)}
                  aria-label={`Download ${asset.title}`}
                >
                  <Icon name="download" />
                </button>
              </div>
            </div>
            <div className="asset-info">
              <h3>{asset.title}</h3>
              <p>{asset.prompt}</p>
              <span className="asset-model">{asset.model}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

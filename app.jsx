import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as Dialog from '@radix-ui/react-dialog';
import { categories, posters } from './data.js';

const number = value => String(value).padStart(2, '0');

function CategoryFilter({ selectedCategory, onSelect, count }) {
  return <div className="gallery-toolbar">
    <div className="filters" role="group" aria-label="Filter posters">
      {categories.map(category => <button key={category} type="button" aria-pressed={selectedCategory === category} onClick={() => onSelect(category)}>
        {category} <sup>{number(category === 'All' ? posters.length : posters.filter(p => p.category === category).length)}</sup>
      </button>)}
    </div>
    <span className="gallery-count" role="status" aria-live="polite" aria-atomic="true">{number(count)} WORKS <span className="sr-only">in {selectedCategory}</span></span>
  </div>;
}

function PosterCard({ poster, index, onOpen }) {
  const square = poster.ratio === '1:1';
  return <article className="tile">
    <button type="button" className="poster-button" aria-label={`View ${poster.title} details`} aria-haspopup="dialog" onClick={event => onOpen(poster.id, event.currentTarget)}>
      <picture>
        <source type="image/webp" srcSet={`assets/posters/${poster.id}-600.webp 600w, ${poster.image} 1200w`} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 30vw" />
        <img src={`assets/posters/${poster.id}-600.jpg`} width="600" height={square ? 600 : 800} alt={poster.alt} loading={index < 3 ? 'eager' : 'lazy'} decoding="async" />
      </picture>
      <span className="open-hint" aria-hidden="true">↗</span>
    </button>
    <div className="tile-caption"><h2><small className="tile-number">{number(posters.findIndex(p => p.id === poster.id) + 1)}</small>{poster.title}</h2><span>{poster.category}</span></div>
  </article>;
}

function PosterGrid({ visiblePosters, onOpen }) {
  return <div className="gallery">{visiblePosters.map((poster, index) => <PosterCard key={poster.id} poster={poster} index={index} onOpen={onOpen} />)}</div>;
}

function DesignRationale({ rationale }) {
  return <div className="design-rationale">
    <Dialog.Description className="concept">{rationale.concept}</Dialog.Description>
    {rationale.proposed && <p className="review-note">Design notes below are proposed copy for review.</p>}
    <dl>{['typography', 'colour', 'composition'].map(field => <div key={field}><dt>{field}</dt><dd>{rationale[field]}</dd></div>)}</dl>
  </div>;
}

function PosterDetailDialog({ poster, collection, onSelect, onClose, triggerRef }) {
  const position = collection.findIndex(p => p.id === poster?.id);
  const step = direction => onSelect(collection[(position + direction + collection.length) % collection.length].id);
  return <Dialog.Root open={Boolean(poster)} onOpenChange={open => { if (!open) onClose(); }}>
    <Dialog.Portal><Dialog.Overlay className="dialog-overlay" />
      <Dialog.Content className="poster-dialog" onKeyDown={event => {
        if (!event.altKey && !event.ctrlKey && !event.metaKey && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
          event.preventDefault();
          step(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }} onCloseAutoFocus={event => { event.preventDefault(); triggerRef.current?.focus(); }}>
        {poster && <>
          <Dialog.Close className="close-dialog" aria-label="Close poster details">×</Dialog.Close>
          <div className="dialog-layout">
            <div className="dialog-art"><img src={poster.image} width="1200" height={poster.ratio === '1:1' ? 1200 : 1600} alt={poster.alt} /></div>
            <div className="dialog-copy">
              <span className="eyebrow">{poster.category} / POSTER {number(posters.findIndex(p => p.id === poster.id) + 1)}</span>
              <Dialog.Title>{poster.title}</Dialog.Title>
              <DesignRationale rationale={poster.designRationale} />
              <h3>ON THE POSTER</h3><p className="transcript">{poster.words}</p>
              <div className="project-nav"><button type="button" onClick={() => step(-1)} aria-label="Previous poster">← Previous</button><span role="status" aria-live="polite" aria-atomic="true">{position + 1} of {collection.length}</span><button type="button" onClick={() => step(1)} aria-label="Next poster">Next →</button></div>
            </div>
          </div>
        </>}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}

function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPosterId, setSelectedPosterId] = useState(null);
  const triggerRef = useRef(null);
  const visiblePosters = posters.filter(p => selectedCategory === 'All' || p.category === selectedCategory);
  const selectedPoster = visiblePosters.find(p => p.id === selectedPosterId);
  function openPoster(id, trigger) { triggerRef.current = trigger; setSelectedPosterId(id); }
  return <section id="work" aria-label="Poster gallery">
    <CategoryFilter selectedCategory={selectedCategory} onSelect={setSelectedCategory} count={visiblePosters.length} />
    <PosterGrid visiblePosters={visiblePosters} onOpen={openPoster} />
    <div className="gallery-end"><span>END OF COLLECTION</span><span>GOOD DESIGN REWARDS A CLOSER LOOK. ↗</span></div>
    <PosterDetailDialog poster={selectedPoster} collection={visiblePosters} onSelect={setSelectedPosterId} onClose={() => setSelectedPosterId(null)} triggerRef={triggerRef} />
  </section>;
}

createRoot(document.getElementById('gallery-root')).render(<GalleryPage />);

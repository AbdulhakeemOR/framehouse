const originalPosters = [
  {id:'quiet-hours',title:'Quiet Hours',category:'Type',ratio:'3:4',alt:'Poster with Quiet Hours in tall cream letters on charcoal, with a small violet circle at the top right.',words:'QUIET\nHOURS\nA little room for nothing.\nFramehouse — No. 001',rationale:'One typeface, one accent color, and plenty of empty space so the title is read first. The elongated letters slow the pace, while a single violet circle gives the stillness a point of focus.'},
  {id:'loud-colors',title:'Loud Colors',category:'Illustration',ratio:'1:1',alt:'Sculptural cobalt, coral, pink and yellow shapes on a cream poster that reads Loud Colors.',words:'LOUD COLORS\nAn exercise in taking up space.\n002 / FRAMEHOUSE',rationale:'Simple shapes do the talking here. Overlapping warm and cool colors create a playful tension, with small typography leaving the composition free to be loud.'},
  {id:'letters-in-motion',title:'Letters in Motion',category:'Type',ratio:'3:4',alt:'Violet poster with repeated cream Motion lettering, staggered diagonally across the page.',words:'LETTERS IN\nMOTION\nMOTION\nMOTION\nStudies in rhythm & repetition. / 003',rationale:'Repetition turns a static word into a visual rhythm. Each line shifts across the grid, suggesting movement without a single animated element.'},
  {id:'open-window',title:'Open Window',category:'Event',ratio:'3:4',alt:'Acid yellow exhibition poster with a black arch and a blue sky visible through its window.',words:'OPEN\nWINDOW\nA fresh perspective.\nDesign open studio / 12—14 JUN\n10:00—18:00 / Everyone welcome.',rationale:'A single architectural opening becomes an invitation to look beyond the familiar. Acid yellow makes the event visible at a distance; the sky adds a moment of calm.'},
  {id:'lantern-night',title:'Lantern Night',category:'Event',ratio:'3:4',alt:'Deep red Lantern Night poster with three glowing orange circular lantern forms.',words:'LANTERN\nNIGHT\nAn evening to gather.\n21 SEPT / SUNSET ONWARDS\nFRAMEHOUSE COMMUNITY SERIES',rationale:'Warm circles float against a deep red field, recalling the soft glow of paper lanterns. A centered arrangement gives this fictional community event an intimate, ceremonial feel.'},
  {id:'paper-birds',title:'Paper Birds',category:'Illustration',ratio:'1:1',alt:'Sky blue poster with angular cream and dark blue paper birds flying in different directions.',words:'PAPER BIRDS\nSmall folds. Endless possibilities.\n006 — A STUDY IN FLIGHT',rationale:'Folded geometric forms turn flat paper into a suggestion of flight. The generous blue field gives each bird room to move, balancing the sharpness of the shapes.'},
  {id:'stamp-and-seal',title:'Stamp and Seal',category:'Brand',ratio:'1:1',alt:'Cream and rust brand study featuring a circular Stamp and Seal emblem and oversized typographic ampersand.',words:'STAMP & SEAL\nMade to leave a mark.\nIndependent goods / Est. 2025\nBRAND STUDY — 007',rationale:'A circular maker’s mark anchors an identity built around craft and permanence. Rust ink and warm paper bring the tactile language of traditional packaging into a simple graphic system.'},
  {id:'soft-grid',title:'Soft Grid',category:'Brand',ratio:'3:4',alt:'Forest green poster with a grid of pale mint rounded squares and the words Soft Grid.',words:'soft\ngrid.\nStructure, with a softer side.\nIDENTITY EXPLORATION / 008',rationale:'A strict grid holds a family of soft, rounded shapes. The contrast between order and ease forms an approachable identity, with a restrained green palette keeping the system cohesive.'},
  {id:'say-it-plainly',title:'Say It Plainly',category:'Type',ratio:'3:4',alt:'Vivid orange typographic poster with the large black words Say It Plainly and a small cream asterisk.',words:'SAY\nIT\nPLAINLY.\nLess noise. More meaning.\nFRAMEHOUSE / 009',rationale:'Direct language calls for direct typography. Oversized black lettering and a bright orange field strip the message back to its essentials; a small asterisk adds a human touch.'}
];

export const categories = ['All', 'Type', 'Illustration', 'Event', 'Brand'];

// Editorial additions describe visible design choices only; review before publication.
const proposedNotes = {
  'quiet-hours': ['Tall cream lettering slows the reading pace.', 'Charcoal and cream are interrupted by one violet accent.', 'Generous space and a small circle balance the large title.'],
  'loud-colors': ['Small lettering leaves the illustrated forms in the foreground.', 'Warm and cool colors create playful tension.', 'Overlapping sculptural shapes take up space across the square.'],
  'letters-in-motion': ['Repeated lettering creates a visual rhythm.', 'Cream lettering stands out against violet.', 'Each line shifts diagonally across the grid.'],
  'open-window': ['Large stacked words make the title easy to locate.', 'Acid yellow contrasts with a calm blue sky.', 'A single architectural opening anchors the page.'],
  'lantern-night': ['A stacked title gives the gathering a clear heading.', 'Orange circles glow against a deep red field.', 'Centered forms create an intimate, ceremonial arrangement.'],
  'paper-birds': ['Small lettering gives the birds room to move.', 'Cream and dark blue forms sit against sky blue.', 'Angular folded forms suggest flight across an open field.'],
  'stamp-and-seal': ['An oversized ampersand sits beside a circular typographic mark.', 'Rust and warm cream suggest ink and paper.', 'The circular emblem anchors the graphic system.'],
  'soft-grid': ['Soft lowercase lettering echoes the rounded shapes.', 'A restrained green palette holds the elements together.', 'A strict grid balances order with rounded forms.'],
  'say-it-plainly': ['Oversized black lettering makes the message direct.', 'Bright orange gives the black words strong contrast.', 'Stacked words dominate while a small asterisk provides an accent.']
};

export const posters = originalPosters.map(poster => ({
  ...poster,
  image: `assets/posters/${poster.id}-1200.webp`,
  designRationale: {
    concept: poster.rationale,
    typography: proposedNotes[poster.id][0],
    colour: proposedNotes[poster.id][1],
    composition: proposedNotes[poster.id][2],
    proposed: true
  }
}));


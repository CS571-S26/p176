// Tag styling for project cards / detail pages. The category structure and
// colors are imported from skillsSection.js so the Skills section and the
// project-card tag badges stay in sync — change a category color in one
// place and both surfaces update.

import { skillCategories } from './skillsSection';

const FALLBACK_COLOR = '#94a3b8'; // slate-400 — for tags not in any category

export function getTagStyle(tag) {
  for (const cat of skillCategories) {
    if (cat.skills.includes(tag)) {
      return {
        backgroundColor: cat.color,
        color: '#fff',
        border: `1px solid ${cat.color}`,
      };
    }
  }
  return {
    backgroundColor: FALLBACK_COLOR,
    color: '#fff',
    border: `1px solid ${FALLBACK_COLOR}`,
  };
}

export function getTagCategory(tag) {
  for (const cat of skillCategories) {
    if (cat.skills.includes(tag)) return cat.label;
  }
  return 'Other Tools';
}

export default skillCategories;

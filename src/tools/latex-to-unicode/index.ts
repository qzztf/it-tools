import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'LaTeX to unicode',
  path: '/latex-to-unicode',
  description: 'Convert LaTeX math expressions to their Unicode equivalents. Supports a wide range of LaTeX math symbols and expressions, making it easy to include mathematical notation in plain text.',
  keywords: ['latex', 'to', 'unicode'],
  component: () => import('./latex-to-unicode.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2026-04-01'),
});

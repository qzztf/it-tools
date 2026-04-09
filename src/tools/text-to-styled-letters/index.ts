import { AbcRound } from '@vicons/material';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Text to styled letters',
  path: '/text-to-styled-letters',
  description: 'Convert your text into styled letters in unicode.',
  keywords: ['text', 'to', 'styled', 'letters'],
  component: () => import('./text-to-styled-letters.vue'),
  icon: AbcRound,
  createdAt: new Date('2026-04-01'),
});

<script setup lang="ts">
import { computed, ref } from 'vue';
import { type StyleType, textToStyledLetters } from './text-to-styled-letters.service';
import { useCopy } from '@/composable/copy';

const input = ref('');
const selectedStyle = ref<StyleType>('bold');

const styleOptions: { label: string; value: StyleType }[] = [
  { label: 'Bold', value: 'bold' },
  { label: 'Italic', value: 'italic' },
  { label: 'Bold Italic', value: 'boldItalic' },
  { label: 'Script', value: 'script' },
  { label: 'Bold Script', value: 'boldScript' },
  { label: 'Fraktur', value: 'fraktur' },
  { label: 'Double-Struck', value: 'doubleStruck' },
  { label: 'Sans-Serif', value: 'sansSerif' },
  { label: 'Sans-Serif Bold', value: 'sansSerifBold' },
  { label: 'Sans-Serif Italic', value: 'sansSerifItalic' },
  { label: 'Sans-Serif Bold Italic', value: 'sansSerifBoldItalic' },
  { label: 'Monospace', value: 'monospace' },
];

const styledText = computed(() =>
  textToStyledLetters({ text: input.value, style: selectedStyle.value }),
);

const { copy } = useCopy({ source: styledText, text: 'Styled letters string copied.' });
</script>

<template>
  <div>
    <c-input-text
      v-model:value="input" label="Your text to convert to styled letters"
      placeholder="Put your text here..." clearable mb-5
    />

    <c-select v-model:value="selectedStyle" label="Select style" :options="styleOptions" mb-5 />

    <div v-if="styledText">
      <div mb-2>
        Your text in <strong>{{ styleOptions.find(s => s.value === selectedStyle)?.label }}</strong> letters
      </div>
      <c-card>
        {{ styledText }}
      </c-card>

      <div mt-3 flex justify-center>
        <c-button autofocus @click="copy()">
          Copy styled letters string
        </c-button>
      </div>
    </div>
  </div>
</template>

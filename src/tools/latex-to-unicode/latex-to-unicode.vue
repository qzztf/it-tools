<script setup lang="ts">
import { latexToUnicode } from './latex-to-unicode.service';
import { useCopy } from '@/composable/copy';

const input = ref('');
const unicodeText = computed(() => latexToUnicode({ text: input.value }));
const { copy } = useCopy({ source: unicodeText, text: 'Unicode math string copied.' });
</script>

<template>
  <div>
    <c-input-text
      v-model:value="input"
      label="Your text to convert to unicode"
      placeholder="Put your LaTeX here..."
      clearable
      mb-5
    />

    <div v-if="unicodeText">
      <div mb-2>
        Your text in unicode
      </div>
      <c-card>
        {{ unicodeText }}
      </c-card>

      <div mt-3 flex justify-center>
        <c-button autofocus @click="copy()">
          Copy unicode math
        </c-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { type StyleType, textToStyledLetters } from './text-to-styled-letters.service';
import { useCopy } from '@/composable/copy';

const input = ref('');
const selectedStyle = ref<StyleType>('bold');

const styleOptions: { label: string; value: StyleType }[] = [
  { label: '𝐛𝐨𝐥𝐝', value: 'bold' },
  { label: '𝑖𝑡𝑎𝑙𝑖𝑐', value: 'italic' },
  { label: '𝒃𝒐𝒍𝒅 𝒊𝒕𝒂𝒍𝒊𝒄', value: 'boldItalic' },
  { label: '𝒮𝒸𝓇𝒾𝓅𝓉', value: 'script' },
  { label: '𝓑𝓸𝓵𝓭 𝓢𝓬𝓻𝓲𝓹𝓽', value: 'boldScript' },
  { label: '𝔉𝔯𝔞𝔨𝔱𝔲𝔯', value: 'fraktur' },
  { label: '𝔻𝕠𝕦𝕓𝕝𝕖-𝕊𝕥𝕣𝕦𝕔𝕜', value: 'doubleStruck' },
  { label: '𝖲𝖺𝗇𝗌-𝖲𝖾𝗋𝗂𝖿', value: 'sansSerif' },
  { label: '𝗦𝗮𝗻𝘀-𝗦𝗲𝗿𝗶𝗳 𝗕𝗼𝗹𝗱', value: 'sansSerifBold' },
  { label: '𝘚𝘢𝘯𝘴-𝘚𝘦𝘳𝘪𝘧 𝘐𝘵𝘢𝘭𝘪𝘤', value: 'sansSerifItalic' },
  { label: '𝙎𝙖𝙣𝙨-𝙎𝙚𝙧𝙞𝙛 𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘', value: 'sansSerifBoldItalic' },
  { label: '𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎', value: 'monospace' },
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

// ======================================================
// NUMBER MEMORY ENGINE
// Cipher-based resonance storage
// ======================================================

type MemoryEntry = {
  word: string;
  timestamp: number;
};

type CipherMemory = {
  [value: number]: MemoryEntry[];
};

type NumberMemory = {
  [cipher: string]: CipherMemory;
};

const STORAGE_KEY = "gematria_number_memory";
const MAX_PER_NUMBER = 50;
const MAX_NUMBERS_PER_CIPHER = 500;

function loadMemory(): NumberMemory {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

function saveMemory(memory: NumberMemory) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
}

export function storeWord(cipher: string, value: number, word: string) {
  if (!value) return;

  const memory = loadMemory();

  if (!memory[cipher]) {
    memory[cipher] = {};
  }

  if (!memory[cipher][value]) {
    memory[cipher][value] = [];
  }

  const exists = memory[cipher][value].some((entry) => entry.word === word);

  if (!exists) {
    memory[cipher][value].unshift({
      word,
      timestamp: Date.now()
    });

    memory[cipher][value] = memory[cipher][value].slice(0, MAX_PER_NUMBER);
  }

  const values = Object.keys(memory[cipher])
    .map(Number)
    .sort((a, b) => b - a);

  if (values.length > MAX_NUMBERS_PER_CIPHER) {
    const toRemove = values.slice(MAX_NUMBERS_PER_CIPHER);
    toRemove.forEach((v) => delete memory[cipher][v]);
  }

  saveMemory(memory);
}

export function getResonances(cipher: string, value: number) {
  const memory = loadMemory();
  return memory[cipher]?.[value] || [];
}

export function clearMemory() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

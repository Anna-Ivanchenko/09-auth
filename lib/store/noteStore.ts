import { create } from 'zustand';
import { CreateNoteDto } from '../api';
import { persist } from 'zustand/middleware';

type NoteDraftStore = {
  draft: CreateNoteDto;
  setDraft: (note: CreateNoteDto) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNoteDto = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  // 2. Обгортаємо функцію створення стора
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      // Ключ у localStorage
      name: 'note-draft',
      // Зберігаємо лише властивість draft
      partialize: state => ({ draft: state.draft }),
    }
  )
);
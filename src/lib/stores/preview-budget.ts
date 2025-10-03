import type { Budget } from '@/lib/types';
import { create } from 'zustand';

export type BudgetState = {
  aside: boolean;
  info: Budget | null;
};

export type BudgetAction = {
  closeAside: () => void;
  openAside: (info: Budget | null) => void;
};

export type BudgetStore = BudgetState & BudgetAction;

export const defaultState: BudgetState = {
  aside: false,
  info: null,
};

export const usePreviewBudget = create<BudgetStore>()((set) => ({
  ...defaultState,
  closeAside: () => set(() => ({ aside: false })),
  openAside: (info) => set(() => ({ aside: true, info })),
}));

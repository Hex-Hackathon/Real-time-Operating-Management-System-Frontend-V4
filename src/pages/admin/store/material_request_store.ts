import { create } from 'zustand';

type State = {
  selectedMaterialIds: string[];
};
type Action = {
  updateMaterialIds: (id: string) => void;
  resetMaterialIds: () => void;
};

export const useMaterialRequestStore = create<State & Action>((set) => ({
  selectedMaterialIds: [],
  updateMaterialIds(materialId) {
    return set((state) => {
      const selectedMaterialIds = state.selectedMaterialIds;

      if (!selectedMaterialIds.includes(materialId)) {
        return { selectedMaterialIds: [...selectedMaterialIds, materialId] };
      }
      return {
        selectedMaterialIds: selectedMaterialIds.filter(
          (id) => id !== materialId,
        ),
      };
    });
  },
  resetMaterialIds() {
    return set(() => ({ selectedMaterialIds: [] }));
  },
}));

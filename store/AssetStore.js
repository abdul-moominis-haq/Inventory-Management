import create from 'zustand';
import { getData } from '@/utils/apiCalls';

export const useAssetStore = create((set) => ({
    assets: [],  
    asset_cat: [],

    getAssets: async () => {
        try {
            const res = await getData('assets', true);
            set({ assets: res });
        } catch (e) {
            console.log(e);
        }
    },

    getAssetCategories: async () => {
        try {
            const res = await getData('asset_categories', true);
            set({ asset_cat: res });
        } catch (e) {
            console.log(e);
        }
    }
}));
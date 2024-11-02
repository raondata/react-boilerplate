import { EnergyEfficiencyRatingType } from '@@types/field-types';
import { atom, useAtom } from 'jotai';

const energyEfficiencyRatingAtom = atom<
  EnergyEfficiencyRatingType | undefined
>();

export { energyEfficiencyRatingAtom };

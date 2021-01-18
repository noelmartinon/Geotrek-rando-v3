import { adaptDifficulties, adaptDifficultyFilter } from './adapter';
import { fetchDifficulties } from './api';
import { Filter } from '../interface';
import { DifficultyChoices } from './interface';

export const getDifficulties = async (): Promise<DifficultyChoices> => {
  const rawDifficulties = await fetchDifficulties({ language: 'fr' });
  return adaptDifficulties(rawDifficulties.results);
};

export const getDifficultyFilter = async (): Promise<Filter> => {
  const rawDifficulties = await fetchDifficulties({ language: 'fr' });
  return adaptDifficultyFilter(rawDifficulties.results);
};
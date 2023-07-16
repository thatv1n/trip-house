import { ResponseError } from '@/types';
import actionCreatorFactory from 'typescript-fsa';
import { CategoryResponse, CitiesResponse } from './eventsFilter.types';

const actionCreator = actionCreatorFactory('[MENU]');

export const getCategoryAction = actionCreator.async<null, CategoryResponse[], ResponseError>('GET_CATEGORY');
export const getCitiesAction = actionCreator.async<string, CitiesResponse[], ResponseError>('GET_CITIES');

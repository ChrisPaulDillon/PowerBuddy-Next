import { API_BASE } from '../../redux/actionTypes';

const baseUrl = `${API_BASE}Account/ProgramLogRepScheme/`;

export const CreateProgramLogRepSchemeCollectionUrl = () => `${baseUrl}Collection`;

export const UpdateProgramLogRepSchemeUrl = () => `${baseUrl}`;

export const DeleteProgramLogRepSchemeUrl = (programLogRepSchemeId: number) => `${baseUrl}${programLogRepSchemeId}`;
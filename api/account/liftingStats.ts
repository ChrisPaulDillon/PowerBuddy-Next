import { API_BASE } from '../../redux/actionTypes';

const baseUrl = `${API_BASE}Account/LiftingStats`;

export const GetAllUserLiftingStatsUrl = () => `${baseUrl}`;
export const GetPersonalBestsForTemplate = (templateProgramId: number) => `${baseUrl}/Template/${templateProgramId}`;

export const GetLiftingStatByIdUrl = (liftingStatId: number) => {
    if(liftingStatId) {
        return `${baseUrl}/${liftingStatId}`;
    }
}
export const CreateLiftingStatUrl = () => `${baseUrl}`;
export const CreateLiftingStatCollectionUrl = () => `${baseUrl}/Collection`;
export const UpdateLiftingStatUrl = () => `${baseUrl}`;
export const DeleteLiftingStatUrl = (liftingStatId: number) => `${baseUrl}/${liftingStatId}`;
export const DeleteLiftingStatAuditUrl = (liftingStatAuditId: number) => `${baseUrl}/Audit/${liftingStatAuditId}`;
export const UpdateLiftingStatCollectionUrl = () => `${baseUrl}/Collection`;

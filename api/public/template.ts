import { API_BASE } from "../../redux/actionTypes";

const baseUrl = `${API_BASE}Public/TemplateProgram`;

export const GetAllTemplateProgramsUrl = () => `${baseUrl}`;

export const GetTemplateProgramByIdUrl = (templateProgramId: number) =>
  `${baseUrl}/${templateProgramId}`;

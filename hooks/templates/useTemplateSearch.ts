import { IExercise } from '../../interfaces/exercises/index';
import React, { useState, useEffect } from 'react';
import { ITemplateProgram } from '../../interfaces/templates/index';

const useTemplateSearch = (templates: ITemplateProgram[], searchTerm: string) => {
  const [filteredTems, setFilteredTems] = useState<ITemplateProgram[]>(templates);

  useEffect(() => {
    if(templates) {
    setFilteredTems(templates.filter((ex) => ex.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  }, [templates, searchTerm]);

  return filteredTems;
};

export default useTemplateSearch;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_EXERCISES } from "../../redux/actionTypes";
import { loadExercises } from "../../redux/area/public/exerciseActions";
import { IAppState } from "../../redux/store";

const useLoadExercises = () => {

const { exercises } = useSelector((state: IAppState) => state.state);
const dispatcher = useDispatch();
    
  useEffect(() => {
    if (exercises.length === 0) {
      const exerciseLS = null; //localStorage.getItem("exercises");
      if (exerciseLS != null) {
        dispatcher({
          type: LOAD_EXERCISES,
          exercises: JSON.parse(exerciseLS),
        });
      } else {
        dispatcher(loadExercises());
      }
    }
  }, [exercises]);
}

export default useLoadExercises;
import { useSelector } from "react-redux";
import { IAppState } from "../../../redux/store";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  FormControl,
  FormErrorMessage,
  Select,
  useToast,
} from "@chakra-ui/core";
import { CenterColumnFlex } from "../../layout/Flexes";
import { PbPrimaryButton } from "../../common/Buttons";
import CalendarSelectFrom from "./CalendarSelectForm";
import { staticNumberList } from "../../common/static";
import { TextXs } from "../../common/Texts";
import { validateInput } from "../../../util/formInputs";
import { IProgramLogInputScratch } from "../../programLog/interfaces";
import moment from "moment";
import axios from "axios";
import { CreateProgramLogFromScratchUrl } from "../../../api/account/programLog";
import { IProgramLog } from "../../../interfaces/programLogs";
import { useHistory, withRouter } from "react-router-dom";
import ProgramSummary from "./ProgramSummary";
interface IProps {
  onClose: () => void;
}

const CreateProgramLogFromScratchForm: React.FC<IProps> = ({ onClose }) => {
  const history = useHistory();
  const { user } = useSelector((state: IAppState) => state.state);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [phase, setPhase] = useState<number>(1);
  const [customName, setCustomName] = useState<string>("Custom Template");
  const [noOfWeeks, setNoOfWeeks] = useState<number>(0);
  const toast = useToast();

  const updateCustomName = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    if (e && e.target && e.target.value) {
      setCustomName(e.target.value);
    }
  };

  const { handleSubmit, register, errors, formState } = useForm();

  const onSubmit = async () => {
    if (phase < 2) {
      setEndDate(moment(startDate).add(noOfWeeks!, "weeks").toDate());
      setPhase(phase + 1);
    } else {
      const programLogInput: IProgramLogInputScratch = {
        userId: user.userId!,
        noOfWeeks: noOfWeeks,
        startDate: startDate,
        endDate: endDate,
        customName: customName,
      };
      try {
        const response = await axios.post(
          CreateProgramLogFromScratchUrl(),
          programLogInput
        );
        toast({
          title: "Success",
          description:
            "Successfully Created Diary Log, redirecting to Diary Section",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      } catch (error) {
        if (error.response.status === 400) {
          toast({
            title: "Warning",
            description:
              "You already have a diary entry active for this time period!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          toast({
            title: "Error",
            description: "Could not create Diary Log, please try again later",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top-right",
          });
        }
      }
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {phase === 1 ? (
        <Box display={phase === 1 ? "inline" : "none"}>
          <FormControl isInvalid={errors.noOfWeeks}>
            <CenterColumnFlex mb="2">
              <TextXs p="1" mb="1">
                Select Program Start Date & Number of Weeks
              </TextXs>
              <Select
                placeholder="No Of Weeks..."
                ref={register({ validate: validateInput })}
                name="noOfWeeks"
                size="sm"
                onChange={(e) => setNoOfWeeks(parseInt(e.target.value))}
              >
                {staticNumberList.map((x) => (
                  <option value={x.value}>{x.label}</option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.noOfWeeks && errors.noOfWeeks.message}
              </FormErrorMessage>
            </CenterColumnFlex>
          </FormControl>
          <CalendarSelectFrom
            selectedDate={startDate}
            setSelectedDate={setStartDate}
          />
        </Box>
      ) : (
        <Box />
      )}
      {phase === 2 ? (
        <Box display={phase === 2 ? "inline" : "none"}>
          <ProgramSummary
            setCustomName={updateCustomName}
            startDate={startDate}
            endDate={endDate}
          />
        </Box>
      ) : (
        <Box />
      )}

      <CenterColumnFlex p="3" mt="2">
        <PbPrimaryButton type="submit" loading={formState.isSubmitting}>
          {phase < 3 ? "Continue" : "Complete"}
        </PbPrimaryButton>
      </CenterColumnFlex>
    </form>
  );
};

export default CreateProgramLogFromScratchForm;

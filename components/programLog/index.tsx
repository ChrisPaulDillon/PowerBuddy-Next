import React, { useEffect, useState } from 'react';
import { PageHeader, TextSm } from '../common/Texts';
import { CenterColumnFlex } from '../layout/Flexes';
import ProgramLogDayList from './ProgramLogDayList';
import ProgramLogTopBar from './ProgramLogBottomBar';
import QuoteDisplay from '../shared/QuoteDisplay';
import ProgramLogProvider from './ProgramLogContext';
import { IProgramLog, IProgramLogWeek } from '../../interfaces/programLogs';
import { GetProgramLogByIdUrl } from '../../api/account/programLog';
import { useAxios } from '../../hooks/useAxios';
import ProgressSpinner from '../common/ProgressSpinner';
import moment from 'moment';
import qs from 'qs';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/store';
import { Error } from '../common/Error';

export enum LogViewEnum {
  Swipe,
  List,
}

const ProgramLogIndexPage = () => {
  //@ts-ignore
  const { programLogId } = useParams();
  const { user } = useSelector((state: IAppState) => state.state);
  const { loading, data, statusCode } = useAxios<IProgramLog>(GetProgramLogByIdUrl(programLogId!));
  const [programLog, setProgramLog] = useState<IProgramLog>({} as IProgramLog);
  const [programLogWeek, setProgramLogWeek] = useState<IProgramLogWeek>({} as IProgramLogWeek);
  const [contentDisabled, setContentDisabled] = useState<boolean>(true);
  const [weekNo, setWeekNo] = useState<number>(1);
  const [logView, setLogView] = useState<LogViewEnum>(LogViewEnum.Swipe);

  const handleViewChange = () => {
    if (logView === LogViewEnum.Swipe) {
      setLogView(LogViewEnum.List);
    } else {
      setLogView(LogViewEnum.List);
    }
  };

  useEffect(() => {
    if (programLog) {
      if (programLog.userId! === user.userId!) {
        //User is viewing another persons diary
        setContentDisabled(false);
      }
    }
  }, [data, programLog, user]);

  useEffect(() => {
    if (data != null) {
      setProgramLog(data!);

      if (contentDisabled) {
        setProgramLogWeek(data!.programLogWeeks!.find((x) => x.weekNo === 1) ?? programLogWeek);
        setWeekNo(1);
      } else {
        setProgramLogWeek(data!.programLogWeeks!.find((x) => moment(new Date()).isBetween(moment(x.startDate), moment(x.endDate))) ?? programLogWeek);
        setWeekNo(data!.programLogWeeks!.find((x) => moment(new Date()).isBetween(moment(x.startDate), moment(x.endDate)))?.weekNo ?? 1);
      }
    }
  }, [data, contentDisabled]);

  useEffect(() => {
    if (Object.keys(programLog).length !== 0) {
      setProgramLogWeek(programLog!.programLogWeeks!.find((x) => x.weekNo === weekNo) ?? programLogWeek);
    }
  }, [weekNo, contentDisabled]);

  if (loading) return <ProgressSpinner />;
  if (statusCode === 404 && programLogId) return <Error statusCode={404} description="No Diary Found, Have You Followed A Broken Link?" />;
  if (statusCode === 400 && programLogId) return <Error statusCode={400} description="This User Has Their Profile Set To Private" />;
  if (statusCode === 404)
    return <Error statusCode={404} description="No Diary Found 😨 You can create a Diary Log by visiting the Templates section" />;

  const handleWeekNoClick = () => (weekNo === programLog.noOfWeeks! ? setWeekNo(1) : setWeekNo(weekNo + 1));

  return (
    <CenterColumnFlex>
      <ProgramLogProvider
        programLog={programLog}
        setProgramLog={setProgramLog}
        programLogWeek={programLogWeek}
        setProgramLogWeek={setProgramLogWeek}
        contentDisabled={contentDisabled}>
        <PageHeader>{programLog.customName ?? programLog.templateName}</PageHeader>
        {contentDisabled ? <TextSm>You are viewing another persons diary</TextSm> : <QuoteDisplay />}
        {Object.keys(programLogWeek).length !== 0 ? <ProgramLogDayList logView={logView} /> : null}
        <ProgramLogTopBar
          templateName={programLog.customName! ?? programLog.templateName!}
          weekNo={weekNo}
          handleWeekNoClick={handleWeekNoClick}
          programLog={programLog}
          changeViewClick={handleViewChange}
        />
      </ProgramLogProvider>
    </CenterColumnFlex>
  );
};

export default ProgramLogIndexPage;

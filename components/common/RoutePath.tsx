import React from 'react';
import LiftingStatIndexPage from '../liftingStats';
import TemplateIndexPage from '../templatePrograms';
import TemplateProgramDetailed from '../templatePrograms/TemplateProgramDetailed';
import { Route, Switch } from 'react-router';
import ExerciseIndexPage from '../exercises';
import LoginForm from '../account/forms/LoginForm';
import AdminIndexPage from '../admin/index';
import ExerciseDetailed from '../exercises/ExerciseDetailed';
import LogHistoryIndexPage from '../logHistory/index';
import ProfileIndexPage from '../account/Profile';
import UsersIndexPage from '../users/index';
import LiftFeed from '../liftingStats/LiftFeed';
import LiftingStatDetailed from '../liftingStats/LiftingStatDetailed';
import LandingIndexPage from '../landing';
import { ADMIN_URL, USERS_URL, LOGHISTORY_URL, PERSONALBESTS_URL, PROFILE_URL, TEMPLATES_URL, WORKOUT_DIARY_URL } from '../util/InternalLinks';
import WorkoutIndexPage from '../workouts';
import WorkoutDay from '../workouts/workoutDay';

const RoutePath = () => (
  <Switch>
    <Route exact path="/" component={LandingIndexPage} />
    <Route path="/portal/stats" component={LiftFeed} />
    <Route exact path={PERSONALBESTS_URL} component={LiftingStatIndexPage} />
    <Route exact path={`${PERSONALBESTS_URL}/:exerciseId`} component={LiftingStatDetailed} />
    <Route exact path={`${WORKOUT_DIARY_URL}`} component={WorkoutIndexPage} />
    <Route exact path={`${WORKOUT_DIARY_URL}/:workoutDayId`} component={WorkoutDay} />
    <Route exact path={TEMPLATES_URL} component={TemplateIndexPage} />
    <Route exact path={`${TEMPLATES_URL}/:templateProgramId`} component={TemplateProgramDetailed} />
    {/*<Route path='/login' component={LoginIndexPage} />*/}
    <Route exact path="/portal/exercises" component={ExerciseIndexPage} />
    <Route exact path="/portal/exercises/:exerciseId" component={ExerciseDetailed} />
    <Route path="/portal/login" component={LoginForm} />
    <Route path={ADMIN_URL} component={AdminIndexPage} />
    <Route path={LOGHISTORY_URL} component={LogHistoryIndexPage} />
    <Route path={`${PROFILE_URL}/:userName`} component={ProfileIndexPage} />
    <Route path={USERS_URL} component={UsersIndexPage} />
    {/* <Redirect to={DIARY_URL} /> */}
  </Switch>
);

export default RoutePath;

import { createAppContainer, createStackNavigator } from 'react-navigation';

import Signin from '../pages/Signin';
import Main from '../pages/Main';
import Subject from '../pages/Subject';

const Routes = createAppContainer(
  createStackNavigator({
    Signin,
    Main,
    Subject,
  }),
);

export default Routes;

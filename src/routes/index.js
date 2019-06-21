import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { TouchableOpacity, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Main from '../pages/Main';
import Subject from '../pages/Subject';

const UnauthenticatedRoutes = createStackNavigator({
  Signin,
  Signup,
});

const AuthenticatedRoutes = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: ({ navigation }) => ({
      title: 'Minhas matérias',
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => {
            navigation.navigate('Signin');
          }}
        >
          <Icon
            name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      ),
    }),
  },
  Subject,
});

const Routes = createAppContainer(
  createStackNavigator(
    {
      UnauthenticatedRoutes,
      AuthenticatedRoutes,
    },
    {
      headerMode: 'none',
    },
  ),
);

export default Routes;

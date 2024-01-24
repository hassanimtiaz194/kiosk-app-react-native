import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import NavigationRoute, { StackOptions } from "./NavigationRoute"
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

const { AUTH_STACKS, APP_STACKS } = NavigationRoute

const ContainerStack = createStackNavigator();
const Stack = createNativeStackNavigator()

const containerOptionList = {
  headerShown: false,
  unmountOnBlur: false,
  swipeEnabled: true,
}
export const NavigationRoot = () => {
 
  /*React Function i.e AuthStackHandler
  -It control stack navigation implementation.
  -Need AUTH_STACKS[] array which contain screen_name,Component,
  */
  const AuthStackHandler = () => {
    return (
      <Stack.Navigator screenOptions={containerOptionList}>
        {(AUTH_STACKS || []).map((routeInfo, index) => (
          <Stack.Screen
            key={`AuthStack-Screen-key-${index}-${routeInfo.id}`}
            name={routeInfo.screen_name}
            component={routeInfo.component}
            options={routeInfo.options}
          />
        ))}
      </Stack.Navigator>
    )
  }

 
  /*React Function i.e AppStackHandler
   -It control stack navigation implementation.
   -Need AUTH_STACKS[] array which contain screen_name,Component,
   */
  const AppStackHandler = () => {
    return (
      <Stack.Navigator screenOptions={containerOptionList}>
        {(APP_STACKS || []).map((routeInfo, index) => {
          return (
            <Stack.Screen
              key={`AuthStack-Screen-key-${index}-${routeInfo.id}`}
              name={routeInfo.screen_name}
              component={routeInfo.component}
              options={routeInfo.options}
            />
          );
        })}
      </Stack.Navigator>
    )
  }
  /*React Function i.e RootStackHandler
  -It control Root stack navigation implementation.
  -Handle conditional rendering of stack,
  */
  const RootStackHandler = () => {

    return (
      <Stack.Navigator screenOptions={containerOptionList}>
        <Stack.Screen
            name="AppStack"
            component={AppStackHandler}
            options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };
  return (
    <ContainerStack.Navigator screenOptions={containerOptionList}>
      <ContainerStack.Screen
        name="INIT_APP"
        component={RootStackHandler}
      />
    </ContainerStack.Navigator>

  )

}

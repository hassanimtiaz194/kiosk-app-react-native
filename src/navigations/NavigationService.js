import { CommonActions,  } from "@react-navigation/native";
import React from "react";

export const _NavgationRef = React.createRef({});
export const NavigationActions = {

    common_actions: {
        navigate: (name = "", params = {}, navigation = _NavgationRef.current) => {
            navigation = _NavgationRef.current
            navigation.dispatch(
                CommonActions.navigate({
                    name,
                    params,
                })
            )
        },
        navigateStack: (name = "", params = {}, navigation = _NavgationRef.current, navigatorName = "AppStack",) => {
            navigation = _NavgationRef.current
            navigation.navigate(navigatorName, { screen: name, params });

        },
        goBack: (route = null, navigation = _NavgationRef.current) => {
            if (route) {
                // Need to test before use
                navigation.dispatch({
                    ...CommonActions.goBack(),
                    source: route.key,
                    target: route.target
                });
            } else navigation.dispatch(CommonActions.goBack());
        },
    },
}
/*Generic navigation function
-used to navigate to next screen
-params:name:string, params:object 
*/
export const goTo = (name = "", params = {}) => { NavigationActions.common_actions.navigate(name, params) };
export const goToAppStack = (name = "", params = {}) => { NavigationActions.common_actions.navigateStack(name, params) };


/*Generic navigation function
-used to navigate to back screen
*/
export const goBack = NavigationActions.common_actions.goBack; 

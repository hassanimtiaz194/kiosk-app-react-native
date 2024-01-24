import { StyleSheet } from "react-native";
export const navStyles = StyleSheet.create({

    barStyle: {
        backgroundColor: '#fff',
        height: 100,
        borderTopStartRadius: 24,
        borderTopEndRadius: 24,
        paddingBottom: 30,
        paddingTop: 15,
        elevation: 0,
        shadowOffset: {
            width: 10,
            height: -5
        },
        shadowRadius: 20,
        shadowOpacity: 1.0,
        shadowColor: 'rgba(0,0,0, 0.09)',
        borderColor: 'transparent',
        position: 'absolute',
        bottom: 0
    },
    tabBarLabelStyle: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
        // fontWeight: '500',
        lineHeight: 16

    },
    tabBarIconStyle: {
        height: 32
    },
});

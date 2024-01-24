import React from "react"
import { StyleSheet } from "react-native";
import Toast from 'react-native-toast-message';

const Toaster = ({ type = 'error', title = 'Error', message = 'Something went wrong', }) => {
    return (
        Toast.show({
            type,
            text1: title,
            text2: message,
            autoHide: true,
            visibilityTime: 2500,
            onShow: () => console.log("Toast Visible!!"),
            onPress: () => console.log("Toast Pressed!!"),
            onHide: () => console.log("Toast Hidden!!"),
            text1Style: {
                fontFamily: 'Inter-Medium',
                fontSize: 14,
                lineHeight: 16,
                color: "#0D0F11"
            },
            text2Style: {
                fontFamily: 'Inter-Regular',
                fontSize: 14,
                lineHeight: 20,
                color: "#373E44"
            },
        })
    )
}
export default Toaster;

const styles = StyleSheet.create({

})

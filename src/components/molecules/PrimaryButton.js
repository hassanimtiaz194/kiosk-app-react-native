import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import SharedStyles from "../../res/SharedStyles";
import { SvgXml } from "react-native-svg";

const PrimaryButton = ({
    text = '',
    leftIcon = '',
    iconColor = '',
    rightIcon = '',
    btnContainerStyl = {},
    textStyle = {},
    onPressHandler = () => { },// Provide a default empty function
    isDisabled = false,
    loading = false,
    loadingColor = '#fff',
}) => {
    return (
        <TouchableOpacity
        style={[SharedStyles.styles().primaryButton, btnContainerStyl, isDisabled ? { backgroundColor: '#CCCCCC', borderColor: '#CCCCCC', } : { backgroundColor: '#0374DD', borderColor: '#0374DD' }]} 
        onPress={onPressHandler} disabled={isDisabled}
        Í>
            {leftIcon && <SvgXml xml={leftIcon} />}
            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={[SharedStyles.styles().primaryButtonTextLarge, textStyle]}>{text}</Text>}
            {rightIcon && <SvgXml xml={rightIcon} />}
        </TouchableOpacity>
    );
}
export default PrimaryButton;
const styles = StyleSheet.create({});

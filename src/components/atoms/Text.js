import React from "react"
import { ActivityIndicator, Text } from "react-native"

const CustomText = ({ color = {}, tittle = '', numberOfLines = 1, customStyle = {}, onPress = () => { }, loading = false, ellipsizeMode = undefined }) => {
    const colors = color;
    return (
        <>
            <Text numberOfLines={numberOfLines} style={[customStyle]} ellipsizeMode={ellipsizeMode}>
                {tittle}
                {loading && <ActivityIndicator size="small" style={{ marginLeft: 8 }} />}
            </Text>
        </>
    );
};

export default CustomText;

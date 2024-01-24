import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import SharedStyles from "../../res/SharedStyles";
import { goBack } from "../../navigations/NavigationService";
import { SvgXml } from "react-native-svg";
import sharedStyles from "../../res/SharedStyles";
import svgs from "../../assets/svgs";
import CustomText from "../atoms/Text";


const CustomFooter = () => {
    const left = () => {
        return (
            <TouchableOpacity onPress={() => { }} style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter, SharedStyles.styles().gap12]}>
                <SvgXml xml={svgs.phoneIcon()} />
                <CustomText
                    tittle={'---------'}
                    customStyle={SharedStyles.styles().primaryText_L}
                />
            </TouchableOpacity>
        )
    }
    const right = () => {

        return (
            <TouchableOpacity onPress={() => { }} style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter, SharedStyles.styles().gap12]}>
                <SvgXml xml={svgs.webIcon()} />
                <CustomText
                    tittle={'www.google.com'}
                    customStyle={[SharedStyles.styles().linkText_L, { fontFamily: 'Inter-Regular' }]}
                />
            </TouchableOpacity>
        )
    }
    return (
        <View style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween, SharedStyles.styles().p32]}>
            {left()}
            {/* {right()} */}
        </View>
    );
}

export default CustomFooter;


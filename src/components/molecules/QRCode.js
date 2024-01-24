import React from "react";
import {TouchableOpacity, View} from "react-native";
import SharedStyles from "../../res/SharedStyles";
import {SvgXml} from "react-native-svg";
import sharedStyles from "../../res/SharedStyles";
import svgs from "../../assets/svgs";
import CustomText from "../atoms/Text";
import {goToAppStack} from "../../navigations/NavigationService";
import routeNames from "../../navigations/route-names";


const QRCode = () => {
    return (
        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap40, sharedStyles.styles().alignCenter, SharedStyles.styles().justifyCenter]}>
            <SvgXml xml={svgs.qrCodeIcon()}/>
            <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap24, sharedStyles.styles().alignCenter]}>
                <View style={{height: 1, backgroundColor: '#D0D6DD', width: 64}}></View>
                <CustomText
                    tittle={'OR'}
                    customStyle={[SharedStyles.styles().tertiaryText_XS]}
                />
                <View style={{height: 1, backgroundColor: '#D0D6DD', width: 64}}></View>
            </View>
            <TouchableOpacity onPress={() => {goToAppStack(routeNames.SendSMSScreen)}} style={[SharedStyles.styles().touchableBox, {paddingHorizontal: 24}]}>
                <CustomText
                    tittle={'Send SMS with link'}
                    customStyle={SharedStyles.styles().tertiaryButtonTextLarge}
                />
            </TouchableOpacity>
        </View>
    );
}

export default QRCode;


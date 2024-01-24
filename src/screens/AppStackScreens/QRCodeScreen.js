import React from "react"
import SharedStyles from "../../res/SharedStyles";
import {SafeAreaView, View, ScrollView, Pressable} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../components/atoms/Text";
import CustomHeader from "../../components/molecules/CustomHeader";
import sharedStyles from "../../res/SharedStyles";
import {goToAppStack} from "../../navigations/NavigationService";
import {SvgXml} from "react-native-svg";
import svgs from "../../assets/svgs";
import routeNames from "../../navigations/route-names";
import QRCode from "../../components/molecules/QRCode";

const QRCodeScreen = () => {
    return (
        <SafeAreaView style={[SharedStyles.styles().flex1]}>
            <LinearGradient colors={['#F5FAFF', '#fff']}
                            start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                            style={SharedStyles.styles().flex1}>
                <CustomHeader redirectIn={'30 sec'}/>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={SharedStyles.styles().flex1}>
                    <View style={[SharedStyles.styles().selfCenter, sharedStyles.styles().alignCenter, SharedStyles.styles().justifyCenter]}>
                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap80]}>
                            <CustomText
                                tittle={'Scan the QR code below \n' + 'to download the app'}
                                numberOfLines={3}
                                customStyle={[SharedStyles.styles().titleText, SharedStyles.styles().textCenter]}
                            />
                            <QRCode/>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default QRCodeScreen

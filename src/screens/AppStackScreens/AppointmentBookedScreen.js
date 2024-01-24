import React from "react"
import SharedStyles from "../../res/SharedStyles";
import {SafeAreaView, View, ScrollView} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../components/atoms/Text";
import CustomHeader from "../../components/molecules/CustomHeader";
import sharedStyles from "../../res/SharedStyles";
import {goToAppStack} from "../../navigations/NavigationService";
import routeNames from "../../navigations/route-names";
import {SvgXml} from "react-native-svg";
import svgs from "../../assets/svgs";
import BookedApptInfo from "../../components/molecules/BookedApptInfo";
import QRCode from "../../components/molecules/QRCode";

const AppointmentBookedScreen = () => {
    return (
        <SafeAreaView style={[SharedStyles.styles().flex1]}>
            <LinearGradient colors={['#F5FAFF', '#fff']}
                            start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                            style={SharedStyles.styles().flex1}>
                <CustomHeader redirectIn={'4 min 30 sec'}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[SharedStyles.styles().selfCenter, {paddingVertical: 64}]}>
                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap64]}>
                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24, SharedStyles.styles().alignCenter]}>
                                <SvgXml width={80} height={80} xml={svgs.checkFillIcon()} />
                                <CustomText
                                    tittle={'Appointment booked '}
                                    numberOfLines={3}
                                    customStyle={[SharedStyles.styles().titleText, SharedStyles.styles().textCenter]}
                                />
                            </View>
                            <BookedApptInfo/>
                           {/*  <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24, SharedStyles.styles().alignCenter]}>
                                <CustomText
                                    tittle={'Download the app'}
                                    customStyle={[SharedStyles.styles().primaryText_XL, SharedStyles.styles().textCenter]}
                                />
                                <QRCode/>
                            </View> */}
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default AppointmentBookedScreen

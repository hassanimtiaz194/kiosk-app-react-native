import React from "react"
import SharedStyles from "../../res/SharedStyles";
import {SafeAreaView, View, ScrollView, TextInput} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../components/atoms/Text";
import CustomHeader from "../../components/molecules/CustomHeader";
import sharedStyles from "../../res/SharedStyles";
import {goToAppStack} from "../../navigations/NavigationService";
import routeNames from "../../navigations/route-names";
import PrimaryButton from "../../components/molecules/PrimaryButton";

const SendSMSScreen = () => {
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
                                tittle={'Send SMS with a link'}
                                numberOfLines={3}
                                customStyle={[SharedStyles.styles().titleText, SharedStyles.styles().textCenter]}
                            />
                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap40]}>
                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap16]}>
                                    <CustomText
                                        tittle={'Your phone number'}
                                        customStyle={SharedStyles.styles().primaryText_M}
                                    />
                                    <TextInput
                                        style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                        maxLength={20}
                                        inputMode={'numeric'}
                                        keyboardType={'number-pad'}
                                        value={'(316) 555-0116'}
                                    />
                                </View>
                                <PrimaryButton
                                    text={'Send link'}
                                    onPressHandler={() => {
                                        goToAppStack(routeNames.HomeScreen)
                                    }}/>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default SendSMSScreen

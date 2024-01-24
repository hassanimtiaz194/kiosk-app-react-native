import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { SafeAreaView, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import SharedStyles from "../../res/SharedStyles";
import LinearGradient from "react-native-linear-gradient";
import sharedStyles from "../../res/SharedStyles";
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";
import CustomText from "../../components/atoms/Text";
import CustomFooter from "../../components/molecules/CustomFooter";
import { goToAppStack } from "../../navigations/NavigationService";
import routeNames from "../../navigations/route-names";
import { appointmentActions } from "../../redux/modules/appointment/actions";
import { settingsActions } from "../../redux/modules/settings/actions";
import { getAccessCode, getSettings } from "../../constants/appSettings";


const HomeScreen = () => {
    const dispatch = useDispatch();
    const [accessCode, setAccessCode] = useState(null);
    const [localData, setlocalData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const retrievedData = await getSettings();
                setlocalData(retrievedData);
                const retrievedAccessCode = await getAccessCode();
                setAccessCode(retrievedAccessCode);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        dispatch(settingsActions.fetchStates());
    }, []);

    useEffect(() => {
        if (localData?.state) {
            dispatch(settingsActions.storeApplicationSettings(localData));
        }
        if (accessCode) {
            dispatch(settingsActions.storeAccessCode(accessCode?.accessCode));
        }
    }, [localData, accessCode]);

    return (
        <SafeAreaView style={[SharedStyles.styles().flex1]}>
            <LinearGradient colors={['#F5FAFF', '#fff']}
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                style={SharedStyles.styles().flex1}>
                <View style={[SharedStyles.styles().justifyEnd, SharedStyles.styles().alignEnd, SharedStyles.styles().pt32, SharedStyles.styles().pr32]}>
                    <TouchableOpacity onPress={() => {
                        dispatch(appointmentActions.isBookAppointment(false));
                        goToAppStack(routeNames.AccessSettingScreen);
                    }} style={[sharedStyles.styles().settingIconBox]}>
                        <SvgXml xml={svgs.settingIcon()} />
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={SharedStyles.styles().flex1}>
                    <View style={[SharedStyles.styles().selfCenter, sharedStyles.styles().alignCenter, SharedStyles.styles().justifyCenter]}>
                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap56]}>
                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap40, sharedStyles.styles().alignCenter, SharedStyles.styles().justifyCenter]}  >
                                <SvgXml xml={svgs.alfieIcon()} />
                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap16, sharedStyles.styles().alignCenter, SharedStyles.styles().justifyCenter]}>
                                    <CustomText
                                        tittle={'Welcome to\n Kiosk Demo App'}
                                        numberOfLines={3}
                                        customStyle={[SharedStyles.styles().titleText, SharedStyles.styles().textCenter]}
                                    />
                                    <CustomText
                                        tittle={'Get access to your behavioral health care team.'}
                                        numberOfLines={3}
                                        customStyle={[SharedStyles.styles().tertiaryText_L, SharedStyles.styles().textCenter]}
                                    />
                                </View>
                            </View>
                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap16, { paddingHorizontal: 97 }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(appointmentActions.isBookAppointment(true));
                                        goToAppStack(routeNames.PaymentTypeScreen);
                                    }}
                                    style={[SharedStyles.styles().touchableBox]}
                                >
                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().alignCenter]}>
                                        <SvgXml xml={svgs.bookAppointmentIcon()} />
                                        <CustomText
                                            tittle={'Book appointment'}
                                            customStyle={SharedStyles.styles().primaryText_L}
                                        />
                                    </View>
                                </TouchableOpacity>
                                {/*  <TouchableOpacity
                                    onPress={() => {
                                        dispatch(appointmentActions.isBookAppointment(false));
                                        goToAppStack(routeNames.QRCodeScreen);
                                    }}
                                    style={[SharedStyles.styles().touchableBox]}
                                >
                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().alignCenter]}>
                                        <SvgXml xml={svgs.downloadAppIcon()} />
                                        <CustomText
                                            tittle={'Download app'}
                                            customStyle={SharedStyles.styles().primaryText_L}
                                        />
                                    </View>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <CustomFooter />
            </LinearGradient>
        </SafeAreaView>
    )
}
export default HomeScreen


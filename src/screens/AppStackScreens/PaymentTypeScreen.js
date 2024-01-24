import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SharedStyles from "../../res/SharedStyles";
import { SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../components/atoms/Text";
import CustomHeader from "../../components/molecules/CustomHeader";
import sharedStyles from "../../res/SharedStyles";
import { goToAppStack } from "../../navigations/NavigationService";
import routeNames from "../../navigations/route-names";
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";
import { appointmentActions } from "../../redux/modules/appointment/actions";
import { paymentType } from "../../constants/commonTypes";

const PaymentTypeScreen = () => {
    const dispatch = useDispatch();
    const { appSettings } = useSelector(state => state.settings);
    const { allStateActiveInsurance} = useSelector((state) => state.appointment);
    const insuranceData = allStateActiveInsurance.filter(item => !appSettings?.insurance?.includes(item?.name));

    useEffect(() => {
        const payload = {
            initial: true,
            state: appSettings?.state
        };
        dispatch(appointmentActions.fetchAllProviderServices(payload));
        dispatch(appointmentActions.fetchInsurance({ stateName: appSettings?.state }));
    }, []);

    return (
        <SafeAreaView style={[SharedStyles.styles().flex1]}>
            <LinearGradient colors={['#F5FAFF', '#fff']}
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                style={SharedStyles.styles().flex1}>
                <CustomHeader redirectIn={'4 min 30 sec'} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[SharedStyles.styles().selfCenter, { paddingVertical: 80 }]}>
                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap80]}>
                            <CustomText
                                tittle={'How would you like to pay?'}
                                numberOfLines={3}
                                customStyle={[SharedStyles.styles().titleText, SharedStyles.styles().textCenter]}
                            />
                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                                {!appSettings?.isMemberScreenSkipped && allStateActiveInsurance.length !==0 && insuranceData?.length !== 0 && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            dispatch(appointmentActions.selectedPaymentType(paymentType.insurance));
                                            goToAppStack(routeNames.InsuranceTypeScreen);
                                        }}
                                        style={[SharedStyles.styles().cardWrapper, SharedStyles.styles().py40, SharedStyles.styles().px24]}
                                    >
                                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap16, sharedStyles.styles().alignCenter,]}>
                                            <SvgXml xml={svgs.insuranceIcon()} />
                                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8, SharedStyles.styles().px24]}>
                                                <CustomText
                                                    tittle={'Use insurance'}
                                                    numberOfLines={3}
                                                    customStyle={[SharedStyles.styles().primaryText_L, SharedStyles.styles().textCenter]}
                                                />
                                                <CustomText
                                                    tittle={'Our services are fully covered or accessible with a co-pay for many of our insurance partners.'}
                                                    numberOfLines={5}
                                                    customStyle={[SharedStyles.styles().tertiaryText_L, SharedStyles.styles().textCenter]}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(appointmentActions.selectedPaymentType(paymentType.cash));
                                        dispatch(appointmentActions.selectedInsuranceDetails({
                                            memberId: null,
                                            firstName: null,
                                            lastName: null,
                                            dob: null,
                                        }));
                                        goToAppStack(routeNames.AppointmentTypeScreen);
                                    }}
                                    style={[SharedStyles.styles().cardWrapper, SharedStyles.styles().py40, SharedStyles.styles().px24]}
                                >
                                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap16, sharedStyles.styles().alignCenter,]}>
                                        <SvgXml xml={svgs.cashIcon()} />
                                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8, SharedStyles.styles().px24]}>
                                            <CustomText
                                                tittle={'Pay cash'}
                                                numberOfLines={3}
                                                customStyle={[SharedStyles.styles().primaryText_L, SharedStyles.styles().textCenter]}
                                            />
                                            <CustomText
                                                tittle={'A fast, affordable, and highly private way to pay. Access providers with transparent up-front pricing.'}
                                                numberOfLines={5}
                                                customStyle={[SharedStyles.styles().tertiaryText_L, SharedStyles.styles().textCenter]}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default PaymentTypeScreen

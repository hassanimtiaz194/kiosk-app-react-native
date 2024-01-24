import React, { useEffect, useState } from "react"
import dayjs from './../../utils/daysjs';
import { useSelector, useDispatch } from 'react-redux';
import SharedStyles from "../../res/SharedStyles";
import { SafeAreaView, View, ScrollView, TextInput, Image, KeyboardAvoidingView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../components/atoms/Text";
import CustomHeader from "../../components/molecules/CustomHeader";
import sharedStyles from "../../res/SharedStyles";
import { goToAppStack } from "../../navigations/NavigationService";
import routeNames from "../../navigations/route-names";
import PrimaryButton from "../../components/molecules/PrimaryButton";
import BookedApptInfo from "../../components/molecules/BookedApptInfo";
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";
import { Dropdown } from "react-native-element-dropdown";
import {
    CardField,
    useStripe,
} from '@stripe/stripe-react-native';
import { settingsActions } from "../../redux/modules/settings/actions";
import { getUserTimeZone } from "../../constants/commonFunctions";
import { publicBookAppointment } from "../../services/appointment/appointment.service";
import { SvgUri } from 'react-native-svg';
import Toaster from "../../components/molecules/Toaster";
import { DismissKeyboard } from "./PersonalInfoScreen";

const renderItem = item => {
    return (
        <CustomText
            tittle={item.label}
            customStyle={[SharedStyles.styles().primaryText_XS, SharedStyles.styles().p16]}
        />
    );
};

const ConfirmPayScreen = () => {
    const { paymentType, appointmentDetails } = useSelector(state => state.appointment);
    const { createPaymentMethod, confirmPayment, createToken } = useStripe();
    const dispatch = useDispatch();
    const [cardDetails, setCardDetails] = useState(null);
    const [zipCode, setZipCode] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isScheduling, setIsScheduling] = useState(false);

    useEffect(() => {
        dispatch(settingsActions.resetTimer(true));
    }, []);

    const onContinue = async () => {
        setIsScheduling(true);
        try {
            const { token, error } = await createToken({
                type: 'Card',
                billingDetails: { email: appointmentDetails?.memberDetails?.email }
            });
            if (error && error?.message && cardDetails) {
                const message = error.message || 'Something went wrong';
                Toaster({ type: 'error', title: 'Error', message: message || 'Something went wrong. Please try again.' });
                setIsScheduling(false);
                return;
            }

            if ((!token || !token?.id || !token?.card?.id) && cardDetails) {
                setIsScheduling(false);
                return;
            }
            const payload = {
                appointmentRequest: {
                    primaryConcern: 'Attempt',
                    providerId: appointmentDetails?.provider?.actor,
                    serviceId: appointmentDetails?.service?.serviceId,
                    startTime: appointmentDetails?.timeSlot?.startTime,
                    timeZone: getUserTimeZone(),
                },
                dob: dayjs(appointmentDetails?.memberDetails?.dob, 'MM/DD/YYYY').format('YYYY-MM-DD'),
                email: appointmentDetails?.memberDetails?.email,
                firstName: appointmentDetails?.memberDetails?.firstName,
                preferredName: appointmentDetails?.memberDetails?.preferredName,
                gender: appointmentDetails?.memberDetails?.gender,
                lastName: appointmentDetails?.memberDetails?.lastName,
                phoneNumber: appointmentDetails?.memberDetails?.cellPhone,
                state: appointmentDetails?.memberDetails?.state,
                city: appointmentDetails?.memberDetails?.city,
                zipCode: appointmentDetails?.memberDetails?.zipCode,
                address1: appointmentDetails?.memberDetails?.address1,
                address2: appointmentDetails?.memberDetails?.address2,
                type: 'PATIENT',
                paymentMethod: paymentType.toLowerCase(),
                insuranceCoverage:
                    paymentType === 'CASH'
                        ? null
                        : {
                            carrier: appointmentDetails?.insurance?._id,
                            memberId: appointmentDetails?.insuranceDetails?.memberId,
                            firstName: appointmentDetails?.insuranceDetails?.firstName,
                            lastName: appointmentDetails?.insuranceDetails?.lastName,
                            dob: dayjs(appointmentDetails?.insuranceDetails?.dob, 'MM/DD/YYYY').format('YYYY-MM-DD'),
                            primaryInsured: appointmentDetails?.insuranceDetails?.isPrimaryInsured,
                        },
                cardRequest: {
                    cardId: !cardDetails ? '' : token?.card?.id,
                    cardTokenId: !cardDetails ? 'insurance' : token?.id,
                    amountPaid: appointmentDetails?.service?.serviceDetails?.cost,
                },
            };
            console.log(payload);
            publicBookAppointment(payload)
                .then(() => {
                    goToAppStack(routeNames.AppointmentBookedScreen);
                    setIsScheduling(false);
                })
                .catch(err => {
                    const message = err.data.errors?.[0]?.endUserMessage || 'Something went wrong';
                    Toaster({ type: 'error', title: 'Error', message: message || 'Something went wrong. Please try again.' });
                    setIsScheduling(false);
                });
        } catch (e) {

        }
    };

    const handleZipNumber = (text) => {
        const formattedText = text?.replace(/[^0-9]/g, '');
        setZipCode(formattedText);
    };

    useEffect(() => {
        if (paymentType === "CASH" || !appointmentDetails?.insurance?.isCreditCardOptional || appointmentDetails?.insurance?.isCreditCardOptional === undefined) {
            if (!cardDetails || !cardDetails?.complete || zipCode?.trim() === '') {
                setIsDisabled(true);
            } else {
                setIsDisabled(false);
            }
        }
        if (paymentType !== "CASH" && appointmentDetails?.insurance?.isCreditCardOptional) {
            setIsDisabled(false);
        }
    }, [cardDetails, zipCode])

    useEffect(() => {
        if (appointmentDetails?.memberDetails) {
            setZipCode(appointmentDetails?.memberDetails?.zipCode);
        }
    }, [appointmentDetails?.memberDetails])

    return (
        <SafeAreaView style={[SharedStyles.styles().flex1]}>
            <LinearGradient colors={['#F5FAFF', '#fff']}
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                style={SharedStyles.styles().flex1}>
                <CustomHeader redirectIn={'4 min 30 sec'} />
                <KeyboardAvoidingView style={SharedStyles.styles().flex1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <DismissKeyboard>
                            <View style={[SharedStyles.styles().selfCenter, { paddingVertical: 64 }]}>
                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap64]}>
                                    <CustomText
                                        tittle={'Confirm & pay '}
                                        numberOfLines={3}
                                        customStyle={[SharedStyles.styles().titleText, SharedStyles.styles().textCenter]}
                                    />
                                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap48]}>
                                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap40]}>
                                            {paymentType !== 'CASH' && (
                                                <View style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter]}>
                                                    <View style={{ width: '100%' }}>
                                                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                                            <CustomText
                                                                tittle={'Insurance'}
                                                                customStyle={SharedStyles.styles().primaryText_XS}
                                                            />
                                                            <View style={{ backgroundColor: '#F5FAFF', borderWidth: 1, borderColor: '#0374dd', borderRadius: 6, padding: 24, display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignContent: 'center' }}>
                                                                <View style={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
                                                                    <View>
                                                                        <CustomText
                                                                            tittle={`${appointmentDetails?.insuranceDetails.firstName} ${appointmentDetails?.insuranceDetails.lastName}`}
                                                                            customStyle={SharedStyles.styles().primaryText_XS}
                                                                        />
                                                                        <CustomText
                                                                            tittle={appointmentDetails?.insuranceDetails?.memberId}
                                                                            customStyle={SharedStyles.styles().primaryText_XS}
                                                                        />
                                                                    </View>
                                                                </View>
                                                                <View style={{ width: '40%', display: 'flex', alignItems: 'flex-end' }}>
                                                                    {appointmentDetails?.insurance?.image ? (
                                                                        <>
                                                                            {appointmentDetails?.insurance?.image.endsWith(".svg") ? (
                                                                                <SvgUri
                                                                                    width={40}
                                                                                    height={40}
                                                                                    uri={appointmentDetails?.insurance?.image}
                                                                                />
                                                                            ) : (
                                                                                <Image
                                                                                    source={{ uri: appointmentDetails?.insurance?.image }}
                                                                                    style={{ width: 190, height: 35 }}
                                                                                    alt={appointmentDetails?.insurance?.name}
                                                                                />
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <CustomText
                                                                            tittle={appointmentDetails?.insurance?.name}
                                                                            customStyle={[SharedStyles.styles().primaryText_L]}
                                                                        />
                                                                    )
                                                                    }
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            )}
                                            {(paymentType === 'CASH' || !appointmentDetails?.insurance?.isCreditCardOptional || appointmentDetails.insurance.isCreditCardOptional === undefined) && (
                                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween]}>
                                                        <View /* style={{ width: '66.66%', paddingRight: 12 }} */>
                                                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                                                <CustomText
                                                                    tittle={'Card Information'}
                                                                    customStyle={SharedStyles.styles().primaryText_XS}
                                                                />
                                                                <View style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().hStack, SharedStyles.styles().gap8, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween]}>
                                                                    <CardField
                                                                        postalCodeEnabled={false}
                                                                        placeholder={{
                                                                            number: '4242 4242 4242 4242',
                                                                        }}
                                                                        cardStyle={{
                                                                            backgroundColor: '#FFFFFF',
                                                                            textColor: '#000000',
                                                                        }}
                                                                        style={{
                                                                            width: '100%',
                                                                            height: 50,
                                                                            marginVertical: 30,
                                                                        }}
                                                                        onCardChange={(cardDetails) => {
                                                                            console.log('cardDetails', cardDetails);
                                                                            setCardDetails(cardDetails);
                                                                        }}
                                                                        onS
                                                                        onFocus={(focusedField) => {
                                                                            console.log('focusField', focusedField);
                                                                        }}
                                                                    />
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween]}>
                                                        <View style={{ width: '100%' }}>
                                                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                                                <CustomText
                                                                    tittle={'Zip code'}
                                                                    customStyle={SharedStyles.styles().primaryText_XS}
                                                                />
                                                                <TextInput
                                                                    style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                                                    maxLength={20}
                                                                    placeholder="35624"
                                                                    value={zipCode}
                                                                    keyboardType="numeric"
                                                                    onChangeText={handleZipNumber}
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            )}
                                            <PrimaryButton
                                                isDisabled={isDisabled || isScheduling}
                                                text={isScheduling ? 'Please Wait...' : `Schedule for $${appointmentDetails.service.serviceDetails.cost}`}
                                                onPressHandler={() => {
                                                    onContinue()
                                                }} />
                                        </View>
                                        <CustomText
                                            tittle={'We will send a text and an email confirming your appointment.'}
                                            numberOfLines={2}
                                            customStyle={[SharedStyles.styles().primaryText_M, SharedStyles.styles().textCenter]}
                                        />
                                        <BookedApptInfo />
                                    </View>
                                </View>
                            </View>
                        </DismissKeyboard>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default ConfirmPayScreen

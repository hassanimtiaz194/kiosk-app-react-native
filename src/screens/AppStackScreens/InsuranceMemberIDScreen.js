import React, { useEffect, useState } from "react"
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux'
import SharedStyles from "../../res/SharedStyles";
import { SafeAreaView, View, ScrollView, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../components/atoms/Text";
import CustomHeader from "../../components/molecules/CustomHeader";
import sharedStyles from "../../res/SharedStyles";
import { goToAppStack } from "../../navigations/NavigationService";
import routeNames from "../../navigations/route-names";
import PrimaryButton from "../../components/molecules/PrimaryButton";
import { Dropdown } from "react-native-element-dropdown";
import { appointmentActions } from "../../redux/modules/appointment/actions";
import { paymentType } from "../../constants/commonTypes";
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";

const renderItem = item => {
    return (
        <CustomText
            tittle={item.label}
            customStyle={[SharedStyles.styles().primaryText_XS, SharedStyles.styles().p16]}
        />
    );
};

const InsuranceMemberIDScreen = () => {
    const dispatch = useDispatch();
    const { appointmentDetails } = useSelector((state) => state.appointment);
    const [formData, setFormData] = useState({
        memberId: '',
        firstName: '',
        lastName: '',
        isPrimaryInsured: false,
        selectedMonth: -1,
        selectedDay: -1,
        selectedYear: 1980,
    })
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleMonthChange = e => {
        const month = parseInt(e.value, 10);
        setFormData({ ...formData, selectedMonth: month });
        setDaysInMonth(updateDaysInMonth(formData.selectedYear, month));
    };

    const handleYearChange = e => {
        const year = parseInt(e.value, 10);
        setFormData({ ...formData, selectedYear: year })
        setDaysInMonth(updateDaysInMonth(year, formData.selectedMonth));
    };

    const handleDayChange = e => {
        setFormData({ ...formData, selectedDay: parseInt(e.value, 10) })
    };

    const updateDaysInMonth = (year, month) => {
        const monthString = month < 10 ? '0' + month : month;
        const days = dayjs(`${year}-${monthString}`, 'YYYY-MM').daysInMonth();
        return Array.from({ length: days }, (_, i) => i + 1);
    };

    const months = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        return { label: month, value: month };
    });

    const years = Array.from({ length: dayjs().year() - 1949 }, (_, i) => {
        const year = dayjs().year() - i;
        return { label: year, value: year };
    });

    const onContinue = () => {
        if (formData.memberId?.trim() === '' ||
            formData.firstName?.trim() === '' ||
            formData.lastName?.trim() === '' ||
            formData.selectedDay === -1 ||
            formData.selectedMonth === -1) return;
        const formattedMonth = String(formData.selectedMonth).padStart(2, '0');
        const formattedDay = String(formData.selectedDay).padStart(2, '0');
        const dob = `${formattedMonth}/${formattedDay}/${formData.selectedYear}`;
        dispatch(appointmentActions.selectedPaymentType(paymentType.insurance));
        dispatch(appointmentActions.selectedInsuranceDetails({
            memberId: formData.memberId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            isPrimaryInsured: formData.isPrimaryInsured,
            dob,
        }));
        goToAppStack(routeNames.ConsentScreen);
    };

    useEffect(() => {
        if (formData.memberId?.trim() === '' ||
            formData.firstName?.trim() === '' ||
            formData.lastName?.trim() === '' ||
            formData.selectedDay === -1 ||
            formData.selectedMonth === -1) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false);
        }
    }, [formData]);


    useEffect(() => {
        if (appointmentDetails.memberDetails) {
            const splitDoB = appointmentDetails.memberDetails.dob.split('/');
            setDaysInMonth(updateDaysInMonth(parseInt(splitDoB[2], 10), parseInt(splitDoB[0], 10)));
            setFormData({
                ...formData,
                firstName: appointmentDetails.memberDetails.firstName,
                lastName: appointmentDetails.memberDetails.lastName,
                selectedMonth: parseInt(splitDoB[0], 10),
                selectedYear: parseInt(splitDoB[2], 10),
                selectedDay: parseInt(splitDoB[1], 10),

            })
        }
    }, [appointmentDetails.memberDetails]);

    return (
        <SafeAreaView style={[SharedStyles.styles().flex1]}>
            <LinearGradient colors={['#F5FAFF', '#fff']}
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                style={SharedStyles.styles().flex1}>
                <CustomHeader redirectIn={'4 min 30 sec'} />
                <KeyboardAvoidingView style={SharedStyles.styles().flex1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={[SharedStyles.styles().selfCenter, { paddingVertical: 64 }]}>
                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap80]}>
                                <CustomText
                                    tittle={`What is your ${appointmentDetails.insurance.name}\n member ID`}
                                    numberOfLines={3}
                                    customStyle={[SharedStyles.styles().titleText, SharedStyles.styles().textCenter]}
                                />
                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap40, { paddingHorizontal: 46 }]}>
                                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                            <CustomText
                                                tittle={'Member ID'}
                                                customStyle={SharedStyles.styles().primaryText_XS}
                                            />
                                            <TextInput
                                                value={formData.memberId}
                                                onChangeText={(text) => setFormData({ ...formData, memberId: text })}
                                                style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                                maxLength={20}
                                                placeholder="ZGN238423948"
                                                placeholderStyle={SharedStyles.styles().inputWrapperRegularText}
                                            />
                                        </View>
                                        <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap8, { alignItems: 'center' }]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setFormData({ ...formData, isPrimaryInsured: !formData.isPrimaryInsured })
                                                }}
                                                style={styles.unChecked}
                                            >
                                                {formData.isPrimaryInsured && <SvgXml xml={svgs.checkBoxTickIcon()} />}
                                            </TouchableOpacity>
                                            <CustomText
                                                tittle={' I am primary insured'}
                                                customStyle={{
                                                    fontFamily: 'Inter-Regular',
                                                    fontSize: 14,
                                                    fontWeight: 400,
                                                    lineHeight: 16,
                                                    paddingTop: 2,
                                                }}
                                            />
                                        </View>
                                        <View style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween]}>
                                            <View style={{ width: '50%', paddingRight: 12 }}>
                                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                                    <CustomText
                                                        tittle={'First Name'}
                                                        customStyle={SharedStyles.styles().primaryText_XS}
                                                    />
                                                    <TextInput
                                                        value={formData.firstName}
                                                        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                                                        style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                                        maxLength={20}
                                                        placeholder="Jonathan"
                                                        placeholderStyle={SharedStyles.styles().inputWrapperRegularText}
                                                    />
                                                </View>
                                            </View>
                                            <View style={{ width: '50%', paddingLeft: 12 }}>
                                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                                    <CustomText
                                                        tittle={'Last Name'}
                                                        customStyle={SharedStyles.styles().primaryText_XS}
                                                    />
                                                    <TextInput
                                                        value={formData.lastName}
                                                        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                                                        style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                                        maxLength={20}
                                                        placeholder="Read"
                                                        placeholderStyle={SharedStyles.styles().inputWrapperRegularText}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween]}>
                                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                                <CustomText
                                                    tittle={'Date of birth'}
                                                    customStyle={SharedStyles.styles().primaryText_XS}
                                                />
                                                <View style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween]}>
                                                    <View style={{ width: '33.33%', paddingRight: 12 }}>
                                                        <Dropdown
                                                            style={SharedStyles.styles().inputWrapperLarge}
                                                            placeholderStyle={SharedStyles.styles().inputWrapperRegularText}
                                                            selectedTextStyle={SharedStyles.styles().inputWrapperRegularText}
                                                            inputSearchStyle={SharedStyles.styles().dropdownInputSearchStyle}
                                                            iconStyle={SharedStyles.styles().dropDownIconStyle}
                                                            data={months}
                                                            maxHeight={300}
                                                            labelField="label"
                                                            valueField="value"
                                                            placeholder="Month"
                                                            value={formData.selectedMonth > 0 ? formData.selectedMonth : ''}
                                                            onChange={handleMonthChange}
                                                            renderItem={renderItem}
                                                        />
                                                    </View>
                                                    <View style={{ width: '33.33%', paddingLeft: 12, paddingRight: 12 }}>
                                                        <Dropdown
                                                            style={SharedStyles.styles().inputWrapperLarge}
                                                            placeholderStyle={SharedStyles.styles().inputWrapperRegularText}
                                                            selectedTextStyle={SharedStyles.styles().inputWrapperRegularText}
                                                            inputSearchStyle={SharedStyles.styles().dropdownInputSearchStyle}
                                                            iconStyle={SharedStyles.styles().dropDownIconStyle}
                                                            data={daysInMonth.map(day => ({ label: day.toString(), value: day }))}
                                                            maxHeight={300}
                                                            labelField="label"
                                                            valueField="value"
                                                            placeholder="Day"
                                                            value={formData.selectedDay > 0 ? formData.selectedDay : ''}
                                                            onChange={handleDayChange}
                                                            renderItem={renderItem}
                                                        />
                                                    </View>
                                                    <View style={{ width: '33.33%', paddingLeft: 12 }}>
                                                        <Dropdown
                                                            style={SharedStyles.styles().inputWrapperLarge}
                                                            placeholderStyle={SharedStyles.styles().inputWrapperRegularText}
                                                            selectedTextStyle={SharedStyles.styles().inputWrapperRegularText}
                                                            inputSearchStyle={SharedStyles.styles().dropdownInputSearchStyle}
                                                            iconStyle={SharedStyles.styles().dropDownIconStyle}
                                                            data={years}
                                                            maxHeight={300}
                                                            labelField="label"
                                                            valueField="value"
                                                            placeholder="Year"
                                                            value={formData.selectedYear > 0 ? formData.selectedYear : 1980}
                                                            onChange={handleYearChange}
                                                            renderItem={renderItem}
                                                        />
                                                    </View>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap32, SharedStyles.styles().alignCenter]}>
                                        <PrimaryButton
                                            text={'Continue'}
                                            isDisabled={isDisabled}
                                            onPressHandler={() => {
                                                onContinue();
                                            }} />
                                        <TouchableOpacity
                                            onPress={() => {
                                                dispatch(appointmentActions.selectedPaymentType(paymentType.cash));
                                                dispatch(appointmentActions.selectedInsuranceDetails({
                                                    memberId: null,
                                                    firstName: null,
                                                    lastName: null,
                                                    dob: null,
                                                }));
                                                goToAppStack(routeNames.ConsentScreen);
                                            }}>
                                            <CustomText
                                                tittle={'Skip for now'}
                                                customStyle={SharedStyles.styles().linkText_SM}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {/* <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap40, SharedStyles.styles().alignCenter]}>
                                    <View style={[SharedStyles.styles().hStack]}>
                                        <View style={{ width: '50%', paddingRight: 8 }}>
                                            <PrimaryButton
                                                text={verifyInsuranceLoading ? 'Verifying...' : 'Verify insurance'}
                                                isDisabled={verifyInsuranceLoading}
                                                onPressHandler={() => {
                                                    verifyInsurance();
                                                }} />
                                        </View>
                                        <View style={{ width: '50%', paddingLeft: 8 }}>
                                            <PrimaryButton
                                                text={'Pay Cash'}
                                                isDisabled={verifyInsuranceLoading}
                                                btnContainerStyl={SharedStyles.styles().secondaryButton}
                                                textStyle={SharedStyles.styles().secondaryButtonTextLarge}
                                                onPressHandler={() => {
                                                    dispatch(appointmentActions.selectedPaymentType(paymentType.cash));
                                                    goToAppStack(routeNames.AppointmentTypeScreen)
                                                }} />
                                        </View>


                                    </View>
                                    {isIsuranceVerified && (
                                        <CustomText
                                            tittle={'We could not verify your insurance.\n Please make sure all details is correct and try again.'}
                                            numberOfLines={3}
                                            customStyle={[SharedStyles.styles().tertiaryText_M, sharedStyles.styles().textCenter, { color: '#DC2626' }]}
                                        />
                                    )}
                                </View> */}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    unChecked: {
        ...SharedStyles.styles().settingCheckIconBox,
    },
    checked: {
        ...SharedStyles.styles().settingCheckIconBox,
        borderColor: '#0374DD',
    },
});

export default InsuranceMemberIDScreen

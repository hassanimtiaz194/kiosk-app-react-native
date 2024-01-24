import React, { useEffect, useState } from "react"
import dayjs from './../../utils/daysjs';
import { useDispatch, useSelector } from 'react-redux';
import SharedStyles from "../../res/SharedStyles";
import { SafeAreaView, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingViewComponent } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../components/atoms/Text";
import CustomHeader from "../../components/molecules/CustomHeader";
import sharedStyles from "../../res/SharedStyles";
import { goToAppStack } from "../../navigations/NavigationService";
import routeNames from "../../navigations/route-names";
import PrimaryButton from "../../components/molecules/PrimaryButton";
import { Dropdown } from "react-native-element-dropdown";
import { appointmentActions } from "../../redux/modules/appointment/actions";
import { emailSchema, phoneNumberSchema } from "../../constants/commonValidationSchema";
import { checkEmailPhoneUniqueness, saveProvisionalInfo } from "../../services/appointment/appointment.service";
import Toaster from "../../components/molecules/Toaster";
import { GENDER_OPTIONS } from "../../constants/commonTypes";


const renderItem = item => {
    return (
        <CustomText
            tittle={item.label}
            customStyle={[SharedStyles.styles().primaryText_XS, SharedStyles.styles().p16]}
        />
    );
};

export const DismissKeyboard = ({ children }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );
}

const PersonalInfoScreen = () => {
    const dispatch = useDispatch();
    const { appointmentDetails, paymentType } = useSelector(state => state.appointment);
    const { states, appSettings } = useSelector(state => state.settings);
    const [statesData, setStatesData] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        preferredName: '',
        gender: 'Male',
        cellPhone: '+1',
        email: '',
        address1: '',
        address2: '',
        state: '',
        city: '',
        zipCode: '',
        selectedMonth: -1,
        selectedYear: 1980,
        selectedDay: -1,
    })
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [emailError, setEmailError] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const getStatesList = () => {
        const orderedStates = states?.map(state => ({ label: state?.name, value: state?.name }));
        setStatesData(orderedStates);
    };

    useEffect(() => {
        getStatesList();
    }, [states]);

    /*     useEffect(() => {
            console.log(appSettings);
            if (appSettings?.state) {
                setFormData({...formData, state: appSettings.state});
            }
        }, [appSettings]);
        console.log(formData); */

    const handleMonthChange = e => {
        const month = parseInt(e.value, 10);
        setFormData({ ...formData, selectedMonth: month });
        setDaysInMonth(updateDaysInMonth(formData.selectedYear, month));
    };

    const handleYearChange = e => {
        const year = parseInt(e.value, 10);
        setFormData({ ...formData, selectedYear: year });
        setDaysInMonth(updateDaysInMonth(year, formData.selectedMonth));
    };

    const handleDayChange = e => {
        setFormData({ ...formData, selectedDay: parseInt(e.value, 10) });
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

    const handleCellPhone = (text) => {
        const formattedText = text?.replace(/[^0-9+]/g, '');
        if (formattedText > 1) {
            setFormData({ ...formData, cellPhone: formattedText });
        }
    };

    const onContinue = () => {
        if (formData.firstName?.trim() === '' ||
            formData.lastName?.trim() === '' ||
            formData.preferredName?.trim() === '' ||
            formData.cellPhone?.trim() === '' ||
            formData.email?.trim() === '' ||
            formData.selectedDay === -1 ||
            formData.selectedMonth === -1) return;

        if (!emailSchema.isValidSync(formData.email?.trim())) {
            Toaster({ type: 'error', title: 'Error', message: "Invalid email address" });
            return;
        }

        const isValidNumber = /^\+1\d{9}$/.test(formData.cellPhone.trim());
        if (!isValidNumber) {
            Toaster({ type: 'error', title: 'Error', message: "Phone number must start with +1 code." });
            return;
        }

        const formattedMonth = String(formData.selectedMonth).padStart(2, '0');
        const formattedDay = String(formData.selectedDay).padStart(2, '0');
        const dob = `${formattedMonth}/${formattedDay}/${formData.selectedYear}`;
        checkEmailPhoneUniqueness({ email: formData.email, phone: formData.cellPhone })
            .then(() => {
                if (!phoneNumberSchema.isValidSync(formData.cellPhone.trim())) {
                    Toaster({ type: 'error', title: 'Error', message: "Invalid phone number" });
                    return;
                } else {
                    saveProvisionalInfo({
                        provisionalProfile: {
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            fullName: formData.preferredName,
                            emailAddress: formData.email,
                            gender: formData.gender,
                            dob: dayjs(dob, 'MM/DD/YYYY').format('YYYY-MM-DD'),
                            phoneNumber: formData.cellPhone,
                            address1: formData.address1,
                            address2: formData.address2,
                            state: formData.state,
                            city: formData.city,
                            zipCode: formData.zipCode
                        },
                        insuranceInfo: null,
                    })
                        .then(() => {
                            console.log('Provisional Profile info saved');
                        })
                        .catch(err => {
                            const message = err.data.errors?.[0]?.endUserMessage || 'Something went wrong';
                            Toaster({ type: 'error', title: 'Error', message: message || 'Something went wrong. Please try again.' });
                        });
                    dispatch(appointmentActions.memberDetails({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        preferredName: formData.preferredName,
                        gender: formData.gender,
                        dob,
                        cellPhone: formData.cellPhone,
                        email: formData.email,
                        address1: formData.address1,
                        address2: formData.address2,
                        state: formData.state,
                        city: formData.city,
                        zipCode: formData.zipCode
                    }));
                    if (paymentType === 'CASH') {
                        goToAppStack(routeNames.ConsentScreen);
                    } else {
                        goToAppStack(routeNames.InsuranceMemberIDScreen)
                    }
                }
            })
            .catch(e => {
                const message = e.data.errors?.[0]?.endUserMessage || 'Something went wrong';
                Toaster({ type: 'error', title: 'Error', message: message || 'Something went wrong. Please try again.' });
            });
    };

    useEffect(() => {
        if (appSettings?.state) {
            setFormData({
                ...formData,
                state: appSettings?.state
            })
        }
    }, [appSettings]);

    useEffect(() => {
        if (formData.firstName?.trim() !== '' &&
            formData.lastName?.trim() !== '' &&
            formData.preferredName?.trim() !== '' &&
            formData.cellPhone?.trim() !== '' &&
            formData.email?.trim() !== '' &&
            (formData.address1?.trim() !== '' || formData.address2?.trim() !== '') &&
            formData.state?.trim() !== '' &&
            formData.city?.trim() !== '' &&
            formData.zipCode?.trim() !== '' &&
            formData.selectedDay !== -1 &&
            formData.selectedMonth !== -1) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [formData]);

    return (
        <SafeAreaView style={[SharedStyles.styles().flex1]}>
            <LinearGradient colors={['#F5FAFF', '#fff']}
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                style={SharedStyles.styles().flex1}>
                <CustomHeader redirectIn={'4 min 30 sec'} />
                <DismissKeyboard>
                    <KeyboardAvoidingView style={SharedStyles.styles().flex1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={[SharedStyles.styles().selfCenter, { maxWidth: '100%', paddingHorizontal: 90, paddingVertical: 64 }]}>
                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap64, SharedStyles.styles().alignCenter]}>
                                    <CustomText
                                        tittle={'Fill out your personal information'}
                                        numberOfLines={3}
                                        customStyle={[SharedStyles.styles().titleText, SharedStyles.styles().textCenter]}
                                    />
                                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap40, { paddingHorizontal: 88 }]}>
                                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                                            <View style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween]}>
                                                <View style={{ width: '50%', paddingRight: 12 }}>
                                                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                                        <CustomText
                                                            tittle={'First Name'}
                                                            customStyle={SharedStyles.styles().primaryText_XS}
                                                        />
                                                        <TextInput
                                                            style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                                            maxLength={20}
                                                            placeholder={'Jonathan'}
                                                            value={formData.firstName}
                                                            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
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
                                                            style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                                            maxLength={20}
                                                            placeholder={'Read'}
                                                            value={formData.lastName}
                                                            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap8]}>
                                                <View style={{ width: '50%', paddingRight: 12 }}>
                                                    <CustomText
                                                        tittle={'Preferred name'}
                                                        customStyle={[SharedStyles.styles().primaryText_XS, { paddingBottom: 8 }]}
                                                    />
                                                    <TextInput
                                                        style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                                        maxLength={20}
                                                        placeholder={'Jon'}
                                                        value={formData.preferredName}
                                                        onChangeText={(text) => setFormData({ ...formData, preferredName: text })}
                                                    />
                                                    <CustomText
                                                        tittle={'Ex. I prefer to be called Jon'}
                                                        customStyle={SharedStyles.styles().tertiaryText_XXS}
                                                    />
                                                </View>
                                                <View style={{ width: '49%', paddingLeft: 5 }}>
                                                    <CustomText
                                                        tittle={'Gender'}
                                                        customStyle={[SharedStyles.styles().primaryText_XS, { paddingBottom: 8 }]}
                                                    />
                                                    <Dropdown
                                                        style={SharedStyles.styles().inputWrapperLarge}
                                                        placeholderStyle={SharedStyles.styles().inputWrapperRegularText}
                                                        selectedTextStyle={SharedStyles.styles().inputWrapperRegularText}
                                                        inputSearchStyle={SharedStyles.styles().dropdownInputSearchStyle}
                                                        iconStyle={SharedStyles.styles().dropDownIconStyle}
                                                        data={GENDER_OPTIONS}
                                                        maxHeight={200}
                                                        labelField="label"
                                                        valueField="value"
                                                        placeholder="Month"
                                                        value={formData.gender}
                                                        onChange={(item) => setFormData({ ...formData, gender: item.value })}
                                                        renderItem={renderItem}
                                                    />
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
                                            <View style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween]}>
                                                <View style={{ width: '50%', paddingRight: 12 }}>
                                                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                                        <CustomText
                                                            tittle={'Phone number'}
                                                            customStyle={SharedStyles.styles().primaryText_XS}
                                                        />
                                                        <TextInput
                                                            style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                                            maxLength={11}
                                                            inputMode={'numeric'}
                                                            keyboardType={'numeric'}
                                                            placeholder={'(316) 555-0116'}
                                                            value={formData.cellPhone}
                                                            onChangeText={handleCellPhone}
                                                            inlineImageLeft="+1"
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{ width: '50%', paddingLeft: 12 }}>
                                                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                                        <CustomText
                                                            tittle={'Email'}
                                                            customStyle={SharedStyles.styles().primaryText_XS}
                                                        />
                                                        <TextInput
                                                            style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                                            // maxLength={20}
                                                            placeholder={'jonread@email.com'}
                                                            keyboardType="email-address"
                                                            value={formData.email}
                                                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                                                        />
                                                        {emailError && (
                                                            <CustomText
                                                                tittle={'Invalid email format'}
                                                                numberOfLines={3}
                                                                customStyle={[SharedStyles.styles().tertiaryText_M, { color: '#DC2626', paddingLeft: 5 }]}
                                                            />
                                                        )}
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                                <CustomText
                                                    tittle={'Address'}
                                                    customStyle={SharedStyles.styles().primaryText_XS}
                                                />
                                                <TextInput
                                                    style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                                    maxLength={20}
                                                    placeholder={'Address Line 1'}
                                                    value={formData.address1}
                                                    onChangeText={(text) => setFormData({ ...formData, address1: text })}
                                                />
                                                <TextInput
                                                    style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                                    maxLength={20}
                                                    placeholder={'Address Line 2'}
                                                    value={formData.address2}
                                                    onChangeText={(text) => setFormData({ ...formData, address2: text })}
                                                />
                                            </View>
                                            <View style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween]}>
                                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween]}>
                                                        <View style={{ width: '33.33%', paddingRight: 12 }}>
                                                            <CustomText
                                                                tittle={'State of residence'}
                                                                customStyle={[SharedStyles.styles().primaryText_X, { paddingBottom: 8 }]}
                                                            />
                                                            <Dropdown
                                                                style={SharedStyles.styles().inputWrapperLarge}
                                                                placeholderStyle={[SharedStyles.styles().inputWrapperRegularText, { width: 1 }]}
                                                                selectedTextStyle={[SharedStyles.styles().inputWrapperRegularText, { width: 1 }]}
                                                                inputSearchStyle={SharedStyles.styles().dropdownInputSearchStyle}
                                                                iconStyle={SharedStyles.styles().dropDownIconStyle}
                                                                data={statesData}
                                                                search
                                                                maxHeight={170}
                                                                labelField="label"
                                                                valueField="value"
                                                                placeholder="Select state"
                                                                searchPlaceholder="Search state"
                                                                value={formData.state}
                                                                selectedTextProps={{
                                                                    numberOfLines: 1,
                                                                    ellipsizeMode: 'tail'
                                                                }}
                                                                onChange={item => {
                                                                    setFormData({ ...formData, state: item.value });
                                                                }}
                                                                renderItem={renderItem}
                                                            />
                                                        </View>
                                                        <View style={{ width: '33.33%', paddingLeft: 12, paddingRight: 12 }}>
                                                            <CustomText
                                                                tittle={'City'}
                                                                customStyle={[SharedStyles.styles().primaryText_X, { paddingBottom: 8 }]}
                                                            />
                                                            <TextInput
                                                                style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                                                maxLength={20}
                                                                placeholder={'city'}
                                                                value={formData.city}
                                                                onChangeText={(text) => setFormData({ ...formData, city: text })}
                                                            />
                                                        </View>
                                                        <View style={{ width: '33.33%', paddingLeft: 12 }}>
                                                            <CustomText
                                                                tittle={'Zip code'}
                                                                customStyle={[SharedStyles.styles().primaryText_X, { paddingBottom: 8 }]}
                                                            />
                                                            <TextInput
                                                                style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                                                maxLength={20}
                                                                placeholder={'zip code'}
                                                                value={formData.zipCode}
                                                                keyboardType='numeric'
                                                                onChangeText={(text) => {
                                                                    const formattedText = text?.replace(/[^0-9]/g, '');
                                                                    console.log(typeof formattedText);
                                                                    setFormData({ ...formData, zipCode: formattedText })
                                                                }}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>

                                            </View>
                                        </View>
                                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().alignCenter]}>
                                            <PrimaryButton
                                                isDisabled={isDisabled}
                                                text={'Continue'}
                                                onPressHandler={onContinue} />
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </DismissKeyboard>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default PersonalInfoScreen

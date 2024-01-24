import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import SharedStyles from "../../res/SharedStyles";
import { SafeAreaView, View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../components/atoms/Text";
import CustomHeader from "../../components/molecules/CustomHeader";
import { goToAppStack } from "../../navigations/NavigationService";
import routeNames from "../../navigations/route-names";
import PrimaryButton from "../../components/molecules/PrimaryButton";
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";
import { Dropdown } from 'react-native-element-dropdown';
import { Switch } from 'react-native-switch';
import { settingsActions } from "../../redux/modules/settings/actions";
import { getPayers } from "../../services/settings/settings.service";
import { FlatList } from "react-native";
import { getSettings, updateAccessCode, updateSettings } from "../../constants/appSettings";
import Toaster from "../../components/molecules/Toaster";

const renderItem = item => {
    return (
        <CustomText
            tittle={item.label}
            customStyle={[SharedStyles.styles().primaryText_XS, SharedStyles.styles().p16]}
        />
    );
};
const SettingsScreen = () => {
    const dispatch = useDispatch();
    const { states, appSettings, accessCode } = useSelector(state => state.settings);
    const [statesData, setStatesData] = useState([]);
    const [payers, setPayers] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [aCode, setACode] = useState('');
    const [formData, setFormData] = useState({
        state: '',
        insurance: [],
        isMemberScreenSkipped: false
    });

    useEffect(() => {
        if (appSettings?.state) {
            setFormData(appSettings);
            getPayers2(appSettings?.state);
        }
        if (accessCode) {
            setACode(accessCode);
        }
    }, [appSettings, accessCode]);


    useEffect(() => {
        if (formData.state.trim() === '') {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [formData, aCode])

    const getStatesList = () => {
        if (Array.isArray(states)) {
            const orderedStates = states?.map(state => ({ label: state?.name, value: state?.name }));
            setStatesData(orderedStates);
        } else {
            Toaster({ type: 'error', title: 'Error', message: "unable to get states" });
        }
    };

    const getPayers2 = async state => {
        const stateData = states?.find(item => item?.name?.toLowerCase() === state?.toLowerCase());
        const response = await getPayers(stateData?._id);
        const statePayers = response.data.data.filter(item => item?.isActive);
        const uniquePayersOrdered = statePayers.map(({ _id, name }) => ({ label: name, value: _id }));
        setPayers(uniquePayersOrdered);
    };

    useEffect(() => {
        getStatesList();
    }, [states]);


    const renderInsurances = (item) => {
        return (
            <>
                <TouchableOpacity
                    onPress={() => {
                        if (!formData.insurance.includes(item.label)) {
                            setFormData({ ...formData, insurance: [...formData.insurance, item.label] })
                        } else {
                            const newArray = formData.insurance.filter(value => value !== item.label);
                            setFormData({ ...formData, insurance: [...newArray] })
                        }
                    }}
                    style={styles.unChecked}
                >
                    {!formData.insurance.includes(item.label) && <SvgXml xml={svgs.checkBoxTickIcon()} />}
                </TouchableOpacity>
                <CustomText
                    tittle={item?.label}
                    customStyle={[SharedStyles.styles().primaryText_M]}
                />
            </>
        );
    };

    return (
        <SafeAreaView style={[SharedStyles.styles().flex1]}>
            <LinearGradient colors={['#F5FAFF', '#fff']}
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                style={SharedStyles.styles().flex1}>
                <CustomHeader rightText={false} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[SharedStyles.styles().selfCenter, { paddingVertical: 80 }]}>
                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap80]}>
                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap16]}>
                                <CustomText
                                    tittle={'Settings '}
                                    numberOfLines={3}
                                    customStyle={[SharedStyles.styles().titleText, SharedStyles.styles().textCenter]}
                                />
                            </View>
                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap80, { paddingHorizontal: 46 }]}>
                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap40]}>
                                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                                        <CustomText
                                            tittle={'Access Code'}
                                            customStyle={[SharedStyles.styles().primaryText_L]}
                                        />
                                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                            <CustomText
                                                tittle={'Enter new acess code'}
                                                customStyle={SharedStyles.styles().primaryText_XS}
                                            />
                                            <TextInput
                                                value={aCode}
                                                onChangeText={(text) => {
                                                    const formattedText = text?.replace(/[^0-9]/g, '');
                                                    setACode(formattedText)
                                                }}
                                                style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                                maxLength={4}
                                                keyboardType="numeric"
                                                secureTextEntry={true}
                                                placeholderStyle={SharedStyles.styles().inputWrapperRegularText}
                                            />
                                        </View>
                                    </View>

                                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                                        <CustomText
                                            tittle={'State'}
                                            customStyle={[SharedStyles.styles().primaryText_L]}
                                        />
                                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                            <CustomText
                                                tittle={'Select state'}
                                                customStyle={SharedStyles.styles().primaryText_XS}
                                            />
                                            <Dropdown
                                                style={SharedStyles.styles().inputWrapperLarge}
                                                placeholderStyle={SharedStyles.styles().inputWrapperRegularText}
                                                selectedTextStyle={SharedStyles.styles().inputWrapperRegularText}
                                                inputSearchStyle={SharedStyles.styles().dropdownInputSearchStyle}
                                                iconStyle={SharedStyles.styles().dropDownIconStyle}
                                                data={statesData}
                                                search
                                                maxHeight={300}
                                                labelField="label"
                                                valueField="value"
                                                placeholder="Select state"
                                                searchPlaceholder="Search state"
                                                value={formData.state}
                                                onChange={item => {
                                                    setFormData({ ...formData, state: item.value, insurance: [] });
                                                    void getPayers2(item.value);
                                                }}
                                                renderItem={renderItem}
                                            />
                                        </View>
                                    </View>
                                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                                        <CustomText
                                            tittle={'Insurances'}
                                            customStyle={[SharedStyles.styles().primaryText_L]}
                                        />
                                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap12]}>
                                            {payers.length === 0 ? (
                                                <CustomText
                                                    tittle={'No insurances available in the selected state'}
                                                    customStyle={[SharedStyles.styles().tertiaryText_M]}
                                                />
                                            ) : (
                                                <>
                                                    {payers.map((item, index) =>
                                                        <View key={index} style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().alignCenter]}>
                                                            {renderInsurances(item)}
                                                        </View>
                                                    )}
                                                </>
                                            )}
                                        </View>
                                        <View style={[SharedStyles.styles().borderBottom1, SharedStyles.styles().borderColor, { width: '100%' }]}></View>
                                        <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().alignCenter]}>
                                            <Switch
                                                value={formData.isMemberScreenSkipped}
                                                onValueChange={(val) => {
                                                    setFormData({ ...formData, isMemberScreenSkipped: !formData.isMemberScreenSkipped });
                                                }}
                                                circleSize={20}
                                                barHeight={24}
                                                circleBorderWidth={0}
                                                backgroundActive={'#0374DD'}
                                                backgroundInactive={'#D0D6DD'}
                                                circleActiveColor={'#fff'}
                                                circleInActiveColor={'#fff'}
                                                renderActiveText={false}
                                                renderInActiveText={false}
                                                switchLeftPx={2.5}
                                                switchRightPx={2.5}
                                                switchWidthMultiplier={2}
                                                switchBorderRadius={12}
                                            />
                                            <CustomText
                                                tittle={'Allow to skip Member ID information'}
                                                customStyle={[SharedStyles.styles().secondaryText_M]}
                                            />
                                        </View>
                                    </View>
                                    {/* <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                                        <CustomText
                                            tittle={'Services'}
                                            customStyle={[SharedStyles.styles().primaryText_L]}
                                        />
                                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap32]}>
                                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap16]}>
                                                <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().alignCenter]}>
                                                    <TouchableOpacity onPress={() => { }} style={styles.unChecked}>
                                                        <SvgXml xml={svgs.checkBoxTickIcon()} />
                                                    </TouchableOpacity>
                                                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap4]}>
                                                        <CustomText
                                                            tittle={'Service nam'}
                                                            customStyle={[SharedStyles.styles().primaryText_M]}
                                                        />
                                                        <CustomText
                                                            tittle={'Price, Duration'}
                                                            customStyle={[SharedStyles.styles().tertiaryText_S, { lineHeight: 20 }]}
                                                        />
                                                    </View>
                                                </View>
                                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                                    <CustomText
                                                        tittle={'Display name'}
                                                        customStyle={SharedStyles.styles().primaryText_XS}
                                                    />
                                                    <TextInput
                                                        style={[SharedStyles.styles().inputWrapperLarge, SharedStyles.styles().inputWrapperRegularText]}
                                                        maxLength={20}
                                                        value={'Service name'}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </View> */}
                                </View>
                                <PrimaryButton
                                    text={'Save settings'}
                                    isDisabled={isDisabled}
                                    onPressHandler={() => {
                                        if (aCode.length !== 4) {
                                            Toaster({ type: 'error', title: 'Error', message: "Access code must be 4 digits" });
                                            return;
                                        }
                                        dispatch(settingsActions.storeApplicationSettings(formData));
                                        dispatch(settingsActions.storeAccessCode(aCode));
                                        updateSettings(formData);
                                        updateAccessCode(aCode);
                                        goToAppStack(routeNames.HomeScreen)
                                    }} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default SettingsScreen

const styles = StyleSheet.create({
    unChecked: {
        ...SharedStyles.styles().settingCheckIconBox,
    },
    checked: {
        ...SharedStyles.styles().settingCheckIconBox,
        borderColor: '#0374DD',
    },
});

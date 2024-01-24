import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import SharedStyles from "../../res/SharedStyles";
import { SafeAreaView, View, ScrollView, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../components/atoms/Text";
import CustomHeader from "../../components/molecules/CustomHeader";
import sharedStyles from "../../res/SharedStyles";
import { goToAppStack } from "../../navigations/NavigationService";
import PrimaryButton from "../../components/molecules/PrimaryButton";
import routeNames from "../../navigations/route-names";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { getAccessCode } from "../../constants/appSettings";
import { DismissKeyboard } from "./PersonalInfoScreen";

const AccessSettingScreen = () => {
    const { accessCode } = useSelector(state => state.settings);
    const [isDisabled, setIsDisabled] = useState(true);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: 4 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        if (value.trim() === '' || value !== accessCode) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [value, accessCode]);

    return (
        <SafeAreaView style={[SharedStyles.styles().flex1]}>
            <LinearGradient colors={['#F5FAFF', '#fff']}
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                style={SharedStyles.styles().flex1}>
                <CustomHeader rightText={false} />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={SharedStyles.styles().flex1}>
                    <DismissKeyboard>
                        <View style={[SharedStyles.styles().selfCenter, sharedStyles.styles().alignCenter, SharedStyles.styles().justifyCenter]}>
                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap80]}>
                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap8]}>
                                    <CustomText
                                        tittle={'Access settings '}
                                        numberOfLines={3}
                                        customStyle={[SharedStyles.styles().titleText, SharedStyles.styles().textCenter]}
                                    />
                                    <CustomText
                                        tittle={'Enter a four digit code to access settings.'}
                                        numberOfLines={3}
                                        customStyle={[SharedStyles.styles().tertiaryText_L, SharedStyles.styles().textCenter]}
                                    />
                                </View>
                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap40, { paddingHorizontal: 94 }]}>
                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16]}>
                                        <CodeField
                                            ref={ref}
                                            {...props}
                                            value={value}
                                            onChangeText={(text) => {
                                                const formattedText = text?.replace(/[^0-9]/g, '');
                                                setValue(formattedText);
                                            }}
                                            cellCount={4}
                                            rootStyle={styles.codeFieldRoot}
                                            keyboardType="number-pad"
                                            textContentType="oneTimeCode"
                                            renderCell={({ index, symbol, isFocused }) => (
                                                <Text
                                                    key={index}
                                                    style={[styles.cell, isFocused && styles.focusCell]}
                                                    onLayout={getCellOnLayoutHandler(index)}>
                                                    {symbol || (isFocused ? <Cursor /> : null)}
                                                </Text>
                                            )}
                                        />
                                    </View>
                                    <PrimaryButton
                                        text={'Access settings'}
                                        isDisabled={isDisabled}
                                        onPressHandler={() => {
                                            if (value === accessCode) {
                                                goToAppStack(routeNames.SettingsScreen)
                                            }
                                        }} />
                                </View>
                            </View>
                        </View>
                    </DismissKeyboard>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: { padding: 10, minHeight: 300 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20, display: 'flex', gap: 10 },
    cell: {
        ...SharedStyles.styles().inputWrapperLarge,
        ...SharedStyles.styles().inputWrapperLargeText,
        ...SharedStyles.styles().textCenter,
        width: '21.66%',
    },
    focusCell: {
        borderColor: '#000',
    },
});

export default AccessSettingScreen

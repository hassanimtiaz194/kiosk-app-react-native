import React, { useEffect, useState } from "react"
import SharedStyles from "../../res/SharedStyles";
import { SafeAreaView, View, ScrollView, TouchableOpacity, StyleSheet, Text, Linking } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../components/atoms/Text";
import CustomHeader from "../../components/molecules/CustomHeader";
import { goToAppStack } from "../../navigations/NavigationService";
import routeNames from "../../navigations/route-names";
import PrimaryButton from "../../components/molecules/PrimaryButton";
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";
import ModalPayement from "../../components/molecules/ModalPayement";
import { WebView } from 'react-native-webview';

const ConsentScreen = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const [consent, setConsent] = useState({
        information: false,
        communication: false,
        telehealth: false,
        privacy: false,
        paymentPolicy: false,
    });

    /* const openLink = async (url) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                console.error(`Unable to open URL: ${url}`);
            }
        } catch (error) {
            console.error('An error occurred while trying to open the link:', error);
        }
    }; */

    const openLinkInWebView = (url) => {
        return (
          <WebView
            source={{ uri: url }}
            style={{ flex: 1 }}
            onError={(error) => console.error('WebView error:', error)}
          />
        );
      };

    const onContinue = () => {
        if (!consent.information ||
            !consent.communication ||
            !consent.telehealth ||
            !consent.privacy ||
            !consent.paymentPolicy
        ) return;
        goToAppStack(routeNames.ConfirmPayScreen)
    };

    useEffect(() => {
        if (!consent.information ||
            !consent.communication ||
            !consent.telehealth ||
            !consent.privacy ||
            !consent.paymentPolicy
        ) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false);
        }
    }, [consent])

    return (
        <SafeAreaView style={[SharedStyles.styles().flex1]}>
            <LinearGradient colors={['#F5FAFF', '#fff']}
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                style={SharedStyles.styles().flex1}>
                <CustomHeader redirectIn={'4 min 30 sec'} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[SharedStyles.styles().selfCenter, { paddingVertical: 64 }]}>
                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap80]}>
                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                                <CustomText
                                    tittle={'Consent to treat '}
                                    numberOfLines={3}
                                    customStyle={[SharedStyles.styles().titleText, SharedStyles.styles().textCenter]}
                                />
                                <CustomText
                                    tittle={'This is required to use services. We are a healthcare company and store your information in a medical record. That means we keep everything confidential and secure.'}
                                    numberOfLines={3}
                                    customStyle={[SharedStyles.styles().tertiaryText_M, SharedStyles.styles().textCenter]}
                                />
                            </View>
                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap80, SharedStyles.styles().alignCenter]}>
                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap12, SharedStyles.styles().alignCenter]}>
                                        <TouchableOpacity onPress={() => setConsent({ ...consent, information: !consent.information })} style={consent.information ? styles.checked : styles.unChecked}>
                                            {consent.information && <SvgXml xml={svgs.checkBoxTickIcon()} />}
                                        </TouchableOpacity>
                                        <CustomText
                                            tittle={'I consent to share my information with the medical team'}
                                            numberOfLines={3}
                                            customStyle={[SharedStyles.styles().primaryText_S]}
                                        />
                                    </View>
                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap12, SharedStyles.styles().alignCenter]}>
                                        <TouchableOpacity onPress={() => setConsent({ ...consent, communication: !consent.communication })} style={consent.communication ? styles.checked : styles.unChecked}>
                                            {consent.communication && <SvgXml xml={svgs.checkBoxTickIcon()} />}
                                        </TouchableOpacity>
                                        <CustomText
                                            tittle={'I authorize the medical team to communicate with me electronically'}
                                            numberOfLines={3}
                                            customStyle={[SharedStyles.styles().primaryText_S]}
                                        />
                                    </View>
                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap12, SharedStyles.styles().alignStart]}>
                                        <TouchableOpacity onPress={() => setConsent({ ...consent, telehealth: !consent.telehealth })} style={consent.telehealth ? styles.checked : styles.unChecked}>
                                            {consent.telehealth && <SvgXml xml={svgs.checkBoxTickIcon()} />}
                                        </TouchableOpacity>
                                        <CustomText
                                            tittle={'I acknowledge that my telehealth visit may be transcribed for quality assurance, training and product improvement purposes.'}
                                            numberOfLines={3}
                                            customStyle={[SharedStyles.styles().primaryText_S]}
                                        />
                                    </View>
                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap12, SharedStyles.styles().alignCenter]}>
                                        <TouchableOpacity onPress={() => setConsent({ ...consent, privacy: !consent.privacy })} style={consent.privacy ? styles.checked : styles.unChecked}>
                                            {consent.privacy && <SvgXml xml={svgs.checkBoxTickIcon()} />}
                                        </TouchableOpacity>
                                        <View style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter]}>
                                            <CustomText
                                                tittle={'I accept the'}
                                                customStyle={[SharedStyles.styles().primaryText_S]}
                                            />
                                            <TouchableOpacity onPress={() => { openLinkInWebView('https://www.google.com') }}>
                                                <CustomText
                                                    tittle={' Privacy Policy '}
                                                    numberOfLines={3}
                                                    customStyle={[SharedStyles.styles().linkText_S]}
                                                />
                                            </TouchableOpacity>
                                            <CustomText
                                                tittle={'and'}
                                                customStyle={[SharedStyles.styles().primaryText_S]}
                                            />
                                            <TouchableOpacity onPress={() => { openLinkInWebView('https://www.google.com') }}>
                                                <CustomText
                                                    tittle={' Term and Conditions'}
                                                    numberOfLines={3}
                                                    customStyle={[SharedStyles.styles().linkText_S]}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap12, SharedStyles.styles().alignCenter]}>
                                        <TouchableOpacity onPress={() => setConsent({ ...consent, paymentPolicy: !consent.paymentPolicy })} style={consent.paymentPolicy ? styles.checked : styles.unChecked}>
                                            {consent.paymentPolicy && <SvgXml xml={svgs.checkBoxTickIcon()} />}
                                        </TouchableOpacity>
                                        <View style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter]}>
                                            <CustomText
                                                tittle={'I understand and agree to the'}
                                                customStyle={[SharedStyles.styles().primaryText_S]}
                                            />
                                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                                <CustomText
                                                    tittle={' patient responsibility for payment policy '}
                                                    numberOfLines={3}
                                                    customStyle={[SharedStyles.styles().linkText_S]}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <ModalPayement isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
                                <PrimaryButton
                                    btnContainerStyl={{ width: 120 }}
                                    isDisabled={isDisabled}
                                    text={'Continue'}
                                    onPressHandler={onContinue} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default ConsentScreen

const styles = StyleSheet.create({
    unChecked: {
        ...SharedStyles.styles().checkIconBox,
    },
    checked: {
        ...SharedStyles.styles().checkIconBox,
        borderColor: '#0374DD',
    }
});

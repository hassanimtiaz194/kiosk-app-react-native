import React from "react"
import { useSelector, useDispatch } from 'react-redux';
import SharedStyles from "../../res/SharedStyles";
import { SafeAreaView, View, ScrollView, TouchableOpacity, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../components/atoms/Text";
import CustomHeader from "../../components/molecules/CustomHeader";
import sharedStyles from "../../res/SharedStyles";
import { goToAppStack } from "../../navigations/NavigationService";
import routeNames from "../../navigations/route-names";
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";
import PrimaryButton from "../../components/molecules/PrimaryButton";
import ProviderInfo from "../../components/molecules/ProviderInfo";
import { getNameIntials } from "../../constants/commonFunctions";
import config from "../../config";
import { appointmentActions } from "../../redux/modules/appointment/actions";

const SelectProviderScreen = () => {
    const dispatch = useDispatch()
    const { services, slotProviders, paymentType } = useSelector((state) => state.appointment);

    const renderProvider = ({ item }) => {
        return (
            <View key={item?.providerDetailsDto?.id} style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                <View style={[SharedStyles.styles().cardWrapper]}>
                    <View style={[SharedStyles.styles().vStack, { minWidth: 700 }]}>
                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().p24, SharedStyles.styles().gap16, SharedStyles.styles().borderBottom1, SharedStyles.styles().borderColor]}>
                            <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap12, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween]}>
                                <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap24, SharedStyles.styles().alignCenter]}>
                                    <ProviderInfo
                                        title={item?.providerDetailsDto?.name}
                                        subTitle={item?.providerDetailsDto?.designation}
                                        imagePath={item?.providerDetailsDto?.providerImage ? `${config.s3.bucket.url}${item?.providerDetailsDto?.providerImage}` : null}
                                        imagePlaceholder={getNameIntials(item?.providerDetailsDto?.name)}
                                        ratingValue={item?.providerDetailsDto?.rating}
                                        isInsurance={paymentType !== "CASH"}
                                    />
                                </View>
                                <PrimaryButton
                                    btnContainerStyl={{ width: 130, height: 44, borderRadius: 6, }}
                                    textStyle={SharedStyles.styles().primaryButtonTextSmall}
                                    text={'Book session'}
                                    onPressHandler={() => {
                                        const selectedService = services?.providerServices?.find(
                                            providerService => providerService?.providerId === item?.actor,
                                        );
                                        dispatch(appointmentActions.selectedService(selectedService));
                                        dispatch(appointmentActions.selectedProvider(item));
                                        goToAppStack(routeNames.PersonalInfoScreen)
                                    }} />
                            </View>
                        </View>
                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().p24, SharedStyles.styles().gap16, SharedStyles.styles().borderBottom1, SharedStyles.styles().borderColor]}>
                            <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap8, SharedStyles.styles().alignCenter, SharedStyles.styles().flexWrap]}>
                                {item?.providerDetailsDto?.specialties?.split(',').map((specialties, index ) =>
                                    <View key={index} style={{ backgroundColor: '#EFF2F6', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4 }}>
                                        <CustomText
                                            tittle={specialties}
                                            customStyle={SharedStyles.styles().secondaryText_XS}
                                        />
                                    </View>
                                )}

                            </View>
                            <CustomText
                                tittle={item?.providerDetailsDto?.bio}
                                numberOfLines={3}
                                customStyle={[SharedStyles.styles().secondaryText_M, { lineHeight: 24 }]}
                            />
                        </View>
                        {/* <View style={[SharedStyles.styles().hStack, SharedStyles.styles().p12, SharedStyles.styles().gap24, SharedStyles.styles().alignCenter, SharedStyles.styles().flexWrap]}>
                            <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap8, SharedStyles.styles().alignCenter]}>
                                <SvgXml xml={svgs.experienceIcon()} />
                                <CustomText
                                    tittle={'8 years of experience'}
                                    customStyle={SharedStyles.styles().tertiaryText_XXS}
                                />
                            </View>
                            <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap8, SharedStyles.styles().alignCenter]}>
                                <SvgXml xml={svgs.cashAndInsuranceIcon()} />
                                <CustomText
                                    tittle={'Cash & Insurance'}
                                    customStyle={SharedStyles.styles().tertiaryText_XXS}
                                />
                            </View>
                            <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap8, SharedStyles.styles().alignCenter]}>
                                <SvgXml xml={svgs.acceptsSlidingScaleIcon()} />
                                <CustomText
                                    tittle={'Accepts sliding scale'}
                                    customStyle={SharedStyles.styles().tertiaryText_XXS}
                                />
                            </View>
                        </View> */}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={[SharedStyles.styles().flex1]}>
            <LinearGradient colors={['#F5FAFF', '#fff']}
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                style={SharedStyles.styles().flex1}>
                <CustomHeader redirectIn={'4 min 30 sec'} />
                {/*  <ScrollView showsVerticalScrollIndicator={false}> */}
                <View style={[SharedStyles.styles().selfCenter, { maxWidth: '100%', paddingHorizontal: 54, paddingVertical: 64 }]}>
                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap64]}>
                        <CustomText
                            tittle={`There are ${slotProviders.length} providers\n  available at that time`}
                            numberOfLines={3}
                            customStyle={[SharedStyles.styles().titleText, SharedStyles.styles().textCenter]}
                        />
                        <FlatList
                            data={slotProviders}
                            keyExtractor={(item) => item?.providerDetailsDto?.id}
                            renderItem={renderProvider}
                            style={[SharedStyles.styles().vStack, SharedStyles.styles().gap16]}
                            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                        />
                    </View>
                </View>
                {/*  </ScrollView> */}
            </LinearGradient>
        </SafeAreaView>
    )
}
export default SelectProviderScreen

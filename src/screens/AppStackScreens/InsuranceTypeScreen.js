import React from "react"
import { useDispatch, useSelector } from "react-redux";
import SharedStyles from "../../res/SharedStyles";
import { SafeAreaView, View, ScrollView, TouchableOpacity, FlatList, Image, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../components/atoms/Text";
import CustomHeader from "../../components/molecules/CustomHeader";
import sharedStyles from "../../res/SharedStyles";
import { goToAppStack } from "../../navigations/NavigationService";
import routeNames from "../../navigations/route-names";
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";
import { SvgUri } from 'react-native-svg';
import { appointmentActions } from "../../redux/modules/appointment/actions";

const InsuranceTypeScreen = () => {
    const dispatch = useDispatch();
    const { allStateActiveInsurance, allStateInsurances } = useSelector((state) => state.appointment);
    const { appSettings } = useSelector((state) => state.settings);
    const insuranceData = allStateActiveInsurance.filter(item => !appSettings?.insurance?.includes(item?.name));
    const renderInsuarnces = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    dispatch(appointmentActions.selectedInsurance(item));
                    goToAppStack(routeNames.AppointmentTypeScreen);
                }}
                style={[SharedStyles.styles().cardWrapper, SharedStyles.styles().alignCenter, SharedStyles.styles().p24, { height: 100, display: 'flex', justifyContent: 'center', maxWidth: 400, minWidth: 142 }]}
            >
                {item?.image ? (
                    <>
                        {item.image.endsWith(".svg") ? (
                            <SvgUri
                                width={190}
                                height={70}
                                uri={item.image}
                            />
                        ) : (
                            <Image
                                source={{ uri: item.image }}
                                style={{ width: 190, height: 35 }}
                                alt={item.name}
                            />
                        )}
                    </>
                ) : (
                    <CustomText
                        tittle={item.name}
                        customStyle={[SharedStyles.styles().primaryText_L]}
                    />
                )
                }

            </TouchableOpacity >
        );
    };
    return (
        <SafeAreaView style={[SharedStyles.styles().flex1]}>
            <LinearGradient colors={['#F5FAFF', '#fff']}
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                style={SharedStyles.styles().flex1}>
                <CustomHeader redirectIn={'4 min 30 sec'} />
                <View style={[SharedStyles.styles().selfCenter, { paddingVertical: 80 }]}>
                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap80]}>
                        <CustomText
                            tittle={'What insurance do you\n have?'}
                            numberOfLines={3}
                            customStyle={[SharedStyles.styles().titleText, SharedStyles.styles().textCenter]}
                        />
                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap16, { height: 700 }]}>
                            {insuranceData?.length === 0 ? (
                                <CustomText
                                    tittle={"No insurance available"}
                                    numberOfLines={3}
                                    customStyle={styles.noInsuranceText}
                                />
                            ) : (
                                <FlatList
                                    data={insuranceData}
                                    keyExtractor={(item) => item._id}
                                    renderItem={renderInsuarnces}
                                    style={[SharedStyles.styles().vStack, SharedStyles.styles().gap16]}
                                    ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                                />
                            )}
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    noInsuranceText: {
        fontFamily: 'Inter-Light',
        fontSize: 20,
        // fontWeight: '500',
        lineHeight: 20,
        color: "#0D0F11"
    }
});

export default InsuranceTypeScreen

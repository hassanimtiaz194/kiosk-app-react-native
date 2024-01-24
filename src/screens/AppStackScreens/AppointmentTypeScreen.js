import React from "react"
import { useDispatch, useSelector } from "react-redux";
import SharedStyles from "../../res/SharedStyles";
import { SafeAreaView, View, ScrollView, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../components/atoms/Text";
import CustomHeader from "../../components/molecules/CustomHeader";
import { goToAppStack } from "../../navigations/NavigationService";
import routeNames from "../../navigations/route-names";
import { getCostRange, getDurationUnit } from "../../constants/commonFunctions";
import { appointmentActions } from "../../redux/modules/appointment/actions";

const AppointmentTypeScreen = () => {
    const dispatch = useDispatch();
    const { allProviderServices, paymentType } = useSelector((state) => state.appointment);

    const renderServices = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    dispatch(appointmentActions.services(item));
                    goToAppStack(routeNames.DateTimeFilterScreen);
                }}
                style={[SharedStyles.styles().cardWrapper, SharedStyles.styles().px20, SharedStyles.styles().py16]}
            >
                <CustomText
                    tittle={item.name}
                    customStyle={[SharedStyles.styles().primaryText_L]}
                />
                <CustomText
                    tittle={paymentType === 'CASH' ? `${getDurationUnit(item?.duration, false)}, ${getCostRange(item)} ` : getDurationUnit(item?.duration, false)}
                    customStyle={[SharedStyles.styles().tertiaryText_M]}
                />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={[SharedStyles.styles().flex1]}>
            <LinearGradient colors={['#F5FAFF', '#fff']}
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                style={SharedStyles.styles().flex1}>
                <CustomHeader redirectIn={'4 min 30 sec'} />
                <View style={[SharedStyles.styles().selfCenter, { paddingVertical: 80}]}>
                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap80]}>
                        <CustomText
                            tittle={'What kind of appointment\n do you need?'}
                            numberOfLines={3}
                            customStyle={[SharedStyles.styles().titleText, SharedStyles.styles().textCenter]}
                        />
                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap16, { height: 700 }]}>
                            <FlatList
                                data={allProviderServices}
                                keyExtractor={(item) => item?.serviceId}
                                renderItem={renderServices}
                                style={[SharedStyles.styles().vStack, SharedStyles.styles().gap16, /* { height: 200} */]}
                                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                            />
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default AppointmentTypeScreen

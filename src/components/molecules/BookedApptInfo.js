import React from "react";
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import {TouchableOpacity, View} from "react-native";
import SharedStyles from "../../res/SharedStyles";
import {SvgXml} from "react-native-svg";
import sharedStyles from "../../res/SharedStyles";
import svgs from "../../assets/svgs";
import CustomText from "../atoms/Text";
import {goToAppStack} from "../../navigations/NavigationService";
import routeNames from "../../navigations/route-names";
import { getDurationUnit } from "../../constants/commonFunctions";


const BookedApptInfo = () => {
    const { appointmentDetails } = useSelector(state => state.appointment);
    return (
        <View style={[SharedStyles.styles().px24, SharedStyles.styles().pt8, SharedStyles.styles().pb8, SharedStyles.styles().border1, SharedStyles.styles().borderColor, {backgroundColor: '#fff',borderRadius: 16}]}>
            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap40,]}>
                <View style={[SharedStyles.styles().vStack, sharedStyles.styles().alignCenter,]}>
                    <SvgXml xml={svgs.bookedIconIcon()}/>
                    <CustomText
                        tittle={'We will send a text and an email\n confirming your appointment.'}
                        numberOfLines={3}
                        customStyle={[SharedStyles.styles().primaryText_XL, SharedStyles.styles().textCenter]}
                    />
                </View>
                <View style={[SharedStyles.styles().vStack]}>
                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().py24, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween, SharedStyles.styles().borderBottom1, SharedStyles.styles().borderColor]}>
                        <CustomText
                            tittle={'Appointment type'}
                            customStyle={SharedStyles.styles().primaryText_M}
                        />
                        <CustomText
                            tittle={appointmentDetails?.service?.serviceDetails?.name}
                            customStyle={SharedStyles.styles().secondaryText_M}
                        />
                    </View>
                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().py24, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween, SharedStyles.styles().borderBottom1, SharedStyles.styles().borderColor]}>
                        <CustomText
                            tittle={'Provider'}
                            customStyle={SharedStyles.styles().primaryText_M}
                        />
                        <CustomText
                            tittle={appointmentDetails?.provider?.providerDetailsDto?.name}
                            customStyle={SharedStyles.styles().secondaryText_M}
                        />
                    </View>
                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().py24, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween, SharedStyles.styles().borderBottom1, SharedStyles.styles().borderColor]}>
                        <CustomText
                            tittle={'Date'}
                            customStyle={SharedStyles.styles().primaryText_M}
                        />
                        <CustomText
                            tittle={dayjs(appointmentDetails?.timeSlot?.startTime).locale('en').format('dddd, MMMM D, YYYY')}
                            customStyle={SharedStyles.styles().secondaryText_M}
                        />
                    </View>
                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().py24, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween, SharedStyles.styles().borderBottom1, SharedStyles.styles().borderColor]}>
                        <CustomText
                            tittle={'Time'}
                            customStyle={SharedStyles.styles().primaryText_M}
                        />
                        <CustomText
                            tittle={dayjs(appointmentDetails?.timeSlot?.startTime).locale('en').format('h:mm a')}
                            customStyle={SharedStyles.styles().secondaryText_M}
                        />
                    </View>
                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().py24, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween, SharedStyles.styles().borderBottom1, SharedStyles.styles().borderColor]}>
                        <CustomText
                            tittle={'Duration'}
                            customStyle={SharedStyles.styles().primaryText_M}
                        />
                        <CustomText
                            tittle={getDurationUnit(appointmentDetails?.service?.serviceDetails?.duration ,false)}
                            customStyle={SharedStyles.styles().secondaryText_M}
                        />
                    </View>
                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().py24, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween, SharedStyles.styles().borderBottom1, SharedStyles.styles().borderColor]}>
                        <CustomText
                            tittle={'Cost'}
                            customStyle={SharedStyles.styles().primaryText_M}
                        />
                        <CustomText
                            tittle={`$${appointmentDetails?.service?.serviceDetails?.cost}`}
                            customStyle={SharedStyles.styles().secondaryText_M}
                        />
                    </View>
                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().py24, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween, SharedStyles.styles().borderBottom1, SharedStyles.styles().borderColor]}>
                        <CustomText
                            tittle={'Your phone number'}
                            customStyle={SharedStyles.styles().primaryText_M}
                        />
                        <CustomText
                            tittle={appointmentDetails?.memberDetails?.cellPhone}
                            customStyle={SharedStyles.styles().secondaryText_M}
                        />
                    </View>
                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().py24, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween]}>
                        <CustomText
                            tittle={'Your emai'}
                            customStyle={SharedStyles.styles().primaryText_M}
                        />
                        <CustomText
                            tittle={appointmentDetails?.memberDetails?.email}
                            customStyle={SharedStyles.styles().secondaryText_M}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

export default BookedApptInfo;


import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import SharedStyles from "../../res/SharedStyles";
import { SafeAreaView, View, ScrollView, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../components/atoms/Text";
import CustomHeader from "../../components/molecules/CustomHeader";
import { goToAppStack } from "../../navigations/NavigationService";
import routeNames from "../../navigations/route-names";
import PrimaryButton from "../../components/molecules/PrimaryButton";
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";
import { Switch } from 'react-native-switch';
import { Calendar } from 'react-native-calendars';
import { FETCH_MASTER_SCHEDULE_SUCCESSFUL, appointmentActions } from '../../redux/modules/appointment/actions';
import { calendarMarkedDays, getDateLabel, groupingScheduleSlots } from '../../constants/commonFunctions';
import * as appointmentService from './../../services/appointment/appointment.service';

const DateTimeFilterScreen = () => {
    const dispatch = useDispatch();
    const { appointmentDetails, services, paymentType } = useSelector((state) => state.appointment);
    const { appSettings } = useSelector(state => state.settings);
    const [masterSchedule, setMasterSchedule] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState();
    const [timeSlots, setTimeSlots] = useState([]);
    const [availableProviders, setAvailableProviders] = useState([]);
    const selectedDateAvailableSlots = timeSlots.find(t => selectedDate.isSame(dayjs(t.date), 'day'));
    const [filter, setFilter] = useState({
        before9AM: true,
        btwn9AMTo12PM: true,
        btwn12PMTo3PM: true,
        btwn3PMTo5PM: true,
        after5PM: true,
        insurance: true,
        cashPayment: paymentType === 'CASH',
    });

    const clearMasterSchedule = () => {
        dispatch({
            type: FETCH_MASTER_SCHEDULE_SUCCESSFUL,
            payload: {
                data: [],
            },
        });
    };

    const onChangeDate = useCallback(date => {
        setSelectedDate(dayjs(date?.dateString));
    }, []);

    const onFetchSlots = useCallback(async () => {
        const providerIds = services.providerServices.map(
            providerService => providerService.providerId,
        );
        const commaSeparatedParticipantIds = providerIds.join(',');
        const queryParams = {
            participantIds: commaSeparatedParticipantIds,
            viewProviderDetails: true,
            viewInsurances: true,
            startDate: selectedDate.startOf('month').format('DD-MM-YYYY'),
            endDate: selectedDate.endOf('month').format('DD-MM-YYYY'),
            state: appSettings?.state,
            duration: services?.duration,
        };
        const { data } = await appointmentService.getAvailableSlots(queryParams);
        setMasterSchedule(data?.results);
    }, [selectedMonth, services]);

    const scheduledDays = useMemo(() => {
        const availableDays = [];
        timeSlots.map(t => {
            if (t.slots.length > 0) {
                const anySlotAvailableForInsurance = t.slots.some(slot => slot.availableForInsurance);
                return availableDays.push({ date: t.date, availableForInsurance: anySlotAvailableForInsurance });
            }
        });

        return availableDays;
    }, [timeSlots]);

    const filterByAppliedFilters = start => {
        const dayStart = dayjs(start).startOf('day');
        const filters = [];
        if (!filter.before9AM) {
            // return that start is not before 9am
            filters.push(dayjs(start).isAfter(dayStart.set('hour', 9).set('minute', 0).set('second', 0)));
        }
        if (!filter.btwn9AMTo12PM) {
            // return that start is not after 9am and before 12pm
            filters.push(
                dayjs(start).isBefore(dayStart.set('hour', 9).set('minute', 0).set('second', 0)) ||
                dayjs(start).isAfter(dayStart.set('hour', 12).set('minute', 0).set('second', 0))
            );
        }
        if (!filter.btwn12PMTo3PM) {
            // return that start is not between 12pm and 3pm
            filters.push(
                dayjs(start).isBefore(dayStart.set('hour', 12).set('minute', 0).set('second', 0)) ||
                dayjs(start).isAfter(dayStart.set('hour', 15).set('minute', 0).set('second', 0))
            );
        }
        if (!filter.btwn3PMTo5PM) {
            // return that start is not between 3pm and 5pm
            filters.push(
                dayjs(start).isBefore(dayStart.set('hour', 15).set('minute', 0).set('second', 0)) ||
                dayjs(start).isAfter(dayStart.set('hour', 17).set('minute', 0).set('second', 0))
            );
        }
        if (!filter.after5PM) {
            // return that start is not after 5pm
            filters.push(dayjs(start).isBefore(dayStart.set('hour', 17).set('minute', 0).set('second', 0)));
        }
        if (filters.length === 0) {
            return [false];
        }
        return filters.every(Boolean);
    };

    useEffect(() => {
        let availabilities = masterSchedule;
        if (!availabilities.length) {
            availabilities = [];
        }
        let filteredProviders = availabilities?.map(schedule => {
            if (paymentType === 'CASH' || !filter.insurance) {
                return schedule;
            } else {
                const acceptsCurrentInsurance = schedule.providerDetailsDto.insuranceDetails.some(
                    entry =>
                        entry.state === appSettings?.state &&
                        entry.insurances.some(
                            insurance => insurance.name === appointmentDetails.insurance.name.replaceAll('-', ' ')
                        )
                );
                return {
                    ...schedule,
                    providerDetailsDto: {
                        ...schedule.providerDetailsDto,
                        acceptsCurrentInsurance,
                    },
                };
            }
        });
        if (!filter.cashPayment) {
            filteredProviders = filteredProviders.filter(
                provider => provider.providerDetailsDto.acceptsCurrentInsurance
            );
        }
        setAvailableProviders(filteredProviders);
        let uniqueSlots = filteredProviders.reduce((slots, matchmaker) => {
            matchmaker.slots.forEach(slot => {
                const existingSlot = slots.find(s => s.start === slot.start && s.end === slot.end);
                if (!existingSlot) {
                    slots.push({
                        start: slot.start,
                        end: slot.end,
                        availableForInsurance: matchmaker.providerDetailsDto.acceptsCurrentInsurance,
                    });
                }
            });
            return slots;
        }, []);
        const firstSlot = uniqueSlots.sort((a, b) => dayjs(a.start).unix() - dayjs(b.start).unix())[0];
        if (firstSlot) {
            setSelectedDate(dayjs(firstSlot.start));
        }
        /* if (
            paymentMethod === 'insurance' &&
            uniqueSlots.length === 0 &&
            !filter.cashPayment &&
            availabilities.length > 0
        ) {
            dispatch(
                showSnackbar({
                    snackType: 'warning',
                    snackMessage:
                        'No insurance slots available. Please switch on cash payment filter to see available slots on cash.',
                })
            );
        } */

        uniqueSlots = uniqueSlots.filter(slot => {
            return filterByAppliedFilters(slot.start);
        });

        const groupedObjects = groupingScheduleSlots(uniqueSlots);
        const slots = [];
        groupedObjects.forEach(daySlots => {
            const dateISO = dayjs(daySlots.date, 'YYYY-MM-DD').toISOString();
            const slotsFormatted = daySlots.slots.map(item => ({
                startTime: item.start,
                endTime: item.end,
                availableForInsurance: item.availableForInsurance,
            }));

            if (slotsFormatted.length) {
                slots.push({
                    date: dateISO,
                    slots: slotsFormatted,
                });
            }
        });
        const sorted = slots.sort(
            (a, b) => dayjs(a.date, 'YYYY-MM-DD').unix() - dayjs(b.date, 'YYYY-MM-DD').unix()
        );
        setTimeSlots(sorted);
    }, [masterSchedule, filter]);


    useEffect(() => {
        setSelectedMonth(selectedDate.month());
    }, [selectedDate]);

    useEffect(() => {
        setSelectedSlot(null);
        onFetchSlots();
    }, [selectedMonth]);

    const renderSlots = (item) => {
        return (
            <View style={{ display: 'flex', gap: 12 }}>
                <TouchableOpacity
                    onPress={() => {
                        setSelectedSlot(item);
                        const filteredProviders = availableProviders.filter(provider => {
                            return provider.slots.some(slot => {
                                return slot.start === item.startTime && slot.end === item.endTime;
                            });
                        });
                        dispatch(appointmentActions.selectedTimeSlot(item));
                        dispatch(appointmentActions.providers(filteredProviders));
                    }}
                    style={item.startTime === selectedSlot?.startTime ? styles.checked : styles.unChecked}
                >
                    {item.startTime === selectedSlot?.startTime && <SvgXml xml={svgs.slotTickIcon()} style={styles.iconPosition} />}
                    <CustomText
                        tittle={dayjs(item.startTime).format('h:mm a')}
                        customStyle={styles.checkedText}
                    />
                </TouchableOpacity>
                {item.startTime === selectedSlot?.startTime && (
                    <PrimaryButton
                        text={'Continue'}
                        btnContainerStyl={{ marginBottom: 32 }}
                        onPressHandler={() => {
                            goToAppStack(routeNames.SelectProviderScreen)
                        }} />
                )}
            </View>
        );
    };
    return (
        <SafeAreaView style={[SharedStyles.styles().flex1]}>
            <LinearGradient colors={['#F5FAFF', '#fff']}
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                style={SharedStyles.styles().flex1}>
                <CustomHeader redirectIn={'4 min 30 sec'} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[SharedStyles.styles().selfCenter, { maxWidth: '100%', paddingHorizontal: 64, paddingVertical: 64 }]}>
                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap80]}>
                            <CustomText
                                tittle={'When would you like your\n appointment?'}
                                numberOfLines={3}
                                customStyle={[SharedStyles.styles().titleText, SharedStyles.styles().textCenter]}
                            />
                            <View style={[SharedStyles.styles().hStack]}>
                                <View style={{ width: '65%', paddingRight: 20 }}>
                                    <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap40]}>
                                        <Calendar
                                            // Customize the appearance of the calendar
                                            theme={{
                                                calendarBackground: 'transparent',
                                                todayTextColor: '#000000',
                                                todayBackgroundColor: 'transparent',
                                                textDayFontFamily: 'Inter-Medium',
                                                'stylesheet.calendar.header': {
                                                    monthText: {
                                                        fontSize: 16,
                                                        lineHeight: 16,
                                                        fontFamily: 'Inter-Medium',
                                                        color: '#0D0F11',
                                                    },
                                                    dayHeader: {
                                                        paddingHorizontal: 13,
                                                        paddingVertical: 8,
                                                        marginBottom: 4,
                                                        textAlign: 'center',
                                                        fontSize: 14,
                                                        fontFamily: 'Inter-Medium',
                                                        color: '#666E77',
                                                    },
                                                    arrowImage: {
                                                        tintColor: '#B4BCC3'
                                                    }
                                                },
                                                'stylesheet.calendar.main': {
                                                    week: {
                                                        marginTop: 4,
                                                        marginBottom: 4,
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-around',
                                                    },
                                                },
                                                'stylesheet.day.basic': {
                                                    text: {
                                                        fontSize: 16,
                                                        lineHeight: 56,
                                                        color: '#0D0F11',
                                                        fontFamily: 'Inter-Regular',
                                                    },
                                                    base: {
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flex: 1,
                                                        width: 56,
                                                        height: 56,
                                                        borderWidth: 1,
                                                        borderStyle: 'solid',
                                                        borderColor: 'transparent',
                                                        borderRadius: 9999,
                                                    },
                                                    today: {
                                                        backgroundColor: 'transparent',
                                                        // borderColor: '#0374DD',
                                                        fontFamily: 'Inter-Medium',
                                                    },
                                                    selected: {
                                                        borderWidth: 1,
                                                        borderStyle: 'solid',
                                                        borderColor: 'transparent',
                                                        backgroundColor: 'transparent',
                                                        borderRadius: 9999,
                                                        fontFamily: 'Inter-Medium',
                                                    },
                                                },
                                            }}
                                            // Specify the current date
                                            // current={selectedDate.format('YYYY-MM-DD')}
                                            // Callback that gets called when the user selects a day
                                            onDayPress={onChangeDate}

                                            onMonthChange={(date) => setSelectedDate(dayjs(date.dateString))}
                                            hideExtraDays={true}
                                            firstDay={1}
                                            // Mark specific dates as marked
                                            markedDates={{
                                                ...calendarMarkedDays(scheduledDays),
                                                [selectedDate.format('YYYY-MM-DD')]: { selected: true, selectedTextColor: 'white', selectedColor: '#0374DD' },
                                            }}
                                        />
                                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                                            <View style={[SharedStyles.styles().borderBottom1, SharedStyles.styles().borderColor]}></View>
                                            <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap32, SharedStyles.styles().alignCenter]}>
                                                <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap12, SharedStyles.styles().alignCenter]}>
                                                    <TouchableOpacity onPress={() => { }} style={styles.cashUnchecked}></TouchableOpacity>
                                                    <CustomText
                                                        tittle={'Cash pay'}
                                                        customStyle={[SharedStyles.styles().secondaryText_S]}
                                                    />
                                                </View>
                                                <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap12, SharedStyles.styles().alignCenter]}>
                                                    <TouchableOpacity onPress={() => { }} style={styles.insuranceUnchecked}></TouchableOpacity>
                                                    <CustomText
                                                        tittle={'Insurance appointment available'}
                                                        customStyle={[SharedStyles.styles().secondaryText_S]}
                                                    />
                                                </View>
                                            </View>
                                            <View style={[SharedStyles.styles().borderBottom1, SharedStyles.styles().borderColor]}></View>
                                        </View>
                                        <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap64]}>
                                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                                                <CustomText
                                                    tittle={'By available slots'}
                                                    customStyle={SharedStyles.styles().primaryText_M}
                                                />
                                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().alignCenter]}>
                                                        <Switch
                                                            value={filter.before9AM}
                                                            onValueChange={() => setFilter({ ...filter, before9AM: !filter.before9AM })}
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
                                                            tittle={'Before 9am'}
                                                            customStyle={[SharedStyles.styles().secondaryText_M]}
                                                        />
                                                    </View>
                                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().alignCenter]}>
                                                        <Switch
                                                            value={filter.btwn9AMTo12PM}
                                                            onValueChange={() => setFilter({ ...filter, btwn9AMTo12PM: !filter.btwn9AMTo12PM })}
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
                                                            tittle={'9am - 12pm'}
                                                            customStyle={[SharedStyles.styles().secondaryText_M]}
                                                        />
                                                    </View>
                                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().alignCenter]}>
                                                        <Switch
                                                            value={filter.btwn12PMTo3PM}
                                                            onValueChange={() => setFilter({ ...filter, btwn12PMTo3PM: !filter.btwn12PMTo3PM })}
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
                                                            tittle={'12pm - 3pm'}
                                                            customStyle={[SharedStyles.styles().secondaryText_M]}
                                                        />
                                                    </View>
                                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().alignCenter]}>
                                                        <Switch
                                                            value={filter.btwn3PMTo5PM}
                                                            onValueChange={() => setFilter({ ...filter, btwn3PMTo5PM: !filter.btwn3PMTo5PM })}
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
                                                            tittle={'3pm - 5pm'}
                                                            customStyle={[SharedStyles.styles().secondaryText_M]}
                                                        />
                                                    </View>
                                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().alignCenter]}>
                                                        <Switch
                                                            value={filter.after5PM}
                                                            onValueChange={() => setFilter({ ...filter, after5PM: !filter.after5PM })}
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
                                                            tittle={'After 5pm'}
                                                            customStyle={[SharedStyles.styles().secondaryText_M]}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                                                <CustomText
                                                    tittle={'By payment method'}
                                                    customStyle={SharedStyles.styles().primaryText_M}
                                                />
                                                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap24]}>
                                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().alignCenter]}>
                                                        <Switch
                                                            value={paymentType === 'CASH' ? false : filter.insurance}
                                                            onValueChange={() => setFilter({ ...filter, insurance: !filter.insurance })}
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
                                                            disabled={paymentType === 'CASH'}
                                                        />
                                                        <CustomText
                                                            tittle={'Insurance'}
                                                            customStyle={[SharedStyles.styles().secondaryText_M]}
                                                        />
                                                    </View>
                                                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap16, SharedStyles.styles().alignCenter]}>
                                                        <Switch
                                                            value={filter.cashPayment}
                                                            onValueChange={() => setFilter({ ...filter, cashPayment: !filter.cashPayment })}
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
                                                            tittle={'Cash payment'}
                                                            customStyle={[SharedStyles.styles().secondaryText_M]}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '45%', paddingLeft: 0 }}>
                                    {selectedDateAvailableSlots && selectedDateAvailableSlots?.slots?.length > 0 ? (
                                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap32]}>
                                            <CustomText
                                                tittle={getDateLabel(selectedDateAvailableSlots.date, 'MMMM DD, YYYY')}
                                                customStyle={[SharedStyles.styles().primaryText_M, SharedStyles.styles().py8]}
                                            />
                                            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap12, SharedStyles.styles().alignCenter, { marginLeft: -70, height: 750 }]}>
                                                <ScrollView showsVerticalScrollIndicator={false}>
                                                    {selectedDateAvailableSlots?.slots?.map(item => (
                                                        <View key={item.startTime} style={{ paddingTop: 12/* , paddingBottom: 10  */}}>
                                                            {renderSlots(item)}
                                                        </View>
                                                    ))}
                                                </ScrollView>
                                                {/*  <FlatList
                                                    data={selectedDateAvailableSlots?.slots}
                                                    keyExtractor={(item) => item.startTime}
                                                    renderItem={renderInsuarnces}
                                                    ItemSeparatorComponent={() => <View style={{height: 12 }} />}
                                                /> */}
                                            </View>
                                        </View>
                                    ) : (
                                        <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap32]}>
                                            <CustomText
                                                tittle={'No time slots available'}
                                                customStyle={[SharedStyles.styles().primaryText_M, SharedStyles.styles().p20]}
                                            />
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default DateTimeFilterScreen

const styles = StyleSheet.create({
    unChecked: {
        ...SharedStyles.styles().touchableSlotBox,
        ...SharedStyles.styles().hStack,
        ...SharedStyles.styles().alignCenter,
        ...SharedStyles.styles().gap12,
        width: '100%'
    },
    checked: {
        ...SharedStyles.styles().touchableSlotBox,
        ...SharedStyles.styles().hStack,
        ...SharedStyles.styles().alignCenter,
        ...SharedStyles.styles().gap12,
        width: '100%',
        borderWidth: 2,
        borderColor: '#0374DD',
        marginTop: 32,
    },
    unCheckedText: {
        ...SharedStyles.styles().primaryText_S,
        ...SharedStyles.styles().textCenter,
        lineHeight: 16,
    },
    checkedText: {
        ...SharedStyles.styles().primaryText_S,
        ...SharedStyles.styles().textCenter,
        fontFamily: 'Inter-Regular',
        // color: '#005DB4',
        fontWeight: 400,
        lineHeight: 16,
    },
    iconPosition: {
        position: "absolute",
        left: 16,
    },
    cashUnchecked: {
        ...SharedStyles.styles().radioBtnBox,
        borderColor: '#70E377',
        backgroundColor: '#EBFDE8'
    },
    cashChecked: {
        ...SharedStyles.styles().radioBtnBox,
        borderColor: '#70E377',
        backgroundColor: '#70E377'
    },
    insuranceUnchecked: {
        ...SharedStyles.styles().radioBtnBox,
        borderColor: '#95CCFF',
        backgroundColor: '#E8F4FF'
    },
    insuranceChecked: {
        ...SharedStyles.styles().radioBtnBox,
        borderColor: '#95CCFF',
        backgroundColor: '#95CCFF'
    },
});


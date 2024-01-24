import React from "react";
import { View } from "react-native";
import { navStyles } from "./NavigationTypes";
import Routes from './route-names';
import HomeScreen from "../screens/AppStackScreens/HomeScreen";
import SettingsScreen from "../screens/AppStackScreens/SettingsScreen";
import SendSMSScreen from "../screens/AppStackScreens/SendSMSScreen";
import SelectProviderScreen from "../screens/AppStackScreens/SelectProviderScreen";
import QRCodeScreen from "../screens/AppStackScreens/QRCodeScreen";
import PersonalInfoScreen from "../screens/AppStackScreens/PersonalInfoScreen";
import PaymentTypeScreen from "../screens/AppStackScreens/PaymentTypeScreen";
import InsuranceVerifiedScreen from "../screens/AppStackScreens/InsuranceVerifiedScreen";
import InsuranceTypeScreen from "../screens/AppStackScreens/InsuranceTypeScreen";
import InsuranceMemberIDScreen from "../screens/AppStackScreens/InsuranceMemberIDScreen";
import DateTimeFilterScreen from "../screens/AppStackScreens/DateTimeFilterScreen";
import ConsentScreen from "../screens/AppStackScreens/ConsentScreen ";
import ConfirmPayScreen from "../screens/AppStackScreens/ConfirmPayScreen";
import AppointmentBookedScreen from "../screens/AppStackScreens/AppointmentBookedScreen";
import AccessSettingScreen from "../screens/AppStackScreens/AccessSettingScreen";
import AppointmentTypeScreen from "../screens/AppStackScreens/AppointmentTypeScreen";


const APP_ROUTES = {
    "HomeScreen": {
        screen_name: Routes.HomeScreen,
        options: undefined,
        component: HomeScreen
    },
    "AccessSettingScreen": {
        screen_name: Routes.AccessSettingScreen,
        options: undefined,
        component: AccessSettingScreen
    },
    "AppointmentBookedScreen": {
        screen_name: Routes.AppointmentBookedScreen,
        options: undefined,
        component: AppointmentBookedScreen
    },
    "ConfirmPayScreen": {
        screen_name: Routes.ConfirmPayScreen,
        options: undefined,
        component: ConfirmPayScreen
    },
    "ConsentScreen": {
        screen_name: Routes.ConsentScreen,
        options: undefined,
        component: ConsentScreen
    },
    "DateTimeFilterScreen": {
        screen_name: Routes.DateTimeFilterScreen,
        options: undefined,
        component: DateTimeFilterScreen
    },
    "InsuranceMemberIDScreen": {
        screen_name: Routes.InsuranceMemberIDScreen,
        options: undefined,
        component: InsuranceMemberIDScreen
    },
    "InsuranceTypeScreen": {
        screen_name: Routes.InsuranceTypeScreen,
        options: undefined,
        component: InsuranceTypeScreen
    },
    "InsuranceVerifiedScreen": {
        screen_name: Routes.InsuranceVerifiedScreen,
        options: undefined,
        component: InsuranceVerifiedScreen
    },
    "PaymentTypeScreen": {
        screen_name: Routes.PaymentTypeScreen,
        options: undefined,
        component: PaymentTypeScreen
    },
    "PersonalInfoScreen": {
        screen_name: Routes.PersonalInfoScreen,
        options: undefined,
        component: PersonalInfoScreen
    },
    "QRCodeScreen": {
        screen_name: Routes.QRCodeScreen,
        options: undefined,
        component: QRCodeScreen
    },
    "SelectProviderScreen": {
        screen_name: Routes.SelectProviderScreen,
        options: undefined,
        component: SelectProviderScreen
    },
    "SendSMSScreen": {
        screen_name: Routes.SendSMSScreen,
        options: undefined,
        component: SendSMSScreen
    },
    "SettingsScreen": {
        screen_name: Routes.SettingsScreen,
        options: undefined,
        component: SettingsScreen
    },
    "AppointmentTypeScreen": {
        screen_name: Routes.AppointmentTypeScreen,
        options: undefined,
        component: AppointmentTypeScreen
    },



}




const APP_STACKS = Object.keys(APP_ROUTES).map((key, index) => ({
    id: `init-${index}-${key}`,
    screen_name: APP_ROUTES[key].screen_name,
    component: APP_ROUTES[key].component
}))

export default {
    APP_ROUTES,
    APP_STACKS,
 
}


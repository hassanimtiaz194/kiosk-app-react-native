import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity, View, Text } from "react-native";
import SharedStyles from "../../res/SharedStyles";
import { goBack, goToAppStack } from "../../navigations/NavigationService";
import { SvgXml } from "react-native-svg";
import sharedStyles from "../../res/SharedStyles";
import svgs from "../../assets/svgs";
import routeNames from "../../navigations/route-names";
import { settingsActions } from "../../redux/modules/settings/actions";


const CustomHeader = ({
    rightText = true,
    redirectIn = '',
    defaultMinutes = 2,
    onPressHandler = () => { },
}) => {
    const { isBookAppointment } = useSelector(state => state.appointment)
    const { isResetTimer } = useSelector(state => state.settings)
    const dispatch = useDispatch();
    const [seconds, setSeconds] = useState(defaultMinutes * 60);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => { dispatch(settingsActions.resetTimer(true)); }, []);

    useEffect(() => {
        if (isResetTimer) {
            dispatch(settingsActions.resetTimer(false));
            setSeconds(defaultMinutes * 60);
        }
    }, [isResetTimer]);

    useEffect(() => {
        const id = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        setIntervalId(id);

        return () => {
            clearInterval(id);
        };
    }, [seconds]);

    useEffect(() => {
        // console.log(seconds);
        if (seconds === 0) {
            clearInterval(intervalId);
            if (isBookAppointment) goToAppStack(routeNames.HomeScreen);
        }
    }, [seconds, intervalId]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const left = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                    dispatch(settingsActions.resetTimer(true));
                    goBack();
                }}
                style={sharedStyles.styles().backIconBox}
            >
                <SvgXml xml={svgs.arrowLeft()} />
            </TouchableOpacity>
        )
    }
    const right = () => {

        return (
            <>
                {rightText &&
                    <Text style={sharedStyles.styles().secondaryText_M}>
                        Redirect in <Text style={sharedStyles.styles().primaryText_M}>{`${minutes} min ${remainingSeconds} sec`}</Text>
                    </Text>
                }
            </>
        )
    }
    return (
        <View style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter, SharedStyles.styles().justifyBetween, SharedStyles.styles().px24, SharedStyles.styles().py16, SharedStyles.styles().borderBottom1, SharedStyles.styles().borderColor]}>
            {left()}
            {right()}
        </View>
    );
}

export default CustomHeader;


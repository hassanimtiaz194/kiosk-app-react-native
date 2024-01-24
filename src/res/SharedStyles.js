import { Platform, StyleSheet } from "react-native"

export default {
    styles(isDisable = false) {
        return StyleSheet.create({
            // Typography styles
            titleText: {
                fontFamily: 'Manrope-Light',
                fontSize: 40,
                // fontWeight: '300',
                lineHeight: 52,
                color: "#0D0F11"
            },
            primaryText_XS: {
                fontFamily: 'Inter-Medium',
                fontSize: 13,
                // fontWeight: '500',
                lineHeight: 16,
                color: "#0D0F11"
            },
            primaryText_S: {
                fontFamily: 'Inter-Regular',
                fontSize: 14,
                // fontWeight: '400',
                lineHeight: 20,
                color: "#0D0F11"
            },
            primaryText_SM: {
                fontFamily: 'Inter-SemiBold',
                fontSize: 15,
                // fontWeight: '600',
                lineHeight: 20,
                color: "#0D0F11"
            },
            primaryText_M: {
                fontFamily: 'Inter-Medium',
                fontSize: 16,
                // fontWeight: '500',
                lineHeight: 16,
                color: "#0D0F11"
            },
            primaryText_L: {
                fontFamily: 'Inter-Medium',
                fontSize: 18,
                // fontWeight: '500',
                lineHeight: 24,
                color: "#0D0F11"
            },
            primaryText_XL: {
                fontFamily: 'Inter-SemiBold',
                fontSize: 24,
                // fontWeight: '600',
                lineHeight: 32,
                letterSpacing: -0.24,
                color: "#0D0F11"
            },
            primaryText_XXL: {
                fontFamily: 'Inter-Bold',
                fontSize: 32,
                // fontWeight: '700',
                lineHeight: 40,
                letterSpacing: -0.64,
                color: "#0D0F11"
            },
            secondaryText_XS: {
                fontFamily: 'Inter-Regular',
                fontSize: 13,
                // fontWeight: '400',
                lineHeight: 18,
                color: "#373E44"
            },
            secondaryText_S: {
                fontFamily: 'Inter-Regular',
                fontSize: 14,
                // fontWeight: '400',
                lineHeight: 16,
                color: "#373E44"
            },
            secondaryText_M: {
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                // fontWeight: '400',
                lineHeight: 16,
                color: "#373E44"
            },
            tertiaryText_XXS: {
                fontFamily: 'Inter-Regular',
                fontSize: 13,
                // fontWeight: '400',
                lineHeight: 18,
                color: "#666E77",
            },
            tertiaryText_XS: {
                fontFamily: 'Inter-SemiBold',
                fontSize: 13,
                // fontWeight: '600',
                lineHeight: 16,
                color: "#666E77",
                letterSpacing: 0.39
            },
            tertiaryText_S: {
                fontFamily: 'Inter-Regular',
                fontSize: 14,
                // fontWeight: '400',
                lineHeight: 16,
                color: "#666E77"
            },
            tertiaryText_M: {
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                // fontWeight: '500',
                lineHeight: 24,
                color: "#666E77"
            },
            tertiaryText_L: {
                fontFamily: 'Inter-Regular',
                fontSize: 18,
                // fontWeight: '500',
                lineHeight: 32,
                color: "#666E77"
            },
            linkText_S: {
                fontFamily: 'Inter-Regular',
                fontSize: 14,
                // fontWeight: '400',
                lineHeight: 20,
                color: "#0269CA"
            },
            linkText_SM: {
                fontFamily: 'Inter-SemiBold',
                fontSize: 16,
                // fontWeight: '600',
                lineHeight: 24,
                color: "#0269CA"
            },
             linkText_L: {
                fontFamily: 'Inter-SemiBold',
                fontSize: 16,
                // fontWeight: '500',
                lineHeight: 24,
                color: '#005DB4',
            },
            acceptsText_XS: {
                fontFamily: 'Inter-SemiBold',
                fontSize: 13,
                // fontWeight: '500',
                lineHeight: 18,
                color: '#0D753B',
            },
            // UI styles
            dropDownIconStyle: {
                width: 28,
                height: 28,
                tintColor: '#373E44'
            },

            radioBtnBox: {
                width: 16,
                height: 16,
                borderRadius: 999,
                borderWidth: 1,
                borderStyle: 'solid',
            },
            backIconBox: {
                width: 44,
                height: 44,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#D0D6DD'
            },
            settingIconBox: {
                width: 56,
                height: 56,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#D0D6DD'
            },
            ccIconBox:{
                width: 46,
                height: 32,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#E0E6EB',
                backgroundColor: '#fff'
            },
            touchableSlotBox: {
                backgroundColor: '#fff',
                borderRadius: 6,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#D0D6DD',
                paddingHorizontal: 16,
                paddingVertical: 16,
                shadowColor: "rgba(2, 3, 3, 0.4)",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
                alignItems: 'center',
                justifyContent: 'center'
            },
            touchableBox: {
                backgroundColor: '#fff',
                borderRadius: 12,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#E0E6EB',
                paddingHorizontal: 32,
                paddingVertical: 16,
                shadowColor: "rgba(2, 3, 3, 0.4)",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
                alignItems: 'center',
                justifyContent: 'center'
            },
            cardWrapper: {
                backgroundColor: '#fff',
                borderRadius: 8,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: '#D0D6DD',
                shadowColor: "rgba(2, 3, 3, 0.4)",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
            },
            selectedCardWrapper: {
                borderWidth: 2,
                borderColor: '#0374DD',
                elevation: 0,
            },
            whiteIconColor: {
                color: "#373E44"
            },
            tertiaryIconColor: {
                color: "#373E44"
            },
            actionIconColor: {
                color: "#0374DD"
            },
            whiteColor: {
                color: "#fff"
            },
            actionIconDark: {
                color: "#0374DD"
            },
            inputSearchIconColor: {
                color: "#B4BCC3"
            },
            availableIconColor: {
                color: "#1AA33C"
            },
            CompletedIconColor: {
                color: "#138C3C"
            },
            notAvailableIconColor: {
                color: "#7E8790"
            },
            primaryIconColor: {
                color: "#0374DD"
            },
            screenWrapper: {
                // backgroundColor: '#F5FAFF',
                // // paddingBottom: 32,
                flex: 1,
            },
            flex1: {
                flex: 1,
                width: '100%',
                height: '100%'
            },
            borderBottom1: {
                borderBottomWidth: 1
            },
            borderTop1: {
                borderTopWidth: 1
            },
            borderDashed: {
                borderStyle: 'dashed'
            },
            border1: {
                borderWidth: 1
            },
            borderColor: {
                borderColor: '#E0E6EB'
            },
            dashedBorderBottom1: {
                borderBottomWidth: 1,
                width: '100%',
                borderColor: '#D0D6DD',
                borderStyle: 'dashed'
            },
            dot: {
                width: 8,
                height: 8,
                borderRadius: 100,
                backgroundColor: "#D0D6DD"
            },
            statusDot: {
                width: 18,
                height: 18,
                borderRadius: 100,
            },
            levelWrapper: {
                position: 'absolute',
                top: 6,
                width: 12,
                height: 183,
            },
            levelDot: {
                width: 12,
                height: 12,
                borderRadius: 100,
                backgroundColor: "#E0E6EB",
            },
            levelDotTop: {
                position: 'absolute',
                top: 0
            },
            levelDotBottom: {
                position: 'absolute',
                bottom: 0
            },
            levelLine: {
                width: 2,
                height: '100%',
                backgroundColor: "#E0E6EB",
                left: 5.2,
                position: 'absolute',
            },
            slotBoxWrapper: {
                padding: 8,
                height: 32,
                // width: '47.57%',
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#D0D6DD",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 8,
            },
            filterBoxWrapper: {
                paddingVertical: 8,
                paddingHorizontal: 12,
                height: 52,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#0D0F11",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: '#fff'
            },
            chatBoxBadgeWrapper: {
                paddingTop: 4,
                paddingBottom: 4,
                paddingLeft: 8,
                paddingRight: 8,
                height: 32,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#D0D6DD",
                alignItems: "center",
                justifyContent: "center"
            },
            notesIconBox: {
                width: 40,
                height: 40,
                borderStyle: 'solid',
                borderWidth: 1,
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "center"
            },
            notesGeneralIconBox: {
                borderColor: '#A5F3FC',
                backgroundColor: '#ECFEFF',
            },
            notesCaitionaryIconBox: {
                borderColor: '#A5F3FC',
                backgroundColor: '#ECFEFF',
            },
            notesContactIconBox: {
                borderColor: '#A5F3FC',
                backgroundColor: '#ECFEFF',
            },
            notesLablIconBox: {
                borderColor: '#A5F3FC',
                backgroundColor: '#ECFEFF',
            },
            notesPharmacylIconBox: {
                borderColor: '#A5F3FC',
                backgroundColor: '#ECFEFF',
            },
            notesPriorAuthorizationlIconBox: {
                borderColor: '#95CCFF',
                backgroundColor: '#E8F4FF',
            },
            notesProhibitivelIconBox: {
                borderColor: '#A5F3FC',
                backgroundColor: '#ECFEFF',
            },
            notesReferalIconBox: {
                borderColor: '#A5F3FC',
                backgroundColor: '#ECFEFF',
            },
            notesReleaselIconBox: {
                borderColor: '#A5F3FC',
                backgroundColor: '#ECFEFF',
            },
            settingCheckIconBox: {
                width: 32,
                height: 32,
                backgroundColor: '#fff',
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#D0D6DD',
                alignItems: "center",
                justifyContent: "center"
            },

            checkIconBox: {
                width: 24,
                height: 24,
                backgroundColor: '#fff',
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#D0D6DD',
                alignItems: "center",
                justifyContent: "center"
            },
            iconBox: {
                width: 48,
                height: 48,
                backgroundColor: '#E8F4FF',
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center"
            },
            iconBoxWhite: {
                width: 48,
                height: 48,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#E0E6EB',
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center"
            },
            userImageLarge: {
                width: 80,
                height: 80,
                borderRadius: 8,
            },
            userImageMedium: {
                width: 48,
                height: 48,
                borderRadius: 6,
            },
            userImageSmall: {
                width: 36,
                height: 36,
                borderRadius: 4,
            },
            userImageXS: {
                width: 32,
                height: 32,
                borderRadius: 4,
            },
            userImageChat: {
                width: 40,
                height: 40,
                borderRadius: 4,
            },
            userAvatarWrapperLarge: {
                width: 80,
                height: 80,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
            },

            userAvatarWrapperMedium: {
                width: 48,
                height: 48,
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
            },
            userAvatarGroupWrapperSmall: {
                width: 40,
                height: 40,
                borderRadius: 999,
                borderWidth: 1.5,
                borderColor: '#fff',
                borderStyle: "solid",
                justifyContent: 'center',
                alignItems: 'center',
            },
            userAvatarWrapperSmall: {
                width: 36,
                height: 36,
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
            },
            userAvatarWrapperXS: {
                width: 32,
                height: 32,
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
            },
            userImageMediumChat: {
                width: 40,
                height: 40,
                borderRadius: 4,
            },
            userAvatarWrapperChat: {
                width: 40,
                height: 40,
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
            },
            modalContainer: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: 'absolute',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
            },
            modalBackdropOverlay: {
                backgroundColor: 'rgba(17, 28, 36, 0.40)',
                position: 'relative',
                width: '100%',
                height: '100%'
            },
            commonModalWrapper: {
                // position:'absolute',
                // bottom: 0,
                // width: '100%',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 44,
                backgroundColor: '#fff',
                zIndex: 999999
            },
            commonReactModalWrapper: {
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 44,
                backgroundColor: '#fff'
            },
            commonSwipeBar: {
                position: 'absolute',
                backgroundColor: 'rgba(17, 28, 36, 0.20)',
                width: 48,
                height: 4,
                borderRadius: 2,
                top: 8,
                alignSelf: 'center'
            },
            cardBadgeModal: {
                minWidth: 24,
                height: 24,
                backgroundColor: '#DD0374',
                color: '#fff',
                borderRadius: 12,
                textAlign: "center",
                justifyContent: "center",
                alignItems: 'center',
                lineHeight: 18,
                overflow: 'hidden',
                paddingLeft: 8,
                paddingRight: 8,
            },
            cardBadgeChat: {
                minWidth: 20,
                height: 20,
                backgroundColor: '#DD0374',
                color: '#fff',
                borderRadius: 12,
                textAlign: "center",
                justifyContent: "center",
                alignItems: 'center',
                overflow: 'hidden',
                paddingLeft: 6,
                paddingRight: 6,
            },
            navigationBadge: {
                minWidth: 24,
                height: 24,
                backgroundColor: '#DD0374',
                color: '#fff',
                borderRadius: 12,
                textAlign: "center",
                justifyContent: "center",
                alignItems: 'center',
                overflow: 'hidden',
                position: 'absolute',
                right: -12,
                top: -8,
                borderWidth: 3,
                borderColor: '#fff',
                borderStyle: 'Solid'
            },
            chatHeaderBadge: {
                minWidth: 31,
                height: 18,
                backgroundColor: '#0374DD',
                color: '#fff',
                borderRadius: 12,
                textAlign: "center",
                justifyContent: "center",
                alignItems: 'center',
                overflow: 'hidden',
                paddingLeft: 8,
                paddingRight: 8,
            },
            filterHeaderBadge: {
                minWidth: 20,
                height: 20,
                backgroundColor: '#DD0374',
                color: '#fff',
                borderRadius: 999,
                textAlign: "center",
                justifyContent: "center",
                alignItems: 'center',
                overflow: 'hidden',
                paddingLeft: 2,
                paddingRight: 2,
            },
            tagWrapper: {
                width: '100%',
                height: 200,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#E0E6EB',
                padding: 12,
                backgroundColor: '#fff',
                shadowColor: "rgba(2, 3, 3, 0.4)",
                elevation: 4,
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 2.62,
                shadowOpacity: 0.23,
            },
            joinChatWrapper: {
                borderColor: '#BEE0FF',
                borderWidth: 1,
                backgroundColor: '#E8F4FF',
                borderRadius: 100,
                paddingRight: 16,
                paddingLeft: 8,
                paddingVertical: 8,
            },
            // Form Elements styles
            searchBox: {
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#E0E6EB',
                borderRadius: 6,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12,
                height: 48,
                gap: 12
            },
            messageInputBox: {
                backgroundColor: '#fff',
                borderWidth: 1,
                width: '100%',
                borderColor: '#E0E6EB',
                borderRadius: 6,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12,
                gap: 12,
                height: 56
            },
            searchInput: {
                height: 48,
                width: '100%',
            },
            dropdownInputSearchStyle: {
                height: 56,
                borderColor: '#E0E6EB',
                borderRadius: 6,
            },
            inputWrapperLarge: {
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#E0E6EB',
                borderRadius: 6,
                padding: 16,
                justifyContent: 'center',
                height: 56,
                width: '100%',
            },
            inputWrapperLargeText: {
                fontFamily: 'Inter-SemiBold',
                fontSize: 24,
                // fontWeight: '600',
                lineHeight: 24,
                color: '#0D0F11',
            },
            inputWrapperRegularText: {
                fontFamily: 'Inter-Regular',
                fontSize: 14,
                // fontWeight: '600',
                lineHeight: 16,
                color: '#0D0F11',
            },
            inputWrapperPressed: {
                borderColor: '#0374DD',
                shadowColor: "#BEE0FF",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
            inputFieldLarge: {
                width: '100%',
                height: 56,
            },
            primaryButton: {
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                textAlign: 'center',
                gap: 8,
                backgroundColor: '#0374DD',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#0374DD',
                height: 56,
                width: '100%',
                borderRadius: 8,
                paddingLeft: 4,
                paddingRight: 4,
            },
            primaryButtonTextLarge: {
                fontFamily: 'Inter-SemiBold',
                fontSize: 16,
                // fontWeight: '600',
                lineHeight: 24,
                color: '#fff',
            },
            primaryButtonTextSmall: {
                fontFamily: 'Inter-SemiBold',
                fontSize: 14,
                // fontWeight: '600',
                lineHeight: 20,
                color: "#fff"
            },
            secondaryButton: {
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                textAlign: 'center',
                gap: 8,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#0374DD',
                height: 56,
                width: '100%',
                borderRadius: 8,
                paddingLeft: 4,
                paddingRight: 4,
            },
            secondaryButtonTextLarge: {
                fontFamily: 'Inter-SemiBold',
                fontSize: 16,
                // fontWeight: '600',
                lineHeight: 24,
                color: '#005DB4',
            },
            secondaryButtonTextSmall: {
                fontFamily: 'Inter-SemiBold',
                fontSize: 14,
                // fontWeight: '600',
                lineHeight: 20,
                color: "#005DB4"
            },
            deleteButton: {
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#DC2626',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#DC2626',
                height: 56,
                width: '100%',
                borderRadius: 8,
                paddingLeft: 24,
                paddingRight: 24,
            },
            disabledBtn: {
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F8FAFC',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#D0D6DD'
            },
            tertiaryButton: {
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                height: 44,
                borderRadius: 6,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#D0D6DD'
            },
            tertiaryButtonTextLarge: {
                fontFamily: 'Inter-SemiBold',
                fontSize: 16,
                // fontWeight: '600',
                lineHeight: 24,
                color: "#373E44"
            },
            tertiaryButtonTextSmall: {
                fontFamily: 'Inter-SemiBold',
                fontSize: 14,
                // fontWeight: '600',
                lineHeight: 20,
                color: "#373E44"
            },

            // Layout styles
            hStack: {
                flexDirection: "row"
            },
            vStack: {
                flexDirection: "column",
            },
            flexWrap: {
                flexWrap: "wrap",
            },
            alignStart: {
                alignItems: "flex-start",
            },
            alignCenter: {
                alignItems: "center",
            },
            textCenter: {
                textAlign: "center",
            },
            alignEnd: {
                alignItems: "flex-end",
            },
            alignBase: {
                alignItems: "baseline",
            },
            alignStretch: {
                alignItems: "stretch",
            },
            justifyStart: {
                justifyContent: "flex-start",
            },
            justifyCenter: {
                justifyContent: "center",
            },
            justifyEnd: {
                justifyContent: "flex-end",
            },
            justifyBetween: {
                justifyContent: "space-between",
            },
            justifyAround: {
                justifyContent: "space-around",
            },
            justifyEven: {
                justifyContent: "space-evenly",
            },
            alignSelfCenter:{
                alignSelf: 'center',
            },
            selfCenter:{
                maxWidth: 492,
                alignSelf: 'center',
                // alignContent: 'center',
                // justifyContent: 'center',
                flex: 1,
            },

            // Unit styles
            gap4: {
                gap: 4
            },
            gap8: {
                gap: 8
            },
            gap12: {
                gap: 12
            },
            gap16: {
                gap: 16
            },
            gap20: {
                gap: 20
            },
            gap24: {
                gap: 24
            },
            gap28: {
                gap: 28
            },
            gap32: {
                gap: 32
            },
            gap34: {
                gap: 34
            },
            gap36: {
                gap: 36
            },
            gap40: {
                gap: 40
            },
            gap48: {
                gap: 48
            },
            gap56: {
                gap: 56
            },
            gap64: {
                gap: 64
            },
            gap80: {
                gap: 80
            },
            gap120: {
                gap: 120
            },
            mt4: {
                marginTop: 4
            },
            mt8: {
                marginTop: 8
            },
            mt12: {
                marginTop: 12
            },
            mt16: {
                marginTop: 16
            },
            mt20: {
                marginTop: 20
            },
            mt24: {
                marginTop: 24
            },
            mt28: {
                marginTop: 28
            },
            mt32: {
                marginTop: 32
            },
            mt34: {
                marginTop: 34
            },
            mt36: {
                marginTop: 36
            },
            mt40: {
                marginTop: 40
            },
            mb4: {
                marginBottom: 4
            },
            mb8: {
                marginBottom: 8
            },
            mb12: {
                marginBottom: 12
            },
            mb16: {
                marginBottom: 16
            },
            mb20: {
                marginBottom: 20
            },
            mb24: {
                marginBottom: 24
            },
            mb28: {
                marginBottom: 28
            },
            mb32: {
                marginBottom: 32
            },
            mb34: {
                marginBottom: 34
            },
            mb36: {
                marginBottom: 36
            },
            mb40: {
                marginBottom: 40
            },
            mb56: {
                marginBottom: 56
            },
            mb64: {
                marginBottom: 64
            },
            mb80: {
                marginBottom: 80
            },
            ml4: {
                marginLeft: 4
            },
            ml8: {
                marginLeft: 8
            },
            ml12: {
                marginLeft: 12
            },
            ml16: {
                marginLeft: 16
            },
            ml20: {
                marginLeft: 20
            },
            ml24: {
                marginLeft: 24
            },
            ml28: {
                marginLeft: 28
            },
            ml32: {
                marginLeft: 32
            },
            ml34: {
                marginLeft: 34
            },
            ml36: {
                marginLeft: 36
            },
            ml40: {
                marginLeft: 40
            },
            mr4: {
                marginRight: 4
            },
            mr8: {
                marginRight: 8
            },
            mr12: {
                marginRight: 12
            },
            mr16: {
                marginRight: 16
            },
            mr20: {
                marginRight: 20
            },
            mr24: {
                marginRight: 24
            },
            mr28: {
                marginRight: 28
            },
            mr32: {
                marginRight: 32
            },
            mr34: {
                marginRight: 34
            },
            mr36: {
                marginRight: 36
            },
            mr40: {
                marginRight: 40
            },
            p4: {
                padding: 4
            },
            p8: {
                padding: 8
            },
            p12: {
                padding: 12
            },
            p16: {
                padding: 16
            },
            p20: {
                padding: 20
            },
            p24: {
                padding: 24
            },
            p28: {
                padding: 28
            },
            p32: {
                padding: 32
            },
            p34: {
                padding: 34
            },
            p36: {
                padding: 36
            },
            p40: {
                padding: 40
            },
            pt4: {
                paddingTop: 4
            },
            pt8: {
                paddingTop: 8
            },
            pt10: {
                paddingTop: 10
            },
            pt12: {
                paddingTop: 12
            },
            pt16: {
                paddingTop: 16
            },
            pt20: {
                paddingTop: 20
            },
            pt24: {
                paddingTop: 24
            },
            pt28: {
                paddingTop: 28
            },
            pt32: {
                paddingTop: 32
            },
            pt34: {
                paddingTop: 34
            },
            pt36: {
                paddingTop: 36
            },
            pt40: {
                paddingTop: 40
            },
            pb4: {
                paddingBottom: 4
            },
            pb8: {
                paddingBottom: 8
            },
            pb12: {
                paddingBottom: 12
            },
            pb16: {
                paddingBottom: 16
            },
            pb20: {
                paddingBottom: 20
            },
            pb24: {
                paddingBottom: 24
            },
            pb28: {
                paddingBottom: 28
            },
            pb32: {
                paddingBottom: 32
            },
            pb34: {
                paddingBottom: 34
            },
            pb36: {
                paddingBottom: 36
            },
            pb40: {
                paddingBottom: 40
            },
            pb70: {
                paddingBottom: 70
            },
            pb80: {
                paddingBottom: 80
            },
            pb100: {
                paddingBottom: 100
            },
            pl4: {
                paddingLeft: 4
            },
            pl8: {
                paddingLeft: 8
            },
            pl12: {
                paddingLeft: 12
            },
            pl16: {
                paddingLeft: 16
            },
            pl20: {
                paddingLeft: 20
            },
            pl24: {
                paddingLeft: 24
            },
            pl28: {
                paddingLeft: 28
            },
            pl32: {
                paddingLeft: 32
            },
            pl34: {
                paddingLeft: 34
            },
            pl36: {
                paddingLeft: 36
            },
            pl40: {
                paddingLeft: 40
            },
            pr4: {
                paddingRight: 4
            },
            pr8: {
                paddingRight: 8
            },
            pr12: {
                paddingRight: 12
            },
            pr16: {
                paddingRight: 16
            },
            pr20: {
                paddingRight: 20
            },
            pr24: {
                paddingRight: 24
            },
            pr28: {
                paddingRight: 28
            },
            pr32: {
                paddingRight: 32
            },
            pr34: {
                paddingRight: 34
            },
            pr36: {
                paddingRight: 36
            },
            pr40: {
                paddingRight: 40
            },
            px4: {
                paddingLeft: 4,
                paddingRight: 4
            },
            px8: {
                paddingLeft: 8,
                paddingRight: 8
            },
            px12: {
                paddingLeft: 12,
                paddingRight: 12
            },
            px16: {
                paddingLeft: 16,
                paddingRight: 16
            },
            px20: {
                paddingLeft: 20,
                paddingRight: 20
            },
            px24: {
                paddingLeft: 24,
                paddingRight: 24
            },
            px28: {
                paddingLeft: 28,
                paddingRight: 28
            },
            px32: {
                paddingLeft: 32,
                paddingRight: 32
            },
            px34: {
                paddingLeft: 34,
                paddingRight: 34
            },
            px36: {
                paddingLeft: 36,
                paddingRight: 36
            },
            px40: {
                paddingLeft: 40,
                paddingRight: 40
            },
            py4: {
                paddingTop: 4,
                paddingBottom: 4
            },
            py8: {
                paddingTop: 8,
                paddingBottom: 8
            },
            py10: {
                paddingTop: 10,
                paddingBottom: 10
            },
            py12: {
                paddingTop: 12,
                paddingBottom: 12
            },
            py16: {
                paddingTop: 16,
                paddingBottom: 16
            },
            py20: {
                paddingTop: 20,
                paddingBottom: 20
            },
            py24: {
                paddingTop: 24,
                paddingBottom: 24
            },
            py28: {
                paddingTop: 28,
                paddingBottom: 28
            },
            py32: {
                paddingTop: 32,
                paddingBottom: 32
            },
            py34: {
                paddingTop: 34,
                paddingBottom: 34
            },
            py36: {
                paddingTop: 36,
                paddingBottom: 36
            },
            py40: {
                paddingTop: 40,
                paddingBottom: 40
            },
        })
    }
}

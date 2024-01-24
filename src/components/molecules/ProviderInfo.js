import React from "react"
import { StyleSheet, View, Text, Image } from "react-native";
import CustomText from "../atoms/Text";
import SharedStyles from "../../res/SharedStyles";
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";
import { Rating } from 'react-native-elements';

const ProviderInfo = ({
    title = '',
    subTitle = '',
    imagePath = require('../../assets/icons/providerAvatar.png'),
    imagePlaceholder = '',
    ratingValue = '0.0',
    isInsurance = false,
}) => {

    const providerImage = () => {
        return (
            <>
                {imagePath?.length ?
                    <Image style={SharedStyles.styles().userImageLarge} source={{ uri: imagePath }} alt="Provider Image" />
                    :
                    <View style={[SharedStyles.styles().userAvatarWrapperLarge, { backgroundColor: '#4F46E5' }]} >
                        <Text style={[SharedStyles.styles().primaryButtonTextLarge]}>{imagePlaceholder}</Text>
                    </View>
                }
            </>
        )
    }
    const userText = () => {
        return (
            <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap12]}>
                <View style={[SharedStyles.styles().vStack, SharedStyles.styles().gap4]}>
                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap8, SharedStyles.styles().alignCenter]}>
                        <CustomText
                            tittle={title}
                            customStyle={[SharedStyles.styles().primaryText_M]}
                        />
                        <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap4, SharedStyles.styles().alignCenter]}>
                            <Rating
                                readonly
                                type="star"
                                showRating={false}
                                ratingCount={5}
                                imageSize={15}
                                selectedColor={'#FDB74A'}
                                startingValue={ratingValue}
                                fractions={2}
                            />
                        </View>
                    </View>
                    <CustomText
                        tittle={subTitle}
                        customStyle={[SharedStyles.styles().secondaryText_S]}
                    />
                </View>
                {isInsurance && (
                    <View style={[SharedStyles.styles().hStack, SharedStyles.styles().gap4, SharedStyles.styles().alignCenter]}>
                        <SvgXml xml={svgs.checkFillIcon()} />
                        <CustomText
                            tittle={'Accepts your insurance'}
                            customStyle={[SharedStyles.styles().acceptsText_XS]}
                        />
                    </View>
                )}
            </View>
        )
    }
    return (
        <View style={[SharedStyles.styles().hStack, SharedStyles.styles().alignCenter, SharedStyles.styles().gap24]}>
            {providerImage()}
            {userText()}
        </View>
    )
}
export default ProviderInfo;

const styles = StyleSheet.create({

})

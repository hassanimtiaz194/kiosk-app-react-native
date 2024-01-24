import React, { useState } from "react";
import { Button, Text, View, ScrollView, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Unorderedlist from 'react-native-unordered-list'
import PrimaryButton from "./PrimaryButton";

const ModalPayement = ({ isModalVisible, setModalVisible }) => {

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <Modal isVisible={isModalVisible}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalHeading}>Patient Responsibility for Payment</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.heading}>Cash Pay Clients:</Text>
                    <Unorderedlist style={styles.unorderedlist}>
                        <Text style={styles.listText}>{"I understand that I am a cash pay client and I am responsible for the full cost of each session at the time the service is provided."}</Text>
                    </Unorderedlist>
                    <Unorderedlist style={styles.unorderedlist}>    
                        <Text style={styles.listText}>{"Payment is due before or at the time of service, and I agree to settle all outstanding balances promptly."}</Text>
                    </Unorderedlist>
                    <Text style={styles.heading}>Insurance Coverage:</Text>
                    <Unorderedlist style={styles.unorderedlist}>
                        <Text style={styles.listText}>{"If I am utilizing insurance coverage, I acknowledge that my responsibility for payment is subject to the terms and conditions of my insurance plan."}</Text>
                    </Unorderedlist>
                    <Unorderedlist style={styles.unorderedlist}>    
                        <Text style={styles.listText}>{"I understand that I am responsible for all copayments, coinsurance, and deductibles as determined by my insurance plan."}</Text>
                    </Unorderedlist>
                    <Unorderedlist style={styles.unorderedlist}>
                        <Text style={styles.listText}>{"I acknowledge that the final payment amount may be determined by my insurance plan, and any outstanding balance not covered by insurance is my responsibility."}</Text>
                    </Unorderedlist>
                    <Text style={styles.heading}>Verification of Insurance Information:</Text>
                    <Unorderedlist style={styles.unorderedlist}>
                        <Text style={styles.listText}>{"I am responsible for providing accurate and up-to-date insurance information to the healthcare provider's office."}</Text>
                    </Unorderedlist>
                    <Unorderedlist style={styles.unorderedlist}>    
                        <Text style={styles.listText}>{"I understand that it is my responsibility to verify coverage details, including copayments, coinsurance, deductibles, and any limitations or exclusions of my insurance plan."}</Text>
                    </Unorderedlist>
                    <Text style={styles.heading}>Notification of Changes:</Text>
                    <Unorderedlist style={styles.unorderedlist}>
                        <Text style={styles.listText}>{"I agree to promptly inform the healthcare provider's office of any changes to my insurance coverage, including changes in policy, coverage, or personal information."}</Text>
                    </Unorderedlist>
                    <Text style={styles.heading}>Payment Authorization:</Text>
                    <Unorderedlist style={styles.unorderedlist}>
                        <Text style={styles.listText}>{"I authorize the healthcare provider to bill my insurance on my behalf and to collect any outstanding amounts directly from me as per the terms outlined in this consent."}</Text>
                    </Unorderedlist>
                    <Text style={styles.heading}>Financial Responsibility:</Text>
                    <Unorderedlist style={styles.unorderedlist}>
                        <Text style={styles.listText}>{"I understand that I am ultimately financially responsible for all charges not covered by my insurance, including denied claims or services deemed not medically necessary, unless state or federal regulations do not allow this."}</Text>
                    </Unorderedlist>
                    <Unorderedlist style={styles.unorderedlist}>    
                        <Text style={styles.listText}>{"I agree that all people or companies (third parties) who pay any part of your bill shall pay these amounts directly to."}</Text>
                    </Unorderedlist>
                    <Unorderedlist style={styles.unorderedlist}>    
                        <Text style={styles.listText}>{"I agree and authorize to charge my credit card or bank account for the patient's responsibility after sending a notification to me of the payment amount by email."}</Text>
                    </Unorderedlist>
                    <Text style={styles.heading}>Billing Inquiries:</Text>
                    <Unorderedlist style={styles.unorderedlist}>
                        <Text style={styles.listText}>{"In the event of any billing inquiries or disputes, I agree to contact the healthcare provider's billing office promptly to address and resolve the matter."}</Text>
                    </Unorderedlist>
                    <Text style={styles.heading}>Cancellation / No-Show Policy:</Text>
                    <Unorderedlist style={styles.unorderedlist}>
                        <Text style={styles.listText}>{"I agree that I may cancel or reschedule my appointment up to 24 hours ahead of the scheduled session time. If I cancel less than 24 hours ahead of my session or do not show up within 10 minutes of the start of your scheduled session I acknowledge that I may be subject to a no-show/late cancellation fee of $60.00."}</Text>
                    </Unorderedlist>
                </ScrollView>
                <PrimaryButton
                    text={'Close'}
                    onPressHandler={() => toggleModal()} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 40,
    },
    modalHeading: {
        textAlign: 'center',
        paddingBottom: 30,
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        fontWeight: 600,
    },
    heading: {
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        fontWeight: 600,
    },
    unorderedlist: {
        paddingLeft: 10,
        paddingRight: 10
    },
    listText: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        textAlign:'justify',
        lineHeight: 24,
    },
});

export default ModalPayement;
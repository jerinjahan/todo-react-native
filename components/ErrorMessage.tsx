import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ErrorMessage = ({ error, visible }) => {
    if (!error || !visible) {
        return null;
    }

    return <Text style={styles.errorText}>⚠️ {error}</Text>;
}

export default ErrorMessage

const styles = StyleSheet.create({
    errorText: {
        color: '#fdca40',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: '600'
    }
})
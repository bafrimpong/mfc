import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";
import { darkGreen, lightGreen } from "../utils/AppColors";

const AppHeader = ({ backTo, title }) => {
    return (
        <View>
            <Header
                backgroundColor={darkGreen}
                leftComponent={{
                    icon: backTo !== '' ? 'arrow-left' : '',
                    color: lightGreen,
                    iconStyle: { color: lightGreen },
                    onclick: () => alert('u clicked this'),
                    
                }}
                centerComponent={{ 
                    text: title, 
                    style: { 
                        color: lightGreen,
                        fontSize: 16
                    } }}
            >
                
            </Header>
        </View>
    )
}

export default AppHeader
import React from "react";
import { View, StatusBar } from "react-native";
import Constants from "expo-constants";
import { darkGreen} from "../../utils/AppColors";

const AppStatusBar = ({ backgroundColor, ...props }) => {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={darkGreen} {...props} />
        </View>
    );
};

export default AppStatusBar;
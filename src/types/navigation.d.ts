type RootStackParamList = {
    Private: undefined;
    Login: undefined;
};

type DashboardTabParamList = {
    Dashboard: undefined;
    // Wis: undefined;
};


type HomeScreenProps = import("@react-navigation/native-stack").NativeStackScreenProps<RootStackParamList, 'Home'>;
type LoginScreenProps = import("@react-navigation/native-stack").NativeStackScreenProps<RootStackParamList, 'Login'>;
type LoginScreenProps = import("@react-navigation/bottom-tabs").BottomTabScreenProps<DashboardTabParamList, 'Home'>;
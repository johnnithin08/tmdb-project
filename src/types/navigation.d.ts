type RootStackParamList = {
    Private: undefined;
    Login: undefined;
};

type DashboardTabParamList = {
    Movies: undefined;
    TV: undefined;
    Wishlist: undefined;
    Profile: undefined;
};


type MoviesScreenProps = import("@react-navigation/native-stack").NativeStackScreenProps<RootStackParamList, 'Movies'>;
type TVScreenProps = import("@react-navigation/native-stack").NativeStackScreenProps<RootStackParamList, 'TV'>;
type WishlistScreenProps = import("@react-navigation/native-stack").NativeStackScreenProps<RootStackParamList, 'Wishlist'>;
type ProfileScreenProps = import("@react-navigation/native-stack").NativeStackScreenProps<RootStackParamList, 'Profile'>;
type LoginScreenProps = import("@react-navigation/native-stack").NativeStackScreenProps<RootStackParamList, 'Login'>;
type LoginScreenProps = import("@react-navigation/bottom-tabs").BottomTabScreenProps<DashboardTabParamList, 'Home'>;
type RootStackParamList = {
    Private: import("@react-navigation/native").NavigatorScreenParams<DashboardTabParamList>;
    Login: undefined;
};

type DashboardTabParamList = {
    Movies: import("@react-navigation/native").NavigatorScreenParams<MoviesStackParamList>;
    TV: import("@react-navigation/native").NavigatorScreenParams<SeriesStackParamList>;
    Watchlist: import("@react-navigation/native").NavigatorScreenParams<WishlistStackParamList>;
    Profile: undefined;
};

type MoviesStackParamList = {
    Dashboard: undefined;
    Details: undefined;
}

type SeriesStackParamList = {
    Dashboard: undefined;
    Details: undefined;
}

type WishlistStackParamList = {
    Dashboard: undefined;
    Details: undefined;
}


type MoviesScreenProps = import("@react-navigation/native").CompositeScreenProps<import("@react-navigation/native-stack").NativeStackScreenProps<RootStackParamList>, import("@react-navigation/native").CompositeScreenProps<import("@react-navigation/bottom-tabs").BottomTabScreenProps<DashboardTabParamList, "Movies">, import("@react-navigation/native-stack").NativeStackScreenProps<MoviesStackParamList>>>;
type DetailsScreenProps = import("@react-navigation/native").CompositeScreenProps<import("@react-navigation/native-stack").NativeStackScreenProps<RootStackParamList>, import("@react-navigation/native").CompositeScreenProps<import("@react-navigation/bottom-tabs").BottomTabScreenProps<DashboardTabParamList, "Movies">, import("@react-navigation/native-stack").NativeStackScreenProps<MoviesStackParamList>>>;
type TVScreenProps = import("@react-navigation/native").CompositeScreenProps<import("@react-navigation/native-stack").NativeStackScreenProps<RootStackParamList>, import("@react-navigation/native").CompositeScreenProps<import("@react-navigation/bottom-tabs").BottomTabScreenProps<DashboardTabParamList, "TV">, import("@react-navigation/native-stack").NativeStackScreenProps<MoviesStackParamList>>>
type WatchlistScreenProps = import("@react-navigation/native").CompositeScreenProps<import("@react-navigation/native-stack").NativeStackScreenProps<RootStackParamList>, import("@react-navigation/native").CompositeScreenProps<import("@react-navigation/bottom-tabs").BottomTabScreenProps<DashboardTabParamList, "Watchlist">, import("@react-navigation/native-stack").NativeStackScreenProps<MoviesStackParamList>>>
type ProfileScreenProps = import("@react-navigation/native").CompositeScreenProps<import("@react-navigation/native-stack").NativeStackScreenProps<RootStackParamList>, import("@react-navigation/bottom-tabs").BottomTabScreenProps<DashboardTabParamList, "Profile">>;
type LoginScreenProps = import("@react-navigation/native-stack").NativeStackScreenProps<RootStackParamList, 'Login'>;
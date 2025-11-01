import { StackNavigationProp } from "@react-navigation/stack";
import TrainingScreen from '@/screens/TrainingScreen';


type ScreensPropsTypes =  {
    LoginScreen    : undefined,
    RegisterScreen : undefined,
    UserScreen     : undefined,
    ProductsScreen : undefined,
    HomeScreen     : undefined,
    MenuScreen        : undefined,
    MealCreateScreen  : undefined,
    MealUpdateScreen  : undefined,
    GoalScreen        : undefined,
    GoalCreateScreen  : undefined,
    TrainingScreen    : undefined,
    StatisticsScreen  : undefined,
    RecommendationOneScreen : undefined
}

type ScreensNavigationProp = StackNavigationProp<ScreensPropsTypes>;

export interface ScreensProps {
  navigation: ScreensNavigationProp;
}
import { Menu } from "./components/Menu";
import { HomeScreen } from "./screens/Home";
import { LoginScreen } from "./screens/Login";
import { MealCreateScreen } from "./screens/MealCreate";
import { MealUpdateScreen } from "./screens/MealUpdate";
import { ProductsScreen } from "./screens/Products";
import { RecommendationScreen } from "./screens/Recommendation";
import { RegisterScreen } from "./screens/Register";
import { UserScreen } from './screens/UserScreen';
import {
  PRODUCTS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  MENU_ROUTE,
  REGISTER_ROUTE,
  USER_ROUTE,
  MEAL_CREATE_ROUTE,
  MEAL_UPDATE_ROUTE,
  RECOMMENDATIONS_ROUTE,
  GOAL_ROUTE,
  GOAL_CREATE_ROUTE,
  TRAINING_ROUTE,
  STATISTICS_ROUTE,
  RECOMMENDATION_ONE_ROUTE,
} from './utils/constants';
import { GoalScreen } from '@/screens/GoalScreen';
import { GoalCreateScreen } from '@/screens/GoalCreateScreen';
import TrainingScreen from '@/screens/TrainingScreen';
import { StatisticsScreen } from '@/screens/StatisticsScreen';
import { Recommendation } from '@/components/Recommendation';

export const publicRouters = [
  {
    path: LOGIN_ROUTE,
    Component: LoginScreen,
    options: {
      title: "Авторизация"
    }
  },
  {
    path: REGISTER_ROUTE,
    Component: RegisterScreen,
    options: {
      title: "Регистрация"
    }
  },
  {
    path: GOAL_CREATE_ROUTE,
    Component: GoalCreateScreen,
    options: {
      title: "Создание цели",
      headerBackVisible: false, // Убираем стрелку назад
      gestureEnabled: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    }
  },
]

export const authRouters = [
  {
    path: HOME_ROUTE,
    Component: HomeScreen,
    options: {
      title: "FitnessCounter"
    }
  },
  {
    path: PRODUCTS_ROUTE,
    Component: ProductsScreen,
    options: {
      title: "Продукты"
    }
  },
  {
    path: MENU_ROUTE,
    Component: Menu,
    options: {
      title: "Меню"
    }
  },
  {
    path: USER_ROUTE,
    Component: UserScreen,
    options: {
      title: "Профиль"
    }
  },
  {
    path: MEAL_CREATE_ROUTE,
    Component: MealCreateScreen,
    options: {
      title: "Создание приёма пищи"
    }
  },
  {
    path: MEAL_UPDATE_ROUTE,
    Component: MealUpdateScreen,
    options: {
      title: "Обновление приёма пищи"
    }
  },
  {
    path: RECOMMENDATIONS_ROUTE,
    Component: RecommendationScreen,
    options: {
      title: "Статьи"
    }
  },
  {
    path: GOAL_ROUTE,
    Component: GoalScreen,
    options: {
      title: "Планы"
    }
  },
  {
    path: TRAINING_ROUTE,
    Component: TrainingScreen,
    options: {
      title: "Планы тренировок"
    }
  },
  {
    path: STATISTICS_ROUTE,
    Component: StatisticsScreen,
    options: {
      title: "Статистика"
    }
  },
  {
    path: RECOMMENDATION_ONE_ROUTE,
    Component: Recommendation,
    options: {
      title: "Статья"
    }
  }
]
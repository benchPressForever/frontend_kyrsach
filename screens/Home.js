import styled from 'styled-components/native';
import { Text, View, RefreshControl, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { neededUpdate, noUpdateNeeded } from '../store/eatReducer';
import { Header } from '../components/Header';
import { LineBJU } from '../components/LineBJU';
import { Loading } from '../components/Loading';
import { useState, useEffect } from 'react';
import { DateModal } from '../components/DateModal';
import { ProgressChart } from '@/components/ProgressChart';
import { Footer } from '@/components/Footer';
import { MealBlock } from '@/components/MealBlock';
import { setDaily } from '@/store/dailyReducer';
import {
  changeIsModalWeightVisible,
  setMeals,
} from '@/store/mealReducer';
import { dailySummariesService } from '@/services/daily-summaries.service';
import { mealService } from '@/services/meal.service';
import { ModalWeightProduct } from '@/components/ModalWeightProduct';
import { ProductActionMW } from '@/components/ProductActionMW';
import { MEAL_CREATE_ROUTE } from '@/utils/constants';
import { MealActionMW } from '@/components/MealActionMW';
import { goalService } from '@/services/goal.service';
import { setGoal } from '@/store/goalReducer';

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isNeedUpdate } = useSelector((state) => state.Eat);
  const { DateOpen, selectedDate, dailyWeight,dailyHeight,IsAuth} = useSelector((state) => state.User);
  const { daily } = useSelector((state) => state.Daily);
  const { meals, isModalWeightVisible, isModalFoodActionVisible,isModalMealActionVisible, selectedMealFood } = useSelector(
    (state) => state.Meal
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadGoal = async () => {
        const data = await goalService.get();
        dispatch(setGoal(data));
    }
    loadGoal();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Всегда получаем актуальные daily данные
        getDailys();
        // Загружаем meals для текущей даты
        getMeals();
      } catch (e) {
        console.log('Error loading data:', e);
      } finally {
        setIsLoading(false);
        dispatch(noUpdateNeeded());
      }
    };
    loadData();
  }, [selectedDate, dispatch, isNeedUpdate]);

  async function getMeals() {
      const mealsData = await mealService.getAllByDate(selectedDate);
      dispatch(setMeals(mealsData));
  }

  async function getDailys() {
    const dailyRes = await dailySummariesService.getByDate(selectedDate);
    let currentDaily;

    if (!dailyRes) {
      currentDaily = await dailySummariesService.create({
        date: selectedDate,
        weight: dailyWeight,
        height: dailyHeight,
      });
    } else {
      currentDaily = dailyRes;
    }
    dispatch(setDaily(currentDaily));
  }

  if (isLoading) return <Loading />;


  return (
    <HomeView>
      <Header />

      {daily ? (
        <>
          {
            <View style={{ margin: '5%' }}>
              <ProgressChart
                protein={daily.dailyProtein}
                fat={daily.dailyFat}
                carbs={daily.dailyCarbs}
              />
            </View>
          }

          <LineBJU
            protein={daily.dailyProtein}
            fat={daily.dailyFat}
            carbs={daily.dailyCarbs}
            calories={daily.dailyCalories}
          />
        </>
      ) : undefined}

      {meals.length == 0 && 
        <View className='m-6'>
          <Text className='font-bold text-lg'>Нет приёмов пищи!</Text>
        </View>}

      {daily ? (
        meals.length >= 0 && (
            <FlatListHome
              refreshControl={<RefreshControl refreshing={isLoading} />}
              data={meals}
              renderItem={({ item }) => <MealBlock meal={item} key={item.id}/>}
              ListFooterComponent = {
                <View className="flex w-max justify-center items-center  pb-4">
                  <TouchableOpacity onPress={() => navigation.navigate(MEAL_CREATE_ROUTE)}>
                    <ButtonAddMeal>
                      <Text style={{ color: '#36a2eb', fontSize: 14 }}> + Добавить прием пищи</Text>
                    </ButtonAddMeal>
                  </TouchableOpacity>
                </View>
              }/>
        )
      ) : undefined}


      {isModalFoodActionVisible && selectedMealFood && <ProductActionMW />}

      {isModalWeightVisible && selectedMealFood && (
        <ModalWeightProduct
          item={selectedMealFood.food}
          mealFoodId={selectedMealFood.id}
          onClose={() => dispatch(changeIsModalWeightVisible())}
        />
      )}

      {isModalMealActionVisible &&<MealActionMW />}

      {DateOpen && <DateModal />}

      <Footer />
    </HomeView>
  );
};

const HomeView = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  height: 100%;
  position: relative;
`;


const FlatListHome = styled.FlatList`
  width: 100%;
  height: 40%;
  margin-bottom: 11%;
`;

const ButtonAddMeal = styled.View`
  width: 50%;
  padding: 2%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border-color: #36a2eb;
  border-width: 1px;
  border-style: solid;
`;

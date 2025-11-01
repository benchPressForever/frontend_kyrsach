import styled from "styled-components/native"
import { useDispatch, useSelector} from "react-redux"
import {neededUpdate} from "../store/eatReducer"
import { mealFoodService } from "@/services/meal-food.service"
import { changeIsModalFoodActionVisible, changeIsModalWeightVisible } from "@/store/mealReducer"
import { Delete, LogOut, Star, Trash } from "lucide-react-native"
import { View } from "react-native"

export const ProductActionMW = () => {
  const { selectedMealFood } = useSelector((state) => state.Meal);
  const dispatch = useDispatch();

  const clickDel = async () => {
    try {
      await mealFoodService.delete(selectedMealFood.id);
      console.log('Удаление mealFood прошло успешно!');
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(neededUpdate());
      dispatch(changeIsModalFoodActionVisible());
    }
  };

  const openUpdate = () => {
    dispatch(changeIsModalFoodActionVisible());
    dispatch(changeIsModalWeightVisible());
  };

  return (
    <Main>
      <MWView>
        <LineViewMW style={{ height: '24%', flexDirection: 'column' }}>
          <TextBlock style={{ fontWeight: '700' }}>{selectedMealFood.food.name}</TextBlock>
          <TextInfo className="mt-2">
            {'Белки : ' +
              selectedMealFood.calculatedProtein +
              ' , Углеводы : ' +
              selectedMealFood.calculatedCarbs +
              ' , Жиры : ' +
              selectedMealFood.calculatedFat +
              ' , Каллории : ' +
              selectedMealFood.calculatedCalories}
          </TextInfo>
        </LineViewMW>
        <LineViewMW onPress={() => clickDel()}>
          <Trash size={20} color={'red'} />
          <TextBox style={{ color: 'red' }}>Удалить</TextBox>
        </LineViewMW>
        <LineViewMW onPress={() => openUpdate()}>
          <TextBox>Изменить вес</TextBox>
        </LineViewMW>
        <LineViewMW>
          <Star size={20} color={'#36a2eb'} />
          <TextBox>Избранное</TextBox>
        </LineViewMW>
        <LineViewMW
          style={{ borderBottomWidth: 0 }}
          onPress={() => dispatch(changeIsModalFoodActionVisible())}>
          <LogOut size={20} color={'#36a2eb'} />
          <TextBox>Закрыть</TextBox>
        </LineViewMW>
      </MWView>
    </Main>
  );
};
const TextBlock = styled.Text`
    color:black;
    font-size: 19px;
`

const TextBox = styled.Text`
    color:#36a2eb;
    font-size: 20px;
`

const TextInfo = styled.Text`
    color:gray;
    font-size: 10px;
    margin-top: 10px;
`

const Main = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);

`

const MWView = styled.View`
    width: 80%;
    height: 40%;
    margin: 10%;
    position: absolute;
    bottom:0;
    background-color: white;
    border-radius:15px;
`

const LineViewMW = styled.TouchableOpacity`
    width: 100%;
    height: 19%;
    border-bottom-color:#eee9e9;
    border-bottom-width:1;
    border-bottom-style:solid;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
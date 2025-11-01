
import {changeIsModalFoodActionVisible, changeIsModalMealActionVisible, setSelectedMeal, setSelectedMealFood } from "@/store/mealReducer";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { LineProduct } from "./LineProduct";
import { Ellipsis } from "lucide-react-native";
import { PRODUCTS_ROUTE } from "@/utils/constants";
import { useNavigation } from "@react-navigation/native";


export const MealBlock = ({meal}) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const timeMeal = new Date(meal.timeMeal).toLocaleTimeString('ru-RU',{
        hour: '2-digit',
        minute: '2-digit'
    })

    const clickMealFood = (item) => {
        dispatch(setSelectedMealFood(item))
        dispatch(changeIsModalFoodActionVisible())
    }

    const clickAddProduct = () => {
        dispatch(setSelectedMeal(meal))
        navigation.navigate(PRODUCTS_ROUTE)
    }

    const clickMeal = () => {
        dispatch(setSelectedMeal(meal))
        dispatch(changeIsModalMealActionVisible())
    }



    return (
        <MealView>
            <LineView >
                <View className="flex  flex-row  items-center">
                    <TimeView>
                        <Text>{timeMeal}</Text>
                    </TimeView>
                    <Text className="  font-bold">{meal.name}</Text>
                </View>
                <TouchableOpacity onPress={() => clickMeal()}>
                    <Ellipsis/>
                </TouchableOpacity>
            </LineView>
           
                {meal.mealFoods.length > 0 ?
                    meal.mealFoods.map( (item) => {
                        return (
                        <TouchableOpacity
                            style = {{width:"100%"}} 
                            onPress = {() => clickMealFood(item)}
                            key = {item.id}>
                            <LineProduct
                                name={item.food.name}
                                servingSize={item.servingSize}
                                protein={item.calculatedProtein}
                                fat={item.calculatedFat}
                                carbs={item.calculatedCarbs}
                                calories={item.calculatedCalories}
                            />
                        </TouchableOpacity>)
                    }) :  
                    <View className="flex w-max justify-center items-center">
                        <Text className=" text-centers">Здесь ничего нет</Text>
                    </View>
                }
                
                <View className="flex items-end m-2 mt-0">
                    <TouchableOpacity onPress={() => clickAddProduct()}>
                        <ButtonAddFood>
                            <Text style = {{color : "#36a2eb",fontSize:14}}> + Добавить</Text>
                        </ButtonAddFood>
                    </TouchableOpacity>
                </View>
            
            <Line/>

            <LineInfoView style = {{margin:"3%"}}>
                <Row>
                <Block>
                    <Text style={{ fontSize: 14, color: '#36a2eb' }}> {meal.totalProtein}</Text>
                    <Text style={{ fontSize: 14, color: '#878787' }}> г</Text>
                    <Text style={{ fontSize: 14, color: '#ffc01d' }}> {meal.totalFat}</Text>
                    <Text style={{ fontSize: 14, color: '#878787' }}> г</Text>
                    <Text style={{ fontSize: 14, color: '#fe777b' }}> {meal.totalCarbs}</Text>
                    <Text style={{ fontSize: 14, color: '#878787' }}> г</Text>
                </Block>
                <Container>
                    <Text style={{ fontSize: 14, color: '#36a2eb' }}>{meal.totalCalories}</Text>
                    <Text style={{ fontSize: 13, color: '#878787' }}> кКал</Text>
                </Container>
                </Row>
            </LineInfoView>
               
               
        </MealView>
  );
};

const ButtonAddFood = styled.View`
    width: 30%;
    padding: 2%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius:20px;
    border-color:#36a2eb;
    border-width:1px;
    border-style:solid;
`
const LineView = styled.View`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 94%;
    align-items: center;
    margin: 3%;
    margin-bottom: 0;
`
const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: #eee9e9;
`;


const MealView = styled.View`
    display: flex;
    width: 90%;
    height: auto;
    flex-direction: column;
    margin-left: 5%;
    margin-right: 5%;
    border-radius:20px;
    border-color:#eee9e9;
    border-width:1px;
    border-style:solid;
    margin-bottom:3%;
    position: relative;
`



const LineInfoView = styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
`

const Row = styled.View`
    display: flex;
    flex-direction: row;
    width: 94%;
    height:auto;
`

const Block = styled.View`
    width:75%;
    height: auto;
    display: flex;
    flex-direction: row;
`

const Container = styled.View`
    width: auto;
    height: auto;
    position: absolute;
    right: 0; 
    display: flex;
    flex-direction: row;
` 

const TimeView = styled.View`
    margin-right: 10px;
    background-color: #eee9e9;
    border-radius: 20px;
    padding:5px;
    padding-left: 10px;
    padding-right: 10px;
`
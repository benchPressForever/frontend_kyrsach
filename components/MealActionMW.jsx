
import styled from "styled-components/native"
import { useDispatch, useSelector} from "react-redux"
import {neededUpdate} from "../store/eatReducer"
import { changeIsModalMealActionVisible, changeIsModalWeightVisible } from "@/store/mealReducer"
import { Delete, LogOut, Trash } from "lucide-react-native"
import { MEAL_CREATE_ROUTE, MEAL_UPDATE_ROUTE } from "@/utils/constants"
import { mealService } from "@/services/meal.service"
import { useNavigation } from "@react-navigation/native"

export const MealActionMW = () => {
    const {selectedMeal} = useSelector(state => state.Meal)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const clickDel = async () => {
        try{
            await mealService.delete(selectedMeal.id)
            console.log("Удаление meal прошло успешно!")
        }
        catch(e){
            console.log(e)
        }
        finally{
            dispatch(neededUpdate())
            dispatch(changeIsModalMealActionVisible())
        }
    }

    const openUpdate = () => {
        dispatch(changeIsModalMealActionVisible())
        navigation.navigate(MEAL_UPDATE_ROUTE)
    }


    return(
        <Main>
            <MWView>
                <LineViewMW style = {{height:"24%",flexDirection:"column"}}>
                    <TextBlock style = {{fontWeight:"700"}}>{selectedMeal.name}</TextBlock>
                    <TextInfo className="mt-2">{selectedMeal.notes}</TextInfo>
                </LineViewMW>
                <LineViewMW onPress={() => clickDel()}>
                    <Trash size={20} color={"red"} />
                    <TextBox style = {{color:"red"}}>
                        Удалить
                    </TextBox>
                </LineViewMW>
                <LineViewMW onPress={() => openUpdate()}>
                    <TextBox>
                        Изменить 
                    </TextBox>
                </LineViewMW>
                <LineViewMW style = {{borderBottomWidth:0}} onPress={() => dispatch(changeIsModalMealActionVisible())}>
                    <LogOut size = {20} color = {"#36a2eb"} />
                    <TextBox>Закрыть</TextBox>
                </LineViewMW>
            </MWView>
        </Main>
    )
}
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
    height: 25%;
    border-bottom-color:#eee9e9;
    border-bottom-width:1;
    border-bottom-style:solid;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
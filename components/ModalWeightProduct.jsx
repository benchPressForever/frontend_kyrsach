import { View,Text, Image } from "react-native";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import {neededUpdate} from "../store/eatReducer";
import { mealFoodService } from "@/services/meal-food.service";
import { HOME_ROUTE, PRODUCTS_ROUTE } from "@/utils/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";

export const ModalWeightProduct = ({mealFoodId,item,onClose}) => {
    const {selectedMeal} = useSelector(state => state.Meal)
    const [servingSize,setServingSize] = useState(0)
    const dispatch = useDispatch()


     const navigation = useNavigation();
     const route = useRoute();

    let name = item.name
    if(name.length > 60) name = name.slice(0,60) + "..."

    const clickWindow = async () => {
        try{
            if(route.name == PRODUCTS_ROUTE){
                await mealFoodService.create({servingSize,mealId : selectedMeal.id,foodId:item.id})
            }
            else {
                await mealFoodService.update(mealFoodId,{servingSize})
            }
        }
        catch(e){
            console.log(e.message)
        }
        finally{
            ExitWindow()
            dispatch(neededUpdate())
            navigation.navigate(HOME_ROUTE)
        }
    }

    const ExitWindow = () => {
        setServingSize(0)
        onClose();
    }

    const handleTextChange = (text) => {
        if(text){
            setServingSize(parseFloat(text))
        }
        else{
            setServingSize(0)
        }
    }



    return(
        <Main>
            <MWView>
                <TextView>
                    <Text style = {{fontSize:16,fontWeight:"600"}}>{name}</Text>
                </TextView>
                <LineBJUView style = {{backgroundColor:"#efeeed"}}>
                    <TextBox>Белки</TextBox>
                    <TextBox>Жиры</TextBox>
                    <TextBox>Углеводы</TextBox>
                    <TextBox>кКал</TextBox>
                </LineBJUView>
                <LineBJUView>
                    <TextBox><Text style = {{color:"#36a2eb"}}>{(item.proteinPer100 * servingSize  /100).toFixed(2)}</Text> г</TextBox>
                    <TextBox><Text style = {{color:"#ffc01d"}}>{(item.fatPer100 * servingSize /100).toFixed(2)}</Text> г</TextBox>
                    <TextBox><Text style = {{color:"#fe777b"}}>{(item.carbsPer100 * servingSize /100).toFixed(2)}</Text> г</TextBox>
                    <TextBox>{(item.caloriesPer100 * servingSize/100).toFixed(2)} г</TextBox>
                </LineBJUView>

                <WeightView>
                    <ColumnView>
                        <Block onPress = {() => setServingSize((v) => v - 10)}><Text>-10</Text></Block>
                        <Block onPress = {() => setServingSize((v) => v -50)}><Text>-50</Text></Block>
                        <Block onPress = {() => setServingSize((v) => v -75)}><Text>-75</Text></Block>
                        <Block onPress = {() => setServingSize((v) => v -100)}><Text>-100</Text></Block>
                    </ColumnView>   
                    <InputText 
                        value={String(servingSize)}
                        keyboardType="numeric"
                        onChangeText={handleTextChange}/>
                    <ColumnView>
                        <Block style = {{borderColor:"#36a2eb"}} onPress = {() => setServingSize((v) => v + 10)}><Text>+10</Text></Block>
                        <Block style = {{borderColor:"#36a2eb"}} onPress = {() => setServingSize((v) => v + 50)}><Text>+50</Text></Block>
                        <Block style = {{borderColor:"#36a2eb"}} onPress = {() => setServingSize((v) => v + 75)}><Text>+75</Text></Block>
                        <Block style = {{borderColor:"#36a2eb"}} onPress = {() => setServingSize((v) => v + 100)}><Text>+100</Text></Block>
                    </ColumnView> 
                </WeightView>
                <EndView>
                    <ViewRadius onPress = {() => ExitWindow()}>
                       <ImageFooter source = {require("../assets/trashBasket.png")}/> 
                    </ViewRadius>

                    <ViewRadius onPress = {() => clickWindow()} style = {{borderColor:"#6ceb36"}}>
                       <ImageFooter source = {require("../assets/ok.png")}/> 
                    </ViewRadius>     
                </EndView> 
            </MWView>
        </Main>
    )
}

const ImageFooter = styled.Image`
    width: 40%;
    height: 50%;
`

const ViewRadius = styled.TouchableOpacity`
    border-width: 0.5px;
    border-color: #fe777b;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 100%;
    border-radius: 15px;

`

const EndView = styled.View`
    height: 15%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    
`

const InputText = styled.TextInput`
    width: 60%;
    height: 100%;
    text-align: center;
    font-size: 60px;
`

const WeightView = styled.View`
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: row;
    margin-bottom:4%;
`

const Block = styled.TouchableOpacity`
    width: 100%;
    height: 25%;
    border-radius: 10px;
    border-width: 0.5px;
    border-color: #fe777b;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2%;
`

const ColumnView = styled.View`
    display: flex;
    flex-direction: column;
    width: 20%;
    height: 100%;
`

const TextView = styled.View`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
`

const TextBox = styled.Text`
    width: 25%;
    height: 100%;
    text-align:center;
    margin-top: 1%;
    color:#878787;
`

const LineBJUView = styled.View`
    width: 100%;
    height: 8%;
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    margin-bottom:3%;
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
    height: 50%;
    background-color: white;
    position: absolute;
    bottom: 25%;
    left: 10%;
    padding:2%;
    border-radius:20px;
    display: flex;
    flex-direction: column;
`

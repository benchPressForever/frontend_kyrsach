import styled from "styled-components/native";
import {Text, TouchableOpacity, View } from "react-native";
import {
  GOAL_ROUTE,
  HOME_ROUTE,
  RECOMMENDATIONS_ROUTE,
  STATISTICS_ROUTE,
  TRAINING_ROUTE,
  USER_ROUTE,
} from '@/utils/constants';
import { BookOpenText } from "lucide-react-native";




export const Menu = ({navigation}) => {


    return(
        <MainView >
            <MenuView>
                <Touchable style = {{height:"10%"}}>
                    <LineMenuView> 
                        <MenuImage style = {{width:"15%"}}  source={require("../assets/eat.png")}/> 
                        <MenuText style = {{fontSize:20}}>{"FitnessCounter"}</MenuText> 
                    </LineMenuView> 
                </Touchable>
                
                <Touchable onPress={() => navigation.navigate(HOME_ROUTE)}>
                    <LineMenuView> 
                        <MenuImage source={require("../assets/home.png")}/> 
                        <MenuText>Главная</MenuText> 
                    </LineMenuView> 
                </Touchable>

                <Touchable  onPress={() => navigation.navigate(USER_ROUTE)}>
                    <LineMenuView> 
                        <MenuImage source={require("../assets/user.png")}/> 
                        <MenuText>Профиль</MenuText> 
                    </LineMenuView> 
                </Touchable>



              <Touchable onPress={() => navigation.navigate(GOAL_ROUTE)}>
                <LineMenuView>
                  <MenuImage source={require("../assets/fork.png")}/>
                  <MenuText>Мои планы</MenuText>
                </LineMenuView>
              </Touchable>

                <Touchable  onPress={() => navigation.navigate(RECOMMENDATIONS_ROUTE)}>
                    <LineMenuView> 
                        <BookOpenText strokeWidth={1} size={30} style = {{margin:"3%"}} />
                        <MenuText>Рекомендации</MenuText> 
                    </LineMenuView> 
                </Touchable>


              <Touchable onPress={() => navigation.navigate(STATISTICS_ROUTE)}>
                <LineMenuView>
                  <MenuImage source={require("../assets/grafic.png")}/>
                  <MenuText>Статистика</MenuText>
                </LineMenuView>
              </Touchable>


              <Touchable onPress={() => navigation.navigate(TRAINING_ROUTE)}>
                    <LineMenuView> 
                            <MenuImage source={require("../assets/scales.png")}/> 
                        <MenuText>Тренировки</MenuText>
                    </LineMenuView>
              </Touchable>





                <Touchable>
                    <LineMenuView> 
                        <MenuImage source={require("../assets/setting.png")}/> 
                        <MenuText>Настройки</MenuText> 
                    </LineMenuView> 
                </Touchable>

                <Touchable >
                    <LineMenuView style = {{backgroundColor:"#ffd700"}}> 
                        <MenuImage source={require("../assets/pro.png")}/> 
                        <MenuText>PRO</MenuText> 
                    </LineMenuView> 
                </Touchable>

                <Touchable>
                    <LineMenuView> 
                        <MenuImage source={require("../assets/star.png")}/> 
                        <MenuText>Оценить приложение</MenuText> 
                    </LineMenuView>
                </Touchable> 

                <Touchable>
                    <LineMenuView> 
                        <MenuImage source={require("../assets/message.png")}/> 
                        <MenuText>Обратная связь</MenuText> 
                    </LineMenuView> 
                </Touchable>

                <Touchable>
                    <LineMenuView> 
                        <MenuImage source={require("../assets/frend.png")}/> 
                        <MenuText>Поделиться с друзьями</MenuText> 
                    </LineMenuView> 
                </Touchable>

         

                <View style = {{width:"100%",height:"6%",position:"absolute",left:10,bottom:50,display:"flex",flexDirection:"row",alignItems:"center"}}>  
                    <MenuText style = {{fontSize:20,marginRight:5}}>FitnessCounter</MenuText> 
                    <MenuText style = {{fontSize:20}}>1.0 </MenuText>
                </View> 
            </MenuView>

            <Touchable style = {{width:"25%",height:"100%"}} onPress={() => navigation.navigate(HOME_ROUTE)}>
                <View style = {{width:"100%",height:"100%"}}/>
            </Touchable>
        </MainView>
    );
}

const Touchable = styled.TouchableOpacity`
    width: 100%;
    height: 6%;
`;

const LineMenuView = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    padding: 3%;
    align-items: center;
`;

const MenuImage = styled.Image`
    width: 10%;
    height: 100%;
    margin: 3%;
    object-fit:contain;
`;

const MenuText = styled.Text`
    font-size: 15px;
`;


const MenuView = styled.View`
    width:75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    position: relative;
`;

const MainView = styled.View`
    background-color:"#efeeed";
    display: flex;
    flex:1;
    flex-direction: row;
    width: 100%;
    height: 100%;
    
`
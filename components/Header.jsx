import styled from "styled-components";
import {View,Image, TouchableOpacity, Text} from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { setOpenDateModal } from "../store/userReducer";
import { MENU_ROUTE, PRODUCTS_ROUTE } from "@/utils/constants";
import { Menu ,Ellipsis, Calendar1} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export const Header = () => {
    const {selectedDate} = useSelector(state => state.User)
    const dispatch = useDispatch()
    const navigation = useNavigation();

    function formatDate(date) {
        return new Intl.DateTimeFormat('ru-RU', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }

    const formatedDate = formatDate(new Date(selectedDate))

    return(
        <HeaderView>
            <TouchView onPress={() => navigation.navigate(MENU_ROUTE)}>
               <Menu/>
            </TouchView>
            <DateView onPress = {() => dispatch(setOpenDateModal(true))}>
                <Text style = {{color:"rgb(54, 162, 235)",fontSize:18,marginRight:"3%"}}>
                    {selectedDate ? formatedDate : "Выбрать дату"}
                </Text>
                <Calendar1 color="#36a2eb" size={20} />
            </DateView>
            <TouchView ></TouchView>
        </HeaderView>
    );
}

const HeaderView = styled.View`
    display: flex;
    flex-direction: row;
    height: 6%;
    width: 100%;
   
    background-color: #ffffff;
    align-items: center;
    justify-content:space-around;

`;

const TouchView = styled.TouchableOpacity`
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const DateView = styled.TouchableOpacity`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
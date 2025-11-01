
import styled from "styled-components";
import { MENU_ROUTE,PRODUCTS_ROUTE, USER_ROUTE } from "@/utils/constants";
import {CircleUserRound,Utensils,Menu} from 'lucide-react-native';
import { useNavigation } from "@react-navigation/native";

export const Footer = () => {

    const navigation = useNavigation();

    return(
        <FooterView>
            <TouchView onPress={() => navigation.navigate(MENU_ROUTE)}>
                <Menu/>
            </TouchView>
            <TouchView onPress={() => navigation.navigate(USER_ROUTE)}>
                <CircleUserRound/>
            </TouchView>
            <TouchView onPress={() => navigation.navigate(PRODUCTS_ROUTE)} >
                <Utensils />
            </TouchView>
        </FooterView>
    );
}

const FooterView = styled.View`
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 6%;
    width: 100%;
    border-color:#eee9e9;
    border-width:1px;
    border-style:solid;
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

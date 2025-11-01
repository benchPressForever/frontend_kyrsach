
import styled from "styled-components";
import { View,Text } from "react-native";
import { useSelector } from "react-redux";

export const LineBJU = ({protein,fat,carbs,calories}) => {
    return(
        <LineView>
            <Row>
                <Block >
                    <TextGray>Б:</TextGray>
                    <Text style = {{fontSize:14,color:"#36a2eb"}}> {protein}</Text>
                    <TextGray> Ж:</TextGray>
                    <Text style = {{fontSize:14,color:"#ffc01d"}}> {fat}</Text>
                    <TextGray> У:</TextGray>
                    <Text style = {{fontSize:14,color:"#fe777b"}}> {carbs}</Text>
                </Block>
                <Container>
                    <Text style = {{fontSize:14,color:"#36a2eb"}}>{calories}</Text>
                    <Text style = {{fontSize:13,color:"#878787"}}> кКал</Text>
                </Container>
            </Row>
        </LineView>
    );
}

const LineView = styled.View`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: auto;
    margin: 1%;
    border-radius:20px;
    padding:3%;
    padding-left: 5%;
    padding-right: 5%;
    border-color:#eee9e9;
    border-width:1px;
    border-style:solid;
    margin-top: 0;
`

const Row = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
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

const TextGray = styled.Text`
    font-size: 14px;
    color:#878787;
`

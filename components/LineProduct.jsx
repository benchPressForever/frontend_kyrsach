import styled from "styled-components";
import { View,Text } from "react-native";

export const LineProduct = ({name,servingSize,protein,fat,carbs,calories}) => {

    return(
        <LineView >
            <Row>
                <Block>
                    <Text style = {{fontSize:15,fontWeight:600}}>
                     {name} 
                    </Text>
                </Block>
                <Container>
                    <Text style = {{fontSize:14,fontWeight:600}}>
                        {servingSize ? servingSize : "100"}
                        г
                    </Text>
                </Container>
            </Row>
            <Row>
                <Block >
                    <Text style = {{fontSize:13,color:"#36a2eb"}}> {protein}</Text>
                    <Text style = {{fontSize:13,color:"#878787"}}> |</Text>
                    <Text style = {{fontSize:13,color:"#ffc01d"}}> {fat}</Text>
                    <Text style = {{fontSize:13,color:"#878787"}}> |</Text>
                    <Text style = {{fontSize:13,color:"#fe777b"}}> {carbs}</Text>
                </Block>
                <Container>
                    <Text style = {{fontSize:13,color:"#36a2eb"}}> {calories}</Text>
                    <Text style = {{fontSize:12,color:"#878787"}}> кКал</Text>
                </Container>
            </Row>
        </LineView>
    );
}

const LineView = styled.View`
    display: flex;
    flex-direction: column;
    width: 96%;
    height: auto;
    margin: 2%;
    border-radius:20px;
    padding:3%;
    border-width: 1;
    border-color: #ddd;
    background-color: white;
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



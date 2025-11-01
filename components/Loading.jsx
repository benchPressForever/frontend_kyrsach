import { ActivityIndicator } from "react-native";
import { Text } from "react-native";
import styled from "styled-components/native"


const LoadingView = styled.View`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Loading = () => {
    return(
        <LoadingView>
          <ActivityIndicator size = "large"/>
          <Text style = {{margin:"4%"}}>Загрузка...</Text>
        </LoadingView>
    );
}
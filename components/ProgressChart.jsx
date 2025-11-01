import { useSelector } from "react-redux";
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';


export const ProgressChart = ({ protein, fat, carbs }) => {
  const { goal } = useSelector((state) => state.Goal);

  const percentProtein = Math.min((protein / (goal.protein || 100)) * 180, 180);
  const percentFat = Math.min((fat / (goal.fat || 60)) * 180, 180);
  const percentCarbs = Math.min((carbs / (goal.carbs || 150)) * 180, 180);

  return (

          <ViewGauge>
            <Background style = {{backgroundColor: '#fae6e5'}}>
              <Percentage
                style={{ transform: `rotate(${percentCarbs}deg)`,backgroundColor: '#fe777b' }}
              ></Percentage>
              <Mask></Mask>
            </Background>


            <Background style={{ height:"72%",width:'72%',bottom:0,right:"14%",left:"14%",top:"28%",backgroundColor: '#d8ebfa' }} >
              <Percentage
                style={{
                  transform: `rotate(${percentProtein}deg)`,
                  backgroundColor:"#36a1ef",
                  marginLeft:"72",
                  top:"72"
                }}
              ></Percentage>
              <Mask></Mask>
            </Background>


            <Background style={{ height:"44%",width:'44%',bottom:0,right:"28%",left:"28%",top:"56%",backgroundColor:"#fff2cf" }} >
              <Percentage
                style={{
                  transform: `rotate(${percentFat}deg)`,
                  backgroundColor:"#f8c418",
                  marginLeft:"44",
                  top:"44"
                }}
              ></Percentage>
              <Mask></Mask>
            </Background>
          </ViewGauge>
  );
};


const ViewGauge = styled.View`
  width:200px; 
  height:100px;
  position: relative;
`
const Background = styled.View`
  position:absolute; 
  top:0;
  left:0;
  bottom:0;
  right:0;
  height:100px; 
  margin-bottom:10px;
  border-radius:150px 150px 0 0; 
  overflow:hidden; 
  text-align:center;
`
const Mask = styled.View`
  position:absolute;
  top:20px; 
  right:20px; 
  left:20px; 
  height:80px; 
  background-color:white; 
  border-radius:150px 150px 0 0;
`
  const Percentage = styled.View`
    position:absolute; 
    top:100px; 
    left:-200%;
    width:400%; 
    height:400%; 
    margin-left:100px;
    transform-origin:top center;
  `


/* СТАРЫЙ КРУГЛЫЙ ГРАФИК
const props = {
  activeStrokeWidth: 20,
  inActiveStrokeWidth: 20,
  inActiveStrokeOpacity: 0.2,
  circleBackgroundColor: 'transparent',
  duration: 0,
  showProgressValue: false,
  maxValue: 100,
  rotation: 180, // Делаем полукруг
  initialValue: 0,
};

<CircularProgressBase  ///старый График ввиде круга
              {...props}
              value={percentCarbs > 100 ? 100 : percentCarbs}
              radius={75}
              activeStrokeColor={'#fe777b'}
              inActiveStrokeColor={'#fe777b'}>
                  <CircularProgressBase
                      {...props}
                      value={percentProtein > 100 ? 100 : percentProtein}
                      radius={50}
                      activeStrokeColor={'#36a2eb'}
                      inActiveStrokeColor={'#36a2eb'}>
                          <CircularProgressBase
                          {...props}
                          value={percentFat > 100 ? 100 : percentFat}
                          radius={25}
                          radius={25}
                          activeStrokeColor={'#ffc01d'}
                          inActiveStrokeColor={'#ffc01d'}
                          />
                  </CircularProgressBase>
              </CircularProgressBase>*/


import { ScrollView, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { dailySummariesService } from '@/services/daily-summaries.service';
import { Loading } from '@/components/Loading';
import { LineChart } from 'react-native-chart-kit';
import styled from 'styled-components';

export const StatisticsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [days, setDays] = useState([]);
  const [calories, setCalories] = useState([]);
  const [proteins, setProteins] = useState([]);
  const [fats, setFats] = useState([]);
  const [carbs, setCarbs] = useState([]);

  // Функция преобразования данных
  const transformData = (data) => {
    const daysArr = [];
    const caloriesArr = [];
    const proteinsArr = [];
    const fatsArr = [];
    const carbsArr = [];

    data.forEach(item => {
      const date = new Date(item.date);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;

      daysArr.push(formattedDate);
      caloriesArr.push(item.dailyCalories);
      proteinsArr.push(item.dailyProtein);
      fatsArr.push(item.dailyFat);
      carbsArr.push(item.dailyCarbs);
    });

    // Устанавливаем все состояния сразу
    setDays(daysArr);
    setCalories(caloriesArr);
    setProteins(proteinsArr);
    setFats(fatsArr);
    setCarbs(carbsArr);
  };

  useEffect(() => {
    const getStatistics = async () => {
      setIsLoading(true);
      try {
        const data = await dailySummariesService.getAll();
        if (data) {
          transformData(data); // Преобразуем данные сразу
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    getStatistics();
  }, []);

  // Данные для графика
  const dataProtein = {
    labels: days.length > 0 ? days : ['Нет данных'],
    datasets: [
      {
        data: proteins.length > 0 ? proteins : [0],
        color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // Синий для белков
        strokeWidth: 3
      }
    ],
  };

  const dataFat = {
    labels: days.length > 0 ? days : ['Нет данных'],
    datasets: [
      {
        data: fats.length > 0 ? fats : [0],
        color: (opacity = 1) => `rgba(255, 192, 29, ${opacity})`, // Синий для белков
        strokeWidth: 3
      }
    ],
  };

  const dataCarbs = {
    labels: days.length > 0 ? days : ['Нет данных'],
    datasets: [
      {
        data: carbs.length > 0 ? carbs : [0],
        color: (opacity = 1) => `rgba(254, 119, 123, ${opacity})`, // Синий для белков
        strokeWidth: 3
      }
    ],
  };

  const dataCalories = {
    labels: days.length > 0 ? days : ['Нет данных'],
    datasets: [
      {
        data: calories.length > 0 ? calories : [0],
        color: (opacity = 1) => `rgba(135, 135, 135, ${opacity})`, // Синий для белков
        strokeWidth: 3
      }
    ],
  };


  if (isLoading) return <Loading />;

  return (
    <ScrollView  style={{ backgroundColor: "white", flex: 1 }}>

      {days.length > 0 && (
        <StatsView>
          <StatItem>
            <Text style={{ color: '#36a2eb' }}>Белки</Text>
            <Text style={{ fontWeight: 'bold' }}>{proteins.reduce((a, b) => a + b, 0).toFixed(1)}г</Text>
          </StatItem>
          <StatItem>
            <Text style={{ color: '#ffc01d' }}>Жиры</Text>
            <Text style={{ fontWeight: 'bold' }}>{fats.reduce((a, b) => a + b, 0).toFixed(1)}г</Text>
          </StatItem>
          <StatItem>
            <Text style={{ color: '#fe777b' }}>Углеводы</Text>
            <Text style={{ fontWeight: 'bold' }}>{carbs.reduce((a, b) => a + b, 0).toFixed(1)}г</Text>
          </StatItem>
          <StatItem>
            <Text style={{ color: '#878787' }}>Калории</Text>
            <Text style={{ fontWeight: 'bold' }}>{calories.reduce((a, b) => a + b, 0).toFixed(1)}г</Text>
          </StatItem>
        </StatsView>
      )}

      {days.length > 0 ?
        <>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <LineChart
              data={dataProtein}
              width={350}
              height={220}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
              style={{ borderRadius: 16 }}
            />
          </View>

          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <LineChart
              data={dataFat}
              width={350}
              height={220}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
              style={{ borderRadius: 16 }}
            />
          </View>

          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <LineChart
              data={dataCarbs}
              width={350}
              height={220}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
              style={{ borderRadius: 16 }}
            />
          </View>

          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <LineChart
              data={dataCalories}
              width={350}
              height={220}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
              style={{ borderRadius: 16 }}
            />
          </View>
        </>
      :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Нет данных для отображения</Text>
        </View>
      }


    </ScrollView >
  );
}

const TextView = styled.View`
  border-color: #eee9e9;
  border-width: 1px;
  padding: 15px;
  margin: 20px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fafafa;
`;

const StatsView = styled.View`
  margin: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 15px;
  flex-direction: row;
  justify-content: space-around;
`;

const StatItem = styled.View`
  align-items: center;
`;

const chartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#FFFFFF",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  propsForDots: {
    r: "6",
    strokeWidth: "2",
  },
  propsForLabels: {
    fontSize: 12,
    fill: "#000000"
  }
};
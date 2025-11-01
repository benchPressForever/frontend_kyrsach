import { useState } from "react";
import DateTimePicker, { DateType,useDefaultStyles } from "react-native-ui-datepicker";
import styled from "styled-components/native";
import { setDate, setOpenDateModal } from "../store/userReducer";
import { useDispatch, useSelector} from "react-redux";
import { format } from "date-fns";
import { setDaily } from "@/store/dailyReducer";
import { dailySummariesService } from "@/services/daily-summaries.service";


export const DateModal = () => {
    const dispatch = useDispatch()
    const {selectedDate,dailyWeight,dailyHeight} = useSelector(state => state.User)
    const [selected, setSelected] = useState(selectedDate || new Date());

    const defaultStyles = useDefaultStyles();

    console.log(dailyHeight)

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 7); 

    const DateChange = (propDate) => {
        setSelected(propDate.date);
    }

    const handleConfirm = async () => {
        const formattedDate = format(selected, 'yyyy-MM-dd');
        dispatch(setDate(formattedDate)); 
        
        try {
            const res = await dailySummariesService.getByDate(selectedDate);
            if (!res) {
              const data = await dailySummariesService.create({ date: selectedDate,weight : dailyWeight ,height:dailyHeight});
              dispatch(setDaily(data));
            } else {
              dispatch(setDaily(res));
            }
        }catch (e) {
            console.log('Error fetching daily:', e);
        }
        finally{
            dispatch(setOpenDateModal(false))
        }
    }

    return(
        <Main>
            <DateView>
                <DateTimePicker
                    mode="single"
                    date = {selected}
                    onChange={DateChange}
                    use12Hours = {true}
                    minDate={minDate}
                    maxDate={today}
                    styles={{
                        ...defaultStyles,
                        today: { borderColor: '#36a2eb', borderWidth: 1 }, // Add a border to today's date
                        selected: { backgroundColor: '#36a2eb' }, // Highlight the selected day
                        selected_label: { color: 'white' }, // Highlight the selected day label
                    }}
                />
                <ButtonView onPress = {() => handleConfirm()}>
                    <DateText>Выбрать</DateText>
                </ButtonView>
            </DateView>
        </Main>
    );
}

const ButtonView = styled.TouchableOpacity`
    border-radius: 10px;
    width: 20%;
    height: 10%;
    background-color: #36a2eb;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const DateText = styled.Text`
    color: white;
    font-size:14px;
`

const DateView = styled.View`
    display: flex;
    flex-direction: column;
    width: 96%;
    height: 52%;
    margin: 2%;
    padding: 1%;
    background-color: white;
    border-radius: 15px;
    align-items: center;

`

const Main = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`



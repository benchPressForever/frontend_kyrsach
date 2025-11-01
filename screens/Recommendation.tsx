import { Text, View } from "react-native"
import { WebView } from 'react-native-webview';
import { Recommendation } from '@/components/Recommendation';
import { RecommendationCard } from '@/components/RecommendationCard';
import { useEffect, useState } from 'react';
import { recommendationService } from '@/services/recommendation.service';
import { IRecommendationResponse } from '@/types/recommendation.types';
import { Loading } from '@/components/Loading';


export const RecommendationScreen = () => {

    const [recomendations, setRecomendations] = useState<IRecommendationResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const getRecommendations = async () => {
        setIsLoading(true);
        try{
          const data = await recommendationService.getAll()
          setRecomendations(data)
        }
        catch (e){
          console.error(e);
        }
        finally {
          setIsLoading(false);
        }
      }
      getRecommendations();
    },[])

    if (isLoading) return <Loading />;

    return (
      <>
        {recomendations.length > 0 &&
        recomendations.map((r) => {
          return (
            <RecommendationCard
              title={r.title}
              key = {r.id}
              text={r.text}
              id={r.id}
            />
          )
        })}

      </>

    );
}
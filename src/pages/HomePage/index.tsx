import React, { useEffect, useState, useRef } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import pokeball from '../../assets/img/pokeball.png';
import { Card } from '../../components/Card'
import * as S from './styles'
import api from "../../services/api";
import { Button } from "../Welcome/styles";

type PokemonType = {
    type: {
      name: string;
    };
  };
  
type Pokemon = {
    name: string;
    url: string;
    id: number;
    types: PokemonType[];
};

type Request = {
    id: number,
    types: PokemonType[]
};

export function HomePage() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(20);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const flatListRef = useRef(null);
    const { navigate } = useNavigation();

    async function getAllPokemon(offset: number) {
        if (isLoading) {
            return; 
        }
        setIsLoading(true);

        try {
            const response = await api.get(`/pokemon?offset=0&limit=${offset}`);
            const { results } = response.data;
            const payloadPokemons = await Promise.all(
                results.map(async (pokemon: Pokemon) => {
                    const { id, types } = await getMoreInfo(pokemon.url);
    
                    return {
                        name: pokemon.name,
                        id,
                        types
                    };
                })
            );
            setPokemons(payloadPokemons);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function getMoreInfo(url: string): Promise<Request> {
        const response = await api.get(url);
        const { id, types } = response.data;

        return {
            id, types
        };
    }

    function handleLoadMore() {
        if (isLoading) {
            return; 
        }
        setOffset(offset + 20);
        getAllPokemon(offset);
    }

    const handleRefresh = async () => {
        if (isRefreshing) {
          return; 
        }
      
        setIsRefreshing(true);
      
        try {
            getAllPokemon(5);
            setOffset(0);
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const scrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
          }
    };

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const shouldShowButton = offsetY > SCROLL_THRESHOLD;
        
        setShowScrollButton(shouldShowButton);
    };
    
    const SCROLL_THRESHOLD = 500;

    return (
        <S.Container>
            <FlatList
                ListHeaderComponent={
                    <>
                        <S.Header source={pokeball} />
                        <S.Title>Pokédex</S.Title>
                    </>
                }
                contentContainerStyle={{
                    paddingHorizontal: 20
                }}
                data={pokemons}
                keyExtractor={pokemon => pokemon.id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                ref={flatListRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                renderItem={({ item: pokemon }) => {
                    return (
                        <Card data={pokemon}/>
                    )
                }}
                ListFooterComponent={isLoading && <ActivityIndicator size="small" />}
            />
            
            {showScrollButton && (
                <S.ScrollToTopButton onPress={scrollToTop}>
                    <S.ScrollToTopButtonText>Scroll to Top</S.ScrollToTopButtonText>
                </S.ScrollToTopButton>
            )}
        </S.Container>
    );
}
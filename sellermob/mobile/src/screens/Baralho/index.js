import React, { Component } from 'react';
import { Image, FlatList } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button } from 'native-base';
import Detalhe from '../Detalhe'
import ItemSimples from '../../components/ItemSimples'
import BarTelas from '../../components/BarTelas'
import FlipCard from 'react-native-flip-card'
import commonStyles from '../../commonStyles';
const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: require('../../assets/images/foto_01_discos_ab2.jpg'),
  },
  {
    text: 'Card One',
    name: 'One',
    image: require('../../assets/images/foto_01_discos_ab2.jpg'),
  },
  {
    text: 'Card One',
    name: 'One',
    image: require('../../assets/images/foto_01_discos_ab2.jpg'),
  },
  {
    text: 'Card One',
    name: 'One',
    image: require('../../assets/images/foto_01_discos_ab2.jpg'),
  },
];
function Baralho(props) {
    return (
      <Container>
          <BarTelas titulo="PRODUTO" botoes={[
              //{icone: !salvo ? "heart-outline" : "heart" , onPress: () => alterarSalvo()},
              {icone: "magnify" , onPress: () => {}},
              {icone: "share-variant" , onPress: () => Share.share({ message:`Teste`})}
            ]}/>
        <View style={{ flex: 0.8, backgroundColor: commonStyles.colors.secondary, marginBottom: 15 }}>
          <DeckSwiper
            //ref={(c) => this._deckSwiper = c}
            dataSource={cards}
            onSwipeLeft={i => console.log(i)}
            onSwipeRight={i => console.log(i)}
            renderItem={item => 
            <FlipCard 
              friction={6}
              perspective={1000}
              flipHorizontal={true}
              flipVertical={false}
              flip={false}
              clickable={true}
              onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
            >
              {/* Face Side */}
              <View >
                <Detalhe infos img={item.image} style={{ alignSelf: "center", margin: 15 }}/>
              </View>
              {/* Back Side */}
              <View >
                <Detalhe  />
              </View>
            </FlipCard>
            }
          />
        </View>
        <View style={{ flex: 0.2, marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
          <Text style={{ marginLeft: 5, fontWeight: "bold" }}>Mais Produtos</Text>
          <FlatList
            horizontal={true}
            data={cards}
            renderItem={({ item }) => <ItemSimples />}
            keyExtractor={item => `${item}`}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            //contentContainerStyle={{ backgroundColor: commonStyles.colors.primary}}
          />
        </View>
        {/* <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
          <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
            <Icon name="arrow-back" />
            <Text>Swipe Left</Text>
          </Button>
          <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
            <Icon name="arrow-forward" />
            <Text>Swipe Right</Text>
          </Button>
        </View> */}
      </Container>
    );
}

export default Baralho;
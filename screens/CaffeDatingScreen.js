import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';

const { width, height } = Dimensions.get('window');

export default function CaffeDatingScreen({ navigation }) {
  const [cards, setCards] = useState([
    { id: '1', name: 'Alice', age: 24, bio: 'Amoureuse du café et des bonnes conversations.', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '2', name: 'Bob', age: 28, bio: 'Cherche un partenaire pour explorer les meilleurs cafés de la ville.', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '3', name: 'Charlie', age: 22, bio: 'Étudiante, passionnée de latte art et de musique.', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '4', name: 'Diana', age: 26, bio: 'Développeuse, aime les cafés calmes pour travailler.', imageUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ]);

  const renderCard = (card) => {
    if (!card) {
      return (
        <View style={styles.noMoreCards}>
          <Text style={styles.noMoreCardsText}>Plus de profils pour le moment !</Text>
          <Text style={styles.noMoreCardsText}>Revenez plus tard.</Text>
        </View>
      );
    }
    return (
      <View style={styles.card}>
        <Image source={{ uri: card.imageUrl }} style={styles.cardImage} />
        <View style={styles.cardFooter}>
          <Text style={styles.cardName}>{card.name}, {card.age}</Text>
          <Text style={styles.cardBio}>{card.bio}</Text>
          <TouchableOpacity style={styles.messageButton} onPress={() => navigation.navigate('Chat', { userName: card.name })}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color="#FFF" />
            <Text style={styles.messageButtonText}>Envoyer un message</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#3A2A23" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coffee Dating</Text>
      </View>
      <View style={styles.swiperContainer}>
        {cards.length > 0 ? (
          <Swiper
            cards={cards}
            renderCard={renderCard}
            onSwipedLeft={(cardIndex) => console.log('Swiped left:', cards[cardIndex].name)}
            onSwipedRight={(cardIndex) => console.log('Swiped right:', cards[cardIndex].name)}
            onSwipedAll={() => setCards([])}
            cardIndex={0}
            backgroundColor={'transparent'}
            stackSize={3}
            stackSeparation={15}
            overlayLabels={{
              left: {
                title: 'NON',
                style: {
                  label: {
                    backgroundColor: '#FF6B6B',
                    borderColor: '#FF6B6B',
                    color: 'white',
                    fontSize: 24,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: -30,
                  },
                },
              },
              right: {
                title: 'OUI',
                style: {
                  label: {
                    backgroundColor: '#4CAF50',
                    borderColor: '#4CAF50',
                    color: 'white',
                    fontSize: 24,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: 30,
                  },
                },
              },
            }}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
          />
        ) : (
          <View style={styles.noMoreCards}>
            <Text style={styles.noMoreCardsText}>Plus de profils pour le moment !</Text>
            <Text style={styles.noMoreCardsText}>Revenez plus tard.</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF5EF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  swiperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 15,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  cardFooter: {
    padding: 15,
    height: '30%',
    justifyContent: 'space-between',
  },
  cardName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  cardBio: {
    fontSize: 16,
    color: '#6B4F33',
    marginTop: 5,
  },
  messageButton: {
    flexDirection: 'row',
    backgroundColor: '#6B4F33',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  messageButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreCardsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B4F33',
    textAlign: 'center',
  },
});


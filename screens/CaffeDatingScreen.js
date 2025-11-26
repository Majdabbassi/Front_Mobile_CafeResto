import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Modal, ScrollView, TextInput, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';

const { width, height } = Dimensions.get('window');

export default function CaffeDatingScreen({ navigation }) {
  const [cards, setCards] = useState([
    { id: '1', name: 'Alice', age: 24, bio: 'Amoureuse du café et des bonnes conversations.', interests: 'Latte Art, Lectures', favoriteSpot: 'Café des Arts', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?auto=format&fit=crop&q=80&w=1974' },
    { id: '2', name: 'Bob', age: 28, bio: 'Cherche un partenaire pour explorer les meilleurs cafés de la ville.', interests: 'Barista, Voyages', favoriteSpot: 'Coffee Lab', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1974' },
    { id: '3', name: 'Charlie', age: 22, bio: 'Étudiante, passionnée de latte art et de musique.', interests: 'Musique Jazz, Art', favoriteSpot: 'Le Percolateur', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1964' },
    { id: '4', name: 'Diana', age: 26, bio: 'Développeuse, aime les cafés calmes pour travailler.', interests: 'Tech, Livres', favoriteSpot: 'Quiet Bean', imageUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&q=80&w=1974' },
    { id: '5', name: 'Emma', age: 25, bio: 'Photographe freelance et amatrice de café équitable.', interests: 'Photo, Écologie', favoriteSpot: 'Green Coffee', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1970' },
    { id: '6', name: 'Frank', age: 30, bio: 'Chef pâtissier, créateur de desserts au café.', interests: 'Pâtisserie, Cuisine', favoriteSpot: 'Sweet Brew', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974' },
    { id: '7', name: 'Grace', age: 23, bio: 'Artiste, adore dessiner dans les cafés cosy.', interests: 'Dessin, Peinture', favoriteSpot: 'Café Canvas', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1974' },
    { id: '8', name: 'Henry', age: 27, bio: 'Professeur de yoga, boit du thé vert mais adore les cafés.', interests: 'Yoga, Méditation', favoriteSpot: 'Zen Coffee', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1974' },
    { id: '9', name: 'Iris', age: 29, bio: 'Journaliste, toujours à la recherche de nouvelles histoires.', interests: 'Écriture, Voyages', favoriteSpot: 'Press Café', imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1974' },
    { id: '10', name: 'Jack', age: 31, bio: 'Musicien, joue souvent dans les cafés le soir.', interests: 'Guitare, Concerts', favoriteSpot: 'Acoustic Brew', imageUrl: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&q=80&w=1970' },
    { id: '11', name: 'Kate', age: 24, bio: 'Designer graphique, aime le café et les espaces créatifs.', interests: 'Design, Art Digital', favoriteSpot: 'Pixel Café', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1964' },
    { id: '12', name: 'Leo', age: 26, bio: 'Entrepreneur passionné de startups et de café fort.', interests: 'Business, Tech', favoriteSpot: 'Startup Grind', imageUrl: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=1935' },
  ]);

  const [showConceptModal, setShowConceptModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [myProfile, setMyProfile] = useState({
    name: 'Vous',
    age: 25,
    bio: 'Votre description ici...',
    interests: 'Vos centres d\'intérêt',
    favoriteSpot: 'Votre café préféré',
  });

  const renderCard = (card) => {
    if (!card) {
      return (
        <View style={styles.noMoreCards}>
          <Ionicons name="cafe-outline" size={80} color="#6B4F33" />
          <Text style={styles.noMoreCardsText}>Plus de profils pour le moment !</Text>
          <Text style={styles.noMoreCardsSubtext}>Revenez plus tard.</Text>
        </View>
      );
    }
    return (
      <View style={styles.card}>
        <Image source={{ uri: card.imageUrl }} style={styles.cardImage} />
        <TouchableOpacity 
          style={styles.infoButton}
          onPress={() => {
            setSelectedProfile(card);
            setShowProfileModal(true);
          }}
        >
          <Ionicons name="information-circle" size={28} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.cardFooter}>
          <Text style={styles.cardName}>{card.name}, {card.age}</Text>
          <Text style={styles.cardBio}>{card.bio}</Text>
          <View style={styles.cardTags}>
            <View style={styles.tag}>
              <Ionicons name="heart" size={14} color="#6B4F33" />
              <Text style={styles.tagText}>{card.interests.split(',')[0]}</Text>
            </View>
            <View style={styles.tag}>
              <Ionicons name="location" size={14} color="#6B4F33" />
              <Text style={styles.tagText}>{card.favoriteSpot}</Text>
            </View>
          </View>
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
        <TouchableOpacity onPress={() => setShowConceptModal(true)} style={styles.iconButton}>
          <Ionicons name="help-circle-outline" size={24} color="#3A2A23" />
        </TouchableOpacity>
      </View>

      {/* Toggle Visibility */}
      <View style={styles.visibilityContainer}>
        <View style={styles.visibilityContent}>
          <Ionicons name={isVisible ? "eye" : "eye-off"} size={20} color="#6B4F33" />
          <Text style={styles.visibilityText}>
            {isVisible ? "Votre profil est visible" : "Votre profil est masqué"}
          </Text>
        </View>
        <Switch
          value={isVisible}
          onValueChange={setIsVisible}
          trackColor={{ false: '#D3D3D3', true: '#6B4F33' }}
          thumbColor={isVisible ? '#FFF' : '#f4f3f4'}
        />
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
                    borderRadius: 10,
                    padding: 10,
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
                    borderRadius: 10,
                    padding: 10,
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
            <Ionicons name="cafe-outline" size={80} color="#6B4F33" />
            <Text style={styles.noMoreCardsText}>Plus de profils pour le moment !</Text>
            <Text style={styles.noMoreCardsSubtext}>Revenez plus tard.</Text>
          </View>
        )}
      </View>

      {/* Concept Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showConceptModal}
        onRequestClose={() => setShowConceptModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Concept Coffee Dating</Text>
              <TouchableOpacity onPress={() => setShowConceptModal(false)}>
                <Ionicons name="close" size={28} color="#3A2A23" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <View style={styles.conceptSection}>
                <Ionicons name="cafe" size={40} color="#6B4F33" />
                <Text style={styles.conceptTitle}>Rencontrez autour d'un café</Text>
                <Text style={styles.conceptText}>
                  Coffee Dating est une plateforme qui connecte les amoureux du café. 
                  Partagez votre passion pour les bonnes tasses et faites des rencontres 
                  authentiques dans une ambiance chaleureuse.
                </Text>
              </View>
              
              <View style={styles.conceptSection}>
                <Ionicons name="heart-circle" size={40} color="#FF6B6B" />
                <Text style={styles.conceptTitle}>Comment ça marche ?</Text>
                <Text style={styles.conceptText}>
                  1. Swipez à droite (❤️) si le profil vous plaît{'\n'}
                  2. Swipez à gauche (✖️) pour passer{'\n'}
                  3. Si vous avez un match, vous pouvez discuter !{'\n'}
                  4. Proposez une rencontre dans votre café préféré
                </Text>
              </View>

              <View style={styles.conceptSection}>
                <Ionicons name="shield-checkmark" size={40} color="#4CAF50" />
                <Text style={styles.conceptTitle}>Matching Sécurisé</Text>
                <Text style={styles.conceptText}>
                  Votre profil n'est visible que par les personnes qui correspondent 
                  à vos préférences. Vous contrôlez votre visibilité et pouvez 
                  masquer votre profil à tout moment.
                </Text>
              </View>

              <View style={styles.conceptSection}>
                <Ionicons name="people" size={40} color="#3A2A23" />
                <Text style={styles.conceptTitle}>Communauté Coffee</Text>
                <Text style={styles.conceptText}>
                  Rejoignez une communauté de passionnés qui partagent votre amour 
                  pour le café. Découvrez de nouveaux lieux, partagez vos expériences 
                  et créez des connexions authentiques.
                </Text>
              </View>
            </ScrollView>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setShowConceptModal(false)}
            >
              <Text style={styles.modalButtonText}>Compris !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Profile Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showProfileModal}
        onRequestClose={() => setShowProfileModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.profileModalContent}>
            <TouchableOpacity 
              style={styles.closeProfileButton}
              onPress={() => setShowProfileModal(false)}
            >
              <Ionicons name="close-circle" size={36} color="#FFF" />
            </TouchableOpacity>
            
            {selectedProfile && (
              <ScrollView>
                <Image 
                  source={{ uri: selectedProfile.imageUrl }} 
                  style={styles.profileImage}
                />
                <View style={styles.profileDetails}>
                  <Text style={styles.profileName}>
                    {selectedProfile.name}, {selectedProfile.age}
                  </Text>
                  
                  <View style={styles.profileSection}>
                    <Ionicons name="chatbubble-ellipses" size={20} color="#6B4F33" />
                    <Text style={styles.profileSectionTitle}>À propos</Text>
                  </View>
                  <Text style={styles.profileBio}>{selectedProfile.bio}</Text>

                  <View style={styles.profileSection}>
                    <Ionicons name="heart" size={20} color="#6B4F33" />
                    <Text style={styles.profileSectionTitle}>Centres d'intérêt</Text>
                  </View>
                  <Text style={styles.profileInfo}>{selectedProfile.interests}</Text>

                  <View style={styles.profileSection}>
                    <Ionicons name="location" size={20} color="#6B4F33" />
                    <Text style={styles.profileSectionTitle}>Café préféré</Text>
                  </View>
                  <Text style={styles.profileInfo}>{selectedProfile.favoriteSpot}</Text>

                  <TouchableOpacity 
                    style={styles.sendMessageButton}
                    onPress={() => {
                      setShowProfileModal(false);
                      navigation.navigate('Chat', { userName: selectedProfile.name });
                    }}
                  >
                    <Ionicons name="chatbubble-ellipses" size={20} color="#FFF" />
                    <Text style={styles.sendMessageText}>Envoyer un message</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
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
    flex: 1,
  },
  iconButton: {
    marginLeft: 10,
  },
  visibilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  visibilityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visibilityText: {
    fontSize: 16,
    color: '#3A2A23',
    marginLeft: 10,
    fontWeight: '600',
  },
  swiperContainer: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    width: width * 0.9,
    height: height * 0.65,
    borderRadius: 20,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '65%',
    resizeMode: 'cover',
  },
  infoButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
  },
  cardFooter: {
    padding: 20,
    height: '35%',
    justifyContent: 'flex-start',
  },
  cardName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 8,
  },
  cardBio: {
    fontSize: 15,
    color: '#6B4F33',
    marginBottom: 12,
    lineHeight: 20,
  },
  cardTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5E6D3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  tagText: {
    fontSize: 13,
    color: '#6B4F33',
    marginLeft: 5,
    fontWeight: '500',
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  noMoreCardsText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3A2A23',
    textAlign: 'center',
    marginTop: 20,
  },
  noMoreCardsSubtext: {
    fontSize: 16,
    color: '#6B4F33',
    textAlign: 'center',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    maxHeight: height * 0.85,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  conceptSection: {
    marginBottom: 30,
    alignItems: 'center',
  },
  conceptTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  conceptText: {
    fontSize: 15,
    color: '#6B4F33',
    textAlign: 'center',
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: '#6B4F33',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileModalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: height * 0.9,
    overflow: 'hidden',
  },
  closeProfileButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 18,
  },
  profileImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  profileDetails: {
    padding: 25,
  },
  profileName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 8,
  },
  profileSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginLeft: 8,
  },
  profileBio: {
    fontSize: 16,
    color: '#6B4F33',
    lineHeight: 24,
    marginBottom: 10,
  },
  profileInfo: {
    fontSize: 16,
    color: '#6B4F33',
    lineHeight: 24,
  },
  sendMessageButton: {
    flexDirection: 'row',
    backgroundColor: '#6B4F33',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  sendMessageText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
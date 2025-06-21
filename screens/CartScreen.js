import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const CartScreen = ({ route, navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const product = route.params?.product;
    if (product && !cart.some(item => item.id === product.id)) {
      setCart(prevCart => [...prevCart, product]);
    }
  }, [route.params?.product]);

  const placeOrder = () => {
    Alert.alert('Success', 'Order placed successfully!');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Your Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
        showsVerticalScrollIndicator={false}
      />

      {cart.length > 0 && (
        <TouchableOpacity style={styles.orderButton} onPress={placeOrder}>
          <Text style={styles.orderButtonText}>Place Order (COD)</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
    color: '#111827',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 40,
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    width: CARD_WIDTH * 0.4,
    height: CARD_HEIGHT,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#111827',
  },
  price: {
    fontSize: 16,
    color: '#2563EB',
    marginBottom: 12,
  },
  detailsButton: {
    backgroundColor: '#E0E7FF',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#1D4ED8',
    fontWeight: '600',
  },
  orderButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartScreen;

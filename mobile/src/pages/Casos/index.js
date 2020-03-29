import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Casos() {
  const [casos, setCasos] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  
  function navigateToDetail(caso) {
    navigation.navigate('Detail', { caso });
  }

  async function carregaCasos() {
    if (loading) {
      return;
    }

    if (total > 0 && casos.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get('casos', {
      params: { page }
    });

    setCasos([... casos, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    carregaCasos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList 
        data={casos}
        style={styles.listaCasos}
        keyExtractor={caso => String(caso.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={carregaCasos}
        onEndReachedThreshold={0.1}
        renderItem={({ item: caso }) => (
          <View style={styles.caso}>
            <Text style={styles.propCaso}>Ong:</Text>
            <Text style={styles.valorCaso}>{caso.name}</Text>

            <Text style={styles.propCaso}>Caso:</Text>
            <Text style={styles.valorCaso}>{caso.titulo}</Text>

            <Text style={styles.propCaso}>Valor:</Text>
            <Text style={styles.valorCaso}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency', 
                currency: 'BRL'
              }).format(caso.valor)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(caso)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
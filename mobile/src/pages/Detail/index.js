import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const caso = route.params.caso;
  const message = `Olá, ${caso.name}, estou entrando em contato pois gostaria de ajudar no caso "${caso.titulo}" com o valor de 
    ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor)}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${caso.titulo}`,
      recipients: [caso.email],
      body: message
    })
  }

  function sendWhats() {
    Linking.openURL(`whatsapp://send?phone=${caso.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.caso}>
        <Text style={[styles.propCaso, { marginTop: 0 }]}>Ong:</Text>
        <Text style={styles.valorCaso}>{caso.name} de {caso.cidade}/{caso.uf}</Text>

        <Text style={styles.propCaso}>Caso:</Text>
        <Text style={styles.valorCaso}>{caso.titulo}</Text>

        <Text style={styles.propCaso}>Descrição:</Text>
        <Text style={styles.valorCaso}>{caso.descricao}</Text>

        <Text style={styles.propCaso}>Valor:</Text>
        <Text style={styles.valorCaso}>
          {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor)}
        </Text>

        <View style={styles.contactBox}>
          <Text style={styles.heroTitle}>Salve o dia!</Text>
          <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

          <Text style={styles.heroDescription}>Entre em contato:</Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={sendWhats}>
              <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={sendMail}>
              <Text style={styles.actionText}>E-mail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
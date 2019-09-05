import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, AsyncStorage} from 'react-native';
import { Container, Content, View, } from 'native-base';

var today = new Date();
var date = (today.getDate() < 9 ? "0" + today.getDate() : today.getDate()) + '.' + (today.getMonth() < 9 ? "0" + (today.getMonth()+1) : today.getMonth()+1) + '.' + today.getFullYear();

export default class Succes extends Component {

  constructor() {
      super();
      this.state = {
          date: '',
      }
  }

   
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fccd02'
    },
    title: `Заявка от `+ date
  };

  main = async () => {
    // await AsyncStorage.clear();
    this.props.navigation.navigate('Request');
  }

  render() {
    const { btn, btnText, textCentr, headerText, images, viewMain, ftxt} = styles;
    return (
      <Container>
        <Content padder>
            <View style={textCentr}>
                <Text style={headerText}>Ваша заявка отправлена на предварительное рассмотрение</Text>
            </View>
            <View style={viewMain}>
                <Image
                    style={images}
                    source={require('../assets/222.jpg')}
                  />
            </View>
            <View style={ftxt}>
                <TouchableOpacity onPress={this.main} style={btn}>
                    <Text style={btnText}>ОК</Text>
                </TouchableOpacity>
            </View>
        </Content>
       
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textCentr: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20
  },
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: '#fccd02',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  ftxt: {
    width: '100%',
    marginVertical: 20,
  },
  images: {
      width: 300,
      height: 300
  },
  viewMain: {
      justifyContent: 'center',
      alignItems: 'center'
  }
 
});
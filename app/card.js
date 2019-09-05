import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import { Container, Content, View, Item, Label } from 'native-base';
import { TextInputMask } from 'react-native-masked-text'

var today = new Date();
var date = (today.getDate() < 9 ? "0" + today.getDate() : today.getDate()) + '.' + (today.getMonth() < 9 ? "0" + (today.getMonth()+1) : today.getMonth()+1) + '.' + today.getFullYear();


export default class Card extends Component {

  constructor() {
      super();
      this.state = {
          date: '',
          creditCard: '',
      }
  }

   
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fccd02'
    },
    title: `Заявка от `+ date
  };

  
  

  card = async () => {
    try {
         await AsyncStorage.setItem('cardNumber', JSON.stringify(this.state.creditCard));
         this.props.navigation.navigate('Ok')
      } catch (error) {
        console.error(error);
      }
  }
  test = () => {
    this.props.navigation.navigate('Ok');
  } 

  render() {
    const { btn, btnText, textCentr, headerText, input, card, btnTwo, validText } = styles;

    return (
      <Container>
        <Content padder>
            <View style={textCentr}>
                <Text style={headerText}>Способ получения денежных средств</Text>
            </View>
            <Item style={input} stackedLabel>
              <Label>Банковская карта</Label>
             
              <TextInputMask
                    style={card}
                    type={'credit-card'}
                    options={{
                        obfuscated: false,
                        dddMask: '[9999, 9999, 9999, 9999]'
                    }}
                    onChangeText={(creditCard) => {
                      this.setState({
                        creditCard: creditCard
                      })
                      if (creditCard == '') {
                          this.setState({
                            validText: 'Заполните поле',
                            btnValid: false
                          })
                      } else if (creditCard.length > 18) {
                          this.setState({
                            validText: '',
                            btnValid: true
                          })
                      } else if (creditCard.length < 19) {
                          this.setState({
                            validText: '',
                            btnValid: false
                          })
                      }
                    }}
                    value={this.state.creditCard}
                    autoFocus={true}
              />
              <Text style={validText}>{this.state.validText}</Text>                
            </Item>
        </Content>
        <View>
        {
            this.state.btnValid == true ? 
            <TouchableOpacity onPress={this.test} style={btn}>
              <Text style={btnText}>Продолжить</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={btnTwo}>
              <Text style={btnText}>Продолжить</Text>
            </TouchableOpacity>
          }
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  validText: {
      color: 'red',
      fontSize: 11
  },
  btnTwo: {
    width: '100%',
    height: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
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
  input: {
      marginVertical: 50
  },
  card: {
     width: '100%',
     height: 30,
  }
 
});
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert, AsyncStorage, NetInfo,  } from 'react-native';
import { Container, Content, Item, Label, View } from 'native-base';
import { TextInputMask } from 'react-native-masked-text'


export default class Phone extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fccd02'
    },
    title: "Автозайм"
  };

  constructor() {
     super();

     this.state = {
        phone: '+7',
        validText: '',
        btnValid: false,
        isConnected: null,
        modalVisible: false,
     }
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
        'change',
        this._handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done(
        (isConnected) => { this.setState({isConnected}); }
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
        'change',
        this._handleConnectivityChange
    );
  }

  _handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
  };
 
  sendSms = async () => {
      try {
        await AsyncStorage.setItem('phone', JSON.stringify(this.state.phone));
        var res = await fetch('http://lombard-api.rapid-it.kz/public/api/sendCode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "phone": this.state.phone,
          })
        });
        var parceJS = JSON.parse(res._bodyInit);
        console.warn(parceJS);
        if (parceJS.message == 'Code success send') {
            this.props.navigation.navigate('Sms');
        }
        else if (parceJS.phone[0] == 'The phone field is required.') {
            Alert.alert('Введите номер телефона');
        }
        else if (parceJS.error == 'The phone number not registred') {
            Alert.alert('Номер зарегистрирован!');
        }
      } catch (error) {
        console.warn(error);
      }
  }

  test = () => {
    this.props.navigation.navigate('Sms');
  }  

  render() {
    const { btn, btnText, headerText, modalT, modalW, validText, descriptionText, input, maskInp, btnTwo } = styles;
    return (
      <Container>
        <Content padder>
            <View>
                <Text style={headerText}>Введите номер телефона для авторизации</Text>
            </View>
            <Item style={input} stackedLabel>
              <Label>Мобильный телефон</Label>
              <TextInputMask
                    style={maskInp}
                    onChangeText={(phone) => {
                      this.setState({phone})
                      if (phone == '') {
                          this.setState({
                            validText: 'Заполните поле',
                            btnValid: false
                          })
                      } else if (phone.length > 17) {
                          this.setState({
                            validText: '',
                            btnValid: true
                          })
                      } else if (phone.length < 18) {
                          this.setState({
                            validText: '',
                            btnValid: false
                          })
                      }
                    }}
                    value={this.state.phone}
                    refInput={(ref) => this.myDateText = ref}
                    autoFocus={true}
                    type={'cel-phone'}
                    options={{
                      dddMask: '+7 (999) 999-99-99'
                    }}
                    maxLength={18}
              /> 
              <Text style={validText}>{this.state.validText}</Text>                
            </Item>
             
            <View>
              <Text style={descriptionText}>
                  Нажимая "Продолжить", я соглашаюсь с Пользовательским соглашением и обработкой моей персональной информации на условиях Политики конфиденциальности
              </Text>
            </View>
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
        </Content>
        {
          this.state.isConnected ? 
          <Text></Text> : 
          <View style={modalW}>
              <Text style={modalT}>Нет соединения с интернетом ☹ </Text>
          </View>
        }
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: '#fccd02',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  modalT: {
    fontSize: 17,
  },
  modalW: {
     width: '100%',
     height: 50,
     backgroundColor: '#fccd02',
     justifyContent: 'center',
     alignItems: 'center',
  },
  btnTwo: {
    width: '100%',
    height: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  validText: {
      color: 'red',
      fontSize: 11
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  descriptionText: {
    color: 'gray',    
    fontSize: 11,
    marginTop: 20
  },
  input: {
     marginTop: 10
  },
  maskInp: {
     width: "100%",
     height: 50,
  }
});
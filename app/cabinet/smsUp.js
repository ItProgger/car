import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, AsyncStorage, TouchableWithoutFeedback} from 'react-native';
import { Container, Content, Item, Input, View } from 'native-base';

const CODE_LENGTH = new Array(4).fill(0);

export default class Sms extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fccd02'
    },
    title: "Вход"
  };

  constructor() {
    super();
    this.state = {
       error: '',
       value: "",
       focused: false,
    }
  }

  handlePress = () => {
    this.input.current.focus();
  };
  handleFocus = () => {
    this.setState({ focused: true });
  };
  handleBlur = () => {
    this.setState({
      focused: false,
    });
  };
  handleKeyPress = e => {
    if (e.nativeEvent.key === "Backspace") {
      this.setState(state => {
        return {
          value: state.value.slice(0, state.value.length - 1),
        };
      });
    }
  };
  handleChange = value => {
    this.setState(state => {
      if (state.value.length >= CODE_LENGTH.length) return null;
      return {
        value: (state.value + value).slice(0, CODE_LENGTH.length),
      };
    });
  };

  sms = async () => {
    try {
      var phone = await AsyncStorage.getItem('phone');
      var jsp = await JSON.parse(phone);
      var res = await fetch('http://lombard-api.rapid-it.kz/public/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "phone": jsp,
          "code": this.state.value
        })
      });
      var parceJS = JSON.parse(res._bodyInit);
      if (parceJS.error == 'Invalid verify code or phone!') {
          this.setState({
              error: 'Не верный код!'
          })
      }
      else if (parceJS.token != '') {
          await AsyncStorage.setItem('token', JSON.stringify(parceJS.token));
          this.props.navigation.navigate('Cabinet');
      }
     
    } catch (error) {
      console.warn(error);
    }
  }

  input = React.createRef();

  test = () => {
    this.props.navigation.navigate('Cabinet');
  } 

  render() {
    const { value, focused  } = this.state;
    const values = value.split("");
    const hideInput = !(values.length < CODE_LENGTH.length);
    const selectedIndex = values.length < CODE_LENGTH.length ? values.length : CODE_LENGTH.length - 1;
    const { btn, btnText, headerText, input, textCentr, errorText, inputCenter, errorBlock } = styles;

    return (
      <Container>
        <Content padder>
            <View style={textCentr}>
                <Text style={headerText}>Введите cмс код</Text>
            </View>
            <Item style={input} stackedLabel last>              
                <View style={styles.wrap}>
                        {
                          CODE_LENGTH.map((v, index) => {
                            const selected = values.length === index;
                            const filled = values.length === CODE_LENGTH.length && index === CODE_LENGTH.length - 1;
                            const removeBorder = index === CODE_LENGTH.length - 1 ? styles.noBorder : undefined;

                            return (
                              <TouchableWithoutFeedback key={index} onPress={this.handlePress}>
                                <View style={[styles.display, removeBorder]} key={index}>
                                  <Text style={styles.text}>{values[index] || ""}</Text>
                                  {(selected || filled) && focused && <View style={styles.shadows} />}
                                </View>
                              </TouchableWithoutFeedback>
                            );
                          })
                        }
                  </View>
                   
                  <TextInput
                    value=""  
                    ref={this.input}
                    keyboardType={'numeric'}
                    autoFocus={true}
                    maxLength={4}
                    onChangeText={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    style={[
                      styles.input,
                      {
                        left: selectedIndex * 32,
                        opacity: hideInput ? 0 : 1,
                        height: 0,
                      },
                    ]}
                  />
                  <View style={errorBlock}>
                    <Text style={errorText}>{this.state.error}</Text>
                  </View>
              </Item>
              
              <View>
                <TouchableOpacity style={btn} onPress={this.test}>
                  <Text style={btnText}>Продолжить</Text>
                </TouchableOpacity>
              </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    position: "absolute",
    fontSize: 32,
    textAlign: "center",
    backgroundColor: "transparent",
    top: 0,
    bottom: 0,
  },
  shadows: {
    position: "absolute",
    left: -4,
    top: -4,
    bottom: -4,
    right: -4,
    borderColor: "#fccd02",
    borderWidth: 2,
  },
  wrap: {
    position: "relative",
    flexDirection: "row",
    justifyContent: 'center'
  },

  display: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    width: 40,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  text: {
    fontSize: 32,
  },
  noBorder: {
    borderRightWidth: 1,
  },
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: '#fccd02',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textCentr: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20
  },
  descriptionText: {
    color: 'gray',    
    fontSize: 11,
    marginTop: 20
  },
  input: {
     marginTop: 10
  },
  errorText: {
     color: 'red',
     fontSize: 14,
  },
  errorBlock: {
     width: '100%',
     flexDirection: 'row',
     justifyContent: 'center',
  },
  inputCenter: {
     textAlign: 'center'
  }
});
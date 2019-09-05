import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Container, Content, View, Item, Input, Label } from 'native-base';

var today = new Date();
var date = (today.getDate() < 9 ? "0" + today.getDate() : today.getDate()) + '.' + (today.getMonth() < 9 ? "0" + (today.getMonth()+1) : today.getMonth()+1) + '.' + today.getFullYear();

export default class Additionally extends Component {

  constructor() {
      super();
      this.state = {
          date: '',

          // ------
          adress: '',
          plateg: '',
          zanatost: '',
          org: '',
          adressWork: '',
          yearsold: '',
          mount: '',
          phone: '',

          validText1: '',
          validText2: '',
          validText3: '',
          validText4: '',
          validText5: '',
          validText6: '',
          validText7: '',
          validText8: '',
      }
  }

   
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fccd02'
    },
    title: `Заявка от `+ date
  };

  additionally = async () => {
    if ((this.state.adress == '') || (this.state.mount == '') || (this.state.plateg == '') || (this.state.zanatost == '') || (this.state.org == '') || (this.state.adressWork == '') || (this.state.yearsold == '') || (this.state.phone == '')) {
        if (this.state.adress == '') {
            this.setState({
              validText1: 'Заполните поле',
            })
        } else if (this.state.plateg == '') {
            this.setState({
              validText2: 'Заполните поле',
            })
        }  else if (this.state.zanatost == '') {
            this.setState({
              validText3: 'Заполните поле',
            })
        }  else if (this.state.org == '') {
            this.setState({
              validText4: 'Заполните поле',
            })
        }  else if (this.state.adressWork == '') {
            this.setState({
              validText5: 'Заполните поле',
            })
        }  else if (this.state.yearsold == '') {
            this.setState({
              validText6: 'Заполните поле',
            })
        }  else if (this.state.mount == '') {
            this.setState({
              validText7: 'Заполните поле',
            })
        } else if (this.state.phone == '') {
            this.setState({
              validText8: 'Заполните поле',
            })
        } 
    } else {

        this.setState({
            validText1: '',
            validText2: '',
            validText3: '',
            validText4: '',
            validText5: '',
            validText6: '',
            validText7: '',
            validText8: '',
        })
        var obj = {
            adress: this.state.adress,
            plateg: this.state.plateg,
            zanatost: this.state.zanatost,
            org: this.state.org,
            adressWork: this.state.adressWork,
            yearsold: this.state.yearsold,
            phone: this.state.phone,
            mount: this.state.mount,
        }
        await AsyncStorage.setItem('list2', JSON.stringify(obj));
        this.props.navigation.navigate('Infocontact');
    }
  }
  test = () => {
    this.props.navigation.navigate('Infocontact');
  } 

  async componentDidMount() {
    try {
      var list2 = await AsyncStorage.getItem('list2');
      var jspList2 = JSON.parse(list2);
      if (jspList2 != null) {
        this.setState({
          adress: jspList2.adress,
          plateg: jspList2.plateg,
          zanatost: jspList2.zanatost,
          org: jspList2.org,
          adressWork: jspList2.adressWork,
          yearsold: jspList2.yearsold,
          phone: jspList2.phone,
          mount: jspList2.mount,
        })
      }
   }
   catch (error) {
      console.warn(error);
   }
  }

  render() {
    const { btn, btnText, marginData, textCentr, headerText, stageText, validText, stage } = styles;
    return (
      <Container>
        <Content padder>
            <KeyboardAvoidingView behavior="padding">
            <View style={textCentr}>
                <Text style={headerText}>Дополнительная информация о клиенте</Text>
            </View>
            <Item style={marginData} stackedLabel>
                <Label>* Адрес фактического проживания</Label>
                <Input 
                    onChangeText={(adress) => {
                        this.setState({adress})
                        if (adress == '') {
                            this.setState({
                              validText1: 'Заполните поле',
                            })
                         } else if (adress != '') {
                            this.setState({
                              validText1: '',
                            })
                         }
                    }} 
                    value={this.state.adress}
                />
                <Text style={validText}>{this.state.validText1}</Text>
            </Item>
            <Item style={marginData} stackedLabel>
                <Label>* Платеж по текущим кредитам, тенге/месяц</Label>
                <Input
                    keyboardType={'numeric'}
                    onChangeText={(plateg) => {
                        this.setState({plateg})
                        if (plateg == '') {
                            this.setState({
                              validText2: 'Заполните поле',
                            })
                         } else if (plateg != '') {
                            this.setState({
                              validText2: '',
                            })
                         }
                    }}
                    value={this.state.plateg}
                />
                <Text style={validText}>{this.state.validText2}</Text>
            </Item>
            <Item style={marginData} stackedLabel>
                <Label>* Занятость</Label>
                <Input
                    onChangeText={(zanatost) => {
                        this.setState({zanatost})
                        if (zanatost == '') {
                            this.setState({
                              validText3: 'Заполните поле',
                            })
                         } else if (zanatost != '') {
                            this.setState({
                              validText3: '',
                            })
                        }
                    }}
                    value={this.state.zanatost}
                />
                <Text style={validText}>{this.state.validText3}</Text>
            </Item>
            <Item style={marginData} stackedLabel>
                <Label>* Организация</Label>
                <Input 
                    onChangeText={(org) => {
                        this.setState({org})
                        if (org == '') {
                            this.setState({
                              validText4: 'Заполните поле',
                            })
                         } else if (org != '') {
                            this.setState({
                              validText4: '',
                            })
                        }
                    }}
                    value={this.state.org}
                />
                <Text style={validText}>{this.state.validText4}</Text>
            </Item>
            <Item style={marginData} stackedLabel>
                <Label>* Адрес места работы</Label>
                <Input 
                    onChangeText={(adressWork) => {
                        this.setState({adressWork})
                        if (adressWork == '') {
                            this.setState({
                              validText5: 'Заполните поле',
                            })
                         } else if (adressWork != '') {
                            this.setState({
                              validText5: '',
                            })
                        }
                    }}
                    value={this.state.adressWork}
                />
                <Text style={validText}>{this.state.validText5}</Text>
            </Item>
            <View style={stage}>
                <Text style={stageText}>Стаж на этом месте работы</Text>
            </View>
            <Item style={marginData} stackedLabel>    
                <Label>* Лет</Label>
                <Input 
                    maxLength={12}
                    keyboardType={'numeric'}
                    onChangeText={(yearsold) => {
                        this.setState({yearsold})
                        if (yearsold == '') {
                            this.setState({
                              validText6: 'Заполните поле',
                            })
                         } else if (yearsold != '') {
                            this.setState({
                              validText6: '',
                            })
                        }
                    }}
                    value={this.state.yearsold}
                />
                <Text style={validText}>{this.state.validText6}</Text>
            </Item>
            <Item style={marginData} stackedLabel>
                <Label>* Месяцев</Label>
                <Input 
                    keyboardType={'numeric'}
                    onChangeText={(mount) => {
                        this.setState({mount})
                        if (mount == '') {
                            this.setState({
                              validText7: 'Заполните поле',
                            })
                         } else if (mount != '') {
                            this.setState({
                              validText7: '',
                            })
                        }
                    }}
                    value={this.state.mount}
                />
                <Text style={validText}>{this.state.validText7}</Text>
            </Item>
            <Item style={marginData} stackedLabel>
                <Label>* Рабочий телефон</Label>
                <Input 
                    keyboardType={'numeric'}
                    onChangeText={(phone) => {
                        this.setState({phone})
                        if (phone == '') {
                            this.setState({
                              validText8: 'Заполните поле',
                            })
                         } else if (phone != '') {
                            this.setState({
                              validText8: '',
                            })
                        }
                    }} 
                    value={this.state.phone}
                />
                <Text style={validText}>{this.state.validText8}</Text>
            </Item>
            </KeyboardAvoidingView>
        </Content>
        <View>
            <TouchableOpacity onPress={this.test} style={btn}>
            <Text style={btnText}>Продолжить</Text>
            </TouchableOpacity>
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
  textCentr: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20
  },
  validText: {
    color: 'red',
    fontSize: 11
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
  marginData: {
      marginVertical: 15
  },
  stage: {
    marginVertical: 15,
    width: '100%',
  },
  stageText: {
      color: '#5c5c5c',
      fontSize: 17
  }
 
});
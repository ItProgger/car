import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, Alert } from 'react-native';
import { Container, Content, View, Item, Input, Label } from 'native-base';

var today = new Date();
var date = (today.getDate() < 9 ? "0" + today.getDate() : today.getDate()) + '.' + (today.getMonth() < 9 ? "0" + (today.getMonth()+1) : today.getMonth()+1) + '.' + today.getFullYear();


export default class Infocontact extends Component {

  constructor() {
      super();
      this.state = {
          date: '',
         //---------  
          cp1_fio: '',							// ФИО поручителя	
          cp1_whom: '',									// кем приходится
          cp1_phone: '',							// номер телефона
          cp1_comment: '',	
          cp2_fio: '',							// ФИО поручителя	
          cp2_whom: '',									// кем приходится
          cp2_phone: '',							// номер телефона
          cp2_comment: '',	
          cp3_fio: '',							// ФИО поручителя	
          cp3_whom: '',									// кем приходится
          cp3_phone: '',							// номер телефона
          cp3_comment: '',	

          validText1: '',
          validText2: '',
          validText3: '',
          validText5: '',
          validText6: '',
          validText7: '',
          validText9: '',
          validText10: '',
          validText11: '',
      }
  }

   
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fccd02'
    },
    title: `Заявка от `+ date
  };

  additionally = async () => {
    if ((this.state.cp1_fio == '') || (this.state.cp1_whom == '') || (this.state.cp1_phone == '') || (this.state.cp2_fio == '') || (this.state.cp2_whom == '') || (this.state.cp2_phone == '') || (this.state.cp3_fio == '') || (this.state.cp3_whom == '') || (this.state.cp3_phone == '')) {
        if (this.state.cp1_fio == '') {
            this.setState({
              validText1: 'Заполните поле',
            })
        } else if (this.state.cp1_whom == '') {
            this.setState({
              validText2: 'Заполните поле',
            })
        }  else if (this.state.cp1_phone == '') {
            this.setState({
              validText3: 'Заполните поле',
            })
        } else if (this.state.cp2_fio == '') {
            this.setState({
              validText5: 'Заполните поле',
            })
        } else if (this.state.cp2_whom == '') {
            this.setState({
              validText6: 'Заполните поле',
            })
        }  else if (this.state.cp2_phone == '') {
            this.setState({
              validText7: 'Заполните поле',
            })
        }  else if (this.state.cp3_fio == '') {
            this.setState({
              validText9: 'Заполните поле',
            })
        }  else if (this.state.cp3_whom == '') {
            this.setState({
              validText10: 'Заполните поле',
            })
        }
        else if (this.state.cp3_phone == '') {
            this.setState({
              validText11: 'Заполните поле',
            })
        }

    } else {
        this.setState({
            validText1: '',
            validText2: '',
            validText3: '',
            validText5: '',
            validText6: '',
            validText7: '',
            validText9: '',
            validText10: '',
            validText11: '',
        })
         var obj = {
            cp1_fio: this.state.cp1_fio,							
            cp1_whom: this.state.cp1_whom,								
            cp1_phone: this.state.cp1_phone,							
            cp1_comment: this.state.cp1_comment,	
            cp2_fio: this.state.cp2_fio,							
            cp2_whom: this.state.cp2_whom,								
            cp2_phone: this.state.cp2_phone,							
            cp2_comment: this.state.cp2_comment,	
            cp3_fio: this.state.cp3_fio,							
            cp3_whom: this.state.cp3_whom,								
            cp3_phone: this.state.cp3_phone,							
            cp3_comment: this.state.cp3_comment,	
         }
         await AsyncStorage.setItem('list3', JSON.stringify(obj));
         this.props.navigation.navigate('Photocar');
    }
  }
  test = () => {
    this.props.navigation.navigate('Photocar');
  } 
  async componentDidMount() {
    try {
      var list3 = await AsyncStorage.getItem('list3');
      var jspList2 = JSON.parse(list3);
      this.setState({
        cp1_fio: jspList2.cp1_fio,							
        cp1_whom: jspList2.cp1_whom,								
        cp1_phone: jspList2.cp1_phone,							
        cp1_comment: jspList2.cp1_comment,	
        cp2_fio: jspList2.cp2_fio,							
        cp2_whom: jspList2.cp2_whom,								
        cp2_phone: jspList2.cp2_phone,							
        cp2_comment: jspList2.cp2_comment,	
        cp3_fio: jspList2.cp3_fio,							
        cp3_whom: jspList2.cp3_whom,								
        cp3_phone: jspList2.cp3_phone,							
        cp3_comment: jspList2.cp3_comment,
      })
   }
   catch (error) {
      console.warn(error);
   }
  }

  render() {
    const { btn, btnText, marginData, textCentr, headerText, validText} = styles;
    return (
      <Container>
        <Content padder>
            <KeyboardAvoidingView behavior="padding">
                <View style={textCentr}>
                    <Text style={headerText}>Информация о первом контактном лице</Text>
                </View>
                <Item style={marginData} stackedLabel>
                    <Label>* ФИО контактного лица</Label>
                    <Input 
                        onChangeText={(cp1_fio) => {
                            this.setState({cp1_fio})
                            if (cp1_fio == '') {
                                this.setState({
                                  validText1: 'Заполните поле',
                                })
                            } else if (cp1_fio != '') {
                                this.setState({
                                  validText1: '',
                                })
                            }
                        }} 
                        value={this.state.cp1_fio}
                    />
                    <Text style={validText}>{this.state.validText1}</Text>
                </Item>
                <Item style={marginData} stackedLabel>
                    <Label>* Кем приходиться</Label>
                    <Input 
                        onChangeText={(cp1_whom) => {
                            this.setState({cp1_whom})
                            if (cp1_whom == '') {
                                this.setState({
                                  validText2: 'Заполните поле',
                                })
                            } else if (cp1_whom != '') {
                                this.setState({
                                  validText2: '',
                                })
                            }
                        }} 
                        value={this.state.cp1_whom}
                    />
                    <Text style={validText}>{this.state.validText2}</Text>
                </Item>
                <Item style={marginData} stackedLabel>
                    <Label>* Телефон</Label>
                    <Input 
                        keyboardType={'numeric'}
                        onChangeText={(cp1_phone) => {
                            this.setState({cp1_phone})
                            if (cp1_phone == '') {
                                this.setState({
                                  validText3: 'Заполните поле',
                                })
                            } else if (cp1_phone != '') {
                                this.setState({
                                  validText3: '',
                                })
                            }
                        }} 
                        value={this.state.cp1_phone}
                    />
                    <Text style={validText}>{this.state.validText3}</Text>

                </Item>
                <Item style={marginData} stackedLabel>
                    <Label>Комментарий</Label>
                    <Input 
                        onChangeText={(cp1_comment) => this.setState({cp1_comment})}
                        value={this.state.cp1_comment}
                    />
                </Item>

                <View style={textCentr}>
                    <Text style={headerText}>Информация о втором контактном лице</Text>
                </View>
                <Item style={marginData} stackedLabel>
                    <Label>* ФИО контактного лица</Label>
                    <Input 
                        onChangeText={(cp2_fio) => {
                            this.setState({cp2_fio})
                            if (cp2_fio == '') {
                                this.setState({
                                  validText5: 'Заполните поле',
                                })
                            } else if (cp2_fio != '') {
                                this.setState({
                                  validText5: '',
                                })
                            }
                        }}
                        value={this.state.cp2_fio}
                    />
                    <Text style={validText}>{this.state.validText5}</Text>
                </Item>
                <Item style={marginData} stackedLabel>
                    <Label>* Кем приходиться</Label>
                    <Input 
                        onChangeText={(cp2_whom) => {
                            this.setState({cp2_whom})
                            if (cp2_whom == '') {
                                this.setState({
                                  validText6: 'Заполните поле',
                                })
                            } else if (cp2_whom != '') {
                                this.setState({
                                  validText6: '',
                                })
                            }
                        }}
                        value={this.state.cp2_whom}
                    />
                    <Text style={validText}>{this.state.validText6}</Text>
                </Item>
                <Item style={marginData} stackedLabel>
                    <Label>* Телефон</Label>
                    <Input 
                        keyboardType={'numeric'}
                        onChangeText={(cp2_phone) => {
                            this.setState({cp2_phone})
                            if (cp2_phone == '') {
                                this.setState({
                                  validText7: 'Заполните поле',
                                })
                            } else if (cp2_phone != '') {
                                this.setState({
                                  validText7: '',
                                })
                            }
                        }}
                        value={this.state.cp2_phone}
                    />
                    <Text style={validText}>{this.state.validText7}</Text>
                </Item>
                <Item style={marginData} stackedLabel>
                    <Label>Комментарий</Label>
                    <Input 
                        onChangeText={(cp2_comment) => this.setState({cp2_comment})}
                        value={this.state.cp2_comment}
                    />
                </Item>

                <View style={textCentr}>
                    <Text style={headerText}>Информация о третьем контактном лице</Text>
                </View>
                <Item style={marginData} stackedLabel>
                    <Label>* ФИО контактного лица</Label>
                    <Input 
                        onChangeText={(cp3_fio) => {
                            this.setState({cp3_fio})
                            if (cp3_fio == '') {
                                this.setState({
                                  validText9: 'Заполните поле',
                                })
                            } else if (cp3_fio != '') {
                                this.setState({
                                  validText9: '',
                                })
                            }
                        }}
                        value={this.state.cp3_fio}
                    />
                    <Text style={validText}>{this.state.validText9}</Text>
                </Item>
                <Item style={marginData} stackedLabel>
                    <Label>* Кем приходиться</Label>
                    <Input 
                        onChangeText={(cp3_whom) => {
                            this.setState({cp3_whom})
                            if (cp3_whom == '') {
                                this.setState({
                                  validText10: 'Заполните поле',
                                })
                            } else if (cp3_whom != '') {
                                this.setState({
                                  validText10: '',
                                })
                            }
                        }}
                        value={this.state.cp3_whom}
                    />
                    <Text style={validText}>{this.state.validText10}</Text>
                </Item>
                <Item style={marginData} stackedLabel>
                    <Label>* Телефон</Label>
                    <Input 
                        keyboardType={'numeric'}
                        onChangeText={(cp3_phone) => {
                            this.setState({cp3_phone})
                            if (cp3_phone == '') {
                                this.setState({
                                  validText11: 'Заполните поле',
                                })
                            } else if (cp3_phone != '') {
                                this.setState({
                                  validText11: '',
                                })
                            }
                        }}
                        value={this.state.cp3_phone}
                    />
                    <Text style={validText}>{this.state.validText11}</Text>
                </Item>
                <Item style={marginData} stackedLabel>
                    <Label>Комментарий</Label>
                    <Input 
                        onChangeText={(cp3_comment) => this.setState({cp3_comment})}
                        value={this.state.cp3_comment}
                    />
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
  validText: {
    color: 'red',
    fontSize: 11
  },
 
});
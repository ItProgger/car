import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, Modal, ScrollView, TouchableHighlight } from 'react-native';
import { Container, Content, View, Item, Input, Label,ListItem, List, Left, Right, Icon } from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker'

var today = new Date();
var date = (today.getDate() < 9 ? "0" + today.getDate() : today.getDate()) + '.' + (today.getMonth() < 9 ? "0" + (today.getMonth()+1) : today.getMonth()+1) + '.' + today.getFullYear();

export default class UserData extends Component {

  constructor() {
      super();
      this.state = {
          date: '',
          arrCity: [],
          // -------
          lastname: '',
          phone: '',
          chosenDate: '',
          chosenDateTwo: '',
          chosenDateThrea: '',
          city: '',
          name: '',
          patronymic: '',
          iin: '',
          email: '',
          validText1: '',
          validText2: '',
          validText3: '',
          validText4: '',
          validText5: '',
          validText6: '',
          validText7: '',
          validText8: '',
          validText9: '',
          validText10: '',
          validText11: '',
          validText12: '',

          validTextPhone: '',
          vid: '',
          numberVid: '',
          kemVidanArr: [],
          id_kindArr: [],
          cityLabel: '* Город',
          modalVisible: false,
          cityName: '',
          modalVisibleTwo: false,
          vidName: '',
          vidLabel: '* Вид документа',
          kemVidanLabel: '* Кем выдан документ',
          kemVidanName: '',
          modalVisibleThrea: false,

      }
  }

  async componentDidMount() {
    try {
      var phone = await AsyncStorage.getItem('phone');
      var list1 = await AsyncStorage.getItem('list1');
      var jspList1 = JSON.parse(list1);
      var ph = JSON.parse(phone);
      this.setState({
        phone: ph,
      })
      if (jspList1 != null) {
          this.setState({
            phone: ph,
            lastname: jspList1.lastname,
            name: jspList1.name,
            patronymic: jspList1.patronymic,
            chosenDate: jspList1.chosenDate,
            iin: jspList1.iin,
            numberVid: jspList1.numberVid,
            chosenDateTwo: jspList1.chosenDateTwo,
            chosenDateThrea: jspList1.chosenDateThrea,
            email: jspList1.email,
            vidName: jspList1.vidName,
            cityName: jspList1.cityName,
            kemVidanName: jspList1.kemVidanName,
            kemVidan: jspList1.kemVidan,
            vid: jspList1.vid,
            city: jspList1.city,
          })
      }
      
      var res = await fetch('http://lombard-api.rapid-it.kz/public/api/location/cities/1');
      var parceJS = JSON.parse(res._bodyInit);

      var res1 = await fetch('http://lombard-api.rapid-it.kz/public/api/user/id_issuer/1');
      var parceJS1 = JSON.parse(res1._bodyInit);

      var res2 = await fetch('http://lombard-api.rapid-it.kz/public/api/user/id_kind');
      var parceJS2 = JSON.parse(res2._bodyInit);

      this.setState({
        arrCity: parceJS.cities,
        kemVidanArr: parceJS1.id_kinds,
        id_kindArr: parceJS2.id_kinds,
      })
      
    } catch (error) {
      console.warn(error);
    }
}

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setModalVisibleTwo(visible) {
    this.setState({modalVisibleTwo: visible});
  }

  setModalVisibleThrea(visible) {
    this.setState({modalVisibleThrea: visible});
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fccd02'
    },
    title: `Заявка от `+ date
  };

  oneNew(id, name) {
    this.setState({
      cityName: name,
      city: id,
    }),
    this.setModalVisible(!this.state.modalVisible);
  }

  twoNew(id, name) {
    this.setState({
      vidName: name,
      vid: id,
    }),
    this.setModalVisibleTwo(!this.state.modalVisibleTwo);
  }

  threaNew(id, name) {
    this.setState({
      kemVidanName: name,
      kemVidan: id,
    }),
    this.setModalVisibleThrea(!this.state.modalVisibleThrea);
  }

  userdata = async () => {
      if ((this.state.lastname == '') || (this.state.numberVid == '') || (this.state.chosenDateThrea == '') || (this.state.chosenDateTwo == '') || (this.state.kemVidan == '') || (this.state.vid == '') || (this.state.userdata == '') || (this.state.phone == '') || (this.state.chosenDate == '') || (this.state.city == '') || (this.state.name == '') || (this.state.iin == '')) {
        if (this.state.lastname == '') {
            this.setState({
              validText1: 'Заполните поле',
            })
        } else if (this.state.name == '') {
            this.setState({
              validText2: 'Заполните поле',
            })
        } else if (this.state.chosenDate == '') {
            this.setState({
              validText3: 'Заполните поле',
            })
        } else if (this.state.iin == '') {
            this.setState({
              validText4: 'Заполните поле',
            })
        } else if (this.state.city == '') {
            this.setState({
              validText5: 'Заполните поле',
            })
        }  else if (this.state.phone == '') {
            this.setState({
              validText6: 'Заполните поле',
            })
        }  else if (this.state.vid == '') {
            this.setState({
              validText8: 'Заполните поле',
            })
        }  else if (this.state.numberVid == '') {
            this.setState({
              validText9: 'Заполните поле',
            })
        }  else if (this.state.kemVidan == '') {
            this.setState({
              validText10: 'Заполните поле',
            })
        } else if (this.state.chosenDateTwo == '') {
            this.setState({
              validText11: 'Заполните поле',
            })
        } else if (this.state.chosenDateThrea == '') {
            this.setState({
              validText12: 'Заполните поле',
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
            validText9: '',
            validText10: '',
            validText11: ''
          })
           var obj = {
              lastname: this.state.lastname,
              name: this.state.name,
              phone: this.state.phone,
              chosenDate: this.state.chosenDate,
              city: this.state.city,
              patronymic: this.state.patronymic,
              iin: this.state.iin,
              email: this.state.email,
              vid: this.state.vid,
              numberVid: this.state.numberVid,
              kemVidan: this.state.kemVidan,
              chosenDateTwo: this.state.chosenDateTwo,
              chosenDateThrea: this.state.chosenDateThrea,
              vidName: this.state.vidName,
              cityName: this.state.cityName,
              kemVidanName: this.state.kemVidanName,
           }
           await AsyncStorage.setItem('list1', JSON.stringify(obj));
           this.props.navigation.navigate('Certificates');
      }
  }

  test = () => {
    this.props.navigation.navigate('Certificates');
  }

  openOne = () => {
    this.setModalVisible(true);
  }

  openTwo = () => {
    this.setModalVisibleTwo(true);
  }

  openThrea = () => {
    this.setModalVisibleThrea(true);
  }

  
   
  render() {
    const { btn, btnText, validText, labelInput, modalMain, marginData, maskInp, btnTwo, headerText, textCentr } = styles;
    return (
      <Container>
        <Content padder>
          <View style={textCentr}>
                <Text style={headerText}>Персональные данные клиента</Text>
          </View>
          <KeyboardAvoidingView behavior="padding">
            <Item style={marginData} stackedLabel>
                <Label>* Фамилия</Label>
                <Input
                   onChangeText={(lastname) => {
                     this.setState({lastname})
                     if (lastname == '') {
                        this.setState({
                          validText1: 'Заполните поле',
                        })
                     } else if (lastname != '') {
                        this.setState({
                          validText1: '',
                        })
                     }
                  }}
                  value={this.state.lastname} 
                />
                <Text style={validText}>{this.state.validText1}</Text>
            </Item>
            <Item style={marginData} stackedLabel>
                <Label>* Имя</Label>
                <Input 
                   onChangeText={(name) => {
                     this.setState({name})
                     if (name == '') {
                          this.setState({
                            validText2: 'Заполните поле',
                          })
                      } else if (name != '') {
                          this.setState({
                            validText2: '',
                          })
                      }
                  }} 
                  value={this.state.name} 
                />
                <Text style={validText}>{this.state.validText2}</Text>
            </Item>
            <Item style={marginData} stackedLabel>
                <Label>Отчество</Label>
                <Input
                    onChangeText={(patronymic) => this.setState({patronymic})}
                    value={this.state.patronymic}
                />
            </Item>
            <Item style={marginData} stackedLabel>
                <Label style={{marginBottom: 10}}>* Дата рождения</Label>
                <DatePicker
                    style={{width: '100%'}}
                    date={this.state.chosenDate}
                    mode="date"
                    showIcon={false}
                    placeholder="дд.мм.гг"
                    format="DD.MM.YYYY"
                    confirmBtnText="Выбрать"
                    cancelBtnText="Закрыть"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        border: 0,
                        borderWidth: 0
                      }
                    }}
                    onDateChange={(chosenDate) => {this.setState({chosenDate: chosenDate})}}
                />
                <Text style={validText}>{this.state.validText3}</Text>
            </Item>
            <Item style={marginData} stackedLabel>
                <Label>* ИИН</Label>
                <Input 
                    keyboardType={'numeric'}
                    maxLength={12}
                    onChangeText={(iin) => {
                      this.setState({iin})
                      if (iin == '') {
                          this.setState({
                            validText4: 'Заполните поле',
                          })
                      } else if (iin != '') {
                          this.setState({
                            validText4: '',
                          })
                      }
                    }}
                    value={this.state.iin}
                />
                <Text style={validText}>{this.state.validText4}</Text>
            </Item>
            <Item style={marginData} stackedLabel>
              <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.modalVisibleTwo}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={modalMain}>
                    <ScrollView>
                        <List>
                              {this.state.id_kindArr.map((item, index) => {
                                          return (
                                            <ListItem key={index} onPress={()=>this.twoNew(item.id, item.name)}>
                                              <Left>
                                                <Text>{item.name}</Text>
                                              </Left>
                                              <Right>
                                                <Icon name="arrow-forward" />
                                              </Right>
                                            </ListItem>
                                          ) 
                              })}
                        </List>
                    </ScrollView>
                    <TouchableHighlight
                      style={styles.closeModal}
                      onPress={() => {
                        this.setModalVisibleTwo(!this.state.modalVisibleTwo);
                      }}>
                      <Text style={styles.closeColor}>Закрыть</Text>
                    </TouchableHighlight>
                </View>
              </Modal>
              <TouchableHighlight
                style={styles.modalBtn}
                onPress={this.openTwo}>
                <View>
                  <Text style={labelInput}>{this.state.vidLabel}</Text>
                  <Text style={styles.mainTop}>{this.state.vidName}</Text>
                </View>
              </TouchableHighlight>
              <Text style={validText}>{this.state.validText8}</Text>

            </Item>
            <Item style={marginData} stackedLabel>
                <Label>* Номер документа</Label>
                <Input
                   keyboardType={'numeric'}                   
                   onChangeText={(numberVid) => {
                     this.setState({numberVid})
                     if (numberVid == '') {
                        this.setState({
                          validText9: 'Заполните поле',
                        })
                     } else if (numberVid != '') {
                        this.setState({
                          validText9: '',
                        })
                     }
                  }} 
                  value={this.state.numberVid}
                />
                <Text style={validText}>{this.state.validText9}</Text>
            </Item>
            <Item style={marginData} stackedLabel>
              <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.modalVisibleThrea}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={modalMain}>
                    <ScrollView>
                        <List>
                              {this.state.kemVidanArr.map((item, index) => {
                                          return (
                                            <ListItem key={index} onPress={()=>this.threaNew(item.id, item.name)}>
                                              <Left>
                                                <Text>{item.name}</Text>
                                              </Left>
                                              <Right>
                                                <Icon name="arrow-forward" />
                                              </Right>
                                            </ListItem>
                                          ) 
                              })}
                        </List>
                    </ScrollView>
                    <TouchableHighlight
                      style={styles.closeModal}
                      onPress={() => {
                        this.setModalVisibleThrea(!this.state.modalVisibleThrea);
                      }}>
                      <Text style={styles.closeColor}>Закрыть</Text>
                    </TouchableHighlight>
                </View>
              </Modal>
              <TouchableHighlight
                style={styles.modalBtn}
                onPress={this.openThrea}>
                <View>
                  <Text style={labelInput}>{this.state.kemVidanLabel}</Text>
                  <Text style={styles.mainTop}>{this.state.kemVidanName}</Text>
                </View>
              </TouchableHighlight>
              <Text style={validText}>{this.state.validText10}</Text>
            </Item>
            <Item style={marginData} stackedLabel>
                <Label style={{marginBottom: 10}}>* Дата выдачи документа</Label>
                <DatePicker
                    style={{width: '100%'}}
                    date={this.state.chosenDateTwo}
                    mode="date"
                    showIcon={false}
                    placeholder="дд.мм.гг"
                    format="DD.MM.YYYY"
                    confirmBtnText="Выбрать"
                    cancelBtnText="Закрыть"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        border: 0,
                        borderWidth: 0
                      }
                    }}
                    onDateChange={(chosenDateTwo) => {this.setState({chosenDateTwo: chosenDateTwo})}}
                />
                <Text style={validText}>{this.state.validText11}</Text>
            </Item>
            <Item style={marginData} stackedLabel>
                <Label style={{marginBottom: 10}}>* Срок действия документа</Label>
                <DatePicker
                    style={{width: '100%'}}
                    date={this.state.chosenDateThrea}
                    mode="date"
                    showIcon={false}
                    placeholder="дд.мм.гг"
                    format="DD.MM.YYYY"
                    confirmBtnText="Выбрать"
                    cancelBtnText="Закрыть"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        border: 0,
                        borderWidth: 0
                      }
                    }}
                    onDateChange={(chosenDateThrea) => {this.setState({chosenDateThrea: chosenDateThrea})}}
                />
                <Text style={validText}>{this.state.validText12}</Text>
            </Item>
            <Item style={marginData} stackedLabel>
              <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={modalMain}>
                    <ScrollView>
                        <List>
                              {this.state.arrCity.map((item, index) => {
                                          return (
                                            <ListItem key={index} onPress={()=>this.oneNew(item.id, item.name)}>
                                              <Left>
                                                <Text>{item.name}</Text>
                                              </Left>
                                              <Right>
                                                <Icon name="arrow-forward" />
                                              </Right>
                                            </ListItem>
                                          ) 
                              })}
                        </List>
                    </ScrollView>
                    <TouchableHighlight
                      style={styles.closeModal}
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                      <Text style={styles.closeColor}>Закрыть</Text>
                    </TouchableHighlight>
                </View>
              </Modal>
              <TouchableHighlight
                style={styles.modalBtn}
                onPress={this.openOne}>
                <View>
                  <Text style={labelInput}>{this.state.cityLabel}</Text>
                  <Text style={styles.mainTop}>{this.state.cityName}</Text>
                </View>
              </TouchableHighlight>
            </Item>
            <Item style={marginData} stackedLabel>
                <Label>* Мобильный телефон</Label>
                <TextInputMask
                    style={maskInp}
                    onChangeText={(phone) => {
                      this.setState({phone})
                      if (phone == '') {
                          this.setState({
                            validText6: 'Заполните поле',
                          })
                      } else if (phone != '') {
                          this.setState({
                            validText6: '',
                          })
                          if (phone.length < 18) {
                            this.setState({
                              validTextPhone: 'Введите телефон',
                            })
                          } else {
                            this.setState({
                              validTextPhone: '',
                            })
                          }
                      }
                    }}
                    value={this.state.phone}
                    refInput={(ref) => this.myDateText = ref}
                    type={'cel-phone'}
                    options={{
                      dddMask: '+7 (999) 999-99-99'
                    }}
                    maxLength={18}
                /> 
                <Text style={validText}>{this.state.validText6}</Text>  
                <Text style={validText}>{this.state.validTextPhone}</Text>                

            </Item>
            <Item style={marginData} stackedLabel>
                <Label>Адрес электронной почты</Label>
                <Input 
                    onChangeText={(email) => {
                      this.setState({email})
                          // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
                          // if(reg.test(email) === false)
                          // {
                          //   this.setState({
                          //     validText7: 'Не верный Email',
                          //   })
                          //   return false;
                          // }
                          // else {
                          //     this.setState({
                          //       validText7: '',
                          //     })
                          // }
                    }}
                    value={this.state.email}
                />
                {/* <Text style={validText}>{this.state.validText7}</Text> */}
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
  modalBtn: {
      width: '100%',
      height: 50,
  },
  labelInput: {
    color: '#000',
    fontSize: 15,
 },
 closeModal: {
     width: '100%',
     height: 40,
     backgroundColor: '#fccd02',
     justifyContent: 'center',
     alignItems: 'center',
     position: 'absolute',
     bottom: 0
 },
 scrollModal: {
    marginBottom: 40
 },
 closeColor: {
   color: 'white',
   fontSize: 12,
   color: '#000'
 },
  validText: {
      color: 'red',
      fontSize: 11
  },
  mainTop: {
    marginTop: 20,
    fontSize: 15
  },
  textCentr: {
      width: '100%',
      alignItems: 'center',
      marginVertical: 20
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  btn: {
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
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  marginData: {
      marginVertical: 15
  },
  maskInp: {
    width: "100%",
    height: 50,
 },
 modalMain: {
  flex: 1,
},
 
});
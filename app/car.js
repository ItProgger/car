import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, Alert, AsyncStorage, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Container, Content, View, Text, List, Right, Left, ListItem, Icon} from 'native-base';

var today = new Date();
var date = (today.getDate() < 9 ? "0" + today.getDate() : today.getDate()) + '.' + (today.getMonth() < 9 ? "0" + (today.getMonth()+1) : today.getMonth()+1) + '.' + today.getFullYear();


export default class Phone extends Component {

  constructor() {
      super();
      this.state = {
          date: '',
          arr: [],
          modelArr: [],
          yearArrMain: [],
          credit_data: [],
          selected1: undefined,
          selected2: undefined,
          selected3: undefined,
          modalVisible: false,
          modalVisibleTwo: false,  
          modalVisibleTrea: false,   
          mark: 'Марка',
          model: 'Модель',
          year: 'Год выпуска',
          markLabel: '',
          modelLabel: '',
          yearLabel: '',     
          vis1: false,
          vis2: false,               
      }
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fccd02'
    },
    title: `Заявка от `+ date
  };
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setModalVisibleTwo(visible) {
    this.setState({modalVisibleTwo: visible});
  }
  setModalVisibleTrea(visible) {
    this.setState({modalVisibleTrea: visible});
  }

  

  componentWillMount(){
    return fetch('http://lombard-api.rapid-it.kz/public/api/car/mark')
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
            arr: responseJson.car_marks,
          });
      })
      .catch((error) =>{
        console.error(error);
      });
  }
   
  car = async () => {
    if ((this.state.selected1 == undefined) || (this.state.selected2 == undefined) || (this.state.selected3 == undefined)) {
        Alert.alert("Выберите машину");
    } else {
      var res = await fetch('http://lombard-api.rapid-it.kz/public/api/car/credit/'+this.state.selected1+'/'+ this.state.selected2 +'/1');
      var parceJS = JSON.parse(res._bodyInit).credit_data;
      var max_sum = parceJS[0].max_credit_sum;
          var obj = {
            lk_car_model: this.state.selected2,
            lk_car_year: this.state.selected3,
          }
          this.setState({
            markLabel: '',
            modelLabel: '',
            yearLabel: '',     
          })
          var carId = parceJS[0].id;
          await AsyncStorage.setItem('carId', JSON.stringify(carId))
          await AsyncStorage.setItem('max_credit_sum', JSON.stringify(max_sum))
          await AsyncStorage.setItem('lk_car', JSON.stringify(obj))
          this.props.navigation.navigate('Calc');
      // }
    }
  } 
  
   

  // -----------------------------------

  oneNew(id, mark) {
    return fetch('http://lombard-api.rapid-it.kz/public/api/car/model/'+ id)
    .then((response) => response.json())
    .then((responseJson) => {
      console.warn(responseJson);
        this.setState({
          modelArr: responseJson.car_models,
          mark: mark,
          selected1: id,
          modalVisible: false,
          model: 'Модель',
          markLabel: 'Марка',
          vis1: true,       
        });
    })
    .catch((error) =>{
      console.error(error);
    });
  }
   
  twoNew(id, model) {
      return fetch('http://lombard-api.rapid-it.kz/public/api/car/year/')
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
            yearArrMain: responseJson.car_years,
            model: model,
            selected2: id,
            modalVisibleTwo: false,
            year: 'Год выпуска',
            modelLabel: 'Модель',
            vis2: true
          });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  treaNew(id, year) {
    this.setState({
      modalVisibleTrea: false,
      selected3: id,
      year: year,
      yearLabel: 'Год выпуска',      
    });
  }
  
  render() {
    const { btn, btnText, modalBtn, labelInput, scrollModal, closeColor, modalMain, headerText, textCentr, activity, closeModal, } = styles;

    if(this.state.isLoading){
      return(
        <View style={activity}>
          <ActivityIndicator/>
        </View>
      )
    }
    
    return (
      
      <Container>
        <Content padder>
            <View style={textCentr}>
                <Text style={headerText}>Данные по автомобилю</Text>
            </View>

            <View style={{marginTop: 22}}>
              <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={modalMain}>
                    <ScrollView style={scrollModal}>
                        <List>
                              {this.state.arr.map((item, index) => {
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
                      style={closeModal}
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                      <Text style={closeColor}>Закрыть</Text>
                    </TouchableHighlight>
                </View>
              </Modal>
              <Text style={labelInput}>{this.state.markLabel}</Text>
              <TouchableHighlight
                style={modalBtn}
                onPress={() => {
                  this.setModalVisible(true);
                }}>
                <Text>{this.state.mark}</Text>
              </TouchableHighlight>
            </View>
            
            <View style={{marginTop: 22}}>
              <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.modalVisibleTwo}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={modalMain}>
                    <ScrollView style={scrollModal}>
                        <List>
                              {this.state.modelArr.map((item, index) => {
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
                      style={closeModal}
                      onPress={() => {
                            this.setModalVisibleTwo(!this.state.modalVisibleTwo);
                      }}>
                      <Text style={closeColor}>Закрыть</Text>
                    </TouchableHighlight>
                </View>
              </Modal>
              <Text style={labelInput}>{this.state.modelLabel}</Text>
              <TouchableHighlight
                style={modalBtn}
                onPress={() => {
                  
                  if (this.state.vis1 == false) {
                      Alert.alert("Выберите марку");
                  } else {
                    this.setModalVisibleTwo(true);
                  }
                }}>
                <Text>{this.state.model}</Text>
              </TouchableHighlight>
            </View>
            
            <View style={{marginTop: 22}}>
              <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.modalVisibleTrea}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={modalMain}>
                    <ScrollView style={scrollModal}>
                        <List>
                              {this.state.yearArrMain.map((item, index) => {
                                          return (
                                            <ListItem key={index} onPress={()=>this.treaNew(item.id, item.year)}>
                                              <Left>
                                                <Text>{item.year}</Text>
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
                      style={closeModal}
                      onPress={() => {
                        this.setModalVisibleTrea(!this.state.modalVisibleTrea);
                      }}>
                      <Text style={closeColor}>Закрыть</Text>
                    </TouchableHighlight>
                </View>
              </Modal>
              <Text style={labelInput}>{this.state.yearLabel}</Text>
              <TouchableHighlight
                style={modalBtn}
                onPress={() => {
                  if (this.state.vis2 == false) {
                      Alert.alert("Выберите модель");
                  } else {
                    this.setModalVisibleTrea(true);
                  }
                }}>
                <Text>{this.state.year}</Text>
              </TouchableHighlight>
            </View>

        </Content>
        <View>
            <TouchableOpacity onPress={this.car} style={btn}>
            <Text style={btnText}>Продолжить</Text>
            </TouchableOpacity>
        </View>
      </Container>
    );
   
  }
  
}

const styles = StyleSheet.create({
  activity: {
     flex: 1,
     backgroundColor: '#fccd02',
     justifyContent: 'center',
     alignItems: 'center',
  },
  labelInput: {
     color: 'gray',
     fontSize: 11,
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

  btn: {
    width: '100%',
    height: 50,
    backgroundColor: '#fccd02',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalMain: {
    flex: 1,
  },

  modalBtn: {
      width: '100%',
      height: 40,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
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
  picker: {
     marginHorizontal: 0,
     marginVertical: 10,
     height: 50,
     backgroundColor: 'transparent',
     borderBottomWidth: 1,
     borderColor: '#ccc',
     height: 45,
  },
   
   
});
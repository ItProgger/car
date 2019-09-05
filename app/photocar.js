import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground, AsyncStorage, Alert, Image, Modal, TouchableHighlight } from 'react-native';
import { Container, Content, View } from 'native-base';
import { Permissions, ImagePicker,  } from 'expo';

var today = new Date();
var date = (today.getDate() < 9 ? "0" + today.getDate() : today.getDate()) + '.' + (today.getMonth() < 9 ? "0" + (today.getMonth()+1) : today.getMonth()+1) + '.' + today.getFullYear();

export default class Photocar extends Component {

  constructor() {
      super();

      this.state = {
          autoImages: [
            {title: 'Авто проекция 1', source: require('../assets/car/1.jpg'), url: '../assets/car/9.jpg',}, 
            {title: 'Авто проекция 2', source: require('../assets/car/4.jpg'), url: '../assets/car/9.jpg',},
            {title: 'Авто проекция 3', source: require('../assets/car/7.jpg'), url: '../assets/car/9.jpg',},
            {title: 'Авто проекция 4', source: require('../assets/car/2.jpg'), url: '../assets/car/9.jpg',},
            {title: 'Селфи на фоне авто', source: require('../assets/car/5.jpg'), url: '../assets/car/9.jpg',},
            {title: 'Приборная панель', source: require('../assets/car/8.jpg'), url: '../assets/car/9.jpg',},
            {title: 'VIN (лобовое стекло)', source: require('../assets/car/3.jpg'), url: '../assets/car/9.jpg',},
            {title: 'VIN (маркировочная табличка)', source: require('../assets/car/3.jpg'), url: '../assets/car/9.jpg',},
            {title: 'VIN (капот / иное)', source: require('../assets/car/3.jpg'), url: '../assets/car/9.jpg',},
          ],
          date: '',
          pressStatus: true,
          url1: '../assets/car/9.jpg',
          url2: '../assets/car/9.jpg',
          url3: '../assets/car/9.jpg',
          url4: '../assets/car/9.jpg',
          url5: '../assets/car/9.jpg',
          url6: '../assets/car/9.jpg',
          url7: '../assets/car/9.jpg',
          url8: '../assets/car/9.jpg',
          url9: '../assets/car/9.jpg',
          modalVisible: false,
          modalVisibleTwo: false,
       }
  }

  setModalVisible(visible, index) {
    this.setState({ modalVisible: visible, index: index });
    console.warn(index);
  }
  
  setModalVisibleTwo(visible) {
    this.setState({ modalVisibleTwo: visible});
  }
  
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fccd02'
    },
    title: `Заявка от `+ date
  };

   
  photocar = async () => {
          var urlMain = '../assets/car/9.jpg';
          if ((this.state.url1 == urlMain) || (this.state.url2 == urlMain) || (this.state.url3 == urlMain) || (this.state.url4 == urlMain) || (this.state.url5 == urlMain) || (this.state.url6 == urlMain) || (this.state.url7 == urlMain) || (this.state.url8 == urlMain) || (this.state.url9 == urlMain)) {
              Alert.alert('Выберите картинки');
          } else {
              await AsyncStorage.setItem('photo2', JSON.stringify(this.state.autoImages))
              this.props.navigation.navigate('Card')
          }
  }
  
  test = () => {
    this.props.navigation.navigate('Card');
  }

  oneGallary = async (index) => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);

    if(status === 'granted') {
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        allowsEditing: true,
        aspect: [4, 3],
      }).catch(error => console.warn(permissions, { error }));
      image.width = 400;
      image.height = 180;
      console.warn(permissions, 'SUCCESS', image);
      
     

      if (image.uri == undefined) {
        var imgs = [...this.state.autoImages];
        this.setState({
          pressStatus: true,
          url1: imgs[0].url,
          url2: imgs[1].url,
          url3: imgs[2].url,
          url4: imgs[3].url,
          url5: imgs[4].url,
          url6: imgs[5].url,
          url7: imgs[6].url,
          url8: imgs[7].url,
          url9: imgs[8].url,
          modalVisible: false,
        })
      } else {
        var imgs = [...this.state.autoImages];
        imgs[index].source = image.uri
        imgs[index].url = image.uri
        
        this.setState({
          pressStatus: false,
          autoImages: imgs,
          url1: imgs[0].url,
          url2: imgs[1].url,
          url3: imgs[2].url,
          url4: imgs[3].url,
          url5: imgs[4].url,
          url6: imgs[5].url,
          url7: imgs[6].url,
          url8: imgs[7].url,
          url9: imgs[8].url,
          modalVisible: false,
        })
      }
    }
  }

  oneCammera = async (index) => {
    const permissions = Permissions.CAMERA;
    const { status } = await Permissions.askAsync(permissions);

    if(status === 'granted') {
      let image = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
        allowsEditing: true,
        aspect: [4, 3],
      }).catch(error => console.warn(permissions, { error }));
      image.width = 400;
      image.height = 180;
      console.warn(permissions, 'SUCCESS', image);
      
     

      if (image.uri == undefined) {
        var imgs = [...this.state.autoImages];
        this.setState({
          pressStatus: true,
          url1: imgs[0].url,
          url2: imgs[1].url,
          url3: imgs[2].url,
          url4: imgs[3].url,
          url5: imgs[4].url,
          url6: imgs[5].url,
          url7: imgs[6].url,
          url8: imgs[7].url,
          url9: imgs[8].url,
          modalVisible: false,
        })
      } else {
        var imgs = [...this.state.autoImages];
        imgs[index].source = image.uri
        imgs[index].url = image.uri
        
        this.setState({
          pressStatus: false,
          autoImages: imgs,
          url1: imgs[0].url,
          url2: imgs[1].url,
          url3: imgs[2].url,
          url4: imgs[3].url,
          url5: imgs[4].url,
          url6: imgs[5].url,
          url7: imgs[6].url,
          url8: imgs[7].url,
          url9: imgs[8].url,
          modalVisible: false,
        })
      }
    }
  }

  addNewPhoto = async () => {
      const permissions = Permissions.CAMERA_ROLL;
      const { status } = await Permissions.askAsync(permissions);

      if(status === 'granted') {
        let image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: 'Images',
          allowsEditing: true,
          aspect: [4, 3],
        }).catch(error => console.warn(permissions, { error }));
        image.width = 400;
        image.height = 180;
        console.warn(permissions, 'SUCCESS', image);
      
        if (image.uri == undefined) {
          this.setState({
            pressStatus: true,
            modalVisibleTwo: false,
          })
        } else {
          const obj = {
              title: 'Дополнительное фото',
              source: image.uri,
              url: image.uri
          }
          this.setState({
            pressStatus: false,
            autoImages: [...this.state.autoImages, obj],
            modalVisibleTwo: false,
          })
        }
      }
  }

  addNewCamera = async () => {
    const permissions = Permissions.CAMERA;
    const { status } = await Permissions.askAsync(permissions);

    if(status === 'granted') {
      let image = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
        allowsEditing: true,
        aspect: [4, 3],
      }).catch(error => console.warn(permissions, { error }));
      image.width = 400;
      image.height = 180;
      console.warn(permissions, 'SUCCESS', image);
    
      if (image.uri == undefined) {
        this.setState({
          pressStatus: true,
          modalVisibleTwo: false,
        })
      } else {
        const obj = {
            title: 'Дополнительное фото',
            source: image.uri,
            url: image.uri
        }
        this.setState({
          pressStatus: false,
          autoImages: [...this.state.autoImages, obj],
          modalVisibleTwo: false,
        })
      }
    }
}

  async componentDidMount() {
    try {
      var photo2 = await AsyncStorage.getItem('photo2');
      var jspList2 = JSON.parse(photo2);
      if (jspList2 != null) {
        this.setState({
          autoImages: jspList2
        })
      }
   }
   catch (error) {
      console.warn(error);
   }
  }

  render() {
    const { btn, btnText, textCentr, headerText, modalView, modalBtnLast, modalBtn, modalText, viewGallaryActive, btnView, viewGallary, btnTextMain, ftxt, flexGallary, iconBlock, textBlock } = styles;

    return (
      <Container>
        <Content padder>
            <View style={textCentr}>
                <Text style={headerText}>Фото автомобиля</Text>
            </View>
            <View style={ftxt}>
                <Text>Снимки должны быть четкими и без бликов</Text>
            </View>
            
            <View style={flexGallary}>
               {this.state.autoImages.map((item, index)=> {
                    return (
                        <TouchableOpacity key={index} style={ this.state.pressStatus ? viewGallary : viewGallaryActive } 
                            onPress={() => this.setModalVisible(true, index)
                        }>
                            <Modal
                              animationType="fade"
                              transparent={true}
                              visible={this.state.modalVisible}
                              onRequestClose={() => {Alert.alert('Modal has been closed.');}}>
                                <View style={modalView}>
                                  <View style={btnView}>
                                    <TouchableHighlight style={modalBtnLast} key={index}
                                      onPress={() => { this.oneGallary(this.state.index); console.warn(this.state.index)}}>
                                      <Text style={modalText}>Галерея</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={modalBtnLast} key={index}
                                      onPress={() => { this.oneCammera(this.state.index); console.warn(this.state.index)}}>
                                      <Text style={modalText}>Камера</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={modalBtn} key={index}
                                      onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                      }} 
                                    >
                                      <Text style={modalText}>Закрыть</Text>
                                    </TouchableHighlight>
                                  </View>
                                </View>
                            </Modal>
                            <ImageBackground  source={{uri: item.url}} style={{width: '100%', height: 150}}>
                                  <View>
                                      <View style={iconBlock}>
                                          <Image
                                            source={item.source}
                                          />
                                      </View>
                                      <View style={textBlock}>
                                          <Text style={btnText}>
                                              {item.title}
                                          </Text>
                                      </View>
                                  </View>
                            </ImageBackground>
                        </TouchableOpacity>

                        
                    );
               })}
               
                <TouchableOpacity style={ this.state.pressStatus ? viewGallary : viewGallaryActive }  onPress={() => this.setModalVisibleTwo(true)}>
                     <View>
                          <View style={iconBlock}>
                              <Image
                                source={require('../assets/car/add.png')}
                              />
                          </View>
                          <View style={textBlock}>
                             <Text style={btnText}>
                                  Дополнительное фото
                              </Text>
                          </View>
                     </View>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisibleTwo}
                onRequestClose={() => {Alert.alert('Modal has been closed.');}}>
                  <View style={modalView}>
                    <View style={btnView}>
                      <TouchableHighlight style={modalBtnLast} onPress={this.addNewPhoto}>
                        <Text style={modalText}>Галерея</Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={modalBtnLast} onPress={this.addNewCamera}>
                        <Text style={modalText}>Камера</Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={modalBtn}
                        onPress={() => {
                          this.setModalVisibleTwo(!this.state.modalVisibleTwo);
                        }} 
                      >
                        <Text style={modalText}>Закрыть</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
              </Modal>
            <View style={ftxt}>
                <Text>Дополнительно сделать фото всех поврежденных участков авто (при наличии)</Text>
            </View> 
        </Content>
        <View>
            <TouchableOpacity onPress={this.test} style={btn}>
                <Text style={btnTextMain}>Продолжить</Text>
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
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnView: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fccd02',
  },
  modalBtnLast: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  modalText: {
     fontSize: 15,
     fontWeight: 'bold'
  },
  modalBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ftxt: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  textCentr: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20
  },
  viewGallaryActive: {
      width: '49%',
      backgroundColor: '#f7f7f7',
      padding: 3,
      marginVertical: 2,
      borderColor: '#fccd02',
      borderWidth: 1
  },
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: '#fccd02',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextMain: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  btnText: {
    color: '#535353',
    fontWeight: 'bold',
    fontSize: 10,
  },
  flexGallary: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewGallary: {
      width: '49%',
      backgroundColor: '#f7f7f7',
      padding: 3,
      marginVertical: 2
  },
  iconBlock: {
      width: "100%",
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  textBlock: {
      width: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      backgroundColor: 'rgba(245, 245, 245, 0.5)'
  },
  

 
}); 
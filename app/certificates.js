import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, AsyncStorage, Alert, Image, Modal, ImageBackground, TouchableHighlight} from 'react-native';
import { Container, Content, View } from 'native-base';
import { Permissions, ImagePicker } from 'expo';

var today = new Date();
var date = (today.getDate() < 9 ? "0" + today.getDate() : today.getDate()) + '.' + (today.getMonth() < 9 ? "0" + (today.getMonth()+1) : today.getMonth()+1) + '.' + today.getFullYear();

export default class Certificates extends Component {

  constructor() {
      super();
      this.state = {
          date: '',
          modalVisible: false,
          modalVisibleTwo: false,
          modalVisibleThrea: false,
          usdOne: '',
          usdTwo: '',
          selfi: '',
          pressStatus: true,
          pressStatusTwo: true,
          pressStatusTrea: true,
          visGallOne: false,
          visGallTwo: false,
          visGallThrea: false,
          modalVisible: false,
          modalVisibleTwo: false,
          modalVisibleThrea: false,
      }
  }
  
  setModalVisible(visible) {
    this.setState({ modalVisible: visible});
  }

  setModalVisibleTwo(visible) {
    this.setState({ modalVisibleTwo: visible});
  }

  setModalVisibleThrea(visible) {
    this.setState({ modalVisibleThrea: visible});
  }
 
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fccd02'
    },
    title: `Заявка от `+ date
  };

  certificates = async () => {
    if ((this.state.usdOne == '') || (this.state.usdTwo == '') || (this.state.selfi == '')) {
        Alert.alert('Выберите картинки');
    } else {
        var obj = {
            usdOne: this.state.usdOne,
            usdTwo: this.state.usdTwo,
            selfi: this.state.selfi,
        }
        await AsyncStorage.setItem('photo1', JSON.stringify(obj));
        this.props.navigation.navigate('Additionally');
    }
  }

  test = () => {
    this.props.navigation.navigate('Additionally');
  } 

  // --------------------------------------

  oneGallary = async () => {
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
      if (image.uri == undefined) {
        this.setState({
          usdOne: '',
          pressStatus: true,
          modalVisible: false
        })
      } else {
        this.setState({
          usdOne: image.uri,
          pressStatus: false,
          modalVisible: false,
          visGallOne: true
        })
      }
    }
  }
  
  oneCammera = async () => {
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
      if (image.uri == undefined) {
        this.setState({
          usdOne: '',
          modalVisible: false,
          pressStatus: true,
        })
      } else {
        this.setState({
          usdOne: image.uri,
          modalVisible: false,
          pressStatus: false,
          visGallOne: true
        })
      }
    }
  }

  // --------------------------------------


  twoGallary = async () => {
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
          usdTwo: '',
          pressStatusTwo: true,
          modalVisibleTwo: false,
        })
      } else {
        this.setState({
          usdTwo: image.uri,
          pressStatusTwo: false,
          visGallTwo: true,
          modalVisibleTwo: false,
        })
      }
    }
  }

  twoCamera = async () => {
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
          usdTwo: '',
          pressStatusTwo: true,
          modalVisibleTwo: false,
        })
      } else {
        this.setState({
          usdTwo: image.uri,
          pressStatusTwo: false,
          visGallTwo: true,
          modalVisibleTwo: false,
        })
      }
    }
  }

  
  // --------------------------------------


  threaGallary = async () => {
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
      if (image.uri == undefined) {
        this.setState({
          selfi: '',
          pressStatusTrea: true,
          modalVisibleThrea: false,
        })
      } else {
        this.setState({
          selfi: image.uri,
          visGallThrea: true,
          pressStatusTrea: false,
          modalVisibleThrea: false,
        })
      }
    }
  }

  threaCamera = async () => {
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
      if (image.uri == undefined) {
        this.setState({
          selfi: '',
          pressStatusTrea: true,
          modalVisibleThrea: false,
        })
      } else {
        this.setState({
          selfi: image.uri,
          visGallThrea: true,
          pressStatusTrea: false,
          modalVisibleThrea: false,
        })
      }
    }
  }
 
  // ------------------------------------------

  async componentDidMount() {
    try {
      var photo1 = await AsyncStorage.getItem('photo1');
      var jspList2 = JSON.parse(photo1);
      if ((jspList2.usdOne != '') && (jspList2.usdTwo  != '') && (jspList2.selfi != '')) {
          this.setState({
            usdOne: jspList2.usdOne,
            usdTwo: jspList2.usdTwo,
            selfi: jspList2.selfi,
            visGallOne: true,
            visGallTwo: true,
            visGallThrea: true,
          })
      } else {
        this.setState({
          usdOne: '',
          usdTwo: '',
          selfi: '',
          visGallOne: false,
          visGallTwo: false,
          visGallThrea: false,
        })
      }
      
   }
   catch (error) {
      console.warn(error);
   }
  }

  render() {
    const { btn, btnText, textCentr, viewGallaryActive, headerText, btnView,  modalView, modalBtnLast, modalBtn, modalText, viewGallary, btnTextMain, ftxt, flexGallary, iconBlock, textBlock } = styles;

    return (
      <Container>
        <Content padder>
            <View style={textCentr}>
                <Text style={headerText}>Фото удостоверения личности</Text>
            </View>
            <View style={flexGallary}>
                <TouchableOpacity onPress={() => this.setModalVisible(true)} style={ this.state.pressStatus ? viewGallary : viewGallaryActive }>
                    <ImageBackground source={{uri: this.state.usdOne}} style={{width: '100%', height: 150}}>
                        <View>
                              {
                                this.state.visGallOne ?
                                null
                                :
                                <View style={iconBlock}>
                                    <Image
                                      source={require('../assets/user/1.jpg')}
                                    />
                                </View>
                              }
                              <View style={textBlock}>
                                <Text style={btnText}>
                                    Лицевая
                                    сторона
                                  </Text>
                              </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setModalVisibleTwo(true)} style={ this.state.pressStatusTwo ? viewGallary : viewGallaryActive }>
                    <ImageBackground source={{uri: this.state.usdTwo}} style={{width: '100%', height: 150}}>
                        <View>
                              {
                                this.state.visGallTwo ?
                                null
                                :
                                <View style={iconBlock}>
                                    <Image
                                      source={require('../assets/user/2.jpg')}
                                    />
                                </View>
                              }
                              <View style={textBlock}>
                                <Text style={btnText}>
                                    Обратная
                                    сторона
                                  </Text>
                              </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={textCentr}>
                <Text style={headerText}>Ваше фото</Text>
            </View>
            <View style={flexGallary}>
                <TouchableOpacity onPress={() => this.setModalVisibleThrea(true)}  style={ this.state.pressStatusTrea ? viewGallary : viewGallaryActive }>
                    <ImageBackground source={{uri: this.state.selfi}} style={{width: '100%', height: 150}}>
                        <View>
                              {
                                this.state.visGallThrea ?
                                null
                                :
                                <View style={iconBlock}>
                                    <Image
                                      source={require('../assets/user/3.jpg')}
                                    />
                                </View>
                              }
                              <View style={textBlock}>
                                <Text style={btnText}>
                                    Селфи
                                  </Text>
                              </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>

            <View style={ftxt}>
                <Text>Снимки должны быть четкими и без бликов</Text>
            </View>
        </Content>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {Alert.alert('Modal has been closed.');}}>
            <View style={modalView}>
              <View style={btnView}>
                <TouchableHighlight style={modalBtnLast}
                  onPress={this.oneGallary}>
                  <Text style={modalText}>Галерея</Text>
                </TouchableHighlight>
                <TouchableHighlight style={modalBtnLast}
                  onPress={this.oneCammera}>
                  <Text style={modalText}>Камера</Text>
                </TouchableHighlight>
                <TouchableHighlight style={modalBtn}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }} 
                >
                  <Text style={modalText}>Закрыть</Text>
                </TouchableHighlight>
              </View>
            </View>
        </Modal>
        
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisibleTwo}
          onRequestClose={() => {Alert.alert('Modal has been closed.');}}>
            <View style={modalView}>
              <View style={btnView}>
                <TouchableHighlight style={modalBtnLast}
                  onPress={this.twoGallary}>
                  <Text style={modalText}>Галерея</Text>
                </TouchableHighlight>
                <TouchableHighlight style={modalBtnLast}
                  onPress={this.twoCamera}>
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
        
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisibleThrea}
          onRequestClose={() => {Alert.alert('Modal has been closed.');}}>
            <View style={modalView}>
              <View style={btnView}>
                <TouchableHighlight style={modalBtnLast}
                  onPress={this.threaGallary}>
                  <Text style={modalText}>Галерея</Text>
                </TouchableHighlight>
                <TouchableHighlight style={modalBtnLast}
                  onPress={this.threaCamera}>
                  <Text style={modalText}>Камера</Text>
                </TouchableHighlight>
                <TouchableHighlight style={modalBtn}
                  onPress={() => {
                    this.setModalVisibleThrea(!this.state.modalVisibleThrea);
                  }} 
                >
                  <Text style={modalText}>Закрыть</Text>
                </TouchableHighlight>
              </View>
            </View>
        </Modal>

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
  ftxt: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewGallary: {
      width: '49%',
      backgroundColor: '#f7f7f7',
      padding: 3,
      marginVertical: 2,
      borderColor: 'transparent',
      borderWidth: 1
  },
  viewGallaryActive: {
      width: '49%',
      backgroundColor: '#f7f7f7',
      padding: 3,
      marginVertical: 2,
      borderColor: '#fccd02',
      borderWidth: 1
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
      textAlign: 'center',
      height: 50,
  },
 
 
}); 
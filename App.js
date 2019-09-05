import React from 'react';
import { createStackNavigator, createAppContainer  } from 'react-navigation';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, AsyncStorage  } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
 
const slides = [
  {
    key: 'somethun',
    title: 'заголовок 1',
    titleTwo: 'под заголовок',
    text: 'описание',
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'заголовок 2',
    titleTwo: 'под заголовок',
    text: 'описание',
    backgroundColor: '#febe29',
  },
];
 

// imports components
import Phone from './app/Phone';
import Sms from './app/sms';
import Car from './app/car';
import Calc from './app/calc';
import Schedule from './app/schedule';
import ScheduleTwo from './app/scheduleTwo';
import Userdata from './app/userdata';
import Additionally from './app/additionally';
import Infocontact from './app/infocontact';
import Certificates from './app/certificates';
import Photocar from './app/photocar';
import Card from './app/card';
import Ok from './app/Ok';
import Succes from './app/succes';

// end

// cabinet
import SignUp from './app/cabinet/signUp';
import SmsUp from './app/cabinet/smsUp';
import Cabinet from './app/cabinet/cabinet';
import Request from './app/cabinet/request';


class App extends React.Component {

  static navigationOptions = {
    header: null
  };
 
  constructor() {
    super();
    this.state = {
      showRealApp: false
    }
  }
  
  async componentDidMount() {
      try {
        var token = await AsyncStorage.getItem('token');
        var tokenJsp = JSON.parse(token);
        if (tokenJsp != null) {
            this.props.navigation.navigate('Cabinet')
            console.log(tokenJsp)
        } else {
            console.log(tokenJsp)
            this.props.navigation.navigate('App')
        }
      } catch (error) { 
        console.warn(error);
      }
  }


  _renderItem = (item) => {
    return (
      <View style={styles.sliderMain}>
        <Text style={styles.titleMain}>{item.title}</Text>
        <Text style={styles.titleMainTwo}>{item.titleTwo}</Text>
        <Text style={styles.descMain}>{item.text}</Text>
      </View>
    );
  }
  _onDone = () => {
    this.setState({ showRealApp: true });
  }

  render() {
      const { container, slider, buttons, btn, btnText } = styles;
      return (
        <View style={container}>
           <ImageBackground  source={{uri: 'http://stoloboi.ru/images/audi/audi-188.jpg'}} style={{width: '100%', height: '100%'}}>
              <View style={slider}>
                  <AppIntroSlider showNextButton={false} showPrevButton={false} doneLabel="" renderItem={this._renderItem} slides={slides} onDone={this._onDone}/>
              </View>
              <View style={buttons}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')} style={btn}>
                  <Text style={btnText}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Phone')} style={btn}>
                  <Text style={btnText}>Оформить займ</Text>
                </TouchableOpacity>
              </View>
          </ImageBackground>
        </View>
      );
  }
}


const Nav = createStackNavigator({
  App: { screen: App },
  Phone: { screen: Phone },
  Sms: { screen: Sms },
  Car: { screen: Car },
  Calc: { screen: Calc },
  Schedule: { screen: Schedule },
  ScheduleTwo: { screen: ScheduleTwo },
  Userdata: { screen: Userdata },
  Certificates: { screen: Certificates },
  Additionally: { screen: Additionally },
  Infocontact: { screen: Infocontact },
  Photocar: { screen: Photocar },
  Card: { screen: Card },
  Ok: { screen: Ok },
  Succes: { screen: Succes },
  // cabinet
  SignUp: { screen: SignUp },
  SmsUp: { screen: SmsUp },
  Cabinet: { screen: Cabinet },
  Request: { screen: Request }
})

export default createAppContainer(Nav);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    width: "100%",
    backgroundColor: 'transparent',
    height: '95%',
  },
  buttons: {
    width: "100%",
    height: '5%',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  btn: {
     width: '50%',
     height: 50,
     backgroundColor: '#fccd02',
     justifyContent: 'center',
     alignItems: 'center',
     margin: 1,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  container: {
      flex: 1
  },
  sliderMain: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
  },
  titleMain: {
     fontSize: 45,
     color: '#fff',
     marginBottom: '40%',
  },
  titleMainTwo: {
     fontSize: 30,
     color: '#fff',
     marginBottom: 30,
  },
  descMain: {
     fontSize: 20,
     color: '#fff',
  }
  
});

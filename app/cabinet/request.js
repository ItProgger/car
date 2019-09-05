import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, AsyncStorage, Platform, StatusBar } from 'react-native';
import { Drawer, Container, Icon, Button, Header, Left, Right, Body} from 'native-base';
import SideBar from './menu';

export default class Request extends Component {
  constructor(props) {
        super(props);
        this.state = {
          mainPrice: 0,
          arr: [],
        }
  }
  closeDrawer = () => {
      this.drawer._root.close()
  };
  openDrawer = () => {
      this.drawer._root.open()
  };

  static navigationOptions = {
    header: null
  };

  request = () => {
    this.props.navigation.navigate('Request')
  }

  new_request = () => {
    AsyncStorage.removeItem('carId')
    AsyncStorage.removeItem('max_credit_sum')
    AsyncStorage.removeItem('lk_car')
    AsyncStorage.removeItem('calc')
    AsyncStorage.removeItem('cardNumber')
    AsyncStorage.removeItem('photo1')
    AsyncStorage.removeItem('photo2')
    AsyncStorage.removeItem('list3')
    AsyncStorage.removeItem('list1')
    AsyncStorage.removeItem('list2')
    this.props.navigation.navigate('Car')
  }

  exit = () => {
    AsyncStorage.clear().then(() => {
      this.props.navigation.navigate('App');
    })
  }

 
  componentDidMount(){
    return fetch('http://lombard.rapid-it.kz/public/request/mob/5')
      .then((response) => response.json())
      .then((responseJson) => {
        var ar = [];
        ar.push(responseJson.requests);
        console.log(ar);
        this.setState({
          arr: ar,
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  
  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={
          <SideBar 
            request={this.request.bind(this)}
            exit={this.exit.bind(this)}
            navigator={this.navigator} 
          />
        }
        onClose={() => this.closeDrawer()} >
        <Container>
            <View style={styles.containerMain}>
            <Header  style={styles.headerBar}>
                <Left>
                  <Button transparent onPress={() => this.openDrawer()}>
                    <Icon name='menu' />
                  </Button>
                </Left>
                <Body>
                </Body>
                <Right>
                </Right>
            </Header>
            <View style={styles.main}>
                <View>
                    <Text style={styles.headerTextMain}>Заявки</Text>
                </View>
            </View>
            
            <View style={styles.main}>
                <Button onPress={() => this.new_request()} block warning>
                  <Text>Создать заявку</Text>
                </Button>
            </View>
            
            <ScrollView>
                <ScrollView horizontal={true}>
                    {/* ---- */}
                    <View>
                        <View style={styles.tableHeader}>
                            <View style={styles.textHeaderDate}>
                                <Text style={styles.textH}>#</Text>
                            </View>
                            <View style={styles.textHeader}>
                                <Text style={styles.textH}>Дата</Text>
                            </View>
                            <View  style={styles.textHeader}>
                                <Text style={styles.textH}>Машина</Text>
                            </View>
                            <View  style={styles.textHeader}>
                                <Text style={styles.textH}>Сумма займа</Text>
                            </View>
                            <View  style={styles.textHeader}>
                                <Text style={styles.textH}>Срок займа</Text>
                            </View>
                            <View  style={styles.textHeader}>
                                <Text style={styles.textH}>Статус</Text>
                            </View>
                        </View>          
                        {this.state.arr.length == 0 ? null : this.state.arr.map((item, index) => {
                                if (item == null) { 
                                    return null;
                                } else {
                                    return (
                                        <View key={index} style={styles.tableHeader}>
                                            <View style={styles.textHeaderDate}>
                                                <Text style={styles.textB}>{index + 1}</Text>
                                            </View>
                                            <View style={styles.textHeader}>
                                                <Text style={styles.textB}>
                                                  {item.credit_exp_date}
                                                </Text>
                                            </View>
                                            <View  style={styles.textHeader}>
                                                <Text style={styles.textB}>
                                                  {item.lk_car_model}
                                                  {item.lk_car_year}
                                                </Text>
                                            </View>
                                            <View  style={styles.textHeader}>
                                                <Text style={styles.textB}>{item.credit_sum}</Text>
                                            </View>
                                            <View  style={styles.textHeader}>
                                                <Text style={styles.textB}>{item.credit_max_period}</Text>
                                            </View>
                                            <View style={styles.textHeader}>
                                                <Text style={styles.textB}>{item.lk_req_status}</Text>
                                            </View>
                                        </View>
                                    );
                                }

                        })}  
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
        </Container>
      </Drawer>

    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
            ...Platform.select({
                android: {
                    marginTop: StatusBar.currentHeight
                }
            })
  },
  headerBar: { backgroundColor: '#fccd02'},
  tableHeader: { flexDirection: 'row', paddingVertical: 10, borderTopWidth: 1, borderColor: 'gray'},
  textHeaderDate: { width: 25, justifyContent: 'center', alignItems: 'center' }, 
  textHeader: { width: 80, justifyContent: 'center'},
  textH: { fontWeight: 'bold', fontSize: 10 },
  textB: {fontSize: 10, margin: 5},
  headerTextMain: {fontSize: 17, color: 'gray', marginTop: 30},
  headerSumMain: {fontSize: 30, color: '#000', marginTop: 10},
  headerDataMain: {fontSize: 25, color: '#000', marginTop: 10},
  main: { width: '100%', paddingHorizontal: 10, marginTop: 15, marginBottom: 15 },
});
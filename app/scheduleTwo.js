import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, AsyncStorage } from 'react-native';


export default class ScheduleTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPrice: 0,
      arr: [],
      dateMain: ''
    }
  }
  static navigationOptions = {
        headerStyle: {
            backgroundColor: '#fccd02'
        },
        title: `График платежей`
  };
  
  
  async componentDidMount() {
    try {
        var res = await AsyncStorage.getItem('ravdoli');
        var jsp = JSON.parse(res);
        var arr = []

        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();

        for(var i = 0; i < jsp.length; i++) {
            if(month == 12){
                month = 0;
                year++;
            }
            month++;
            arr[i] = {};
            arr[i].date_ost = (day > 9 ? day : '0' + day) + '.' + (month > 9 ? month : '0' + month) + '.' + year;
            arr[i].credit_ost = jsp[i][0]
            arr[i].credit_procent = jsp[i][1]
            arr[i].credit_pog = jsp[i][2]
            arr[i].credit_sum = jsp[i][3]
            this.setState({
                dateMain: arr[i].date_ost
            })
        }
        this.setState({
            arr: arr,
        })
    } catch (error) {
         console.warn(error);
    }
  }



  render() {
    const { container, main, textB, tableHeader, headerDataMain, textHeader, textH, textHeaderDate, headerTextMain, headerSumMain } = styles;
    
    const { navigation } = this.props;
    const mainSum = navigation.getParam('mainSum', 'NO-ID');
    
    return (
        <View style={container}>
            <View style={main}>
                <View>
                    <Text style={headerTextMain}>Сумма займа</Text>
                </View>
                <View>
                    <Text style={headerSumMain}>{mainSum} тг</Text>                
                </View>
                <View>
                    <Text style={headerTextMain}>Срок займа</Text>
                </View>
                <View>
                    <Text style={headerDataMain}>{this.state.dateMain}</Text>                
                </View>
            </View>
            <ScrollView>
                <ScrollView horizontal={true}>
                    {/* ---- */}
                    <View>
                        <View style={tableHeader}>
                            <View style={textHeaderDate}>
                                <Text style={textH}>#</Text>
                            </View>
                            <View style={textHeader}>
                                <Text style={textH}>Дата</Text>
                            </View>
                            <View  style={textHeader}>
                                <Text style={textH}>Ежемесячный платеж</Text>
                            </View>
                            <View  style={textHeader}>
                                <Text style={textH}>Проценты</Text>
                            </View>
                            <View  style={textHeader}>
                                <Text style={textH}>Основной долг</Text>
                            </View>
                            <View  style={textHeader}>
                                <Text style={textH}>Остаток</Text>
                            </View>
                        </View>
                        {this.state.arr.length == 0 ? null : this.state.arr.map((item, index) => {
                                if (item == null) { 
                                    return null;
                                } else {
                                    return (
                                        <View key={index} style={tableHeader}>
                                            <View style={textHeaderDate}>
                                                <Text style={textB}>{index + 1}</Text>
                                            </View>
                                            <View style={textHeader}>
                                                <Text style={textB}>{item.date_ost}</Text>
                                            </View>
                                            <View  style={textHeader}>
                                                <Text style={textB}>{item.credit_sum.toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')}</Text>
                                            </View>
                                            <View  style={textHeader}>
                                                <Text style={textB}>{item.credit_procent.toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')}</Text>
                                            </View>
                                            <View  style={textHeader}>
                                                <Text style={textB}>{item.credit_pog.toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')}</Text>
                                            </View>
                                            <View style={textHeader}>
                                                <Text style={textB}>{item.credit_ost.toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')}</Text>
                                            </View>
                                        </View>
                                    );
                                }

                        })}  
                    
                    </View>
                </ScrollView>
            </ScrollView>
           
        </View>
      
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1},
  tableHeader: { flexDirection: 'row', paddingVertical: 10, borderTopWidth: 1, borderColor: 'gray'},
  textHeaderDate: { width: 25, justifyContent: 'center', alignItems: 'center' }, 
  textHeader: { width: 80, justifyContent: 'center'},
  textH: { fontWeight: 'bold', fontSize: 10 },
  textB: {fontSize: 10},
  headerTextMain: {fontSize: 17, color: 'gray', marginTop: 30},
  headerSumMain: {fontSize: 30, color: '#000', marginTop: 10},
  headerDataMain: {fontSize: 25, color: '#000', marginTop: 10},
  main: { width: '100%', paddingHorizontal: 10 },

});
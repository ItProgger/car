import React, { Component } from 'react';
import { StyleSheet, Text, Slider, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { Container, Content, View, Input } from 'native-base';

var today = new Date();
var date = (today.getDate() < 9 ? "0" + today.getDate() : today.getDate()) + '.' + (today.getMonth() < 9 ? "0" + (today.getMonth()+1) : today.getMonth()+1) + '.' + today.getFullYear();


export default class Phone extends Component {

constructor() {
    super();
    this.state = {
        sum: 300000,
        month: 1,
        min: 300000,
        max: 7000000,
        minmonth: 1,
        maxmonth: 36,
        an: true,
        rd: false,
        mainsum: '300 000',
        mainsumTwo: 300000,
        mainmounth: '1',
        monthTwo: 1,
        mainPrice: 0,
        anuetet: '',
        ravdoli: '',
        credit_type: [],
    }
}


anuetetForm(amount, period, rate, commision1, commision2, commision3) {
  var comissionAmount = (commision1 / 100 + commision2 / 100) * amount + commision3;
  // МАССИВ РЕЗУЛЬТАТОВ
  var tableResults = [];
  // РЕЗУЛЬТАТ: ГЭСВ, APR
  var aprs = [];
  // константа: начальное значение
  var dailyPayment = amount * (rate / 100) / 12 / (1 - Math.pow(1 + (rate / 100) / 12, -period));
  for (var apr = rate - 6; apr < 100; apr += 0.05) {
      tableResults = [];
      // НАЧАЛЬНЫЕ ЗНАЧЕНИЯ
      // первое значение столбца «платёж, остаток долга»
      var debtPaymentPrev = dailyPayment - amount * ((rate / 100) * 30 / 360);
      // первое значение столбца «процент»
      var percentPrev = amount * ((rate / 100) * 30 / 360);
      // первое значение столбца «платёж»
      var paymentPrev = debtPaymentPrev + percentPrev;
      // первое значение столбца «остаток долга»
      var debtRemainderPrev = amount - debtPaymentPrev;
      // первое значение столбца «rightside»
      var rightSidePrev = paymentPrev / Math.pow(1 + (apr / 100), 30 / 360);
      // сумма значений столбца «rightside»
      var rightSideSumm = 0;
      var percentCurr = 0, debtPaymentCurr = 0, debtRemainderCurr = 0, paymentCurr = 0, rightSideCurr = 0;
      for (var monthNumber = 1; monthNumber <= period; monthNumber++) {
          // СОХРАНЯЕМ РЕЗУЛЬТАТ
          tableResults.push([
              debtRemainderPrev,
              percentPrev,
              debtPaymentPrev,
              paymentPrev
          ]);
          // сумма значений столбца «rightside»
          rightSideSumm += rightSidePrev;
          // текущее значение столбца «процент»
          percentCurr = debtRemainderPrev * ((rate / 100) * 30 / 360);
          // текущее значение столбца «платёж, остаток долга»
          debtPaymentCurr = debtRemainderPrev - debtPaymentPrev <= 0 ? 0 : dailyPayment - percentCurr;
          // текущее значение столбца «остаток долга»
          debtRemainderCurr = debtRemainderPrev - debtPaymentCurr > 0 ? debtRemainderPrev - debtPaymentCurr : 0;
          // текущее значение столбца «платёж»
          paymentCurr = debtRemainderPrev - debtPaymentPrev <= 0 ? 0 : dailyPayment;
          // текущее значение столбца «rightside»
          rightSideCurr = paymentCurr / Math.pow(1 + (apr / 100), 30 * (monthNumber + 1) / 360);
          // текущие значения становятся предыдущими
          percentPrev = percentCurr;
          debtPaymentPrev = debtPaymentCurr;
          debtRemainderPrev = debtRemainderCurr;
          paymentPrev = paymentCurr;
          rightSidePrev = rightSideCurr;
      }
      aprs.push([ apr, Math.abs(amount - comissionAmount - rightSideSumm) ]);
  }
  var mainPriceV = [];
  for(var i = 0; i < tableResults.length; i++) {
      mainPriceV[i] = {};
      mainPriceV[i].credit_sum = tableResults[i][3]
  }
  this.setState({
    mainPrice:  parseFloat(mainPriceV[0].credit_sum).toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')
  })
  AsyncStorage.setItem('anuitet', JSON.stringify(tableResults));
}


ravdoliForm(amount, period, rate, commision1, commision2, commision3) {
  var comissionAmount = (commision1 / 100 + commision2 / 100) * amount + commision3;

  // МАССИВ РЕЗУЛЬТАТОВ
  var tableResults = [];

  // РЕЗУЛЬТАТ: ГЭСВ, APR
  var aprs = [];


  for (var apr = rate - 6; apr < 100; apr += 0.05) {
    tableResults = [];

    // НАЧАЛЬНЫЕ ЗНАЧЕНИЯ
    // первое значение столбца «платёж, остаток долга»
    var debtPaymentPrev = amount / period;
    // первое значение столбца «процент»
    var percentPrev = amount * ((rate / 100) * 30 / 360);
    // первое значение столбца «платёж»
    var paymentPrev = debtPaymentPrev + percentPrev;
    // первое значение столбца «остаток долга»
    var debtRemainderPrev = amount - debtPaymentPrev;

    // первое значение столбца «rightside»
    var rightSidePrev = paymentPrev / Math.pow(1 + (apr / 100), 30 / 360);
    // сумма значений столбца «rightside»
    var rightSideSumm = 0;

    var percentCurr = 0, debtPaymentCurr = 0, debtRemainderCurr = 0, paymentCurr = 0;

    for (var monthNumber = 1; monthNumber <= period; monthNumber++) {
    // СОХРАНЯЕМ РЕЗУЛЬТАТ
    tableResults.push([
      debtRemainderPrev,
      percentPrev,
      debtPaymentPrev,
      paymentPrev
    ]);

    // сумма значений столбца «rightside»
    rightSideSumm += rightSidePrev;

    // текущее значение столбца «платёж, остаток долга»
    debtPaymentCurr = debtPaymentPrev;
    // текущее значение столбца «процент»
    percentCurr = debtRemainderPrev * ((rate / 100) * 30 / 360);
    // текущее значение столбца «остаток долга»
    debtRemainderCurr = debtRemainderPrev - debtPaymentCurr;
    // текущее значение столбца «платёж»
    paymentCurr = percentCurr + debtPaymentCurr;
    // текущее значение столбца «rightside»
    rightSideCurr = paymentCurr / Math.pow(1 + (apr / 100), 30 * (monthNumber + 1) / 360);

    // текущие значения становятся предыдущими
    percentPrev = percentCurr;
    debtPaymentPrev = debtPaymentCurr;
    debtRemainderPrev = debtRemainderCurr;
    paymentPrev = paymentCurr;
    rightSidePrev = rightSideCurr;
    }

    aprs.push([ apr, Math.abs(amount - comissionAmount - rightSideSumm) ]);
  }
  var mainPriceV = [];
  for(var i = 0; i < tableResults.length; i++) {
      mainPriceV[i] = {};
      mainPriceV[i].credit_sum = tableResults[i][3]
  }
  this.setState({
    mainPrice:  parseFloat(mainPriceV[0].credit_sum).toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')
  })
  AsyncStorage.setItem('ravdoli', JSON.stringify(tableResults));
}


sum(sum) {
  this.setState(() => {
    return {
      sum: parseFloat(sum),
      mainsum: ''+parseFloat(sum).toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')+'',
      mainsumTwo: parseFloat(sum)
    };
  });

  if (this.state.month == 0) {
    this.setState({
        mainPrice: 0
    })
  } else {
      if (this.state.an == true) {
        this.anuetetForm(sum, this.state.month, 10, 0, 0, 0);
      } else {
        this.ravdoliForm(sum, this.state.month, 10, 0, 0, 0);
      }
  }
}

month(month) {
  this.setState(() => {
    return {
      month: parseFloat(month),
      mainmounth: ''+parseFloat(month).toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')+'',
      monthTwo: parseFloat(month)
    };
  });
  var obj = {
    month: parseFloat(month),
    mainmounth: ''+parseFloat(month).toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')+'',
    monthTwo: parseFloat(month),
  }
  AsyncStorage.setItem('mounts', JSON.stringify(obj));
  console.warn(obj)
  if (this.state.mainsum == '0') {
    this.setState({
        mainPrice: 0
    })
  } else {
    if (this.state.an == true) {
      this.anuetetForm(this.state.sum, month, 10, 0, 0, 0);
    } else  {
      this.ravdoliForm(this.state.sum, month, 10, 0, 0, 0);
    }
  }

}

 

async componentDidMount() {
    var res = await fetch('http://lombard-api.rapid-it.kz/public/api/credit/type/1');
    var max_credit_sum = await AsyncStorage.getItem('max_credit_sum');
    var mounts = await AsyncStorage.getItem('mounts');
    var max_sum = JSON.parse(max_credit_sum);
    var mounts_p = JSON.parse(mounts);

    var parceJS = await JSON.parse(res._bodyInit);
    console.log(parceJS)
    if (mounts_p != null) {
      this.setState({
        credit_type: parceJS.credit_types,
        anuetet: parceJS.credit_types[0].id,
        an: true,
        max: max_sum,
        month: mounts_p.month,
        mainmounth: mounts_p.mainmounth,
        monthTwo: mounts_p.monthTwo
      });
      this.anuetetForm(this.state.sum, this.state.month, 10, 0, 0, 0);
    } else {
        this.setState({
          credit_type: parceJS.credit_types,
          anuetet: parceJS.credit_types[0].id,
          an: true,
          max: max_sum,
        });
        this.anuetetForm(this.state.sum, this.state.month, 10, 0, 0, 0);
    }
   
}

// -------------
anuetet = async () => {
    this.setState({
      an: true,
      rd: false,
      anuetet: this.state.credit_type[0].id,
      ravdoli: '',
    })
    await this.anuetetForm(this.state.sum, this.state.month, 10, 0, 0, 0);
}

ravdoli = async () => {
  this.setState({
      rd: true,
      an: false,
      anuetet: '',
      ravdoli: this.state.credit_type[1].id,
  })
  await this.ravdoliForm(this.state.sum, this.state.month, 10, 0, 0, 0);
}

calc = () => {
  if((this.state.month == '') || (this.state.mainPrice == '')) {
      Alert.alert('Заполните все данные')
  } else {
      var ravdoli = this.state.ravdoli;
      var anuetet = this.state.anuetet;
      if (anuetet == '') {
        var sumObj = {
          min_sum: this.state.min,
          max_sum: this.state.max,
          credit_period: this.state.month,
          month_payment: this.state.mainPrice,
          credit_type: 'ravdoli',
          credit_sum: this.state.mainsum
        }
        
        AsyncStorage.setItem('calc', JSON.stringify(sumObj));
        this.props.navigation.navigate('Userdata');
      } else if (ravdoli == '') {
          var sumObj = {
            min_sum: this.state.min,
            max_sum: this.state.max,
            credit_period: this.state.month,
            month_payment: this.state.mainPrice,
            credit_type: 'anuetet',
            credit_sum: this.state.mainsum
          }
          AsyncStorage.setItem('calc', JSON.stringify(sumObj));
          this.props.navigation.navigate('Userdata');
      }
  }
} 

test = () => {
  this.props.navigation.navigate('Userdata');
} 

openSh = () => {
  this.props.navigation.navigate('Schedule', {mainSum: this.state.mainsum} )
}

openShTwo = () => {
  this.props.navigation.navigate('ScheduleTwo', {mainSum: this.state.mainsum})
}

static navigationOptions = {
  headerStyle: {
    backgroundColor: '#fccd02',
  },
  title: `Заявка от `+ date
};

render() {
    const { btn, btnText, headerText, textCentrTwo, textCentr, headerTextTwo, btnPaymentActive, paymentText, btnPayment, paymentType, mainCount, schedule, mainCountContentText, mainCountFooterText, mainCountHeader, mainCountContent, mainCountFooter, rangeOne, rangeBlock, rangeText, parrentInput, mainInput } = styles;
    return (
      <Container>
        <Content padder>
            <View style={textCentr}>
                <Text style={headerText}>Расчитайте займ</Text>
            </View>
            <View style={textCentrTwo}>
                <Text style={headerTextTwo}>Сумма займа</Text>
            </View>
            <View style={mainInput}>
                <View style={parrentInput}>
                    <View>
                        <Input
                          minlength={300000}
                          maxlength={7000000}
                          value={this.state.mainsum}
                          keyboardType='numeric'
                          onChangeText={(mainsum) => {
                            // this.setState({
                            //     sum: parseFloat(mainsum),
                            //     mainsum: ''+parseFloat(mainsum).toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')+'',
                            //     mainsumTwo: parseFloat(mainsum)
                            // });
                            // if (this.state.month == 0) {
                            //   this.setState({
                            //       mainPrice: 0
                            //   })
                            // } else {
                            //     if (this.state.an == true) {
                            //       this.anuetetForm(mainsumTwo, this.state.month, 10, 0, 0, 0);
                            //     } else {
                            //       this.ravdoliForm(mainsumTwo, this.state.month, 10, 0, 0, 0);
                            //     }
                            // }
                          }}
                        />
                    </View>
                    <Text>тг</Text>
                </View>    
            </View>
            
            <Slider
                step={1}
                style={rangeOne}
                maximumValue={this.state.max}
                minimumValue={this.state.min}
                onValueChange={this.sum.bind(this)}
                value={this.state.sum}
            /> 
             
            <View style={rangeBlock}>
                <Text style={rangeText}>{this.state.min.toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')} тг</Text>
                <Text style={rangeText}>{this.state.max.toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')} тг</Text>
            </View> 
            
            <View style={textCentrTwo}>
                <Text style={headerTextTwo}>Срок займа</Text>
            </View>
            <View style={mainInput}>
                <View style={parrentInput}>
                    <View>
                        <Input
                          minlength={1}
                          maxlength={36}
                          value={this.state.mainmounth}
                          keyboardType='numeric'
                          onChangeText={(month) => {
                            // this.setState({
                            //     month: parseFloat(month),
                            //     mainmounth: ''+parseFloat(month).toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')+'',
                            //     monthTwo: parseFloat(month)
                            // });
                            // if (this.state.mainsum == '0') {
                            //   this.setState({
                            //       mainPrice: 0
                            //   })
                            // } else {
                            //   if (this.state.an == true) {
                            //     this.anuetetForm(this.state.mainsumTwo, month, 10, 0, 0, 0);
                            //   } else {
                            //     this.ravdoliForm(this.state.mainsumTwo, month, 10, 0, 0, 0);
                            //   }
                            // }
                          }}
                        />
                    </View>
                    <Text>месяц</Text>
                </View>    
            </View>
            

            <Slider
                step={1}
                style={rangeOne}
                maximumValue={this.state.maxmonth}
                minimumValue={this.state.minmonth}
                onValueChange={this.month.bind(this)}
                value={this.state.month}
            /> 
            <View style={rangeBlock}>
                <Text style={rangeText}>{this.state.minmonth} месяц</Text>
                <Text style={rangeText}>{this.state.maxmonth} месяца</Text>
            </View>
            
            <View style={paymentType}>
                <TouchableOpacity 
                    style={this.state.an? btnPaymentActive : btnPayment}
                    onPress={this.anuetet}
                >
                    <Text style={paymentText}>Аннуитет</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={this.state.rd? btnPaymentActive : btnPayment}
                    onPress={this.ravdoli}
                >
                    <Text style={paymentText}>Равными долями</Text>
                </TouchableOpacity>
            </View>
           
            <View style={mainCount}>
                <View style={mainCountHeader}>
                    <Text style={headerText}>Ежемесячный платеж*</Text>
                </View>
                <View style={mainCountContent}>
                    <Text style={mainCountContentText}>{this.state.mainPrice} тг</Text>
                </View>
                <View style={mainCountFooter}>
                    <Text style={mainCountFooterText}>Вы можете досрочно погасить займ без штрафов и комиссий</Text>
                </View>
            </View>
            <View style={mainCountFooter}>
                {
                  this.state.an == true ? 
                  <TouchableOpacity onPress={this.openSh}>
                      <Text style={schedule}>*График платежей</Text>
                  </TouchableOpacity>
                   :
                  <TouchableOpacity onPress={this.openShTwo}>
                      <Text style={schedule}>*График платежей</Text>
                  </TouchableOpacity>
                }
                
            </View>
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
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'gray'
  },
  headerTextTwo: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'gray'
  },
  textCentr: {
      width: '100%',
      alignItems: 'center',
      marginVertical: 20
  },
  textCentrTwo: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 5
  },
  rangeBlock: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
  },
  rangeText: {
      fontWeight: 'bold',
      color: 'gray'
  },
  rangeOne: {
    color: '#fccd02',
  },
  mainInput: {
      width: '100%',
      height: 50,
      backgroundColor: '#f5f5f5',
      flexDirection: 'row', 
      justifyContent: 'center',
      marginBottom: 15,
  },
  parrentInput: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainCount: {
      width: '100%',
      padding: 15,
      marginVertical: 15,
      borderWidth: 1,
      borderColor: '#ccc'
  },
  mainCountHeader: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 15,
  },
  mainCountContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  mainCountFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mainCountFooterText: {
      fontSize: 12,
      color: 'gray'
  },
  mainCountContentText: {
      fontSize: 30,
  },
  schedule: {
      color: 'gray',
      fontSize: 15,
  },
  paymentType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  btnPayment: {
      width: '50%',
      height: 35,
      backgroundColor: '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
  },
  btnPaymentActive: {
      width: '50%',
      height: 35,
      backgroundColor: '#fccd02',
      justifyContent: 'center',
      alignItems: 'center',
  },
  paymentText: {
      fontSize: 12,
  }
});
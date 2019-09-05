import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, AsyncStorage, Image} from 'react-native';
import { Container, Content, View, ListItem, CheckBox, Body, Left} from 'native-base';

var today = new Date();
var date = (today.getDate() < 9 ? "0" + today.getDate() : today.getDate()) + '.' + (today.getMonth() < 9 ? "0" + (today.getMonth()+1) : today.getMonth()+1) + '.' + today.getFullYear();

export default class Succes extends Component {

  constructor() {
      super();
      this.state = {
          date: '',
          ch: false,
          date: '',
          creditCard: '',
          autoImages: [],
          validText: '',
          btnValid: false,
          iSloading: false,
          date_ost: ''
      }
  }

  main = async () => {
    try {
      this.setState({
        iSloading: true
      })

      var token = await AsyncStorage.getItem('token');

      var list1 = await AsyncStorage.getItem('list1');
      var list2 = await AsyncStorage.getItem('list2');
      var list3 = await AsyncStorage.getItem('list3');
      var photo1 = await AsyncStorage.getItem('photo1');
      var photo2 = await AsyncStorage.getItem('photo2');
      var calc = await AsyncStorage.getItem('calc');
      var carId = await AsyncStorage.getItem('carId');
      var cardNumber = await AsyncStorage.getItem('cardNumber');
      var lk_car = await AsyncStorage.getItem('lk_car');
      
      
      var jspList1 = JSON.parse(list1);
      var tokenJsp = JSON.parse(token);

      var jspList2 = JSON.parse(list2);
      var jspList3 = JSON.parse(list3);
      var jspPhoto1 = JSON.parse(photo1);
      var jspPhoto2 = JSON.parse(photo2);
      var calc = JSON.parse(calc);
      var lk_car = JSON.parse(lk_car);
      var card = JSON.parse(cardNumber);

      

      this.setState({
        autoImages: jspPhoto2
      })

      var passport_1 = {
        uri: jspPhoto1.usdOne,
        type: 'image/jpeg',
        name: 'passport_1.jpg',  
      };

      var passport_2 = {
        uri: jspPhoto1.usdOne,
        type: 'image/jpeg',
        name: 'passport_2.jpg',  
      };

      var selfi = {
        uri: jspPhoto1.usdOne,
        type: 'image/jpeg',
        name: 'selfi.jpg',  
      };
      var mount_p = calc.month_payment.replace(/\s+/g, '');
      var monts_pay = Number(mount_p);
      var iin_p = jspList1.iin.replace(/\s+/g, '');
      var iin_n = Number(iin_p);
      var cr = calc.credit_sum.replace(/\s+/g, '');
      var credit_sum = Number(cr);
      
      var body = await new FormData();

      body.append('token', tokenJsp);
      body.append('first_name', jspList1.name);
      body.append('last_name', jspList1.lastname);
      body.append('middle_name', jspList1.patronymic);
      body.append('iin', iin_n);
      body.append('credit_min_sum', calc.min_sum);
      body.append('credit_max_sum', calc.max_sum);
      // body.append('credit_type_id', 3); //calc.credit_type
      body.append('credit_period', calc.credit_period);
      body.append('credit_min_period', 1); 
      body.append('credit_max_period', calc.credit_period); 
      body.append('month_payment', monts_pay); // 
      body.append('credit_exp_date', "10.09.2011"); // до какой даты кредит
      body.append('other_credit_payment_sum', jspList2.plateg);
      body.append('work', jspList2.zanatost);
      body.append('organization', jspList2.org);
      body.append('work_phone', jspList2.phone);
      body.append('work_experience_month', jspList2.mount);
      body.append('work_experience_year', jspList2.yearsold);
      body.append('birth_date', jspList1.chosenDate);
      body.append('lk_city', jspList1.city); 
      body.append('work_address',jspList2.adressWork);
      body.append('mob_phone', jspList1.phone);
      body.append('credit_sum', credit_sum); 
      body.append('fact_address', jspList2.adress);
      body.append('usr_id', 1);
      body.append('email', jspList1.email);
      body.append('passport_1', passport_1);
      body.append('passport_2', passport_2);
      body.append('user_photo', selfi);
      body.append('cp1_fio', jspList3.cp1_fio);
      body.append('cp1_whom', jspList3.cp1_whom);
      body.append('cp1_phone', jspList3.cp1_phone);
      body.append('cp1_comment', jspList3.cp1_comment);
      body.append('cp2_fio', jspList3.cp2_fio);
      body.append('cp2_whom', jspList3.cp2_whom);
      body.append('cp2_phone', jspList3.cp2_phone);
      body.append('cp2_comment', jspList3.cp2_comment);
      body.append('cp3_fio', jspList3.cp3_fio);
      body.append('cp3_whom', jspList3.cp3_whom);
      body.append('cp3_phone', jspList3.cp3_phone);
      body.append('cp3_comment', jspList3.cp3_comment);
      body.append('bank_card_num', card)
      body.append('id_issue_date', jspList1.chosenDateTwo); // дата выдачи
      body.append('id_exp_date', jspList1.chosenDateThrea); // срок действия 
      body.append('lk_lom', 4);
      body.append('lk_id_kind', jspList1.vid);
      body.append('id_num', 10);
      body.append('lk_car_model', lk_car.lk_car_model);
      body.append('lk_car_year', lk_car.lk_car_year);
      body.append('lk_credit_scheme_type', 1);
      body.append('lk_id_issuer', jspList1.kemVidan);
      this.state.autoImages.map((item, index) => {
        var name = 'avto_'+(index+1)
        var obj = {
          uri: item.source,
          type: 'image/jpeg',
          name: 'photo'+(index+1)+'.jpg',  
        };

        body.append(name, obj);
      })
      
      console.log(body);
 
      return fetch('http://lombard-api.rapid-it.kz/public/api/request/add', {
        method: 'POST',
        body: body,
        header: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((responseJs) => {
          console.log(responseJs);
          this.props.navigation.navigate('Succes');
          this.setState({
            iSloading: false
          })
      })
    } catch (error) {
      console.error(error);
    }
}

  test = () => {
    this.props.navigation.navigate('Succes');
  }
   
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fccd02'
    },
    title: `Заявка от `+ date
  };


  checkedBtn = () => {
    this.setState({
        ch: !this.state.ch
    })
  }

  render() {
    const { btn, btnText, ftxt, txt, btnTwo, loadings, images} = styles;
    if(this.state.iSloading){
      return(
        <View style={loadings}>
                  <Image
                    style={images}
                    source={require('../assets/25.gif')}
                  />
        </View>
      )
    }

    return (
      <Container>
        <Content padder>
            <ListItem onPress={this.checkedBtn}>
                <CheckBox checked={this.state.ch} color="#fccd02" />
                <Body>
                    <Text style={txt}>Согласен на сбор и обработку персональных данных</Text>
                </Body>
            </ListItem>
            <View style={ftxt}>
            <View>
              {
                this.state.ch == true ? 
                <TouchableOpacity onPress={this.test} style={btn}>
                  <Text style={btnText}>Отправить заявку</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={btnTwo}>
                  <Text style={btnText}>Отправить заявку</Text>
                </TouchableOpacity>
              }
              
            </View>
            </View>
        </Content>
       
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  loadings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  images: {
      width: 50,
      height: 50,
  },
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: '#fccd02',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  btnTwo: {
    width: '100%',
    height: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  ftxt: {
    width: '100%',
    marginVertical: 20,
  },
  
  txt: {
      fontSize: 15,
      marginLeft: 15
  }
 
});
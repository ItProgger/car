import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View, Text, ScrollView, Image,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Menu extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

 

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View>
                <Image
                    style={styles.images}
                    source={require('../../assets/icon.png')}
                  />
            </View>
            <TouchableOpacity
              style={styles.option}
              onPress={this.props.request}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                  <Ionicons name="md-list" size={22} color="#000" />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionText}>
                    Заявки
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={this.props.exit}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                  <Ionicons name="md-exit" size={22} color="#000" />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionText}>
                     Выход
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginHorizontal: 10
  },
  option: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  images: {
      width: 120,
      height: 120,
      marginTop: 50,
      marginLeft: 20,
      marginBottom: 20
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
    marginLeft: 15,
    color: '#000'
  },
  

  viewImg: {
    height: 120,
    justifyContent: "center",
    alignItems: 'center',
    marginVertical: 20,
  },

  viewText: {
    alignItems: 'center',
    marginBottom: 20,
  },

  nameAnDlasname: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },

  ImgMain: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    backgroundColor: 'white'
  },


});

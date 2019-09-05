import React from 'react';
import { StyleSheet, StatusBar, Platform, AsyncStorage } from 'react-native';
import { Drawer, Container, Icon, Button, Header, Left, Body, Right, View} from 'native-base';
import SideBar from './menu';

export default class Cabinet extends React.Component {
  closeDrawer = () => {
      this.drawer._root.close()
  };
  openDrawer = () => {
      this.drawer._root.open()
  };

  request = () => {
    this.props.navigation.navigate('Request')
  }

 
  exit = () => {
    AsyncStorage.clear().then(() => {
      this.props.navigation.navigate('App');
    })
  }

  static navigationOptions = {
    header: null
  };
  
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
          <View style={styles.container}>
              <Header style={styles.headerBar}>
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
          </View>
        </Container>
      </Drawer>

    );
  }
}

const styles = StyleSheet.create({
  headerBar: {
     backgroundColor: '#fccd02'
  },
  container: {
    flex: 1,
            ...Platform.select({
                android: {
                    marginTop: StatusBar.currentHeight
                }
            })
  }
});
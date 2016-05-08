/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  TouchableHighlight,
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions
} from 'react-native';

var MOCKED_CLUBS_DATA = [
  {
    'id': 1,
    'name': 'Manchester United',
    'image': 'http://therepublikofmancunia.com/wp-content/uploads/2010/07/Shirts_Cantona.jpg',
    'options': [
      'Charlton Athletic', 'Liverpool', 'Manchester United', 'Middlesborough'
    ]
  },
  {
    'id': 2,
    'name': 'Southampton',
    'image': 'http://www2.pictures.zimbio.com/gi/Morgan+Schneiderlin+Southampton+v+West+Bromwich+oyyuJjb1O0Fl.jpg',
    'options': [
      'Sunderland', 'Stoke City', 'Sheffield United', 'Southampton'
    ]
  },
  {
    'id': 3,
    'name': 'Newcastle United',
    'image': 'https://gms.cachefly.net/images/29ed35a9088c6d664046fa93be64a93b/960.jpg',
    'options': [
      'Juventus', 'Atletico Mineiro', 'Newcastle United', 'St Mirren'
    ]
  },
  {
    'id': 4,
    'name': 'Chelsea',
    'image': 'http://i.dailymail.co.uk/i/pix/2015/06/23/12/0354DD2C0000044D-3135808-image-m-16_1435059265751.jpg',
    'options': [
      'Birmingham City', 'Leicester City', 'Chelsea', 'Everton'
    ]
  },
  {
    'id': 5,
    'name': 'Porto',
    'image': 'https://s-media-cache-ak0.pinimg.com/736x/aa/4b/94/aa4b94ad1fb9a0dd13c4c7b729637626.jpg',
    'options': [
      'Real Sociedad', 'Espanyol', 'Deportivo La Coruna', 'Porto'
    ]
  },
  {
    'id': 6,
    'name': 'Manchester City',
    'image': 'http://content.mcfc.co.uk/~/media/Images/Home/News/Team%20News/2011-2012%20Season/Away%20Games/Tottenham%2028%20Aug%202011/Edin%20dzeko%20celebrates.ashx?w=0&h=0&as=1',
    'options': [
      'Bournemouth', 'Manchester City', 'Brighton & Hove Albion', 'AC Milan'
    ]
  },
  {
    'id': 7,
    'name': 'Cardiff City',
    'image': 'http://www2.pictures.zimbio.com/gi/Craig+Bellamy+Cardiff+City+v+Huddersfield+zLED43T5mCol.jpg',
    'options': [
      'Middlesborough', 'Charlton Athletic', 'Rotherham', 'Cardiff City'
    ]
  },
  {
    'id': 8,
    'name': 'Fulham',
    'image': 'http://img.thesun.co.uk/aidemitlum/archive/01818/ParkerS_1818154a.jpg',
    'options': [
      'Fulham', 'Tottenham Hotspur', 'Derby County', 'Bolton Wanderers'
    ]
  },
];

class AroundTheWorld extends Component {
  constructor(props) {
    super(props);
    const randomIndex = this.randomIndex(MOCKED_CLUBS_DATA.length);
    console.log('randomIndex ' + randomIndex);
    this.state = {
      club: MOCKED_CLUBS_DATA[randomIndex],
      clubIndex: randomIndex,
      score: 0,
      seen: [MOCKED_CLUBS_DATA[randomIndex].id],
      completed: false
    };

    console.log(Dimensions.get('window'));

    console.log('clubs: ' + MOCKED_CLUBS_DATA.length);
  }
  randomIndex(max) {
    const min = 1;
    return (Math.floor(Math.random() * (max - min + 1)) + min) - 1;
  }
  unseenClubs() {
    var seen = this.state.seen;
    var unseen = MOCKED_CLUBS_DATA.filter(function(el, i) {
      return seen.indexOf(el.id) === -1;
    });

    return unseen;
  }
  buttonClicked(i, event) {
    // console.log(event);
    // console.log(i);
    if(!this.state.completed) {
      var club = this.state.club;

      var nextClub,
          nextClubIndex,
          nextScore,
          completed,
          seen;

      if(club.options.indexOf(club.name) === (i - 1)) {
        nextScore = this.state.score + 1;
      } else {
        Alert.alert('Error!', 'That is the wrong answer.');
        nextScore = this.state.score;
      }

      console.log('seen');
      console.log(this.state.seen);
      console.log('data: ' + MOCKED_CLUBS_DATA.length);
      console.log(((this.state.seen.length - 1) + 1) < MOCKED_CLUBS_DATA.length);

      if(((this.state.seen.length - 1) + 1) < MOCKED_CLUBS_DATA.length) {
        console.log('show another');
        var unseenClubs = this.unseenClubs();
        console.log('unseenClubs');
        console.log(unseenClubs);
        console.log('nextClubIndex');
        nextClubIndex = this.randomIndex(unseenClubs.length);
        console.log(nextClubIndex);
        console.log('nextClub');
        nextClub = unseenClubs[nextClubIndex];
        console.log(nextClub);
        // nextClub = MOCKED_CLUBS_DATA[this.state.clubIndex + 1];
        // nextClubIndex = this.state.clubIndex + 1;
        completed = false;
        seen = this.state.seen.concat([nextClub.id]);
      } else {
        console.log('don\'t show another');
        nextClub = this.state.club;
        nextClubIndex = this.state.clubIndex;
        completed = true;
        seen = this.state.seen;

        Alert.alert('Congratulations!', 'You have completed the game.');
      }

      this.setState({
        club: nextClub,
        clubIndex: nextClubIndex,
        score: nextScore,
        completed,
        seen
      });

      console.log('seen set');
      console.log(this.state.seen);
    }

  }
  restart() {
    const randomIndex = this.randomIndex(MOCKED_CLUBS_DATA.length);
    this.setState({
      club: MOCKED_CLUBS_DATA[randomIndex],
      clubIndex: randomIndex,
      score: 0,
      seen: [MOCKED_CLUBS_DATA[randomIndex].id],
      completed: false
    });
  }
  render() {
    var TouchableElement = TouchableHighlight;
    return (
        <View style={styles.container}>
          <Text style={styles.header}>AroundTheWorld</Text>
          <View style={styles.scoreContainer}>
            <Text>{this.state.score}/{this.state.seen.length}</Text>
          </View>
          <Image source={{uri: this.state.club.image}} style={styles.image} />
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonsColumn}>
              <TouchableElement style={styles.button} onPress={this.buttonClicked.bind(this, 1)}>
                <View>
                  <Text style={styles.buttonText}>{this.state.club.options[0]}</Text>
                </View>
              </TouchableElement>
              <TouchableElement style={styles.button} onPress={this.buttonClicked.bind(this, 2)}>
                <View>
                  <Text style={styles.buttonText}>{this.state.club.options[1]}</Text>
                </View>
              </TouchableElement>
            </View>
            <View style={styles.buttonsColumn}>
              <TouchableElement style={styles.button} onPress={this.buttonClicked.bind(this, 3)}>
                <View>
                  <Text style={styles.buttonText}>{this.state.club.options[2]}</Text>
                </View>
              </TouchableElement>
              <TouchableElement style={styles.button} onPress={this.buttonClicked.bind(this, 4)}>
                <View>
                  <Text style={styles.buttonText}>{this.state.club.options[3]}</Text>
                </View>
              </TouchableElement>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableElement style={styles.restartButton} onPress={this.restart.bind(this)}>
              <Text style={styles.restartText}>Restart</Text>
            </TouchableElement>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    top: 20,
    flexWrap: 'wrap'
  },
  header: {
    backgroundColor: 'tomato',
    textAlign: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    width: Dimensions.get('window').width,
  },
  scoreContainer: {
    paddingTop: 10,
    paddingBottom: 10
  },
  image: {
    borderColor: 'tomato',
    borderWidth: 1,
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height * .6
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  buttonsColumn: {
    width: (Dimensions.get('window').width - 20) / 2
  },
  button: {
    borderColor: 'tomato',
    borderWidth: 1,
    height: 40,
    padding: 5,
  },
  buttonText: {

  },
  restartButton: {
    borderColor: 'tomato',
    borderWidth: 0,
    height: 40,
  },
  restartText: {
    borderColor: 'tomato',
    borderRadius: 3,
    borderWidth: 1,
    color: 'black',
    padding: 5
  }
});

AppRegistry.registerComponent('AroundTheWorld', () => AroundTheWorld);

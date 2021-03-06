import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ImageBackground, SafeAreaView,  } from 'react-native';
//import styles from '../styles/styles';
import { connect } from 'react-redux';
import { Permissions } from 'react-native-unimodules';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Line, Circle, G, Text as TextSVG, TSpan } from 'react-native-svg';
import ProfileCard from '../components/ProfileCard';
import MultilineProfileCard from '../components/MultilineProfileCard';
import CandidateProfileCard from '../components/CandidateProfileCard';
import CandidateMultilineProfileCard from '../components/CandidateMultilineProfileCard';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons, FontAwesome } from 'react-native-vector-icons';
import { showProfileScreen, updateUserInfo, uploadProfilePicture } from '../actions/UserInfoActions';
import {positiveMatch, negativeMatch} from '../actions/matchActions'
import EditProfilePhotoActionSheet from '../components/EditProfilePhotoActionSheet';
import {options, questions, category} from '../common/arrays'


export class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      profilePhoto: '',
      permissionsError: null,
      cameraRollPermissions: null,
      cameraPermissions: null,
      choosemethod: '',
      gradientLineHeight: 100,
      gradientLineWidth: 300,
      count: 1,
    };
  }



  static navigationOptions = ({ navigation }) => {
      return {
        headerTintColor: '#F4F4F4',
        headerStyle: {
          backgroundColor: '#F4F4F4',
          shadowColor: 'transparent',
          borderBottomColor:'transparent',
          borderBottomWidth: 0
        },
        headerRight: (
          <TouchableOpacity style={ styles.touchableOpacityHeader } onPress={() => navigation.navigate('Home')}>
            <Ionicons
              name="ios-arrow-forward"
              size={30}
              color="grey"
              style={styles.headerIcons}
            />
          </TouchableOpacity>
        ),
        headerTitle: (
          <Text style={{ fontWeight: 'bold', fontFamily: 'fitamint-script', fontSize: 30, color: '#00387e', }} >
              Basheret
          </Text>
        ),
        headerLeft: (
          <Ionicons
            onPress={() => navigation.navigate('Settings')}
            name="ios-settings"
            size={32}
            color="grey"
            style={styles.headerIcons}
          />
        ),
      }
    };

  componentWillUnmount(){
    this.props.dispatch(showProfileScreen('self'))
  }

  askCameraPermissionsAsync = async () => {
    let cameraPermission = await Permissions.askAsync(Permissions.CAMERA);

    console.log(cameraPermission);

    if(cameraPermission.status==="denied"){
      console.log('1');
      this.setState({permissionsError: 'Oops! Looks like you haven\'t granted Basheret permission to your Camera. Please go into your settings and change that so you can take a picture for your profile!'});
    }
    else{
      console.log('2')
      this.setState({permissionsError: null, cameraPermissions: true})
    }
  };

  askCameraRollPermissionsAsync = async () => {
    let cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if(cameraRollPermission.status==="denied"){
      console.log('1');
      this.setState({permissionsError: 'Oops! Looks like you haven\'t granted Basheret permission to your Camera Roll. Please go into your settings and change that so you can upload a picture for your profile!'});
    }
    else{
      console.log('2');
      this.setState({permissionsError: null, cameraRollPermissions: true})
    }
  };

  useLibraryHandler = async () => {
    await this.askCameraRollPermissionsAsync();
    if(this.state.cameraRollPermissions){
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: false,
      });
      if(!result.cancelled){
        this.props.dispatch(updateUserInfo('info', 'profilePhoto', result.uri));
        // this.props.dispatch(uploadProfilePicture(result))
      }
    }
  };

  useCameraHandler = async () => {
    let x = await this.askCameraPermissionsAsync();
    console.log('x', x);
    if(this.state.cameraPermissions){
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: false,
      });
      if(!result.cancelled){
        this.props.dispatch(updateUserInfo('info', 'profilePhoto', result.uri));
        console.log('RESULT IS', result);
        // this.props.dispatch(uploadProfilePicture(result))
      }
    }

  };

  onClick(clickedState){
    this.setState({choosemethod: clickedState})
  }



  renderLabels2(){
    return options[1].map((label, index)=> {
      console.log(label)
      return
        <View style={{ flexDirection: 'row', }}>
        <Text
         key={index}
         style={{ flex: 1, backgroundColor: 'red'}}
         >
          {label}
        </Text>
        </View>
    })
  }



//gradient type can be used to index --> if gradientType = this.props.denom..
  renderGradient2(gradientNumericValue){
    return(
      <View style={{ margin: 5}}>
      <Svg style={{ backgroundColor: 'cyan', flex: 1, justifyContent: 'center', alignSelf: 'center', }} height={this.state.gradientLineHeight} width={this.state.gradientLineWidth}>
        <Line
          x1='5'
          y1={this.state.gradientLineHeight/2}
          x2={this.state.gradientLineWidth+5}
          y2={this.state.gradientLineHeight/2}
          stroke='black'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <Circle
          cx={0.96*(gradientNumericValue*(this.state.gradientLineWidth/100))+5}
          cy={this.state.gradientLineHeight/2}
          r='3'
          fill='#00387e'
        />
      </Svg>
      {this.renderLabels()}
      </View>
    )
  }


renderGradient (gradientValue, type){
  const position = gradientValue*(this.state.gradientLineWidth/100)
  var value;
  if(type === 'denomination'){
     value = 1
  } else if( type === 'kashrutObservance'){
     value = 2
  } else if(type === 'shabbatObservance'){
     value = 3
  }

  return(
    <View style={{ flex: 1}}>
      <View style={{ width: this.state.gradientLineWidth, height: 90,  margin: 5,}}>

        <View style={{marginTop: 35, marginBottom: 35, borderBottomWidth: 2.5, borderBottomColor: 'grey',}}></View>

        <View style={{borderRadius: 2, width: 4, height: 15, backgroundColor: '#00387e', position: 'absolute', top: 27.5, left: position, }}></View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          {this.renderLabels(value, gradientValue)}
        </View>

      </View>
    </View>

    )
}

renderLabels(value, gradientValue){
  return options[value].map((label, index)=> {
    if(gradientValue >= 0 ){
      return <Text style={{fontSize: 10, textAlign: 'center' }} key={index}>{label}</Text>
    }
  })
}

  render() {
    //later age: console.log('AGE IS', moment().diff('1989-03-28', 'years')),
    return (
        <ScrollView style={{ backgroundColor: '#F4F4F4' }}>

          <SafeAreaView style={{ backgroundColor: '#F4F4F4' }}>

          {this.props.type==='candidate' &&
          <View>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', }}>
              <MaterialCommunityIcons
                name='close'
                onPress={()=>{this.props.navigation.goBack();}}
                size={25}
                style={{ marginTop: 10, marginRight: 10,}}
              />
            </View>

            <View style={styles.profilePhoto}>

              <ImageBackground
              source={{ uri: this.props.profilePhoto }}
              style={styles.profilePhoto}>
                <Text style={{ marginLeft: 30, fontSize: 20, color: 'white', fontWeight: 'bold', paddingBottom: 40, textShadowColor: 'grey', textShadowOffset: { width: -1, height: 0 },textShadowRadius: 0.5,}} >{this.props.name}</Text>
              </ImageBackground>

            </View>

            <View>
              <CandidateProfileCard title= 'Name' content= {this.props.name} />
              <CandidateMultilineProfileCard title='About Me' content={this.props.aboutMe} />
              <CandidateProfileCard title= 'Age' content = {this.props.age} />
              <CandidateProfileCard title= 'Gender' content= {this.props.gender} />
              <CandidateProfileCard title= 'Denomination' content= {this.props.denomination} />
              <CandidateProfileCard title= 'Kashrut Level' content= {this.props.kashrutObservance} />
              <CandidateProfileCard title= 'Shabbat Observance' content= {this.props.shabbatObservance} />
              <CandidateProfileCard title= 'Hometown' content = {this.props.hometown} />
              <CandidateProfileCard title= 'Current Residence' content = {this.props.currentresidence} />
              <CandidateProfileCard title= 'Location' content = '' />
              <CandidateProfileCard title= 'Profession' content = {this.props.profession} />
              <CandidateProfileCard title= 'High School' content = {this.props.highschool} />
              <CandidateProfileCard title= 'Yeshiva/Midrasha' content = {this.props.yeshivamidrasha} />
              <CandidateProfileCard title= 'University' content = {this.props.university} />
              <CandidateProfileCard title= 'Shomer' content= {this.props.shomer} />
            </View>

            <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
              <MaterialCommunityIcons
                name='close-circle'
                onPress={()=>{
                  this.props.dispatch(negativeMatch(this.props.id));
                  this.props.navigation.goBack();
                }}
                size={50}
                style={{ marginTop: 10, marginBottom: 10, marginLeft: 50, marginRight: 50,}}
              />
              <MaterialCommunityIcons
                name='checkbox-marked-circle'
                onPress={()=>{
                  this.props.dispatch(positiveMatch(this.props.id))
                  this.props.navigation.goBack()
                }}
                size={50}
                style={{ marginTop: 10, marginBottom: 10, marginLeft: 50, marginRight: 50,}}
              />
            </View>

          </View>
          }

              {this.props.type==='self' &&
            <View style={{ flex: 1, }}>

              <View style={{}}>

                <EditProfilePhotoActionSheet
                  onClick={clickedState => this.setState({choosemethod: clickedState})}
                  handleCamera={this.useCameraHandler}
                  handleLibrary={this.useLibraryHandler}
                  style={styles.profilePhoto}
                  overlay={
                    <View style={{ flex: 1, }}>

                      <View>
                      </View>

                      <View>
                        <Text style={{ marginLeft: 30, fontSize: 20, color: 'white', fontWeight: 'bold', paddingBottom: 40, textShadowColor: 'grey', textShadowOffset: { width: -1, height: 0 },textShadowRadius: 0.5,}} >
                          {this.props.name}
                        </Text>

                      </View>

                    </View>

                }
                  >
                </EditProfilePhotoActionSheet>

              </View>

              <View style={{ backgroundColor: '#F4F4F4' }}>
              {this.state.permissionsError && <Text>{this.state.permissionsError}</Text>}
                <ProfileCard title= 'Name' content= {this.props.name} onPress={() => this.props.navigation.navigate('EditName')}/>
                <MultilineProfileCard title='About Me' content={this.props.aboutMe} onPress={() => this.props.navigation.navigate('EditAboutMe')}/>
                <ProfileCard title= 'Age' content = {this.props.age} onPress={() => this.props.navigation.navigate('EditAge')}/>
                <ProfileCard title= 'Gender' content= {this.props.gender} onPress={() => this.props.navigation.navigate('EditGender')}/>
                <MultilineProfileCard title= 'Denomination' gradient={this.renderGradient(this.props.denomination, 'denomination')} onPress={() => this.props.navigation.navigate('EditDenomination')}/>
                <MultilineProfileCard title= 'Kashrut Level' gradient={this.renderGradient(this.props.kashrutObservance, 'kashrutObservance')} />
                <MultilineProfileCard title= 'Shabbat Observance' gradient={this.renderGradient(this.props.shabbatObservance, 'shabbatObservance')} />
                <ProfileCard title= 'Hometown' content= {this.props.hometown} onPress={() => this.props.navigation.navigate('EditHometown')}/>
                <ProfileCard title= 'Current Residence' content= {this.props.currentresidence} onPress={() => this.props.navigation.navigate('EditCurrentResidence')}/>
                <ProfileCard title= 'Profession' content= {this.props.profession} onPress={() => this.props.navigation.navigate('EditProfession')} />
                <ProfileCard title= 'High School' content= {this.props.highschool} onPress={() => this.props.navigation.navigate('EditHighSchool')} />
                <ProfileCard title= 'Yeshiva/Midrasha' content= {this.props.yeshivamidrasha} onPress={() => this.props.navigation.navigate('EditYeshivaMidrasha')}/>
                <ProfileCard title= 'University' content= {this.props.university} onPress={() => this.props.navigation.navigate('EditUniversity')} />
                <ProfileCard title= 'Shomer' content= {this.props.shomer} onPress={() => this.props.navigation.navigate('EditShomer')}/>

              </View>
            </View>}

          </SafeAreaView>

        </ScrollView>

    );
  };
}

const mapStateToProps = state => {
  let type = state.nav.showProfileScreen;
  console.log('TYPE IS', type)
  if(state.nav.showProfileScreen==='self'){
    return {
      name: state.userInfo.user.info.name,
      age: state.userInfo.user.info.age,
      denomination: state.userInfo.user.info.denomination,
      shabbatObservance: state.userInfo.user.info.shabbatObservance,
      kashrutObservance: state.userInfo.user.info.kashrutObservance,
      profilePhoto: state.userInfo.user.info.profilePhoto,
      gender: state.userInfo.user.info.gender,
      type: state.nav.showProfileScreen,
      aboutMe: state.userInfo.user.info.aboutMe,
      shomer: state.userInfo.user.info.shomer,
      hometown: state.userInfo.user.info.hometown,
      currentresidence: state.userInfo.user.info.currentresidence,
      highschool: state.userInfo.user.info.highschool,
      university: state.userInfo.user.info.university,
      yeshivamidrasha: state.userInfo.user.info.yeshivamidrasha,
      profession: state.userInfo.user.info.profession,

    };
  }
  //this might be either candidate or match:
  else if (state.userInfo.user[type]!==null){
    return {
      id: state.userInfo.user[type].id,
      name: state.userInfo.user[type].name,
      age: state.userInfo.user[type].age,

      denomination: state.userInfo.user[type].denomination,
      shabbatObservance: state.userInfo.user[type].shabbatObservance,
      kashrutObservance: state.userInfo.user[type].kashrutObservance,
      profilePhoto: state.userInfo.user[type].profilePhoto,
      gender: state.userInfo.user[type].gender,
      type: state.nav.showProfileScreen,
      aboutMe: state.userInfo.user[type].aboutMe,
      shomer: state.userInfo.user[type].shomer,
      hometown: state.userInfo.user[type].hometown,
      currentresidence:  state.userInfo.user[type].currentresidence,
      highschool: state.userInfo.user[type].highschool,
      university: state.userInfo.user[type].university,
      yeshivamidrasha: state.userInfo.user[type].yeshivamidrasha,
      profession: state.userInfo.user[type].profession,
    }
  }
};

export default connect(mapStateToProps)(ProfileScreen);

const styles = StyleSheet.create({
  permissionsErrorStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'fitamint-script',
    color: 'grey',
    fontSize: 25,
  },

  touchableOpacityHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },

  profilePhoto: {
    height: 360,
    width: 375,
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'flex-end',

  },

});

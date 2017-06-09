import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    Image,
    TouchableHighlight,
    ScrollView
} from "react-native";
import { DrawerNavigator } from "react-navigation";
import Header from "../components/Header"
import Styles from "../styles/Styles.js";
import SubjectItem from "../components/SubjectItem.js";
import SubjectLib from "../lib/Subject";


export default class Subject extends React.Component {
    static navigationOptions = {
        drawerLabel: "Subject",
    }
    constructor(){
        super();
        this.state = {
            subjects:undefined
        }
    }
    componentDidMount(){
        this.getSubjects();
    }
    getSubjects(){
        SubjectLib.all().then((subjects) => {
            let color = 1;
            let subjs = subjects.map(function(subject){
                color == 1 ? color=0 : color=1;
                return <SubjectItem key={subject.id} name={subject.acronym} color={color == 0 ? "#90CAF9" : "#b1d9fa"} />
            })
            this.setState({
                subjects:subjs
            })
        })
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <Header navigate={navigate} text="Subject"/>
                <ScrollView height={Dimensions.get("window").height-90} showsVerticalScrollIndicator={false}>
                <View style={Styles.subjectContent}>
                {this.state.subjects}
                </View>
                </ScrollView>
            </View>
        )
    }
}
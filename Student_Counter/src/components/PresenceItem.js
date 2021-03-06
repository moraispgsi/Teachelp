import React, {Component} from "react";
import {View, Text, Image, TouchableHighlight, Alert} from "react-native";
import Styles from "../styles/Styles.js";
import Icons from "../icons/icons.js";
import PresenceLib from "../lib/Presence.js";
import { ListItem } from 'react-native-elements'

export default class PresenceItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isPresent:false,
            currentPresence:undefined
        }
    }
    componentDidMount(){
        let that = this;
        PresenceLib.retrieve(this.props.presenceId).then((presence)=>{
            this.setState({
                currentPresence:presence,
                isPresent: presence.present   
            });
        })
    }

    handlePresence(){
        this.state.currentPresence.updatePresence(!this.state.isPresent);
        this.setState({
        isPresent:!this.state.isPresent
        })               
    }

    render(){
        return(
            <ListItem
                key={this.props.number}
                title={this.props.studentName}
                rightIcon={{name: "circle-o", color:this.state.isPresent ? "#008000" : "#FF0000",type:"font-awesome"}}
                onPress={() => this.handlePresence()}
            />
        )
    }
}
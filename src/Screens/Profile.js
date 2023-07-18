import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Profile = () => {
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <FontAwesome name="arrow-left" size={20} color="black" style={{ margin: 5 }} />
                <View style={{ flexDirection: 'row' }}>
                    <AntDesign name="setting" size={25} color="black" style={{ margin: 5 }} />
                    <FontAwesome name="bell" size={25} color="black" style={{ margin: 5 }} />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 15 }}>
                <FontAwesome name="user" size={30} color="black" style={{ margin: 5 }} />
                <Text style={{ fontSize: 25 }}>Manav Shah</Text>
                <AntDesign name="right" size={20} color="black" style={{ margin: 5 }} />
            </View>
            <View >
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 15 }}>
                    <FontAwesome name="gift" size={30} color="black" style={{ margin: 5 }} />
                    <Text style={{ marginLeft: 20 }}>Refer</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 15 }}>
                    <AntDesign name="wallet" size={30} color="black" style={{ margin: 5 }} />
                    <Text style={{ marginLeft: 20 }}>₹0</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 15 }}>
                    <FontAwesome name="sticky-note" size={30} color="black" style={{ margin: 5 }} />
                    <Text style={{ marginLeft: 20 }}>All Orders</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 15 }}>
                    <FontAwesome name="bank" size={30} color="black" style={{ margin: 5 }} />
                    <Text style={{ marginLeft: 20 }}>Bank details</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 15 }}>
                    <MaterialIcons name="support-agent" size={30} color="black" style={{ margin: 5 }} />
                    <Text style={{ marginLeft: 20 }}>Customer support</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 15 }}>
                    <MaterialIcons name="report" size={25} color="black" style={{ margin: 5 }} />
                    <Text style={{ marginLeft: 20 }}>Reports</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Profile
const styles = StyleSheet.create({})
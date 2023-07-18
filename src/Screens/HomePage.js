import { StyleSheet, Text, TextInput, View, Image, FlatList } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomTabView from './BottomGrow';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Indices = [
    {
        id: 1,
        name: "NIFTY 50",
        num: 18900
    },
    {
        id: 2,
        name: "BANK NIFTY",
        num: 44300
    },
    {
        id: 3,
        name: "FINNIFTY",
        num: 19800
    },
    {
        id: 4,
        name: "SENSEX",
        num: 63900
    },
]
const HomePage = ({ navigation }) => {
    return (
        <>
            <View style={{ backgroundColor: '#F0F8FF' }}>
                <View style={{ borderRadius: 30, borderWidth: 1, margin: 10, padding: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Image
                        source={require('../../assets/Mat.png')}
                        style={{ width: 30, height: 30, marginLeft: 5 }}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="search" size={24} style={{ margin: 10 }} color="black" />
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SearchContent')}
                        >
                            <Text style={{ color: "black" }}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Icon name="user" size={24} color="black" style={{ margin: 5 }} />
                    </TouchableOpacity>
                </View>
                {/* <BottomTabView/> */}
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={Indices}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ height: 65, borderWidth: 0.5, borderRadius: 10, width: 150, margin: 10, justifyContent: 'center', alignItems: 'center', borderColor: '#D3D3D3' }}>
                                <Text style={{ textAlign: 'center', fontSize: 20, color: "black" }}>{item.name}</Text>
                                <Text style={{ textAlign: 'center', fontSize: 20, color: "black" }}>{item.num}</Text>
                            </View>
                        )
                    }}
                />
            </View>
            <BottomTabView />
        </>
    )
}
export default HomePage
const styles = StyleSheet.create({})
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import React from 'react'
const Explore = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ backgroundColor: '#F0F8FF' }}>
                <View style={{ marginTop: 11 }}>
                    {/* <TouchableOpacity style={{
            borderWidth:0.5,
            height:90,
            margin:10,
            borderRadius:10
          }}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',margin:25}}>
            <View>
            <Text>Balance Available for Stocks</Text>
            <Text style={{fontSize:20,fontWeight:'bold'}}>₹ 0.00</Text>
            </View>
            <Button title='ADD MONEY' style={{borderRadius:30}}/>
            </View>
          </TouchableOpacity> */}
                </View>
                <Text
                    style={{
                        margin: 10,
                        fontSize: 25,
                        fontWeight: 'bold'
                    }}>Most bought</Text>
                <View style={styles.extraInfo}>
                    <View style={styles.info}>
                        <Text style={styles.infoText}>ATGL</Text>
                        <Text style={styles.infoText}>₹ 654.50</Text>
                    </View>
                    <View style={styles.info}>
                        {/* <Image
                                        style={styles.smallIcon}
                                        source={require('../assets/wind.gif')}
                                    /> */}
                        <Text style={styles.infoText}>LTIM</Text>
                        <Text style={styles.infoText}>₹ 5088.90</Text>
                    </View>
                </View>
                <View style={styles.extraInfo}>
                    <View style={styles.info}>
                        {/* <AntDesign
                        name="eye"
                        size={30}
                        color="black"
                        style={{ marginLeft: 50 }}
                    /> */}
                        <Text style={styles.infoText}>HAL</Text>
                        <Text style={styles.infoText}>₹ 3000</Text>
                    </View>
                    <View style={styles.info}>
                        {/* <Image
                                        style={styles.smallIcon}
                                        source={require('../assets/wind.gif')}
                                    /> */}
                        <Text style={styles.infoText}>HCL</Text>
                        <Text style={styles.infoText}>₹ 1100</Text>
                    </View>
                </View>
                <Text
                    style={{
                        margin: 10,
                        fontSize: 25,
                        fontWeight: 'bold'
                    }}>Product & tools
                </Text>
                <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={styles.products}>
                        <Image
                            style={styles.smallIcon}
                            source={require('../../assets/F&O.jpg')}
                        />
                    </View>
                    <View style={styles.products}>
                        <Image
                            style={styles.smallIcon}
                            source={require('../../assets/timer1.png')}
                        />
                    </View>
                    <View style={styles.products}>
                        <Image
                            style={styles.smallIcon}
                            source={require('../../assets/IPO1.png')}
                        />
                    </View>
                    <View style={styles.products}>
                        <Image
                            style={styles.smallIcon}
                            source={require('../../assets/T1.png')}
                        />
                    </View>
                </View>
                <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text>F&O</Text>
                    <Text>Intraday</Text>
                    <Text>IPO</Text>
                    <Text>All stocks</Text>
                </View>
            </View>
        </ScrollView>
    )
}
export default Explore
const styles = StyleSheet.create({
    extraInfo: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 5,
        margin: 10,
    },
    info: {
        width: Dimensions.get("screen").width / 2.4,
        height: Dimensions.get('screen').height / 5,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 15,
        justifyContent: "center",
    },
    products: {
        width: Dimensions.get("screen").width / 5,
        height: Dimensions.get('screen').height / 10,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 15,
        justifyContent: "center",
    },
    infoText: {
        textAlign: "center",
        fontSize: 18,
    },
    smallIcon: {
        height: 50,
        width: 50,
        borderRadius: 40,
    },
})